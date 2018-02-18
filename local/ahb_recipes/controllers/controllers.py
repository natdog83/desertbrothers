# -*- coding: utf-8 -*-
from openerp import http

# class AhbRecipes(http.Controller):
#     @http.route('/ahb_recipes/ahb_recipes/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/ahb_recipes/ahb_recipes/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('ahb_recipes.listing', {
#             'root': '/ahb_recipes/ahb_recipes',
#             'objects': http.request.env['ahb_recipes.ahb_recipes'].search([]),
#         })

#     @http.route('/ahb_recipes/ahb_recipes/objects/<model("ahb_recipes.ahb_recipes"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('ahb_recipes.object', {
#             'object': obj
#         })