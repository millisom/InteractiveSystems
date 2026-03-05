import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_CONFIG, API_CONFIG } from '../constants';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessionStatus = async () => {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}/status`, {
                    credentials: 'include'
                });
                
                if (!response.ok) {
                    console.error('Session status fetch failed:', response.status);
                    return;
                }
                
                const data = await response.json();
                setIsLoggedIn(data.valid);
                setIsAdmin(data.is_admin);
            } catch (err) {
                console.error("Error fetching session status:", err);
            }
        };

        fetchSessionStatus();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/logout`, {
                credentials: 'include'
            });
            
            if (response.ok || response.status === 404) {
                setIsLoggedIn(false);
                alert('You have been logged out successfully.');
                navigate('/');
            } else {
                console.error('Logout failed:', response.status);
                alert('Failed to log out. Please try again.');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Failed to log out. Please try again.');
        }
    };

    return (
        <header className="sticky top-0 left-0 w-full bg-gradient-to-r from-primary-600 to-secondary-600 flex justify-between items-center z-50 px-5 py-3 shadow-wcag">
            <Link 
                to="/" 
                className="text-3xl font-bold text-white ml-10 hover:text-primary-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 rounded"
                aria-label="GluGuide Home"
            >
                {APP_CONFIG.NAME}
            </Link>
            <nav className="flex items-center space-x-8" role="navigation" aria-label="Main navigation">
                <Link 
                    to="/" 
                    className="relative text-lg font-medium text-white hover:text-primary-100 transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 rounded px-2 py-1"
                    aria-label="Home page"
                >
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                </Link>
                {isLoggedIn ? (
                    <>
                        {isAdmin && (
                            <Link 
                                to="/admin" 
                                className="relative text-lg font-medium text-white hover:text-primary-100 transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 rounded px-2 py-1"
                                aria-label="Admin Dashboard"
                            >
                                Admin Dashboard
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                            </Link>
                        )}
                        <Link 
                            to="/account" 
                            className="relative text-lg font-medium text-white hover:text-primary-100 transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 rounded px-2 py-1"
                            aria-label="My Account"
                        >
                            My Account
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                        </Link>
                        <Link 
                            to="/myBlogs" 
                            className="relative text-lg font-medium text-white hover:text-primary-100 transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 rounded px-2 py-1"
                            aria-label="My Blogs"
                        >
                            My Blogs
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                        </Link>
                        <button 
                            onClick={handleLogout}
                            className="relative text-lg font-medium text-white hover:text-primary-100 transition-colors duration-300 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 rounded px-2 py-1"
                            aria-label="Logout"
                        >
                            Logout
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                        </button>
                    </>
                ) : (
                    <>
                        <Link 
                            to="/login" 
                            className="relative text-lg font-medium text-white hover:text-primary-100 transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 rounded px-2 py-1"
                            aria-label="Login"
                        >
                            Login
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                        </Link>
                        <Link 
                            to="/signUp" 
                            className="relative text-lg font-medium text-white hover:text-primary-100 transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 rounded px-2 py-1"
                            aria-label="Sign Up"
                        >
                            Sign Up
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                        </Link>
                    </>
                )}
                <Link 
                    to="/blogs" 
                    className="relative text-lg font-medium text-white hover:text-primary-100 transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 rounded px-2 py-1"
                    aria-label="Blogs"
                >
                    Blogs
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                </Link>
                <Link 
                    to="/about" 
                    className="relative text-lg font-medium text-white hover:text-primary-100 transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 rounded px-2 py-1"
                    aria-label="About"
                >
                    About
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                </Link>
                <Link 
                    to="/contact" 
                    className="relative text-lg font-medium text-white hover:text-primary-100 transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 rounded px-2 py-1 mr-10"
                    aria-label="Contact"
                >
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;
