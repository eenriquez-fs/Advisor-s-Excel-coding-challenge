'use client'
import { useRef, Suspense } from "react";
import { useSearchParams, usePathname, useRouter, notFound } from 'next/navigation'
import Image from 'next/image';
import {
  CreditCard
} from 'react-feather'


export default function Home() {
  //get search params
  const router = useRouter()
  const searchParams = useSearchParams()

  const pathname = usePathname();
  // const orgId = searchParams.get('orgId')

  const accountNumberRef = useRef(null);

  const handleSubmitAccount = () => {
    const accountNumber = accountNumberRef.current.value;
    if(accountNumber.length) {
      router.push(`/main?accountNumber=${accountNumber}`) //TODO: use nextjs way
    }
  }


  return (
    <div className="flex flex-wrap justify-start pt-4">
      <div className="flex-row w-full pt-8 border-4 border-sky-500 rounded-md bg-sky-700 text-slate-900 p-8">
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-6">
            <h1 className="font-bold text-4xl uppercase text-center text-slate-300">Enter your account number</h1>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="number"
                ref={accountNumberRef}
                name="account-number"
                id="account-number"
                className="block w-full h-16 text-3xl rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                placeholder=""
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <CreditCard className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-5 h-12 w-1/2">
              <button
                  type="submit"
                  onClick={handleSubmitAccount}
                  className="flex w-full items-center justify-center rounded-md h-12  bg-cyan-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                CONFIRM
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-4 ">
            <Image width="400" height="450" src="/card.png" className="m-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}
