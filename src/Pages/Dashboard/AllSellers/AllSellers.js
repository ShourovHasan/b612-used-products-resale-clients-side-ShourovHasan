import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../../hooks/useTitle';
import DeleteConfirmationModal from '../../SharedPages/DeleteConfirmationModal/DeleteConfirmationModal';
import Loading from '../../SharedPages/Loading/Loading';

const AllSellers = () => {
    const [deleteSeller, setDeleteSeller] = useState(null);
    const closeModal = () => {
        setDeleteSeller(null);
    }

    useTitle('All Sellers');
    const url = `https://b612-used-products-resale-server-side-shourovhasan.vercel.app/users/sellers`;
    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
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
    const handleDeleteBuyer = (seller) => {
        fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/users/sellers/${seller?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success(`Seller ${seller.displayName} is deleted successfully`)
                    refetch();
                }
            })
    }
    const handleMakeAdmin = (id) => {
        fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/users/sellers/${id}`, {
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
    const handleMakeVerify = (id) => {
        fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/users/sellerVerify/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.matchedCount > 0) {
                    toast.success('Seller verified successfully.');
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
                All Sellers
            </h3>
            <div className="mx-2 overflow-x-auto">
                {
                    sellers.length > 0 ?
                        <table className="table w-full">
                            {/* <!-- head --> */}
                            <thead>
                                <tr>
                                    <th className='bg-primary text-base-100'></th>
                                    <th className='bg-primary text-base-100'>Name</th>
                                    <th className='bg-primary text-base-100'>Email</th>
                                    <th className='bg-primary text-base-100'>Verify</th>
                                    <th className='bg-primary text-base-100'>Make Admin</th>
                                    <th className='bg-primary text-base-100'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sellers.map((seller, indx) =>
                                        <tr key={seller._id}>
                                            <th>{indx + 1}</th>
                                            <td>{seller.displayName}</td>
                                            <td>{seller.email}</td>
                                            <td >{seller?.verifySeller !== 'verified' ?
                                                <button onClick={() => handleMakeVerify(seller?._id)} className='text-white btn btn-xs btn-primary'>Make Verify</button>
                                                :
                                                <button className='text-white btn btn-xs btn-secondary'>Verified</button>

                                            }</td>
                                            <td >{seller?.userType !== 'admin' ?
                                                <button onClick={() => handleMakeAdmin(seller?._id)} className='text-white btn btn-xs btn-primary'>Make Admin</button>
                                                :
                                                <button className='text-white btn btn-xs btn-secondary'>Admin</button>

                                            }</td>
                                            <td>
                                                <label onClick={() => setDeleteSeller(seller)} htmlFor="confirmation_modal" className='text-white btn btn-error btn-xs'>Delete</label>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        :
                        <div className='w-full h-96'>
                            <h2 className='text-3xl text-center text-primary '>Here have no Sellers.</h2>
                        </div>
                }
            </div>
            {
                deleteSeller && <DeleteConfirmationModal
                    deleteTitle={`Are you sure? you want to delete?`}
                    message={`If you delete ${deleteSeller.name}. It cannot get the Buyer back.`}
                    successAction={handleDeleteBuyer}
                    modalData={deleteSeller}
                    closeModal={closeModal}
                    successButtonName='Delete'
                ></DeleteConfirmationModal>
            }
        </div>
    );
};

export default AllSellers;