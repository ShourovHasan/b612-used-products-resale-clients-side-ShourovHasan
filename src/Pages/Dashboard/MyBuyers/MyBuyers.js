import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../SharedPages/Loading/Loading';

const MyBuyers = () => {
    const { user } = useContext(AuthContext);

    useTitle('My Buyers');

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/bookings/seller/${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
            });
            const data = await res.json();
            return data;
        }
    })
    // console.log(bookings);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="mb-4 text-3xl text-center">My Buyers</h2>
            <div className="mx-2 overflow-x-auto">
                {
                    bookings.length > 0 ?
                        <table className="table w-full">
                            {/* <!-- head --> */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Product Name</th>
                                    <th>Buyer Name</th>
                                    <th>Price</th>
                                    <th>Buyer Phone</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bookings.map((booking, indx) =>
                                        <tr key={booking._id}>
                                            <th>{indx + 1}</th>
                                            <td>{booking.productName}</td>
                                            <td>{booking.buyerName}</td>
                                            <td>{booking.productPrice}</td>
                                            <td>{booking.buyerPhone}</td>
                                            <td>{booking.buyerMeetingLocation}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        :
                        <div>
                            <h2 className='text-2xl text-center'>You have no Buyers.</h2>
                        </div>
                }
            </div>
        </div>
    );
};

export default MyBuyers;