'use strict';

const Joi = require('joi');
const fp = require('lodash/fp');

exports.seed = function (knex) {

  const tableName = 'accounts';
  const schema = require('../models/Account').joiSchema;

  const rows = [
    {
      account_number: 1,
      name: 'Johns Checking',
      amount: 1000,
      type: 'checking'
    },
    {
      account_number: 2,
      name: 'Janes Savings',
      amount: 2000,
      type: 'savings'
    },
    {
      account_number: 3,
      name: 'Jills Credit',
      amount: -3000,
      type: 'credit',
      credit_limit: 10000
    },
    {
      account_number: 4,
      name: 'Bobs Checking',
      amount: 40000,
      type: 'checking',
    },
    {
      account_number: 5,
      name: 'Bills Savings',
      amount: 50000,
      type: 'savings',
    },
    {
      account_number: 6,
      name: 'Bills Credit',
      amount: -60000,
      type: 'credit',
      credit_limit: 60000
    },
    {
      account_number: 7,
      name: 'Nancy Checking',
      amount: 70000,
      type: 'checking',
    },
    {
      account_number: 8,
      name: 'Nancy Savings',
      amount: 80000,
      type: 'checking',
    },
    {
      account_number: 9,
      name: 'Nancy Credit',
      amount: -90000,
      type: 'credit',
      credit_limit: 100000
    },
  ];

  return knex(tableName)
    .then(async () => {
      const validatedRows = rows.map(row => {
        const { error, value: validatedRow } = schema.validate(row);

        if (!fp.isEmpty(error)) {
          throw error;
        }
        console.log('TEST', validatedRow);
        return validatedRow;
      });

      try {
        const a = await knex.insert(validatedRows).into(tableName);
        await knex.raw(`select setval(\'${tableName}_id_seq\', max(id)) from ${tableName}`);
        return a;
      }
      catch (error) {
        if (error.message.indexOf('violates unique constraint') > -1) {
          console.log('SEED ALREADY EXISTS');
        }
      }

    });
};
