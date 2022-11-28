import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { useForm } from "react-hook-form";
import useToken from '../../hooks/useToken';
import Lottie from "lottie-react";
import lottieLogin from '../../../src/asssets/login_register.json';
import useTitle from '../../hooks/useTitle';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signInWithPassword, googleSignIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);

    useTitle('Login');

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    // sign in with email and password 
    const handleLogin = data => {
        const { email, password } = data;
        // console.log(data);
        // console.log(errors);
        setLoginError('');

        handleSignInWithPassword(email, password);

    }

    const handleSignInWithPassword = (email, password) => {
        signInWithPassword(email, password)
            .then(result => {
                // const user = result.user;
                // console.log(user);
                setLoginUserEmail(email);
                toast.success('Login Successful');
            })
            .catch(error => {
                // console.error(error.message);
                setLoginError(error.message);
            })
    }
    // sign in with google 
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                // console.log(user);
                const userType = {
                    userType: 'buyer'
                }
                saveUser(user.displayName, user.email, userType.userType)
            })
            .catch(error => {
                // console.error(error.message);
                setLoginError(error.message);
            })
    }
    const saveUser = (displayName, email, userType) => {
        const user = { displayName, email, userType };
        // console.log(user);
        fetch('https://b612-used-products-resale-server-side-shourovhasan.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setLoginUserEmail(email);
                    // toast.error(data.message);
                    return toast.success('User Login Successfully');
                }
                setLoginUserEmail(email);
                toast.success('Login Successful');
                // navigate(from, { replace: true });
                // getUserToken(email)
                // console.log('Save user', data);
            })
    }
    if (token) {
        navigate(from, { replace: true });
    }
    return (
        <div className="mb-5 hero h-[800px]">
            <div className="flex-col gap-20 hero-content lg:flex-row">
                <div className="w-1/3 text-center lg:text-left">
                    <Lottie loop={true} animationData={lottieLogin} />
                </div>
                <div className="px-5 rounded-lg shadow-xl shadow-neutral py-7 w-[385px]">
                    <h2 className='mb-5 text-xl text-center'>Login</h2>
                    <form onSubmit={handleSubmit(handleLogin)} className=''>
                        {/* <Header /> */}
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email", {
                                required: "Email address is required"
                            })} type="email" placeholder="email" className="w-full input input-bordered" />
                            {errors.email && <p role="alert" className='ml-4 text-red-500'>{errors.email?.message}</p>}
                        </div>
                        <div className="w-full mt-2 form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password at least 6 characters' },
                                maxLength: 20
                            })} type="password" placeholder="password" className="w-full input input-bordered " />
                            {errors.password && <p role="alert" className='ml-4 text-red-500'>{errors.password?.message}</p>}
                            <label className="label">
                                <Link to='/reset' className="label-text">Forget Password?</Link>
                            </label>
                        </div>
                        <input type="submit" className='w-full pb-0 mt-5 mb-0 text-white btn bg-gradient-to-r from-secondary to-primary' value='Login' />
                        <div>
                            {loginError && <p className='ml-4 text-red-500'>{loginError}</p>}
                        </div>
                    </form>
                    <div className="flex flex-col w-full border-opacity-50">
                        <div className="grid w-full h-20 py-0 my-0 card rounded-box place-items-center"><p>New to this Store? <Link to='/register' className='text-primary'>Create new Account</Link></p>
                        </div>
                        <div className="py-0 my-0 divider">OR</div>
                        <div className="grid h-20 py-0 my-0 card rounded-box place-items-center">
                            <button onClick={handleGoogleSignIn} className='w-full btn btn-outline'>CONTINUE WITH GOOGLE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;