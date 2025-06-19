"use client"

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from "next-auth/react";
import { FcGoogle } from 'react-icons/fc';
import { HiMiniEye, HiEyeSlash } from "react-icons/hi2";
import { ImSpinner3 } from "react-icons/im";
import Link from 'next/link';
import { toast } from 'react-toastify';


const Login = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await signIn("credentials", {
            ...form,
            redirect: false,
            callbackUrl,
        });
        
        setLoading(false);

        if (res.ok) {
            toast.success("Login successful");
            router.push("/"); // Adjust based on user.role if needed
        } else {
            toast.error(res.error || "Login failed");
        }

    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col rounded-md shadow-lg border border-gray-200 lg:w-[30%] px-6 lg:px-10 border-t-4 border-t-[#4081ec]'>
                <h4 className='mt-4 pb-1 text-2xl lg:text-4xl font-semibold px-4 text-center' style={{ textShadow: '3px 3px 5px rgba(0, 0, 0, 0.4)' }}>Please  Login</h4>
                <p className='md:text-base text-sm text-center text-[#5a6573]'>You need to Login first to continue</p>
                <button
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className='flex justify-center items-center space-x-2 border p-2 border-gray-300 border-rounded rounded-md cursor-pointer bg-[#4081ec] text-white mt-3'
                >
                    <FcGoogle className='bg-white rounded-full' size={32} />
                    <p className='text-center'>Login with Google</p>
                </button>
                <div className="divider mb-0 lg:pt-4">Or Login with</div>

                <form
                    onSubmit={handleLogin}
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
                                placeholder='Your email address'
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className='w-full px-3 py-3 rounded-md border border-gray-300 focus:outline-[#4081ec] bg-base-200 text-gray-900'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor='password' className='label'>
                                <span className='inputLabel'>Password</span>
                            </label>
                            <div className="relative flex justify-items-start items-center">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Your password'
                                    name="password"
                                    id='password'
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className='w-full px-2 py-3  bg-base-200 rounded-md border border-gray-300 focus:outline-[#4081ec]'
                                    required
                                />
                                {/* button for show input password */}
                                <button
                                    type="button"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                            disabled={loading}
                            className={`flex justify-center items-center space-x-2 border p-3 border-gray-300 border-rounded rounded-md cursor-pointer w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#4081ec]'} text-white`}
                        >
                            {loading ? (
                                <>
                                    <ImSpinner3 className='animate-spin' size={24} />
                                    <span>Login...</span>
                                </>
                            ) : (
                                'Login'
                            )}
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