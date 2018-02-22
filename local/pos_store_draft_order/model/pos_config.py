from openerp import fields, models


class PosConfig(models.Model):
    _inherit = 'pos.config'

    # Column Section
    allow_store_draft_order = fields.Boolean(
        string='Allow to Store Draft Orders', help="If you check this field,"
        "  users will have the possibility to let some PoS orders in a draft"
        " state, and allow the customer to paid later.\n"
        "Order in a draft state will not generate entries during the close"
        " of the session.")
