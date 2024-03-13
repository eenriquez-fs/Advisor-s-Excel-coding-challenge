/* eslint-disable max-lines */
'use strict';

const Boom = require('@hapi/boom');
const Schmervice = require('@hapipal/schmervice');


module.exports = class AccountService extends Schmervice.Service {
  //check balance
  async checkBalance(accountNumber) {
    const {
      Account: AccountModel,
    } = this.server.models();

    // TODO: maybe also return the associated options if its not a freetext?
    const balance = await AccountModel.query()
                                      .findById(accountNumber)

    if(!balance) {
      throw Boom.notFound('account not found!')
    }

    return balance;
  }


  //withdraw


  /*
   deposit,
   cannot deposit more than $1000 in single transaction
   if type is credit, canNOT deposit more in their account to 0 their balance
  */
  async deposit(accountNumber, amount) {
    const {
      Account: AccountModel,
    } = this.server.models();

    const userAccount = await AccountModel.query()
                                             .findById(accountNumber);
    // if(userAccount.type !== 'credit' amount > 1000) {
    // assumes that no matter the type of account they are only allowed to deposit 1k per trx
    if(amount > 1000) {
      throw Boom.badRequest('maximum amount for deposit is $1000')
    }

    // TODO: put account types to constant?
    // check if amount is > what is needed to 0 out the account
    if(userAccount.type === 'credit' && amount > Math.abs(userAccount.amount)){
      throw Boom.badRequest
    }


    // make the deposit
    const updatedBalance = userAccount.amount + amount
    userAccount.amount = updatedBalance;
    await userAccount.$query().patch()

    return userAccount;
  }


  // getDailyTotalWithdrawal
};
