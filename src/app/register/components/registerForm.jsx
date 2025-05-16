import React from 'react';
import { useState } from 'react';
import { HiMiniEye, HiEyeSlash } from "react-icons/hi2";

const RegisterForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleRegisterWithEmailAndPassword = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const role = 'user';
        // console.log({name, email, password, role});

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message);
            alert('Registration successful!');
            form.reset();
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <form
            onSubmit={handleRegisterWithEmailAndPassword}
            className='space-y-6'
        >
            <div className='md:space-y-4 mt-4'>
                <div>
                    <label className="label">
                        <span className="inputLabel">Name</span>
                    </label>
                    <input
                        type='text'
                        name="name"
                        id='name'
                        required
                        placeholder='Your Full Name'
                        className='w-full px-3 py-3 rounded-md border border-gray-300 focus:outline-[#4081ec] bg-base-200 text-gray-900'
                    />
                </div>
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
                    Register
                    {/* {loading ? (
                                    <ImSpinner3 className='m-auto animate-spin' size={24} />
                                ) : (
                                    'Continue'
                                )} */}
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;