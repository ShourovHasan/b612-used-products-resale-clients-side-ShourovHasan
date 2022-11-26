import { useQuery } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../SharedPages/Loading/Loading';

const AddProduct = () => {
    
    return (
        <div className='px-5 rounded-lg shadow-lg shadow-neutral py-7 w-[385px] mx-auto my-5 lg:w-[800px]'>
            <h2 className='text-4xl text-center text-primary'>Add A Product</h2>
            
        </div>
    );
};

export default AddProduct;