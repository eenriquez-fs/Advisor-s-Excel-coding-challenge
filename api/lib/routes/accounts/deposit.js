'use strict';

const Joi = require('joi');
const Boom = require('@hapi/boom');


/**
 * type can be alphanumeric, fn_key, mod_key
 */
module.exports = {
  method: 'post',
  path: '/accounts/deposit',
  options: {
    tags: ['api'],
    validate: {
      payload: Joi.object({
        account_number: Joi.number().required(),
        amount: Joi.number().required().max(1000).min(0)
      }),
      failAction: (request, h, err) => {
        // Custom error response
        throw Boom.badRequest(err.message);
      }
    },
    handler: async request => {
      try {
        const {accountNumber, amount} = request.payload;

        const { accountService } = request.services();

        const resp = await accountService.deposit(accountNumber, amount);

        return resp;
      }
      catch (error) {
        return Boom.boomify(error);
      }
    }
  }
};
