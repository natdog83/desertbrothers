# -*- coding: utf-8 -*-
import requests
from openerp import http
from openerp.http import request
from openerp.addons.website.controllers.main import Website


class Home(Website):

    @http.route(['/', '/index', '/home'], type='http', website=True, auth='public')
    def index(self, **kw):
        hr_obj = request.registry['hr.employee']
        employee_ids = hr_obj.search(request.cr, request.uid, [('website_published', '=', True)], context=request.context)
        values = {
            'employee_ids': hr_obj.browse(request.cr, request.uid, employee_ids,
                                            request.context),
        }
        return request.website.render("theme_angryhorse.index", values)

    # super(Website, self).index(**kw)
    # return http.request.render('my_website.home')

class AngryHorseHomepage(http.Controller):
    @http.route('/academy/academy/', auth='public', website=True)
    def index(self, **kw):
        hr_obj = request.registry['hr.employee']
        employee_ids = hr_obj.search(request.cr, request.uid, [('website_published', '=', True)], context=request.context)
        values = {
            'employee_ids': hr_obj.browse(request.cr, request.uid, employee_ids,
                                          request.context),
        }
        return self(values)
