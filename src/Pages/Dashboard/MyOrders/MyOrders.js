import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useTitle from '../../../hooks/useTitle';
import DeleteConfirmationModal from '../../SharedPages/DeleteConfirmationModal/DeleteConfirmationModal';
import Loading from '../../SharedPages/Loading/Loading';

const MyOrders = () => {
    const { user, loading } = useContext(AuthContext);
    const [deleteBooking, setDeleteBooking] = useState(null)
    const closeModal = () => {
        setDeleteBooking(null);
    }
    useTitle('My Orders');

    const url = `https://b612-used-products-resale-server-side-shourovhasan.vercel.app/bookings?email=${user?.email}`;
    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
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
    // console.log(orders);

    const handleDeleteBooking = (order) => {
        // console.log(product);
        fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/bookings/${order._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data.order);
                if (data.result.deletedCount > 0) {
                    fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/bookings/${data.order.productId}`, {
                        method: 'PUT',
                        headers: {
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.productUpdate.matchedCount > 0) {
                                if (data.paymentDetails) {
                                    fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/bookingsPaymentDelete/${data.paymentDetails._id}`, {
                                        method: 'DELETE',
                                        headers: {
                                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                                        }
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            refetch();
                                            return toast.success(`Product is deleted successfully`);
                                        })
                                }
                                else {
                                    refetch();
                                    return toast.success(`Product is deleted successfully`);
                                }
                            }
                            else {
                                return toast.error(`Product is not deleted`);
                            }
                            // console.log(data);
                        })
                        .catch(err => console.error(err.message))
                }
                else {
                    toast.error(`Product is not deleted`);
                }
            })

    }
    if (loading) {
        return <Loading></Loading>
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div className='mb-5'>
                <h3 className="text-3xl text-center">
                    My Orders
                </h3>
            </div>
            <div className="overflow-x-auto">
                {
                    orders.length > 0 ?
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th className='bg-primary text-base-100'></th>
                                    <th className='bg-primary text-base-100'>Image</th>
                                    <th className='bg-primary text-base-100'>Title</th>
                                    <th className='bg-primary text-base-100'>Price</th>
                                    <th className='bg-primary text-base-100'>Meeting Location</th>
                                    <th className='bg-primary text-base-100'>Seller Number</th>
                                    <th className='bg-primary text-base-100'>Payment</th>
                                    <th className='bg-primary text-base-100'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders?.map((order, indx) =>
                                        <tr key={order._id}>
                                            <th>{indx + 1}</th>
                                            <td>
                                                <img className='w-12 rounded' src={order.productPicture} alt="" />
                                            </td>
                                            <td>{order.productName}</td>
                                            <td>{order.productPrice}</td>
                                            <td>{order.buyerMeetingLocation}</td>
                                            <td>{order.sellerPhoneNumber}</td>
                                            <td>
                                                {
                                                    order.productPrice && !order.paid && <Link
                                                        to={`/dashboard/payment/${order._id}`}
                                                        className='text-white bg-gradient-to-r from-secondary to-primary btn btn-sm'
                                                    >Pay</Link>
                                                }
                                                {
                                                    order.productPrice && order.paid && <Link
                                                        className='text-white bg-gradient-to-r from-secondary to-primary btn btn-sm'
                                                    >Paid</Link>
                                                }
                                            </td>
                                            <td>
                                                <label onClick={() => setDeleteBooking(order)} htmlFor="confirmation_modal" className='text-white btn btn-error btn-xs'>Delete</label>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        :
                        <div className='text-3xl text-center text-primary'>
                            <p className=''>You have no order. Please add an order.</p>
                        </div>
                }
            </div>
            {
                deleteBooking && <DeleteConfirmationModal
                    deleteTitle={`Are you sure? you want to delete?`}
                    message={`If you delete ${deleteBooking.productName}. It cannot get the Product back.`}
                    successAction={handleDeleteBooking}
                    modalData={deleteBooking}
                    closeModal={closeModal}
                    successButtonName='Delete'
                ></DeleteConfirmationModal>
            }
        </div>
    );
};

export default MyOrders;