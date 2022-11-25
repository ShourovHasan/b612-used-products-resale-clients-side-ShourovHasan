import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const DisplayError = () => {
    const { LogOut } = useContext(AuthContext);
    const error = useRouteError();
    const navigate = useNavigate();

    
    const handleLogOut = () => {
        LogOut()
            .then(() => {
                navigate('/login');
            })
            .catch(error => console.error(error.message))
    }
    return (
        <div className='flex flex-col items-center my-32'>
            <p className='text-red-500'>Something went wrong!!!</p>
            <p className='text-red-500'>
                {error.statusText || error.message}
            </p>
            <h4 className='text-4xl'>Please <button onClick={handleLogOut} className='text-white rounded-xl btn'>Sign Out</button> and log back in</h4>
        </div>
    );
};

export default DisplayError;