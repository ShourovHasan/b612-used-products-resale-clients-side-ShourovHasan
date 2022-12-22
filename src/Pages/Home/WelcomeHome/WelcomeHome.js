import Lottie from "lottie-react";
import React from 'react';
import lottieHome from '../../../asssets/resale_mobile_Store.json';

const WelcomeHome = () => {
    return (
        <div>
            <div className="mb-20 hero">
                <div className="flex-col-reverse hero-content lg:flex-row-reverse">
                    <div className='w-2/3 lg:w-1/2'>
                        <Lottie loop={true} animationData={lottieHome} />
                    </div>
                    <div className='px-2 md:px-10 lg:w-1/2 lg:px-5'>
                        <h1 className="mb-5 text-2xl font-bold lg:mb-10 lg:text-5xl md:text-4xl">
                            Don't Worry<br />
                            About Phone Resale<br />
                            We Are Waiting For You
                        </h1>
                        <p className="text-xl text-justify lg:pt-7">
                            Our online resale mobile store is a convenient way to shop for used phones and other devices. You can browse through our inventory and purchase items using a credit card or PayPal. 
                        </p>
                        <p className="pt-2 text-xl pb-7">
                            We also offer a 14-day money-back guarantee on all purchases.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeHome;