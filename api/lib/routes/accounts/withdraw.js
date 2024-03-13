'use strict';

const Joi = require('joi');
const Boom = require('@hapi/boom');


/**
 * type can be alphanumeric, fn_key, mod_key
 */
module.exports = {
  method: 'post',
  path: '/accounts/withdraw',
  options: {
    tags: ['api'],
    validate: {
      payload: Joi.object({
        accountNumber: Joi.number().required(),
        amount: Joi.number().required().max(200).min(0)
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

        const resp = await accountService.withdraw(accountNumber, amount);
        return resp;
      }
      catch (error) {
        return Boom.boomify(error);
      }
    }
  }
};
