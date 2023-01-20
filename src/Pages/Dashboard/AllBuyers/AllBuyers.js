import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../../hooks/useTitle';
import DeleteConfirmationModal from '../../SharedPages/DeleteConfirmationModal/DeleteConfirmationModal';
import Loading from '../../SharedPages/Loading/Loading';

const AllBuyers = () => {
    const [deleteBuyer, setDeleteBuyer] = useState(null);
    const closeModal = () => {
        setDeleteBuyer(null);
    }

    useTitle('All Buyers');

    const url = `https://b612-used-products-resale-server-side-shourovhasan.vercel.app/users/buyers`;
    const { data: buyers = [], isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
            })
            const data = await res.json();
            return data;
        }
    })
    const handleDeleteBuyer = (buyer) => {
        fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/users/buyers/${buyer?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success(`Buyer ${buyer.displayName} is deleted successfully`)
                    refetch();
                }
            })
    }
    const handleMakeAdmin = (id) => {
        fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/users/buyers/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.matchedCount > 0) {
                    toast.success('Make admin successfully.');
                    refetch();
                }
                console.log(data);
            })
            .catch(err => console.error(err.message))
    }

    // console.log(buyers);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h3 className="mb-4 text-3xl text-center">
                All Buyers
            </h3>
            <div className="mx-2 overflow-x-auto">
                {
                    buyers.length > 0 ?
                        <table className="table w-full">
                            {/* <!-- head --> */}
                            <thead>
                                <tr>
                                    <th className='bg-primary text-base-100'></th>
                                    <th className='bg-primary text-base-100'>Name</th>
                                    <th className='bg-primary text-base-100'>Email</th>
                                    <th className='bg-primary text-base-100'>Make Admin</th>
                                    <th className='bg-primary text-base-100'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    buyers.map((buyer, indx) =>
                                        <tr key={buyer._id}>
                                            <th>{indx + 1}</th>
                                            <td>{buyer.displayName}</td>
                                            <td>{buyer.email}</td>
                                            <td >{buyer?.userType !== 'admin' ?
                                                <button onClick={() => handleMakeAdmin(buyer?._id)} className='text-white btn btn-xs btn-primary'>Make Admin</button>
                                                :
                                                <button className='text-white btn btn-xs btn-secondary'>Admin</button>

                                            }</td>
                                            <td>
                                                <label onClick={() => setDeleteBuyer(buyer)} htmlFor="confirmation_modal" className='text-white btn btn-error btn-xs'>Delete</label>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        :
                        <div className='w-full h-96'>
                            <h2 className='text-3xl text-center text-primary '>Here have no buyers.</h2>
                        </div>
                }
            </div>
            {
                deleteBuyer && <DeleteConfirmationModal
                    deleteTitle={`Are you sure? you want to delete?`}
                    message={`If you delete ${deleteBuyer.name}. It cannot get the Buyer back.`}
                    successAction={handleDeleteBuyer}
                    modalData={deleteBuyer}
                    closeModal={closeModal}
                    successButtonName='Delete'
                ></DeleteConfirmationModal>
            }
        </div>
    );
};

export default AllBuyers;