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
    style_letter = fields.Selection((
      ('A','A'),
      ('B','B'),
      ('C','C'),
      ('E','E'),
      ('F','F'),
      ('G','G'),
      ('H','H'),
      ('I','I'),
      ('J','J'),
      ('K','K'),
      ('L','L'),
      ('M','M'),
      ('N','N'),
      ('O','O'),
      ('P','P'),
      ('Q','Q'),
      ('R','R'),
      ('S','S'),
      ('T','T'),
      ('U','U'),
      ('V','V'),
      ('W','W'),
      ('X','X'),
      ('Y','Y'),
      ('Z','Z'),
      ('0','0'),
      ('1','1'),
      ('2','2'),
      ('3','3'),
      ('4','4'),
      ('5','5'),
      ('6','6'),
      ('7','7'),
      ('8','8'),
      ('9','9')
      ),'Style Letters')
    beer_type = fields.Selection((
      ('0','Ale'),
      ('1','Lager'),
      ('2','Mixed'),
      ('3','Mead'),
      ('4','Cider'),
      ('5','Wheat')
      ),'Beer Type',
      required=True)
    og_min = fields.Float()
    og_max = fields.Float()
    Final_Gravity_min = fields.Float()
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
    number_updated = fields.Char(compute='_number_generator', store=True, string="#")

    @api.multi
    def _number_generator(self):
        for record in self:
            if(record.number and record.style_letter):
                record.name = "%s%s" % \
                    (record.number or '', record.style_letter or '')
