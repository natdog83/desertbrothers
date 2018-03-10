odoo.define('point_of_sale.pos_2_so', function(require) {
    "use strict";

    var PosBaseWidget = require('point_of_sale.BaseWidget');
    var devices = require('point_of_sale.devices');
    var gui = require('point_of_sale.gui');
    var screens = require('point_of_sale.screens');

    var Pos2SoWidget = PosBaseWidget.extend({
        template : 'Pos2SoWidget',
        init : function(parent) {
            var self = this;
            this._super(parent);
        },
        start : function() {
            var self = this;
            this.$el.find('.pos-2-so-button').click(function() {
                self.gui.show_screen('payments');
            });
        },
    });

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
    var OrderScreenWidget = screens.ScreenWidget.extend({
        template: 'OrderScreenWidget',

        init: function(parent, options){
            this._super(parent, options);
            this.partner_cache = new DomCache();
        },

    });

    gui.define_screen({
        'name': 'orders',
        'widget': OrderScreenWidget,
        // 'condition': function(){
        //     return this.pos.config.iface_orders;
        // },
    });

    // // Add the OrderScreen to the GUI, and set it as the default screen
    // chrome.Chrome.include({
    //     build_widgets: function(){
    //         this._super();
    //         if (this.pos.config.iface_orders) {
    //             this.gui.set_startup_screen('orders');
    //         }
    //     },
    // });


});
