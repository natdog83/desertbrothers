odoo.define('point_of_sale.pos_2_so', function(require) {
    "use strict";

    var PosBaseWidget = require('point_of_sale.BaseWidget');
    var devices = require('point_of_sale.devices');
    var gui = require('point_of_sale.gui');
    var screens = require('point_of_sale.screens');

    screens.ProductScreenWidget.include({
        start : function() {

            var self = this;
            this._super();

            this.pos2sopad = new Pos2SoWidget(this, {});
            this.pos2sopad.replace(this.$('.placeholder-Pos2SoWidget'));

        },
    });

    // The screen that allows you to select the orders, see and select the table,
    // as well as edit them.
    var FloorScreenWidget = screens.ScreenWidget.extend({
        template: 'OrderScreenWidget',
        show_leftpane: false,

        // Ignore products, discounts, and client barcodes
        barcode_product_action: function(code){},
        barcode_discount_action: function(code){},
        barcode_client_action: function(code){},


        init: function(parent, options){
            this._super(parent, options);
            this.partner_cache = new DomCache();
        },

        auto_back: true,

        show: function(){
            var self = this;
            this._super();

            this.renderElement();
            this.details_visible = false;
            this.old_client = this.pos.get_order().get_client();

            this.$('.back').click(function(){
                self.gui.back();
            });

            this.$('.next').click(function(){
                self.save_changes();
                self.gui.back();    // FIXME HUH ?
            });

            this.$('.new-customer').click(function(){
                self.display_client_details('edit',{
                    'country_id': self.pos.company.country_id,
                });
            });

            var partners = this.pos.db.get_partners_sorted(1000);
            this.render_list(partners);

            this.reload_partners();

            if( this.old_client ){
                this.display_client_details('show',this.old_client,0);
            }

            this.$('.client-list-contents').delegate('.client-line','click',function(event){
                self.line_select(event,$(this),parseInt($(this).data('id')));
            });

            var search_timeout = null;

            if(this.pos.config.iface_vkeyboard && this.chrome.widget.keyboard){
                this.chrome.widget.keyboard.connect(this.$('.searchbox input'));
            }

            this.$('.searchbox input').on('keypress',function(event){
                clearTimeout(search_timeout);

                var searchbox = this;

                search_timeout = setTimeout(function(){
                    self.perform_search(searchbox.value, event.which === 13);
                },70);
            });

            this.$('.searchbox .search-clear').click(function(){
                self.clear_search();
            });
        },
        hide: function () {
            this._super();
            this.new_client = null;
        },
        barcode_client_action: function(code){
            if (this.editing_client) {
                this.$('.detail.barcode').val(code.code);
            } else if (this.pos.db.get_partner_by_barcode(code.code)) {
                var partner = this.pos.db.get_partner_by_barcode(code.code);
                this.new_client = partner;
                this.display_client_details('show', partner);
            }
        },
        perform_search: function(query, associate_result){
            var customers;
            if(query){
                customers = this.pos.db.search_partner(query);
                this.display_client_details('hide');
                if ( associate_result && customers.length === 1){
                    this.new_client = customers[0];
                    this.save_changes();
                    this.gui.back();
                }
                this.render_list(customers);
            }else{
                customers = this.pos.db.get_partners_sorted();
                this.render_list(customers);
            }
        },
        clear_search: function(){
            var customers = this.pos.db.get_partners_sorted(1000);
            this.render_list(customers);
            this.$('.searchbox input')[0].value = '';
            this.$('.searchbox input').focus();
        },
        render_list: function(partners){
            var contents = this.$el[0].querySelector('.client-list-contents');
            contents.innerHTML = "";
            for(var i = 0, len = Math.min(partners.length,1000); i < len; i++){
                var partner    = partners[i];
                var clientline = this.partner_cache.get_node(partner.id);
                if(!clientline){
                    var clientline_html = QWeb.render('ClientLine',{widget: this, partner:partners[i]});
                    var clientline = document.createElement('tbody');
                    clientline.innerHTML = clientline_html;
                    clientline = clientline.childNodes[1];
                    this.partner_cache.cache_node(partner.id,clientline);
                }
                if( partner === this.old_client ){
                    clientline.classList.add('highlight');
                }else{
                    clientline.classList.remove('highlight');
                }
                contents.appendChild(clientline);
            }
        },
        save_changes: function(){
            if( this.has_client_changed() ){
                this.pos.get_order().set_client(this.new_client);
            }
        },
        has_client_changed: function(){
            if( this.old_client && this.new_client ){
                return this.old_client.id !== this.new_client.id;
            }else{
                return !!this.old_client !== !!this.new_client;
            }
        },
        toggle_save_button: function(){
            var $button = this.$('.button.next');
            if (this.editing_client) {
                $button.addClass('oe_hidden');
                return;
            } else if( this.new_client ){
                if( !this.old_client){
                    $button.text(_t('Set Customer'));
                }else{
                    $button.text(_t('Change Customer'));
                }
            }else{
                $button.text(_t('Deselect Customer'));
            }
            $button.toggleClass('oe_hidden',!this.has_client_changed());
        },
        line_select: function(event,$line,id){
            var partner = this.pos.db.get_partner_by_id(id);
            this.$('.client-list .lowlight').removeClass('lowlight');
            if ( $line.hasClass('highlight') ){
                $line.removeClass('highlight');
                $line.addClass('lowlight');
                this.display_client_details('hide',partner);
                this.new_client = null;
                this.toggle_save_button();
            }else{
                this.$('.client-list .highlight').removeClass('highlight');
                $line.addClass('highlight');
                var y = event.pageY - $line.parent().offset().top;
                this.display_client_details('show',partner,y);
                this.new_client = partner;
                this.toggle_save_button();
            }
        },
        partner_icon_url: function(id){
            return '/web/image?model=res.partner&id='+id+'&field=image_small';
        },

        // ui handle for the 'edit selected customer' action
        edit_client_details: function(partner) {
            this.display_client_details('edit',partner);
        },

        // ui handle for the 'cancel customer edit changes' action
        undo_client_details: function(partner) {
            if (!partner.id) {
                this.display_client_details('hide');
            } else {
                this.display_client_details('show',partner);
            }
        },

        // what happens when we save the changes on the client edit form -> we fetch the fields, sanitize them,
        // send them to the backend for update, and call saved_client_details() when the server tells us the
        // save was successfull.
        save_client_details: function(partner) {
            var self = this;

            var fields = {};
            this.$('.client-details-contents .detail').each(function(idx,el){
                fields[el.name] = el.value;
            });

            if (!fields.name) {
                this.gui.show_popup('error',_t('A Customer Name Is Required'));
                return;
            }

            if (this.uploaded_picture) {
                fields.image = this.uploaded_picture;
            }

            fields.id           = partner.id || false;
            fields.country_id   = fields.country_id || false;
            fields.barcode      = fields.barcode || '';

            new Model('res.partner').call('create_from_ui',[fields]).then(function(partner_id){
                self.saved_client_details(partner_id);
            },function(err,event){
                event.preventDefault();
                var error_body = _t('Your Internet connection is probably down.');
                if (err.data) {
                    var except = err.data;
                    error_body = except.arguments && except.arguments[0] || except.message || error_body;
                }
                self.gui.show_popup('error',{
                    'title': _t('Error: Could not Save Changes'),
                    'body': error_body,
                });
            });
        },

        // what happens when we've just pushed modifications for a partner of id partner_id
        saved_client_details: function(partner_id){
            var self = this;
            this.reload_partners().then(function(){
                var partner = self.pos.db.get_partner_by_id(partner_id);
                if (partner) {
                    self.new_client = partner;
                    self.toggle_save_button();
                    self.display_client_details('show',partner);
                } else {
                    // should never happen, because create_from_ui must return the id of the partner it
                    // has created, and reload_partner() must have loaded the newly created partner.
                    self.display_client_details('hide');
                }
            });
        },

        // resizes an image, keeping the aspect ratio intact,
        // the resize is useful to avoid sending 12Mpixels jpegs
        // over a wireless connection.
        resize_image_to_dataurl: function(img, maxwidth, maxheight, callback){
            img.onload = function(){
                var canvas = document.createElement('canvas');
                var ctx    = canvas.getContext('2d');
                var ratio  = 1;

                if (img.width > maxwidth) {
                    ratio = maxwidth / img.width;
                }
                if (img.height * ratio > maxheight) {
                    ratio = maxheight / img.height;
                }
                var width  = Math.floor(img.width * ratio);
                var height = Math.floor(img.height * ratio);

                canvas.width  = width;
                canvas.height = height;
                ctx.drawImage(img,0,0,width,height);

                var dataurl = canvas.toDataURL();
                callback(dataurl);
            };
        },

        // Loads and resizes a File that contains an image.
        // callback gets a dataurl in case of success.
        load_image_file: function(file, callback){
            var self = this;
            if (!file.type.match(/image.*/)) {
                this.gui.show_popup('error',{
                    title: _t('Unsupported File Format'),
                    body:  _t('Only web-compatible Image formats such as .png or .jpeg are supported'),
                });
                return;
            }

            var reader = new FileReader();
            reader.onload = function(event){
                var dataurl = event.target.result;
                var img     = new Image();
                img.src = dataurl;
                self.resize_image_to_dataurl(img,800,600,callback);
            };
            reader.onerror = function(){
                self.gui.show_popup('error',{
                    title :_t('Could Not Read Image'),
                    body  :_t('The provided file could not be read due to an unknown error'),
                });
            };
            reader.readAsDataURL(file);
        },

        // This fetches partner changes on the server, and in case of changes,
        // rerenders the affected views
        reload_partners: function(){
            var self = this;
            return this.pos.load_new_partners().then(function(){
                self.render_list(self.pos.db.get_partners_sorted(1000));

                // update the currently assigned client if it has been changed in db.
                var curr_client = self.pos.get_order().get_client();
                if (curr_client) {
                    self.pos.get_order().set_client(self.pos.db.get_partner_by_id(curr_client.id));
                }
            });
        },

        // Shows,hides or edit the customer details box :
        // visibility: 'show', 'hide' or 'edit'
        // partner:    the partner object to show or edit
        // clickpos:   the height of the click on the list (in pixel), used
        //             to maintain consistent scroll.
        display_client_details: function(visibility,partner,clickpos){
            var self = this;
            var contents = this.$('.client-details-contents');
            var parent   = this.$('.client-list').parent();
            var scroll   = parent.scrollTop();
            var height   = contents.height();

            contents.off('click','.button.edit');
            contents.off('click','.button.save');
            contents.off('click','.button.undo');
            contents.on('click','.button.edit',function(){ self.edit_client_details(partner); });
            contents.on('click','.button.save',function(){ self.save_client_details(partner); });
            contents.on('click','.button.undo',function(){ self.undo_client_details(partner); });
            this.editing_client = false;
            this.uploaded_picture = null;

            if(visibility === 'show'){
                contents.empty();
                contents.append($(QWeb.render('ClientDetails',{widget:this,partner:partner})));

                var new_height   = contents.height();

                if(!this.details_visible){
                    // resize client list to take into account client details
                    parent.height('-=' + new_height);

                    if(clickpos < scroll + new_height + 20 ){
                        parent.scrollTop( clickpos - 20 );
                    }else{
                        parent.scrollTop(parent.scrollTop() + new_height);
                    }
                }else{
                    parent.scrollTop(parent.scrollTop() - height + new_height);
                }

                this.details_visible = true;
                this.toggle_save_button();
            } else if (visibility === 'edit') {
                this.editing_client = true;
                contents.empty();
                contents.append($(QWeb.render('ClientDetailsEdit',{widget:this,partner:partner})));
                this.toggle_save_button();

                // Browsers attempt to scroll invisible input elements
                // into view (eg. when hidden behind keyboard). They don't
                // seem to take into account that some elements are not
                // scrollable.
                contents.find('input').blur(function() {
                    setTimeout(function() {
                        self.$('.window').scrollTop(0);
                    }, 0);
                });

                contents.find('.image-uploader').on('change',function(event){
                    self.load_image_file(event.target.files[0],function(res){
                        if (res) {
                            contents.find('.client-picture img, .client-picture .fa').remove();
                            contents.find('.client-picture').append("<img src='"+res+"'>");
                            contents.find('.detail.picture').remove();
                            self.uploaded_picture = res;
                        }
                    });
                });
            } else if (visibility === 'hide') {
                contents.empty();
                parent.height('100%');
                if( height > scroll ){
                    contents.css({height:height+'px'});
                    contents.animate({height:0},400,function(){
                        contents.css({height:''});
                    });
                }else{
                    parent.scrollTop( parent.scrollTop() - height);
                }
                this.details_visible = false;
                this.toggle_save_button();
            }
        },
        close: function(){
            this._super();
        },








    });

    gui.define_screen({
        'name': 'orders',
        'widget': OrderScreenWidget,
        'condition': function(){
            return this.pos.config.iface_orders;
        },
    });

    // Add the OrderScreen to the GUI, and set it as the default screen
    chrome.Chrome.include({
        build_widgets: function(){
            this._super();
            // if (this.pos.config.iface_orders) {
            //     this.gui.set_startup_screen('orders');
            // }
        },
    });

    var Pos2SoWidget = PosBaseWidget.extend({
        template : 'Pos2SoWidget',
        init : function(parent) {
            var self = this;
            this._super(parent);
        },
        start : function() {
            var self = this;
            this.$el.find('.pos-2-so-button').click(function() {
                self.gui.show_screen('orders');
                pos2so = true;
            });
        },
    });

});
