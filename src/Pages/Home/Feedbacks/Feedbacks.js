import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Slider from 'react-slick';
import Loading from '../../SharedPages/Loading/Loading';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Feedbacks = () => {
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
                breakpoint: 890,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1,
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
    const { data: feedbacks, isLoading } = useQuery({
        queryKey: ['feedbacks'],
        queryFn: async () => {
            const res = await fetch('https://b612-used-products-resale-server-side-shourovhasan.vercel.app/feedbacks')
            const data = await res.json();
            return data;
        }
    })
    // console.log(productsPic);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <>
            {
                feedbacks.length ?
                    <div className='mt-10 mb-20'>
                        <h2 className='text-5xl font-bold text-center divider text-primary divider-primary'>Feedbacks</h2>
                        <div className='w-11/12 mx-auto my-10'>
                            <Slider {...settings}>
                                {
                                    feedbacks.map(feedback =>
                                        <div key={feedback._id} className="mb-5 card">
                                            <div className='w-11/12 mx-auto my-5 neumorphism_Banner_Card card-body min-h-[280px] p-2'>
                                                {/* <p></p> */}
                                                <div className='mt-3 ml-5'>
                                                    <h2 className="text-2xl card-title">
                                                        {feedback.userName}
                                                    </h2>
                                                    <small><p>{feedback.feedbackTime}</p></small>
                                                </div>
                                                <div className="flex py-0 card-body">
                                                    <h2 className="justify-center my-auto card-title">{feedback.feedbackDescription}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </Slider>
                        </div>
                    </div>
                    :
                    ''
            }
        </>
    );
};

export default Feedbacks;