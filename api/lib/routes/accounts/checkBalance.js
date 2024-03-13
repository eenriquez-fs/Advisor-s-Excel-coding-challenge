'use strict';

const Boom = require('@hapi/boom');
const Joi = require('joi');


module.exports = {
  method: 'GET',
  path: '/accounts/{accountNumber}/checkBalance',
  options: {
    tags: ['api'],
    validate: {
      params: Joi.object({
        accountNumber: Joi.number().required()
      }),
      failAction: (request, h, error) => console.log('test') ||
        Boom.boomify(error)
    },
    handler: async request => {
      try {
        const { accountService } = request.services();
        console.log('PARAMS',request);

        const { params } = request;

        console.log('PARAMS',params);

        const accountBalance = await accountService.checkBalance(
          params.accountNumber
        );

        return accountBalance;
      }
      catch (error) {
        throw error;
      }
    }
  }
};
