# -*- coding: utf-8 -*-
import requests
from requests.auth import HTTPBasicAuth
from openerp import http
from openerp.http import request
from openerp.addons.website.controllers.main import Website

class Home(Website):

    @http.route(['/', '/index', '/home'], type='http', auth='public', website=True)
    def index(self, **kw):
        #menus = requests.get('https://business.untappd.com/api/v1/sections/82681/items', auth=('nmccusker@angryhorsebrewing.com', '15TG6vxCrAtyLVWWUsrv')).json()
        hr_obj = request.registry['hr.employee']
        employee_ids = hr_obj.search(request.cr, request.uid, [('website_published', '=', True)], context=request.context)
        values = {
            'employee_ids': hr_obj.browse(request.cr, request.uid, employee_ids,
                                            request.context),
            #'menus': menus,
        }
        return request.website.render("theme_angryhorse.index", values)

    # super(Website, self).index(**kw)
    # return http.request.render('my_website.home')

# class AngryHorseHomepage(http.Controller):
#     @http.route('/academy/academy/', auth='public', website=True)
#     def index(self, **kw):
#         hr_obj = request.registry['hr.employee']
#         employee_ids = hr_obj.search(request.cr, request.uid, [('website_published', '=', True)], context=request.context)
#         values = {
#             'employee_ids': hr_obj.browse(request.cr, request.uid, employee_ids,
#                                           request.context),
#         }
#         return self(values)

class BeerAPI(Website):
    @http.route(['/api/brand'], type="json", auth="public", website="True")
    def apibrand(self, **kw):
        value = request.json('https://business.untappd.com/api/v1/menus/20670?full=true', auth=('nmccusker@angryhorsebrewing.com', '15TG6vxCrAtyLVWWUsrv'))
        print values
        return request.website.render("theme_angryhorse.apibrand", values)
