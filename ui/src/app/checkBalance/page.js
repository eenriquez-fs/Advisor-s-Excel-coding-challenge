'use client';
import {  useRouter, redirect } from 'next/navigation';
import useAccount from '@/hooks/useAccount';
import AtmActions from '@/components/AtmActions';

//tried using getInitalProps and server rendering (failed) :(

export default function CheckBalance({searchParams}) {
  const accountNumber = searchParams.accountNumber;
  const router = useRouter();

  const { accountData } = useAccount(accountNumber);

  // TODO: checking if param is numeric

  if(!accountNumber?.length || isNaN(Number(accountNumber))) {
    redirect(`/`)
  }

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
          <h2 className='font-semibold text-lg'>ACCOUNT DETAILS: {accountData.accountNumber} </h2>
          <h2 className='font-semibold text-lg'>ACCOUNT BALANCE: ${getFormattedAmount()} </h2>
        </div>
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
