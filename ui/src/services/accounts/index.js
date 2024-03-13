import api from '../api';
import fp from 'lodash/fp';


const accountsApi = api('/accounts');

export const getAccountDetails = async (accountNumber = null) => {

  const accountDetails = await accountsApi.get(`${accountNumber}/checkBalance`, );
  return fp.flow(fp.getOr({}, 'data'))(accountDetails);
};

export const depositAmount = async (accountNumber = null, amount) => {

  const response = await accountsApi.post(`deposit`, {
    accountNumber,
    amount
  });
  return fp.flow(fp.getOr({}, 'data'))(response);
};

export const withdrawAmount = async (accountNumber = null, amount) => {

  const response = await accountsApi.post(`withdraw`, {
    accountNumber,
    amount
  });
  return fp.flow(fp.getOr({}, 'data'))(response);
};

