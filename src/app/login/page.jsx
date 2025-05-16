"use client"

import React from 'react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiMiniEye, HiEyeSlash } from "react-icons/hi2";
import Link from 'next/link';

const Login = () => {

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleLoginWithEmailAndPassword = (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
    }


    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col rounded-md shadow-lg border border-gray-200 lg:w-[30%] px-6 lg:px-10 border-t-4 border-t-[#4081ec]'>
                <h4 className='mt-4 pb-1 text-2xl lg:text-4xl font-semibold px-4 text-center' style={{ textShadow: '3px 3px 5px rgba(0, 0, 0, 0.4)' }}>Please  Login</h4>
                <p className='md:text-base text-sm text-center text-[#5a6573]'>You need to Login first to continue</p>
                <div
                    className='flex justify-center items-center space-x-2 border p-2 border-gray-300 border-rounded rounded-md cursor-pointer bg-[#4081ec] text-white mt-3'
                >
                    <FcGoogle className='bg-white rounded-full' size={32} />
                    <p className='text-center'>Login with Google</p>
                </div>
                <div className="divider mb-0 lg:pt-4">Or Login with</div>

                <form
                    onSubmit={handleLoginWithEmailAndPassword}
                    noValidate=''
                    action=''
                    className='space-y-6'
                >
                    <div className='md:space-y-4 mt-4'>
                        <div>
                            <label className="label">
                                <span className="inputLabel">Email</span>
                            </label>
                            <input
                                type='email'
                                name="email"
                                id='email'
                                required
                                placeholder='Your email address'
                                className='w-full px-3 py-3 rounded-md border border-gray-300 focus:outline-[#4081ec] bg-base-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>

                        <div>
                            <label htmlFor='password' className='label'>
                                <span className='inputLabel;'>Password</span>
                            </label>
                            <div className="relative flex justify-items-start items-center">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Your password'
                                    name="password"
                                    id='password'
                                    required
                                    className='w-full px-2 py-3  bg-base-200 rounded-md border border-gray-300 focus:outline-[#4081ec]'
                                />
                                <button
                                    type="button"
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <HiEyeSlash className="text-2xl"></HiEyeSlash>
                                    ) : (
                                        <HiMiniEye className="text-2xl"></HiMiniEye>
                                    )}
                                </button>
                            </div>
                        </div>

                    </div>

                    <div>
                        <button
                            type='submit'
                            className='flex justify-center items-center space-x-2 border p-3 border-gray-300 border-rounded rounded-md cursor-pointer bg-[#4081ec] text-white w-full'
                        >
                            Login
                            {/* {loading ? (
                                    <ImSpinner3 className='m-auto animate-spin' size={24} />
                                ) : (
                                    'Continue'
                                )} */}
                        </button>
                    </div>
                </form>
                <p className='py-3 text-sm font-medium text-center mb-4 text-red-500'>
                    Don't have an account yet?
                    <Link href={'/register'}
                        className='text-[#4081ec] hover:underline font-semibold ml-1'
                    >
                        Register now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;