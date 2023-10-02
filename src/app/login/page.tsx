import Link from 'next/link'
import React from 'react'

function LoginPage() {
  return (
    <div className='flex justify-center'>
      <div className="w-full md:w-1/3 bg-gray-100 rounded-lg p-10 mt-5">
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5 text-center">Login</h2>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
          <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="flex justify-between mb-4">
          <div className='flex flex-row gap-2'>
            <input type="checkbox" name="remember-me" id="remember-me" />
            <p>Remember me!</p>
          </div>
          <Link className='text-blue-800' href={"/forgot"}>Forgot password?</Link>
        </div>
        <button className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-900 rounded text-lg w-full">Login</button>
        <p className="text-xs text-gray-500 mt-3">New user?, <Link className='text-blue-800' href={`/signup`}>Sign in here</Link></p>
      </div>
    </div>
  )
}

export default LoginPage