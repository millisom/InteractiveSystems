import React from 'react';
import { APP_CONFIG, UI_CONFIG } from '../constants';

const Footer = () => {
    return (
        <footer className={`${UI_CONFIG.LAYOUT.footer.position} ${UI_CONFIG.LAYOUT.footer.background} text-white ${UI_CONFIG.LAYOUT.footer.shadow} ${UI_CONFIG.LAYOUT.footer.zIndex}`}>
            <div className={`${UI_CONFIG.LAYOUT.container.maxWidth} ${UI_CONFIG.LAYOUT.container.margin} ${UI_CONFIG.LAYOUT.footer.padding}`}>
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        <p className="text-primary font-medium">
                            © {new Date().getFullYear()} {APP_CONFIG.NAME}. All rights reserved.
                        </p>
                        <p className="text-primary-light text-sm mt-1">
                            Empowering mothers with gestational diabetes
                        </p>
                    </div>
                    <nav className="flex items-center space-x-6">
                        <a 
                            href="/contact" 
                            className="text-primary-light hover:text-primary transition-colors duration-200 font-medium"
                            aria-label="Contact us page"
                        >
                            Contact Us
                        </a>
                        <span className="text-primary">|</span>
                        <a 
                            href="/about" 
                            className="text-primary-light hover:text-primary transition-colors duration-200 font-medium"
                            aria-label="About us page"
                        >
                            About Us
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
