'use strict';

exports.up = function (knex) {
  return knex.schema.createTable('account_withdrawals', table => {
    table.increments('id').primary();
    table.integer('account_number').unsigned().index().references('account_number').inTable('accounts');
    table.integer('amount').unsigned()
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
