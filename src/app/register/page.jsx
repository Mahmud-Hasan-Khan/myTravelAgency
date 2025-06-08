"use client"

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import RegisterForm from './components/registerForm';

const Register = () => {

    return (
        <div className='flex items-center justify-center md:h-screen'>
            <div className='flex flex-col rounded-md shadow-lg border border-gray-200 lg:w-[30%] px-6 lg:px-10 border-t-4 border-t-[#4081ec]'>
                <h4 className='mt-4 pb-1 text-2xl lg:text-4xl font-semibold px-4 text-center' style={{ textShadow: '3px 3px 5px rgba(0, 0, 0, 0.4)' }}>Register now</h4>
                <p className='md:text-base text-sm text-center text-[#5a6573]'>You need to Login first to continue</p>
                <div
                    className='flex justify-center items-center space-x-2 border p-2 border-gray-300 border-rounded rounded-md cursor-pointer bg-[#4081ec] text-white mt-3'
                >
                    <FcGoogle className='bg-white rounded-full' size={32} />
                    <p className='text-center'>Login with Google</p>
                </div>
                <div className="divider mb-0 lg:pt-4">Or Create account with</div>
                <RegisterForm></RegisterForm>
                <p className='py-3 text-sm font-medium text-center mb-4 text-red-500'>
                    Already have an account.
                    <Link href={'/login'}
                        className='text-[#4081ec] hover:underline font-semibold ml-1'
                    >
                        Login now!
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;