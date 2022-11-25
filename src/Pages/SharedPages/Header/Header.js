import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import HandleTheme from '../../../components/HandleTheme/HandleTheme';
import { AuthContext } from '../../../contexts/AuthProvider';
import './Header.css';
const Header = () => {
    const { user, LogOut, handleDark } = useContext(AuthContext);
    
    const handleLogOut = () => {
        LogOut()
            .then(() => { })
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
        <div className="navbar bg-base-100 text-neutral">
            
        </div>
    );
};

export default Header;