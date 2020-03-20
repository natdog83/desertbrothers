from openerp import api, fields, models, _

class product_template_inherit(models.Model):
    
    _inherit='product.template'
    
    product_variants=fields.One2many('product.product','product_tmpl_id')