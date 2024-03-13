import { useState, useEffect } from 'react';
import { getAccountDetails, depositAmount, withdrawAmount } from '@/services/accounts';

const useAccount = (accountNumber) => {
  const [accountData, setAccountData] = useState({});
  const [confirmationError, setConfirmationError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAccountDetails = async () => {
      try {
        const result = await getAccountDetails(Number(accountNumber));
        if (isMounted) {
          setAccountData(result);
        }
      } catch (error) {
        console.error('Error fetching account details:', error.response.data);
        alert(error.response.data.message);
        router.push(`/`);
      }
    };

    fetchAccountDetails();

    return () => {
      isMounted = false;
    };
  }, [accountNumber]);

  const handleDeposit = async (amount) => {
    try {
      console.log('handle confirm')
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      await depositAmount(accountNumber, amount);

      alert('you have successfully deposited', amount)
      // Call your API here with the amount
      // Example: await api.post('/confirmTransaction', { amount: Number(amountValue) });

      // Update state or perform other actions after a successful API call

      setConfirmationError(null); // Reset error state
    } catch (error) {
      console.log('ERROR MSG', error.response.data.message);
      alert(error.response.data.message);
      setConfirmationError("Error confirming transaction. Please try again.");
    }
  };

  const handleWithdraw = async (amount) => {
    try {
      console.log('handle confirm')
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      await withdrawAmount(accountNumber, amount);

      alert(`you have successfully withdrawn, ${amount}`)

      setConfirmationError(null); // Reset error state
    } catch (error) {
      console.log('ERROR MSG', error.response.data.message);
      alert(error.response.data.message);
      setConfirmationError("Error confirming transaction. Please try again.");
    }
  };

  return {
    accountData,
    confirmationError,
    handleDeposit,
    handleWithdraw
  };
};

export default useAccount;