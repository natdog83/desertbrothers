openerp.theme_angryhorse = function(instance, local) {
    var _t = instance.web._t,
        _lt = instance.web._lt;
    var QWeb = instance.web.qweb;

    local.HomePage = instance.Widget.extend({
        start: function() {
            console.log("pet store home page loaded");
        },
    });

    instance.web.client_actions.add(
        'theme_angryhorse.homepage', 'instance.theme_angryhorse.HomePage');
}