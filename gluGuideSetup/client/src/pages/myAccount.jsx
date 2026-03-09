import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/profileCard';
import { APP_CONFIG, UI_CONFIG, COMMON_CLASSES } from '../constants';
import axiosInstance from '../api/axiosConfig';

const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/status');
                if (response.data.valid) {
                    setUser(response.data.username);
                } else {
                    navigate('/login');
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user information. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    // Loading state
    if (loading) {
        return (
            <main className={`${UI_CONFIG.LAYOUT.main.minHeight} ${UI_CONFIG.LAYOUT.main.background}`}>
                <div className={`${UI_CONFIG.LAYOUT.container.maxWidth} ${UI_CONFIG.LAYOUT.container.margin} ${UI_CONFIG.LAYOUT.container.padding} py-8`}>
                    <div className={COMMON_CLASSES.FLEX_CENTER} role="status" aria-live="polite">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-dark" aria-hidden="true"></div>
                        <span className="sr-only">Loading your account information...</span>
                        <p className={`${UI_CONFIG.TYPOGRAPHY.body.base} ml-4`}>Loading your account...</p>
                    </div>
                </div>
            </main>
        );
    }

    // Error state
    if (error) {
        return (
            <main className={`${UI_CONFIG.LAYOUT.main.minHeight} ${UI_CONFIG.LAYOUT.main.background}`}>
                <div className={`${UI_CONFIG.LAYOUT.container.maxWidth} ${UI_CONFIG.LAYOUT.container.margin} ${UI_CONFIG.LAYOUT.container.padding} py-8`}>
                    <div className="bg-error-light border border-error rounded-lg p-6 text-center" role="alert">
                        <h1 className={`${UI_CONFIG.TYPOGRAPHY.headings.h2} text-error mb-4`}>
                            Error Loading Account
                        </h1>
                        <p className={`${UI_CONFIG.TYPOGRAPHY.body.base} text-error-dark mb-4`}>
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className={`${COMMON_CLASSES.BUTTON_BASE} bg-error hover:bg-error-dark text-white ${COMMON_CLASSES.FOCUS_RING}`}
                            aria-label="Reload page to try again"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <>
            {/* Skip to main content link for screen readers - Using Tailwind for accessibility */}
            <a 
                href="#main-content" 
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gray-900 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                tabIndex="1"
            >
                Skip to main content
            </a>
            
            <main 
                id="main-content"
                className={`${UI_CONFIG.LAYOUT.main.minHeight} ${UI_CONFIG.LAYOUT.main.background} focus:outline-none`}
                role="main"
                aria-label="My Account Dashboard"
                tabIndex="-1"
            >
                <div className={`${UI_CONFIG.LAYOUT.container.maxWidth} ${UI_CONFIG.LAYOUT.container.margin} ${UI_CONFIG.LAYOUT.container.padding} py-8`}>
                {/* Breadcrumb Navigation with enhanced accessibility */}
                <nav aria-label="Breadcrumb" className="mb-4">
                    <ol className="flex items-center space-x-2 text-sm">
                        <li>
                            <a 
                                href="/" 
                                className="text-secondary-dark hover:text-secondary-darker hover:underline focus:outline-none focus:ring-2 focus:ring-secondary-dark focus:ring-offset-1 rounded px-1 py-0.5 transition-colors duration-200"
                                aria-label="Navigate to homepage"
                            >
                                Home
                            </a>
                        </li>
                        <li aria-hidden="true" className="text-text-tertiary select-none">/</li>
                        <li aria-current="page" className="text-text-primary font-medium">My Account</li>
                    </ol>
                </nav>
                {/* Profile Dashboard */}
                <ProfileCard />
                </div>
            </main>
        </>
    );
};

export default MyAccount;