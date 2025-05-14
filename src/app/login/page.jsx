"use client"
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';

import { ImSpinner3 } from "react-icons/im";
import { HiMiniEye, HiEyeSlash } from "react-icons/hi2";
import Link from 'next/link';
import { Typewriter } from 'react-simple-typewriter';


const Login = () => {

    // const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        const errs = {};
        if (!email) errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Invalid email format";

        if (!password) errs.password = "Password is required";
        else if (password.length < 6) errs.password = "Minimum 6 characters";

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    return (
        <div>
            <div className='flex justify-center items-center my-2 lg:my-10'>
                <div className='flex flex-col rounded-md sm:px-10 shadow px-4 border border-[#00d260]' data-aos="fade-up">
                    <h4 className='mt-4 pb-1 text-2xl lg:text-4xl font-semibold px-4 text-center' style={{ textShadow: '3px 3px 5px rgba(0, 0, 0, 0.4)' }}>Please  Login</h4>
                    <p className='md:text-base text-sm text-center text-[#5a6573]'>You need to Login first to continue</p>

                    <form
                        // onSubmit={handleLoginWithEmailAndPassword}
                        noValidate=''
                        action=''
                        className='space-y-6'
                    >
                        <div className='space-y-4'>
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
                                    className='w-full px-3 py-3 border rounded-md border-gray-300 focus:outline-[#00d260] bg-base-200 text-gray-900'
                                    data-temp-mail-org='0'
                                />
                            </div>

                            <div>
                                <label htmlFor='password' className='inputLabel'>
                                    Password
                                </label>
                                <div className="relative input border rounded-md border-gray-300 flex justify-items-start bg-base-200 items-center">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='Your password'
                                        name="password"
                                        id='password'
                                        required
                                        className='w-full px-0 py-2 focus:outline-[#00d260] bg-base-200'
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
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
                                className='flex justify-center items-center space-x-2 border p-2 border-gray-300 border-rounded rounded-md cursor-pointer bg-[#4081ec] text-white w-full'
                            >
                                {/* {loading ? (
                                    <ImSpinner3 className='m-auto animate-spin' size={24} />
                                ) : (
                                    'Continue'
                                )} */}
                            </button>
                        </div>
                    </form>
                    <p className='px-6 mt-2 text-sm font-medium text-center'>
                        Do not have an account yet?
                        {/* <Link
                            to='/registration'
                            className='text-[#00d260] hover:underline font-semibold ml-1'
                        >
                            Register Now
                        </Link> */}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;