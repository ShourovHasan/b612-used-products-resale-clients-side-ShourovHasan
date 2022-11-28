import React from 'react';
import useTitle from '../../../hooks/useTitle';
import AdvertisedItems from '../AdvertisedItems/AdvertisedItems';
import Banner from '../Banner/Banner';
import CategoryWiseProducts from '../CategoryWiseProducts/CategoryWiseProducts';
import WelcomeHome from '../WelcomeHome/WelcomeHome';

const Home = () => {
    useTitle('Home');
    return (
        <div>
            <Banner></Banner>
            <AdvertisedItems></AdvertisedItems>
            <CategoryWiseProducts></CategoryWiseProducts>
            <WelcomeHome></WelcomeHome>
        </div>
    );
};

export default Home;