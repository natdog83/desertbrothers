# -*- coding: utf-8 -*-

from openerp import models, fields, api

class ahb_recipes(models.Model):
    _name = 'ahb_recipes.ahb_recipes'
    name = fields.Char('Proposed Name', required=True)
    style = fields.Char('Style', required=True)

class styles(models.Model):
    _name = 'ahb_recipes.styles'
    name = fields.Char('Name', required=True)
    category = fields.Char('Category', required=True)
    style_guide = fields.Char('Style Guide', required=True)
    number = fields.Integer()
    style_letter = fields.Selection([(
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9'
    )])
    beertype = fields.Selection([('Ale','Lager','Mixed','Mead','Cider','Wheat')])
    og_min = fields.Float()
    og_max = fields.Float()
    fg_min = fields.Float()
    fg_max = fields.Float()
    bitterness_min = fields.Float()
    bitterness_max = fields.Float()
    carbonation_min = fields.Float()
    carbonation_max = fields.Float()
    color_min = fields.Float()
    color_max = fields.Float()
    abv_min = fields.Float()
    abv_max = fields.Float()
    description = fields.Text()
    profile = fields.Text()
    ingredients = fields.Text()
    examples = fields.Text()
    web_link = fields.Text()
