import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ booking, setBooking, refetch }) => {
    const { user } = useContext(AuthContext);
    const { _id, productName, productPicture, resalePrice, sellerName, sellerPhoneNumber, sellerEmail } = booking;
    const date = format(new Date(), "PPpp");
    const navigate = useNavigate();
    // console.log('booking',booking.booking);
    const handleBooking = event => {
        event.preventDefault();

        if (!user?.email) {
            toast.error('Please Login first for make booking.');
            return navigate('/login');
        }
        const form = event.target;

        const buyerPhone = form.buyerPhone.value;
        const buyerMeetingLocation = form.buyerMeetingLocation.value;

        const booking = {
            sellerEmail,
            sellerName,
            sellerPhoneNumber,
            productId: _id,
            productName,
            productPicture,
            productPrice: resalePrice,
            buyerName: user?.displayName,
            buyerEmail: user?.email,
            buyerPhone,
            buyerMeetingLocation,
            bookingTime: date
        }
        // console.log(booking);
        fetch('https://b612-used-products-resale-server-side-shourovhasan.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    setBooking(null);
                    refetch();
                    toast.success('Booking Confirmed');
                }
                else {
                    setBooking(null);
                    refetch();
                    toast.error(data.message);
                }
            })
    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="relative modal-box">
                    <label htmlFor="booking-modal" className="absolute btn btn-sm btn-circle right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold text-center text-neutral">{productName}</h3>
                    <form onSubmit={handleBooking} className='grid flex-col grid-cols-1 gap-3 mt-3'>
                        <input type="text" className="w-full shadow-sm input input-bordered shadow-neutral" defaultValue={resalePrice} disabled />

                        <input name='name' type="text" placeholder="Full Name" className="w-full shadow-sm shadow-neutral input input-bordered" defaultValue={user?.displayName} disabled />

                        <input name='buyerEmail' type="email" placeholder="Email" className="w-full shadow-sm input input-bordered shadow-neutral" defaultValue={user?.email} disabled />

                        <input name='buyerPhone' type="text" placeholder="phone Number" className="w-full shadow-sm input input-bordered shadow-neutral" required />

                        <input name='buyerMeetingLocation' type="text" placeholder="meeting location" className="w-full shadow-sm input input-bordered shadow-neutral" required />

                        <input type="submit" className='w-full mt-3 text-white btn bg-gradient-to-r from-secondary to-primary' defaultValue="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;