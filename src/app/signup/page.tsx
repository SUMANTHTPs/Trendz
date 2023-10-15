"use client";
import { UserProps, loginUser, signUpUser } from '@/redux/features/userSlice';
import { AppDispatch } from '@/redux/store';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const initialState = {
  name: "",
  email: "",
  password: "",
} as UserProps;

function SignInPage() {
  const [values, setValues] = React.useState(initialState)
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { name, email, password } = values;
    if (!email || !password || !name) {
      toast.error("Please fill all the fields");
      return;
    }
    const signInResponse = await dispatch(signUpUser(values));
    if (signInResponse.payload && signInResponse.payload.success) {
      const loginResponse = await dispatch(loginUser({ email: email, password: password }))
      if (loginResponse.payload && loginResponse.payload.success) {
        router.push("/")
      }
    }
  }
  return (
    <div className='flex justify-center'>
      <form onSubmit={handleSubmit} className="w-full md:w-1/3 bg-gray-100 rounded-lg p-10 mt-5">
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5 text-center">Sign in</h2>
        <div className="relative mb-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Full Name</label>
          <input type="text" id="name" name="name" value={values.name} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input type="email" id="email" name="email" value={values.email} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
          <input type="password" id="password" name="password" value={values.password} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <button type='submit' className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-900 rounded text-lg w-full">Sign in</button>
        <p className="text-xs text-gray-500 mt-3">Existing user?, <Link className='text-blue-800' href={`/login`}>Login in here</Link></p>
      </form>
    </div>
  )
}

export default SignInPage