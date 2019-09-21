# -*- coding: utf-8 -*-
from odoo import http
from odoo.addons.website.controllers.main import Website 

class CustomWebsite(Website):  # Inherit in your custom class

    @http.route('/', type='http', auth="public", website=True)
    def index(self):
        res = super(CustomWebsite, self).index()
        print [1,2]
        return res