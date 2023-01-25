import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ booking, setBooking, refetch }) => {
    const { user } = useContext(AuthContext);
    const { _id, productName, sellerLocation, sellerName, sellerPhoneNumber, productPicture, publishedTime, purchaseYear, productCondition, productDescription, resalePrice, useOfYears, sellerEmail, originalPrice } = booking;
    
    const [seller, setSeller] = useState([]);
    const date = format(new Date(), "PPpp");
    const navigate = useNavigate();
    // console.log('booking',booking.booking);


    useEffect(() => {
        if (sellerEmail) {
            fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/users/sellerVerify/${sellerEmail}`)
                .then(res => res.json())
                .then(data => {
                    setSeller(data);
                });
        }
    }, [sellerEmail])
    
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
                    <p className='text-justify'>{productDescription}</p>
                    <ul className=''>
                        <li className='text-bold'>Product Details
                            <ul className='ml-6 list-disc list-outside marker:text-green'>
                                <li><small>Original Price: {originalPrice} tk</small></li>
                                <li><small>Resale Price: {resalePrice} tk</small></li>
                                <li><small>Product Condition: {productCondition}</small></li>
                                <li><small>Years of Use: {useOfYears} years</small></li>
                                <li><small>Purchase Year: {purchaseYear}</small></li>
                                <li><small>Published: {publishedTime}</small></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className=''>
                        <li className='text-bold'>Seller Info
                            <ul className='ml-6 list-disc list-outside marker:text-green'>
                                <li><small>Seller name: {sellerName} ( {
                                    seller?.verifySeller !== 'verified' ?
                                        <span className='text-red-500'> Not Verified Seller</span>
                                        :
                                        <span className=''><input type="checkbox" defaultChecked className="w-3 h-3 checkbox checkbox-info" /> Verified Seller</span>
                                } )</small></li>
                                <li><small>Location: {sellerLocation}</small></li>
                                <li><small>Phone: {sellerPhoneNumber}</small></li>
                            </ul>
                        </li>
                    </ul>
                    
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