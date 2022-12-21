import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../../hooks/useTitle';
import DeleteConfirmationModal from '../../SharedPages/DeleteConfirmationModal/DeleteConfirmationModal';
import Loading from '../../SharedPages/Loading/Loading';

const AllAdmins = () => {
    const [deleteAdmin, setDeleteAdmin] = useState(null);
    const closeModal = () => {
        setDeleteAdmin(null);
    }
    useTitle('All Admins');
    const url = `https://b612-used-products-resale-server-side-shourovhasan.vercel.app/users/admins`;
    const { data: admins = [], isLoading, refetch } = useQuery({
        queryKey: ['admins'],
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
    const handleDeleteBuyer = (admin) => {
        fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/users/admins/${admin?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success(`Seller ${admin.displayName} is deleted successfully`)
                    refetch();
                }
            })
    }

    // console.log(buyers);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h3 className="mb-4 text-3xl text-center">
                All Admins
            </h3>
            <div className="mx-2 overflow-x-auto">
                {
                    admins.length > 0 ?
                        <table className="table w-full">
                            {/* <!-- head --> */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    admins.map((admin, indx) =>
                                        <tr key={admin._id}>
                                            <th>{indx + 1}</th>
                                            <td>{admin.displayName}</td>
                                            <td>{admin.email}</td>
                                            <td>
                                                <label onClick={() => setDeleteAdmin(admin)} htmlFor="confirmation_modal" className='text-white btn btn-error btn-xs'>Delete</label>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        :
                        <div className='w-full h-96'>
                            <h2 className='text-3xl text-center text-primary '>Here have no Admins.</h2>
                        </div>
                }
            </div>
            {
                deleteAdmin && <DeleteConfirmationModal
                    deleteTitle={`Are you sure? you want to delete?`}
                    message={`If you delete ${deleteAdmin.name}. It cannot get the Buyer back.`}
                    successAction={handleDeleteBuyer}
                    modalData={deleteAdmin}
                    closeModal={closeModal}
                    successButtonName='Delete'
                ></DeleteConfirmationModal>
            }
        </div>
    );
};

export default AllAdmins;