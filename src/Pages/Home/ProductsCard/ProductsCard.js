import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import { TbCurrencyTaka } from 'react-icons/tb';
import { HiLocationMarker } from 'react-icons/hi';

const ProductsCard = ({ product, setBooking }) => {
    const { productName, productPicture, publishedTime, resalePrice, sellerLocation, sellerEmail, originalPrice } = product;
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
                // (product.booking !== 'paid' && product.booking !== 'booked') &&
                (product.booking !== 'paid') &&
                <div className="neumorphism_Banner_Card card bg-base-100 shadow-neutral">
                    <figure><img src={productPicture} className='w-full h-[300px]' alt="Shoes" /></figure>
                    <div className="p-0 mx-4 my-3 card-body">
                            <p className='p-0 m-0 text-start'> <span className='font-semibold'>{productName}
                                <small>( {
                                    seller?.verifySeller !== 'verified' ?
                                        <span className='text-red-500'> Not Verified Seller</span>
                                        :
                                        <span className=''><input type="checkbox" defaultChecked className="w-3 h-3 checkbox checkbox-info" /> Verified Seller</span>
                                } )</small>
                            </span> <br />
                                <small>{publishedTime}</small>
                            </p>
                            <div className='flex justify-between my-1'>
                                <div class="style-1 flex">
                                    <span>
                                        <span class="amount flex items-center text-lg">
                                            <TbCurrencyTaka></TbCurrencyTaka>{resalePrice}</span>
                                    </span>
                                    <del className='ml-3 text-red-500'>
                                        <span class="amount text-red-500 flex items-center"> <TbCurrencyTaka></TbCurrencyTaka> {originalPrice}</span>
                                    </del>
                                </div>
                                <div className='flex items-center'>
                                    <span className='mr-1 text-red-500'>
                                        <HiLocationMarker></HiLocationMarker>
                                    </span>
                                    <span>{sellerLocation}</span>
                                </div>
                            </div>
                            
                            
                        {/* <p className='text-justify'>{productDescription}</p>
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
                        </ul> */}
                        <div className="justify-between card-actions">
                                <button onClick={() => handleReport(product)} className="text-white border-none shadow-sm shadow-neutral btn bg-gradient-to-r from-secondary to-primary btn-sm zoom_content">Report</button>
                                <label onClick={() => setBooking(product)} htmlFor="booking-modal" className="text-white border-none shadow-sm shadow-neutral btn btn-sm bg-gradient-to-r from-secondary to-primary zoom_content">Book Now</label>
                        </div>
                        {/* <div className="justify-center card-actions">
                        </div> */}
                    </div>
                </div>
            }
        </>
    );
};

export default ProductsCard;