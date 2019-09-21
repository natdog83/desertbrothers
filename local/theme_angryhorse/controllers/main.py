# -*- coding: utf-8 -*-
from openerp import http
from openerp.http import request


# class Academy(http.Controller):
#     @http.route('/academy/academy/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

class AngryHorseHomepage(http.Controller):
    @http.route('/page/angryhorse/', auth='public', website=True)
    def index(self, **kw):
        employee_ids = hr_obj.search(request.cr, request.uid, [('website_published', '=', True)], context=request.context)
        values = {
            'employee_ids': hr_obj.browse(request.cr, request.uid, employee_ids,
                                          request.context),
        }
        return request.website.render("website.aboutus", values)
        return "Hello, world"

    @http.route('/academy/academy/objects/', auth='public')
    def list(self, **kw):