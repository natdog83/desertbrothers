# -*- coding: utf-8 -*-
{
    'name': "Beer",

    'summary': """
        My website template app

        """,

    'description': """
        My website app!
    """,

    'author': "Nathan McCusker",
    'website': "http://www.angryhorsebrewing.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/openerp/addons/base/module/module_data.xml
    # for the full list
    'category': 'Website',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}
