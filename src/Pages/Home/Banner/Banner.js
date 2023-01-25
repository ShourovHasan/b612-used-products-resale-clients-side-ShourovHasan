import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Slider from 'react-slick';
import Loading from '../../SharedPages/Loading/Loading';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';
import { FaArrowRight } from 'react-icons/fa';
import BookingModal from '../BookingModal/BookingModal';
import { TbCurrencyTaka } from 'react-icons/tb';

const Banner = () => {
    const [product, setProduct] = useState(null);
    
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    // infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
    };
    const { data: productsPic, isLoading, refetch } = useQuery({
        queryKey: ['productsPic'],
        queryFn: async () => {
            const res = await fetch('https://b612-used-products-resale-server-side-shourovhasan.vercel.app/productsPic')
            const data = await res.json();
            return data;
        }
    })
    // console.log(productsPic);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='w-full mx-auto my-10 lg:w-4/5'>
            <Slider {...settings}>
                {
                    productsPic.map(product =>
                        <div key={product._id} className="mb-5 card">
                            <div className='w-11/12 mx-auto my-5 neumorphism_Banner_Card card-body lg:h-[416px] md:h-[400px] h-[400] p-2'>
                                <img src={product.productPicture} alt="Resale Mobile Store" className='h-[320px]' />
                                <div className="flex py-0 card-body">
                                    <h2 className="justify-center my-auto card-title">{product.productName}</h2>
                                </div>
                                <div className="justify-between mb-5 card-actions">
                                    <label onClick={() => setProduct(product)} htmlFor="booking-modal" className="flex justify-end ml-2 ">
                                        <p className='flex items-center'> Price:
                                            <span className='flex items-center ml-1 text-lg text-orange-500'>
                                                <TbCurrencyTaka></TbCurrencyTaka> {product?.resalePrice}</span>
                                        </p>
                                    </label>
                                    <label onClick={() => setProduct(product)} htmlFor="booking-modal" className="flex justify-end mr-2">
                                        <p className='text-xl text-orange-500 zoom_content'>
                                            <FaArrowRight></FaArrowRight>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Slider>
            {
                product &&
                <BookingModal
                        booking={product}
                    setBooking={setProduct}
                    refetch={refetch}
                ></BookingModal>
            }
        </div>
    );
};

export default Banner;
