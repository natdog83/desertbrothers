# -*- coding: utf-8 -*-
from openerp import http
from openerp.http import request


class AngryHorseHomepage(http.Controller):
    @http.route('/academy/academy/', auth='public', website=True)
    def index(self, **kw):
        hr_obj = request.registry['hr.employee']
        employee_ids = hr_obj.search(request.cr, request.uid, [('website_published', '=', True)], context=request.context)
        values = {
            'employee_ids': hr_obj.browse(request.cr, request.uid, employee_ids,
                                          request.context),
        }
        return request.website.render("theme_angryhorse.index", values)