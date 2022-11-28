// import React, { useEffect, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

// const axios = require('axios');
const Footer = () => {
    const [categories, setCategories] = React.useState(null);
    const url = 'https://b612-used-products-resale-server-side-shourovhasan.vercel.app/categories3';
    React.useEffect(() => {
        axios.get(url, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((response) => {
                setCategories(response.data);
            });
    }, [])
    // console.log("categories", categories);
    if (!categories) return null;
    return (
        <div className='pb-10 text-white bg-black'>
            <footer className="justify-around p-10 footer ">
                <div>
                    <span className="footer-title">Categories</span>
                    {
                        categories.map(category => <Link key={category._id} to={`/category/${category._id}`} className="link link-hover">{category?.categoryName}</Link>)
                    }
                </div>
                <div>
                    <span className="footer-title">Resale Mobile Store</span>
                    <Link to="/" className="link link-hover">About us</Link>
                    <Link to="/" className="link link-hover">Contact us</Link>
                    <Link to="/" className="link link-hover">Press kit</Link>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <Link to="/" className="link link-hover">Terms of use</Link>
                    <Link to="/" className="link link-hover">Privacy policy</Link>
                    <Link to="/" className="link link-hover">Cookie policy</Link>
                </div>
            </footer>
            <p className='text-center'>Copyright 2022 All Rights Reserved</p>
        </div>
    );
};

export default Footer;