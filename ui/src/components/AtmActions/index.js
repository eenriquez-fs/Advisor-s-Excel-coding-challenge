import Link from 'next/link';
import Image from 'next/image';

export default function AtmActions({ accountNumber }) {
  return (
    <ul role="list" className="w-full grid grid-cols-3 gap-6 ">
      <Link href={`/checkBalance?accountNumber=${accountNumber}`} className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow hover:cursor-pointer hover:opacity-80" >
        <li
          key={1}
        >
          <div className="flex flex-1 flex-col p-8">
          <Image className="mx-auto h-64 w-42 flex-shrink-0" width="480" height="370" src="/checkbalance.png" alt="" />
            <h3 className="mt-6 text-xl font-semibold text-gray-900">BALANCE CHECK</h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">

            </dl>
          </div>
        </li>
      </Link>

      <Link href={`/deposit?accountNumber=${accountNumber}`} className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow hover:cursor-pointer hover:opacity-80" >
        <li
          key={2}
        >
          <div className="flex flex-1 flex-col p-8">
          <Image className="mx-auto h-64 w-42 flex-shrink-0" width="480" height="370" src="/deposit.png" alt="" />
            <h3 className="mt-6 text-xl font-semibold text-gray-900">DEPOSIT</h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">

            </dl>
          </div>
        </li>
      </Link>
      <Link href={`/withdraw?accountNumber=${accountNumber}`} className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow hover:cursor-pointer hover:opacity-80" >
        <li
          key={3}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow hover:cursor-pointer hover:opacity-80"
        >
          <div className="flex flex-1 flex-col p-8">
            <Image className="mx-auto h-64 w-42 flex-shrink-0" width="480" height="370" src="/withdraw.png" alt="" />
            <h3 className="mt-6 text-xl font-semibold text-gray-900">WITHDRAW</h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">

            </dl>
          </div>
        </li>
      </Link>
    </ul>
  )
}