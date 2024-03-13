'use client';
import {  useRouter, redirect } from 'next/navigation';
import { useRef } from 'react';
import { GiPayMoney } from 'react-icons/gi';
import useAccount from '@/hooks/useAccount';
import AtmActions from '@/components/AtmActions';

//tried using getInitalProps and server rendering (failed) :(

export default function Deposit({searchParams}) {
  const accountNumber = searchParams.accountNumber;
  const router = useRouter();

  const { accountData, handleWithdraw } = useAccount(accountNumber);


  if(!accountNumber?.length || isNaN(Number(accountNumber))) {
    redirect(`/`)
  }

  // states
  const amountRef = useRef(null);

  const getFormattedAmount = () => {
    const formattedAmount = accountData?.amount?.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return formattedAmount
  }


  return (
    <main className=''>
      <div className="flex flex-wrap justify-start pt-4">
        <div className="flex-row w-full pt-8 border-4 border-sky-500 rounded-md bg-sky-700 text-slate-900 p-8 text-center">
          <h2 className='font-semibold text-lg'> WITHDRAW AMOUNT </h2>
        </div>
        <div className="flex-row w-full pt-8 border-4 border-sky-500 rounded-md bg-sky-700 text-slate-900 p-8">
          <div className="grid grid-cols-10 gap-4">
            <div className="col-span-6">
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="number"
                  ref={amountRef}
                  name="amount"
                  id="amount"
                  className="block w-full h-16 text-3xl rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                  placeholder="enter amount"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <GiPayMoney className="h-14 w-14 text-gray-400" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-5 h-12 w-1/2 mb-5">
                <button
                    type="button"
                    onClick={() => handleWithdraw(amountRef.current.value)}
                    className="flex w-full items-center justify-center rounded-md h-12  bg-cyan-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                  CONFIRM
                </button>
              </div>
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
