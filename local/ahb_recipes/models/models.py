# -*- coding: utf-8 -*-

from openerp import models, fields, api

class ahb_recipes(models.Model):
    _name = 'ahb_recipes.ahb_recipes'
    name = fields.Char('Proposed Name', required=True)
    style = fields.Char('Style', required=True)

class styles(models.Model):
    VALUES=[
      ('0',''),
      ('1','A'),
      ('2','B'),
      ('3','C'),
      ('4','D'),
      ('5','E'),
      ('6','F'),
      ('7','G'),
      ('8','H'),
      ('9','I'),
      ('10','J'),
      ('11','K'),
      ('12','L'),
      ('13','M'),
      ('14','N'),
      ('15','O'),
      ('16','P'),
      ('17','Q'),
      ('18','R'),
      ('19','S'),
      ('20','T'),
      ('21','U'),
      ('22','V'),
      ('23','W'),
      ('24','X'),
      ('25','Y'),
      ('26','Z')
    ]

    _name = 'ahb_recipes.styles'
    name = fields.Char('Name', required=True)
    category = fields.Char('Category', required=True)
    style_guide = fields.Char('Style Guide', required=True)
    number = fields.Integer()
    style_letter = fields.Selection((
      VALUES
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
    og_min = fields.Float(digits=(1, 3))
    og_max = fields.Float(digits=(1, 3))
    Final_Gravity_min = fields.Float(digits=(1, 3))
    fg_max = fields.Float(digits=(1, 3))
    bitterness_min = fields.Float(digits=(2, 1))
    bitterness_max = fields.Float(digits=(2, 1))
    carbonation_min = fields.Float(digits=(1, 2))
    carbonation_max = fields.Float(digits=(1, 2))
    color_min = fields.Float(digits=(2, 1))
    color_max = fields.Float(digits=(2, 1))
    abv_min = fields.Float(digits=(2, 2))
    abv_max = fields.Float(digits=(2, 2))
    description = fields.Text()
    profile = fields.Text()
    ingredients = fields.Text()
    examples = fields.Text()
    web_link = fields.Text()
    number_updated = fields.Char(compute='_number_generator', string="#",store=True)
    og_range = fields.Char(compute='_calculate_og_range', string="OG Range",store=True)
    fg_range = fields.Char(compute='_calculate_fg_range', string="FG Range",store=True)
    abv_range = fields.Char(compute='_calculate_abv_range', string="ABV Range",store=True)
    ibu_range = fields.Char(compute='_calculate_ibu_range', string="IBU Range",store=True)
    color_range = fields.Char(compute='_calculate_color_range', string="Color Range",store=True)

    @api.depends('number')
    def _number_generator(self):
        for record in self:
            record.number_updated = "%s%s" % (record.number or '',dict(VALUES)[record.style_letter] or '')

    @api.multi
    def _calculate_og_range(self):
        for record in self:
            record.og_range = "%s - %s" % (record.og_min or '',record.og_max or '')

    @api.multi
    def _calculate_fg_range(self):
        for record in self:
            record.fg_range = "%s - %s" % (record.Final_Gravity_min or '',record.fg_max or '')

    @api.multi
    def _calculate_abv_range(self):
        for record in self:
            record.abv_range = "%s - %s" % (record.abv_min or '',record.abv_max or '')

    @api.multi
    def _calculate_ibu_range(self):
        for record in self:
            record.ibu_range = "%s - %s" % (record.bitterness_min or '',record.bitterness_max or '')

    @api.multi
    def _calculate_color_range(self):
        for record in self:
            record.color_range = "%s - %s" % (record.color_min or '',record.color_max or '')
