# -*- coding: utf-8 -*-
from openerp import http
from openerp.http import request


class AngryHorseHomepage(http.Controller):
    @http.route('/academy/academy/', auth='public', website=True)
    def index(self, **kw):
        hr_obj = request.registry['hr.employee']
        if request.registry['res.users'].has_group(request.cr, request.uid, 'base.group_website_publisher'):
            employee_ids = hr_obj.search(request.cr, request.uid, [], context=request.context)
        else:
            employee_ids = hr_obj.search(request.cr, request.uid, [('website_published', '=', True)], context=request.context)
        values = {
            'employee_ids': hr_obj.browse(request.cr, request.uid, employee_ids,
                                          request.context),
        }
        for value in values:
            print value.data
        return request.website.render("theme_angryhorse.index", values)




        # staff = http.request.env['hr.employee']
        # employee_ids = staff.search(request.cr, request.uid, [('website_published', '=', True)], context=request.context)
        # values = {
        #     'employee_ids': staff.browse(request.cr, request.uid, employee_ids,
        #                                   request.context),
        # }
        # for value in values:
        #     print value
        # return request.website.render("theme_angryhorse.index", values)
        # return http.request.render('theme_angryhorse.index', {
        #     'teachers': ["Diana Padilla", "Jody Caroll", "Lester Vaughn"],
        # })

# class AngryHorseHomepage(http.Controller):
#     @http.route('/page/angryhorse/', auth='public', website=True)
#     def index(self, **kw):
#         employee_ids = hr_obj.search(request.cr, request.uid, [('website_published', '=', True)], context=request.context)
#         values = {
#             'employee_ids': hr_obj.browse(request.cr, request.uid, employee_ids,
#                                           request.context),
#         }
#         return request.website.render("website.aboutus", values)
#         return "Hello, world"

    # @http.route('/academy/academy/objects/', auth='public')
    # def list(self, **kw):