"use client"
import { ExistingUserProps, loginUser } from '@/redux/features/userSlice';
import { AppDispatch } from '@/redux/store';
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const initialState = {
  email: "",
  password: "",
} as ExistingUserProps

function LoginPage() {
  const [values, setValues] = React.useState(initialState)
  // hooks
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    const response = await dispatch(loginUser(values))
    if (response.payload && response.payload.success) {
      router.push("/")
    }
  }
  return (
    <div className='flex justify-center'>
      <form onSubmit={handleSubmit} className="w-full md:w-1/3 bg-gray-100 rounded-lg p-10 mt-5">
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5 text-center">Login</h2>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input type="email" id="email" name="email" value={values.email} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
          <input type="password" id="password" name="password" value={values.password} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="flex justify-between mb-4">
          <div className='flex flex-row gap-2'>
            <input type="checkbox" name="remember-me" id="remember-me" />
            <p>Remember me!</p>
          </div>
          <Link className='text-blue-800' href={"/forgot"}>Forgot password?</Link>
        </div>
        <button type='submit' className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-900 rounded text-lg w-full">Login</button>
        <p className="text-xs text-gray-500 mt-3">New user?, <Link className='text-blue-800' href={`/signup`}>Sign in here</Link></p>
      </form>
    </div>
  )
}

export default LoginPage