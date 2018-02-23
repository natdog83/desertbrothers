odoo.define('point_of_sale.pos_2_so', function(require) {
    "use strict";

    var PosBaseWidget = require('point_of_sale.BaseWidget');
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
                self.gui.show_screen('payment');
                pos2so = true;
            });
        },
    });

    screens.ProductScreenWidget.include({
        start : function() {

            var self = this;
            this._super();

            this.pos2sopad = new Pos2SoWidget(this, {});
            this.pos2sopad.replace(this.$('.placeholder-Pos2SoWidget'));
            console.log("-----loaded the product screen widget");

        },
    });
