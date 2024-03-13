import AnimatedLogo from '@/components/AnimatedLogo'
import React from 'react'

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-24 lg:px-8">
      <AnimatedLogo width={250} height={250}
      />
      <div className="mx-auto mt-10 max-w-2xl text-center sm:mt-20">
        <p className="text-base font-semibold leading-8 text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-appTheme-light sm:text-5xl">This page does not exist</h1>
        <p className="mt-4 leading-7 text-gray-500 sm:mt-6 sm:text-lg sm:leading-8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
      </div>
      <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-10">
        <div className="mt-2 flex justify-center">
          <a href="/" className="text-base font-semibold leading-6 text-soundplay-dark">
            <span aria-hidden="true">&larr; &nbsp;</span>
            Back to home
          </a>
        </div>
      </div>
    </div>
  )
}
