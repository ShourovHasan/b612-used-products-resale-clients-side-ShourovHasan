import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import HandleTheme from '../../../components/HandleTheme/HandleTheme';
import { AuthContext } from '../../../contexts/AuthProvider';
import './Header.css';
import logo from '../../../asssets/logo/resale_Logo.png';

const Header = () => {
    const { user, LogOut, handleDark } = useContext(AuthContext);
    
    const handleLogOut = () => {
        LogOut()
            .then(() => {
                localStorage.removeItem('accessToken');
             })
            .catch(error => console.error(error.message))
    }
    // <></> or < React.Fragment ></React.Fragment> both are same
    const menuItems = <React.Fragment>
        <li><NavLink className='rounded-xl' to='/'>Home</NavLink></li>
        <li><NavLink className='rounded-xl' to='/blog'>Blog</NavLink></li>
        {
            user?.uid ?
                <>
                    <li><NavLink className='rounded-xl' to='/dashboard'>Dashboard</NavLink></li>
                    <li><button onClick={handleLogOut} className='rounded-xl'>Sign Out</button></li>
                </>
                :
                <li><NavLink className='rounded-xl' to='/login'>Login</NavLink></li>
        }
        <label className='pl-4 swap swap-rotate'>
            <input type="checkbox" onClick={handleDark} />
            <HandleTheme></HandleTheme>
        </label>
    </React.Fragment>
    return (
        <div className="navbar text-neutral">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/' className="text-2xl normal-case btn btn-ghost text-primary">
                    <img src={logo} className='w-6 mr-2' alt="" />
                    Resale Mobile Store
                </Link>
            </div>
            <div className="hidden navbar-end lg:flex">
                <ul className="p-0 menu menu-horizontal">
                    {menuItems}
                </ul>
            </div>
            <label tabIndex={2} htmlFor="dashboard-drawer" className="navbar-end btn btn-ghost lg:hidden ">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default Header;