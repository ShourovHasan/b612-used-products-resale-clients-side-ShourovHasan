import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, googleSignIn, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');

    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if (token) {
        // navigate('/');
        navigate(from, { replace: true });
    }

    const handleRegister = data => {
        const { email, password, displayName, userType } = data;
        console.log(data);
        setSignUpError('');
        handleSignUp(email, password, displayName, userType);
    }

    const handleSignUp = (email, password, displayName, userType) => {
        createUser(email, password)
            .then(result => {
                const user = result.user;
                // toast.success('User Created Successfully');
                const userInfo = {
                    displayName: displayName
                }
                handleUpdateUser(userInfo, email, userType);
                console.log(user);

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
        console.log(user);
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
    return (
        <div className='h-[800px] flex justify-center items-center flex-col'>
            

        </div>
    );
};

export default Register;