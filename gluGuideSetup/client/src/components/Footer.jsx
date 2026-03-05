import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-purple-400 to-purple-600 text-white text-center p-5 w-full">
            <p>© {new Date().getFullYear()} GluGuide. All rights reserved.</p>
            <nav className="mt-2">
                <a href="/contact" className="text-white mx-2.5 no-underline hover:underline transition-all">
                    Contact Us
                </a> | 
                <a href="/about" className="text-white mx-2.5 no-underline hover:underline transition-all">
                    About Us
                </a>
            </nav>
        </footer>
    );
};

export default Footer;
