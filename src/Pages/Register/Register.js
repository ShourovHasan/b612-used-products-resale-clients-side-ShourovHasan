import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';
import Lottie from "lottie-react";
import lottieLogin from '../../../src/asssets/login_register.json';

const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, googleSignIn, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');

    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const handleRegister = data => {
        const { email, password, displayName, userType } = data;
        // console.log(data);
        setSignUpError('');
        handleSignUp(email, password, displayName, userType);
    }

    const handleSignUp = (email, password, displayName, userType) => {
        createUser(email, password)
            .then(result => {
                // const user = result.user;
                toast.success('User Created Successfully');
                const userInfo = {
                    displayName: displayName
                }
                handleUpdateUser(userInfo, email, userType);
                // console.log(user);

            })
            .catch(error => {
                setSignUpError(error.message);
            })
    }
    const handleUpdateUser = (userInfo, email, userType) => {
        updateUser(userInfo)
            .then(() => {
                // console.log('Update user');
                saveUser(userInfo.displayName, email, userType)
            })
            .catch(error => {
                setSignUpError(error.message);
            })
    }

    const saveUser = (displayName, email, userType) => {
        const user = { displayName, email, userType };
        // console.log(user);
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setCreatedUserEmail(email);
                    toast.error(data.message);
                    return toast.success('User Login Successfully');
                }
                setCreatedUserEmail(email);
                toast.success('User Created Successfully');
                // getUserToken(email)
                // console.log('Save user', data);
            })
    }
    const handleSignInWithGoogle = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                // console.log(user);
                const userType = {
                    userType: 'buyer'
                }
                
                saveUser(user.displayName, user.email, userType.userType);
                // navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error.message);
                setSignUpError(error.message);
            })
    }
    if (token) {
        navigate(from, { replace: true });
    }
    return (
        <div className="my-5 hero h-[800px]">
            <div className="flex-col gap-20 hero-content lg:flex-row">
                <div className="w-1/2 text-center lg:text-left">
                    <Lottie loop={true} animationData={lottieLogin} />
                </div>
                <div className='px-5 rounded-lg shadow-xl shadow-neutral py-7 w-[385px]'>
                    <h2 className='mb-5 text-xl text-center'>Sign Up</h2>
                    <form onSubmit={handleSubmit(handleRegister)} className=''>
                        {/* <Header /> */}
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("displayName", {
                                required: "full name is required"
                            })} type="text" placeholder="full name" className="w-full input input-bordered" />
                            {errors.displayName && <p className='ml-4 text-red-500'>{errors.displayName.message}</p>}
                        </div>
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input  {...register("email", {
                                required: "email address is required"
                            })} type="email" placeholder="email" className="w-full input input-bordered" />
                            {errors.email && <p role="alert" className='ml-4 text-red-600'>{errors.email?.message}</p>}
                        </div>
                        <div className="w-full mt-2 form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input  {...register("password", {
                                required: "password is required",
                                minLength: { value: 6, message: 'password at least 6 characters' },
                                maxLength: 20,
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: 'password must have Uppercase, lowercase, number and Special characters' }
                            })} type="password" placeholder="password" className="w-full input input-bordered " />
                            {errors.password && <p role="alert" className='ml-4 text-red-600'>{errors.password?.message}</p>}
                        </div>
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">User Type</span>
                            </label>
                            <select {...register("userType")} className="w-full select input-bordered">
                                <option defaultValue='buyer'>buyer</option>
                                <option defaultValue='seller'>seller</option>
                            </select>
                        </div>
                        <input type="submit" className='w-full pb-0 mt-5 mb-0 text-white btn bg-gradient-to-r from-secondary to-primary' defaultValue='Sign Up' />
                        <div>
                            {
                                signUpError &&
                                <p className='ml-4 text-red-500'>{signUpError}</p>
                            }
                        </div>
                    </form>
                    <div className="flex flex-col w-full border-opacity-50">
                        <div className="grid w-full h-20 py-0 my-0 card rounded-box place-items-center"><p>Already have an account? <Link to='/login' className='text-primary'>Please Login</Link></p>
                        </div>
                        <div className="py-0 my-0 divider">OR</div>
                        <div className="grid h-20 py-0 my-0 card rounded-box place-items-center"><button onClick={handleSignInWithGoogle} className='w-full btn btn-outline'>CONTINUE WITH GOOGLE</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;