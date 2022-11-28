import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Slider from 'react-slick';
import Loading from '../../SharedPages/Loading/Loading';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
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
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
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
    const { data: productsPic, isLoading } = useQuery({
        queryKey: ['productsPic'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/productsPic')
            const data = await res.json();
            return data;
        }
    })
    // console.log(productsPic);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='w-full mx-auto my-10 lg:w-2/3'>
            <Slider {...settings}>
                {
                    productsPic.map(product =>
                        <div key={product._id} className="bg-base-100 h-80">
                            <figure className='flex justify-center'><img src={product.productPicture} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.productName}</h2>
                            </div>
                        </div>
                    )
                }
            </Slider>
        </div>
    );
};

export default Banner;
