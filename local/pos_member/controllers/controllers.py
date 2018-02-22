# -*- coding: utf-8 -*-
from openerp import http

# class PosMember(http.Controller):
#     @http.route('/pos_member/pos_member/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/pos_member/pos_member/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('pos_member.listing', {
#             'root': '/pos_member/pos_member',
#             'objects': http.request.env['pos_member.pos_member'].search([]),
#         })

#     @http.route('/pos_member/pos_member/objects/<model("pos_member.pos_member"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('pos_member.object', {
#             'object': obj
#         })