'use strict';

const Schwifty = require('@hapipal/schwifty');
const Joi = require('joi');

module.exports = class AccountWithdrawal extends Schwifty.Model {

  static tableName = 'account_withdrawals';

  static joiSchema = Joi.object({
    id: Joi.number().integer(),
    account_number: Joi.number().integer().required(),
    amount: Joi.number().integer().required(),
    created_at: Joi.date(),
    updated_at: Joi.date()
  }).label('AccountWithdrawal');

  static get relationMappings() {
  }
};
