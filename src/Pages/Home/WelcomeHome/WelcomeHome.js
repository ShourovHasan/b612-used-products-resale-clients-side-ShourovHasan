import Lottie from "lottie-react";
import React from 'react';
import lottieHome from '../../../asssets/resale_mobile_Store.json';

const WelcomeHome = () => {
    return (
        <div>
            <div className="my-5 hero">
                <div className="flex-col hero-content lg:flex-row-reverse">
                    <div className='w-2/3 lg:w-1/2'>
                        <Lottie loop={true} animationData={lottieHome} />
                    </div>
                    <div className='px-2 md:px-10 lg:w-1/2 lg:px-5'>
                        <h1 className="mb-5 text-2xl font-bold lg:mb-10 lg:text-5xl md:text-4xl">
                            Save big<br />
                            on pre-owned<br />
                            Get the latest models <br />
                            at a fraction of the cost<br />
                        </h1>
                        {/* <h2 className="text-5xl font-medium">Save big on pre-owned mobile phones</h2> */}
                        {/* <p className="text-lg">Get the latest models at a fraction of the cost</p> */}
                        <p className="text-xl text-justify lg:pt-7 text_Customize">
                            Our online resale mobile store is a convenient way to shop for used phones and other devices. You can browse through our inventory and purchase items using a credit card or PayPal. 
                        </p>
                        <p className="pt-2 text-xl pb-7 text_Customize">
                            We also offer a 14-day money-back guarantee on all purchases.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeHome;