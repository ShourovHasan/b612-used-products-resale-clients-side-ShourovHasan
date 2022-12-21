import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ booking }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [cardError, setCardError] = useState('');

    const navigate = useNavigate();
    // const { price, patient, email, _id } = booking;
    const { _id, buyerName, buyerEmail, productPrice, productId } = booking;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://b612-used-products-resale-server-side-shourovhasan.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ productPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [productPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Block native form submission.

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
            console.log('[error]', error);
        }
        else {
            setCardError('');
            console.log('[PaymentMethod]', paymentMethod);
        }

        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyerName,
                        email: buyerEmail,
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            console.log('card Info', card);
            // store payment info in database
            const payment = {
                productPrice,
                transactionId: paymentIntent.id,
                buyerEmail,
                bookingId: _id,
                productId: productId
            }
            fetch('https://b612-used-products-resale-server-side-shourovhasan.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congrats! your payment is successfully completed');
                        setTransactionId(paymentIntent.id);
                        navigate('/dashboard/myOrders')
                        setCardError('')
                    }
                })
                .catch(error => {
                    setCardError(error.message)
                })
        }
        setProcessing(false);
        // console.log('paymentIntent', paymentIntent);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement className='px-3 py-2 border-2 rounded-lg border-neutral text-neutral'
                    options={{
                        style: {
                            base: {
                                fontSize: '20px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='mt-4 text-white btn btn-primary' type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transactionId: <span className='font-bold'>{transactionId}</span> </p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;