from openerp import api, fields, models

class PosOrder(models.Model):
    _inherit = 'pos.order'

    # Column Section
    is_partial_paid = fields.Boolean(
        string='Is Partially Paid', compute='compute_is_partial_paid',
        store=True)

    # Compute Section
    @api.one
    @api.depends('state', 'statement_ids')
    def compute_is_partial_paid(self):
        self.is_partial_paid =\
            (self.state == 'draft') and len(self.statement_ids) != 0
