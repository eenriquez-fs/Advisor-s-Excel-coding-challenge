'use client';
import {  useRouter, redirect } from 'next/navigation';
import { getAccountDetails } from '@/services/accounts';
import { useEffect, useState } from 'react';
import AtmActions from '@/components/AtmActions';

//TODO: migrate fetch to getInitialProps

export default function Dashboard({searchParams}) {
  const accountNumber = searchParams.accountNumber;
  const router = useRouter();

  // TODO: checking if param is numeric

  if(!accountNumber?.length || isNaN(Number(accountNumber))) {
    redirect(`/`)
  }

  // states
  const [accountData, setAccountData] = useState({});

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is mounted

    const fetchAccountDetails = async () => {
      try {
        const result = await getAccountDetails(Number(accountNumber)); // Replace '123' with the actual account number

        // Check if the component is still mounted before updating state
        if (isMounted) {
          setAccountData(result);
        }
      } catch (error) {
        alert(error.response.data.message);
        router.push(`/`);
        // Handle error as needed
      }
    };

    fetchAccountDetails();

    // Cleanup function to set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }, []);



  return (
    <main className=''>
      <div className="flex flex-wrap justify-start pt-4">
        <div className="flex-row w-full pt-8 border-4 border-sky-500 rounded-md bg-sky-700 text-slate-900 p-8">
          <div className="grid grid-cols-10 gap-4">
            <div className="col-span-6">
              <AtmActions accountNumber={accountNumber} />
            </div>

            {/* Right Column */}
            <div className="col-span-4 ">
              <div className="flex flex-1 flex-col p-8 gap-12">
                <div>
                  <h1 className="font-bold text-xl uppercase text-center text-slate-300">Welcome {accountData.name}!</h1>
                </div>
                <button
                    type="button"
                    onClick={() => router.push('/')}
                    className="flex w-full items-center justify-center rounded-md h-12 text-xl bg-cyan-950 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {accountNumber}
    </main>
  )
}
