import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_stripe_PK);

const Payment = () => {
    const booking = useLoaderData();
    // const navigation = useNavigation();
    // console.log('data', booking);
    const { productName, buyerName, productPrice } = booking;

    // if (navigation.state === 'loading') {
    //     return <Loading></Loading>
    // }
    return (
        <div className='flex justify-center'>
            <div>
                <h3 className="text-3xl">Payment for {productName}</h3>
                <p className='mt-4 text-xl'>Hello, {buyerName} <br /> Please pay <strong><span className='text-primary'>{productPrice} </span></strong>tk for your booking product.</p>
                <div className='my-12 w-96'>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm booking={booking}></CheckoutForm>
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;