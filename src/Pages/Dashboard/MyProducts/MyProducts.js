import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import DeleteConfirmationModal from '../../SharedPages/DeleteConfirmationModal/DeleteConfirmationModal';
import Loading from '../../SharedPages/Loading/Loading';

const MyProducts = () => {
    
    return (
        <div>
            <h2 className="mb-4 text-3xl">My Products</h2>
            
        </div>
    );
};

export default MyProducts;