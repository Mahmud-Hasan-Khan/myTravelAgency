// import React from 'react';
// import { useState } from 'react';
// import { ImSpinner3 } from 'react-icons/im';
// import { HiMiniEye, HiEyeSlash } from "react-icons/hi2";
// import { toast } from 'react-toastify';

// const RegisterForm = () => {

//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const isStrongPassword = (password) => {
//         const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
//         return regex.test(password);
//     };

//     const handleRegisterWithEmailAndPassword = async (e) => {
//         e.preventDefault();

//         const form = e.target;
//         const name = form.name.value;
//         const email = form.email.value;
//         const password = form.password.value;
//         const role = 'user';
//         const status = "unblocked"
//         // console.log({name, email, password, role});

//         // Password validation
//         if (!isStrongPassword(password)) {
//             toast.error('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
//             return;
//         }

//         setLoading(true);

//         try {
//             const res = await fetch('/api/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ name, email, password, role, status }),
//             });
//             const data = await res.json();

//             if (!res.ok) throw new Error(data.message);
//             toast.success('Registration successful!');
//             form.reset();
//         } catch (error) {
//             toast.error('Error: ' + error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form
//             onSubmit={handleRegisterWithEmailAndPassword}
//             className='space-y-6'
//         >
//             <div className='md:space-y-4 mt-4'>
//                 <div>
//                     <label className="label">
//                         <span className="inputLabel">Name</span>
//                     </label>
//                     <input
//                         type='text'
//                         name="name"
//                         id='name'
//                         required
//                         placeholder='Your Full Name'
//                         className='w-full px-3 py-3 rounded-md border border-gray-300 focus:outline-[#4081ec] bg-base-200 text-gray-900'
//                     />
//                 </div>
//                 <div>
//                     <label className="label">
//                         <span className="inputLabel">Email</span>
//                     </label>
//                     <input
//                         type='email'
//                         name="email"
//                         id='email'
//                         required
//                         placeholder='Your email address'
//                         className='w-full px-3 py-3 rounded-md border border-gray-300 focus:outline-[#4081ec] bg-base-200 text-gray-900'
//                     />
//                 </div>

//                 {/* Mobile number input field */}


//                 <div>
//                     <label htmlFor='password' className='label'>
//                         <span className='inputLabel;'>Password</span>
//                     </label>
//                     <div className="relative flex justify-items-start items-center">
//                         <input
//                             type={showPassword ? 'text' : 'password'}
//                             placeholder='Your password'
//                             name="password"
//                             id='password'
//                             required
//                             className='w-full px-2 py-3  bg-base-200 rounded-md border border-gray-300 focus:outline-[#4081ec]'
//                         />
//                         <button
//                             type="button"
//                             aria-label={showPassword ? "Hide password" : "Show password"}
//                             className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? (
//                                 <HiEyeSlash className="text-2xl"></HiEyeSlash>
//                             ) : (
//                                 <HiMiniEye className="text-2xl"></HiMiniEye>
//                             )}
//                         </button>
//                     </div>
//                 </div>

//             </div>

//             <div>
//                 <button
//                     type='submit'
//                     disabled={loading}
//                     className={`flex justify-center items-center space-x-2 border p-3 rounded-md w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#4081ec]'
//                         } text-white`}
//                 >
//                     {loading ? (
//                         <>
//                             <ImSpinner3 className="animate-spin" size={20} />
//                             <span>Registering...</span>
//                         </>
//                     ) : (
//                         'Register'
//                     )}
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default RegisterForm;


import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ImSpinner3 } from 'react-icons/im';
import { HiMiniEye, HiEyeSlash } from "react-icons/hi2";
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState('');

    const isStrongPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    };

    const handleRegisterWithEmailAndPassword = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const role = 'user';
        const status = 'unblocked';

        // Validation
        if (!phone) {
            toast.error('Phone number is required.');
            return;
        }

        if (!isStrongPassword(password)) {
            toast.error('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, password, role, status }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            toast.success('Registration successful!');
            form.reset();
            setPhone('');
        } catch (error) {
            toast.error('Error: ' + error.message);
        } finally {
            setLoading(false);
            redirect('/login')
        }
    };

    return (
        <form onSubmit={handleRegisterWithEmailAndPassword} className='space-y-6'>
            <div className='md:space-y-0 mt-0'>
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
                    <label className="label">
                        <span className="inputLabel">Phone</span>
                    </label>
                    <PhoneInput
                        country={'bd'}
                        value={phone}
                        onChange={(value) => { setPhone('+' + value) }}
                        inputClass="w-full px-3 py-[24px] !rounded-md !bg-base-200 !border !border-gray-300"
                        containerClass="!w-full focus-within:!outline-[#4081ec] focus-within:!border-[#4081ec] focus-within:!ring-1 focus-within:!ring-[#4081ec] !rounded-md overflow-hidden"
                        inputStyle={{ width: '100%' }}
                        enableSearch={true}
                        placeholder="Your mobile number"
                        inputProps={{
                            name: 'phone',
                            required: true,
                        }}
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
                            required
                            className='w-full px-2 py-3 bg-base-200 rounded-md border border-gray-300 focus:outline-[#4081ec]'
                        />
                        <button
                            type="button"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <HiEyeSlash className="text-2xl" />
                            ) : (
                                <HiMiniEye className="text-2xl" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <button
                    type='submit'
                    disabled={loading}
                    className={`flex justify-center items-center space-x-2 border p-3 rounded-md w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#4081ec]'
                        } text-white`}
                >
                    {loading ? (
                        <>
                            <ImSpinner3 className="animate-spin" size={20} />
                            <span>Registering...</span>
                        </>
                    ) : (
                        'Register'
                    )}
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;
