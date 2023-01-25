import React from 'react';
import useTitle from '../../../hooks/useTitle';
import AdvertisedItems from '../AdvertisedItems/AdvertisedItems';
import Banner from '../Banner/Banner';
import CategoryWiseProducts from '../CategoryWiseProducts/CategoryWiseProducts';
import ContactUs from '../ContactUs/ContactUs';
import Feedbacks from '../Feedbacks/Feedbacks';
import GiveFeedback from '../GiveFeedback/GiveFeedback';
import RecentlyAddedProducts from '../RecentlyAddedProducts/RecentlyAddedProducts';
import TopBanner from '../TopBanner/TopBanner';
import WelcomeHome from '../WelcomeHome/WelcomeHome';

const Home = () => {
    useTitle('Home');
    return (
        <div>
            <TopBanner></TopBanner>
            <Banner></Banner>
            <AdvertisedItems></AdvertisedItems>
            <CategoryWiseProducts></CategoryWiseProducts>
            <RecentlyAddedProducts></RecentlyAddedProducts>
            <WelcomeHome></WelcomeHome>
            <ContactUs></ContactUs>
            <Feedbacks></Feedbacks>
            <GiveFeedback></GiveFeedback>
        </div>
    );
};

export default Home;