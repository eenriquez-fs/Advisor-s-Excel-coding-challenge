'use strict';

const Boom = require('@hapi/boom');
const Joi = require('joi');


module.exports = {
  method: 'GET',
  path: '/account/{accountNumber}/checkBalance',
  options: {
    tags: ['api'],
    validate: {
      params: Joi.object({
        accountNumber: Joi.number().required()
      }),
      failAction: (request, h, error) =>
        Boom.boomify(error)
    },
    handler: async request => {
      try {
        const { accountService } = request.services();

        const { params } = request;

        const accountBalance = await accountService.checkBalance(
          params.accountNumber
        );

        return accountBalance;
      }
      catch (error) {
        return error;
      }
    }
  }
};
