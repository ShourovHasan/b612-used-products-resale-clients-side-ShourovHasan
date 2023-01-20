import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/SharedPages/Footer/Footer';
import Header from '../Pages/SharedPages/Header/Header';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <div className='border rounded shadow-sm shadow-primary border-primary border-x-0'>
            {/* <div className='rounded shadow-sm shadow-primary'> */}
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;