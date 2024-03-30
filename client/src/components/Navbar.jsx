import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import "./Navbar.css";
import { useAuth } from '../Store/Auth';

const Navbar = () => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();
    const { pathname } = location;

    return (
        <header>
            <div className='container'>
                <div className='logo-brand'>
                    <NavLink to="/">Logo</NavLink>
                </div>
            </div>

            <nav>
                <ul>
                    {pathname === '/login' && (
                        <>
                            <li><NavLink to='/register'>Register</NavLink></li>
                        </>
                    )}
                    {pathname === '/register' && (
                        <>
                            <li><NavLink to='/login'>Login</NavLink></li>
                        </>
                    )}
                    {pathname === '/' && isLoggedIn && (
                        <li><NavLink to='/logout'>Logout</NavLink></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
