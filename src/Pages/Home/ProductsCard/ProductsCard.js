import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const ProductsCard = ({ product, setBooking }) => {
    const { productName, productPicture, publishedTime, purchaseYear, productCondition, productDescription, resalePrice, sellerLocation, sellerName, sellerPhoneNumber, useOfYears, sellerEmail, originalPrice } = product;
    const { user } = useContext(AuthContext);
    const [seller, setSeller] = useState([]);
    // const [payment, setPayment] = useState([]);

    useEffect(() => {
        if (sellerEmail) {
            fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/users/sellerVerify/${sellerEmail}`)
                .then(res => res.json())
                .then(data => {
                    setSeller(data);
                });
        }
    }, [sellerEmail])

    // useEffect(() => {
    //     if (product?._id) {
    //         fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/paymentVerify/${product?._id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setPayment(data);
    //         });
    //     }
    // }, [product?._id])
    // products.booking !== 'booked' &&
    // console.log('payment', payment);

    const handleReport = product => {
        const { _id, productName, productPicture, resalePrice, sellerLocation, sellerName, sellerPhoneNumber, sellerEmail } = product;
        const report = {
            sellerEmail,
            sellerName,
            sellerLocation,
            sellerPhoneNumber,
            productId: _id,
            productName,
            productPicture,
            productPrice: resalePrice,
            reporterName: user?.displayName,
            reporterEmail: user?.email,
        }
        // console.log(booking);
        fetch('https://b612-used-products-resale-server-side-shourovhasan.vercel.app/reports', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(report)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success('Reporting Confirmed');
                }
                else {
                    toast.error(data.message);
                }
            })
    }

    return (
        <>
            {
                (product.booking !== 'booked') &&
                <div className="shadow-xl card bg-base-100 shadow-neutral">
                    <figure><img src={productPicture} className='w-full h-44' alt="Shoes" /></figure>
                    <div className="p-0 mx-4 my-3 card-body">
                        <p className='p-0 m-0 font-semibold text-center'>{productName}</p>
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
                        <div className="justify-center card-actions">
                            <button onClick={() => handleReport(product)} className="text-white border-none shadow-sm shadow-neutral btn bg-gradient-to-r from-secondary to-primary btn-sm">Report to Admin</button>
                        </div>
                        <div className="justify-center card-actions">
                            <label onClick={() => setBooking(product)} htmlFor="booking-modal" className="w-full text-white border-none shadow-sm shadow-neutral btn bg-gradient-to-r from-secondary to-primary">Book Now</label>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ProductsCard;