# -*- coding: utf-8 -*-

import datetime
import json
import werkzeug
import xml

from openerp import tools
from openerp.addons.web import http
from openerp.addons.web.http import request
from openerp.addons.website.models.website import slug, unslug
from openerp.exceptions import UserError
from openerp.osv.orm import browse_record
from openerp.tools.translate import _
from openerp import SUPERUSER_ID
from openerp.tools import html2plaintext


def remove_tags(text):
    return ''.join(xml.etree.ElementTree.fromstring(text).itertext())

class Beer(http.Controller):
    @http.route('/home/', auth='public', website=True)
    def beer(self, **kw):
        testblog = http.request.env['blog.post'].search([['blog_id', '=', 2]])
        Blogs = http.request.env['blog.post'].search([['blog_id', '=', 2]], limit=1)
        blog_post_cover_properties = json.loads(Blogs.cover_properties)
        blogcontent = Blogs.content
        clean_content = remove_tags(blogcontent)
        postwebsiteurl =  "/blog/%s/post/%s" % (slug(Blogs.blog_id), slug(Blogs))
        return http.request.render('beer.index', {
            'blogs': Blogs,
            'testblog': testblog,
            'blog_post_cover_properties': json.loads(Blogs.cover_properties),
            'cleancontent': clean_content,
            'postwebsiteurl': postwebsiteurl,
        })


#     @http.route('/beer/beer/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('beer.listing', {
#             'root': '/beer/beer',
#             'objects': http.request.env['beer.beer'].search([]),
#         })

#     @http.route('/beer/beer/objects/<model("beer.beer"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('beer.object', {
#             'object': obj
#         })
