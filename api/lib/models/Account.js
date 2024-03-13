'use strict';

const Schwifty = require('@hapipal/schwifty');
const Joi = require('joi');

module.exports = class Account extends Schwifty.Model {

  static tableName = 'accounts';

  static get idColumn() {
    return 'account_number';
  }

  static joiSchema = Joi.object({
    account_number: Joi.number().integer(),
    name: Joi.string().trim().required(),
    amount: Joi.number().integer().required(),
    type: Joi.string().trim().required(),
    credit_limit: Joi.number().integer(),
    created_at: Joi.date(),
    updated_at: Joi.date()
  }).label('Form');

  static get relationMappings() {
  }
};
