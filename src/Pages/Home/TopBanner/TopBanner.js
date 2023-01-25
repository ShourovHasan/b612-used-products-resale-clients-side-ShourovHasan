import React from 'react';
import './TopBanner.css';
import bg_banner_top from '../../../asssets/bg_banner_top.png';
import Lottie from "lottie-react";
import postImg from '../../../asssets/ecommerce.json';

const TopBanner = () => {
    return (
        <div className="max-h-fit hero text-base-200" style={{ backgroundImage: `url(${bg_banner_top})` }}>
            <div className="bg-opacity-30 hero-overlay"></div>
            {/* <div className="text-center hero-content text-base-200-content">
                <div className="max-w-md text-base-200">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <h2 className="text-5xl font-medium">Save big on pre-owned mobile phones</h2>
                    <p className="text-lg">Get the latest models at a fraction of the cost</p>
                    <button className="btn btn-primary text-base-200">Get Started</button>
                </div>
            </div> */}
            <div className='hero-content text-base-200-content'>
                <div className="max-h-screen hero">
                    <div className="flex-col hero-content lg:flex-row-reverse">
                        {/* <img src="https://placeimg.com/260/400/arch" className="max-w-sm rounded-lg shadow-2xl" alt='' /> */}
                        <div className="w-11/12 text-center lg:w-1/3 lg:text-left md:w-1/3">
                            <Lottie loop={true} animationData={postImg} />
                        </div>
                        <div>
                            <h1 className="mb-5 text-2xl font-bold lg:mb-10 lg:text-5xl md:text-4xl text-base-200">
                                Don't Worry<br />
                                About Phone Resale<br />
                                We Are Waiting For You
                            </h1>
                            {/* <h1 className="mb-5 text-5xl font-bold text-secondary">Welcome to</h1> */}
                            {/* <h1 className="mb-5 text-4xl font-bold text-orange-500">Resale Mobile Store</h1> */}
                            {/* <h2 className="text-5xl font-medium">Save big on pre-owned mobile phones</h2> */}
                            {/* <p className="text-lg">Get the latest models at a fraction of the cost</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div className="h-64 bg-gray-100">
        //     <div className="flex items-center justify-center h-full">
        //         <div className="relative flex flex-col md:flex-row">
        //             <img className="object-cover w-full md:w-1/2" src="https://example.com/mobile-banner.jpg" alt="Mobile banner" />
        //             <div className="w-full p-4 text-center text-white bg-orange-500 md:w-1/2">
        //                 <h2 className="text-5xl font-medium">Save big on pre-owned mobile phones</h2>
        //                 <p className="text-lg">Get the latest models at a fraction of the cost</p>
        //                 <button className="px-4 py-2 font-medium text-orange-500 bg-white rounded-lg hover:bg-gray-200">Shop now</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default TopBanner;