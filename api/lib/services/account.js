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


  /*
    withdraw
    can only withdraw $200 per transaction
    can only withdraw $400 per day
    can only withdraw in multiples of 5
    non credit account types: canNOT withdraw more than what they have in their account ()
    credit account type: canNOT withdraw more than the credit limit
  */
  async withdraw(accountNumber, amount) {
    const { raw } = require('objection');
    const {
      Account: AccountModel,
      AccountWithdrawal: AccountWithdrawalModel
    } = this.server.models();

    if(amount % 5 !== 0) {
      throw Boom.badRequest('Withdrawals should be in multiples of $5!');
    }

    if(amount > 200) {
      throw Boom.badRequest('amount exceeded trx limit ($200)');
    }

    const today = new Date().toISOString().split('T')[0];

    const userAccount = await AccountModel.query()
                                    .findById(accountNumber)
                                    .withGraphFetched('accountWithdrawals')
                                    .modifyGraph('accountWithdrawals', builder => {
                                      builder.where(raw('DATE(created_at) = ?', today));
                                    })
    const totalWithdrawalsToday = userAccount.accountWithdrawals
                                             .reduce((totalWithdrawal, {amount}) => totalWithdrawal + amount, 0)

    // if(userAccount.type !== 'credit' && totalWithdrawalsToday > 400) { if this requirement is only limited to non credit customers
    if( totalWithdrawalsToday > 400 ) { // given this limitation applies to all account types
      throw Boom.badRequest('You have exceeded your daily trx limit! ($400)'); // TODO put the limit to a constant?
    }

    // non-credit account
    if(userAccount.type !== 'credit' && amount > userAccount.amount) {
      throw Boom.badRequest('your balance is less than the requested amount')
    }

    if(userAccount.type === 'credit' && amount + Math.abs(userAccount.amount) > userAccount.credit_limit) {
      throw Boom.badRequest('requested amount exceeds your credit limit')
    }

    const updatedBalance = userAccount.amount - amount;
    return AccountModel.transaction(async (trx) => {
      await userAccount.$query(trx).patch({
        amount: updatedBalance
      })

      await AccountWithdrawalModel.query(trx).insert({
        account_number: accountNumber,
        amount,
      })

      return {
        accountNumber: userAccount.account_number,
        amount: userAccount.amount,
        type: userAccount.type,
        ...(userAccount.type === 'credit' ? {creditLimit: userAccount.credit_limit} : {})
      };
    });
  }


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
};
