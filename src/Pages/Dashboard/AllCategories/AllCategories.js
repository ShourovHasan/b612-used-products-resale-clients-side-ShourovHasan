import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../../hooks/useTitle';
import DeleteConfirmationModal from '../../SharedPages/DeleteConfirmationModal/DeleteConfirmationModal';
import Loading from '../../SharedPages/Loading/Loading';

const AllCategories = () => {
    const [deleteCategory, setDeleteCategory] = useState(null);
    const closeModal = () => {
        setDeleteCategory(null);
    }

    useTitle('All Categories');

    const url = `https://b612-used-products-resale-server-side-shourovhasan.vercel.app/categoryVerify`;
    const { data: categories = [], isLoading, refetch } = useQuery({
        queryKey: ['categoryVerify'],
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
    const handleDeleteCategory = (category) => {
        fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/categoryVerify/${category?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success(`Buyer ${category.displayName} is deleted successfully`)
                    refetch();
                }
            })
    }
    const handleVerifyCategory = (id) => {
        fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/categoryVerify/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.matchedCount > 0) {
                    toast.success('Category verified successfully.');
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
                All Categories
            </h3>
            <div className="mx-2 overflow-x-auto">
                {
                    categories.length > 0 ?
                        <table className="table w-full">
                            {/* <!-- head --> */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Seller Name</th>
                                    <th>Seller Email</th>
                                    <th>Status</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.map((category, indx) =>
                                        <tr key={category._id}>
                                            <th>{indx + 1}</th>
                                            <td>
                                                <img className='w-12 rounded' src={category.categoryPicture} alt="" />
                                            </td>
                                            <td>{category.categoryName}</td>
                                            <td>{category.userName}</td>
                                            <td>{category.userEmail}</td>
                                            <td >{category?.status !== 'verified' ?
                                                <button onClick={() => handleVerifyCategory(category?._id)} className='text-white btn btn-xs btn-primary'>Make Verify</button>
                                                :
                                                <button className='text-white btn btn-xs btn-secondary'>Verified</button>

                                            }</td>
                                            <td>
                                                <label onClick={() => setDeleteCategory(category)} htmlFor="confirmation_modal" className='text-white btn btn-error btn-xs'>Delete</label>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        :
                        <div className='w-full h-96'>
                            <h2 className='text-3xl text-center text-primary '>Here have no categories.</h2>
                        </div>
                }
            </div>
            {
                deleteCategory && <DeleteConfirmationModal
                    deleteTitle={`Are you sure? you want to delete?`}
                    message={`If you delete ${deleteCategory.categoryName}. It cannot get the Category back.`}
                    successAction={handleDeleteCategory}
                    modalData={deleteCategory}
                    closeModal={closeModal}
                    successButtonName='Delete'
                ></DeleteConfirmationModal>
            }
        </div>
    );
};

export default AllCategories;