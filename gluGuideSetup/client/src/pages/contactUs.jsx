import { useState } from "react";
import { APP_CONFIG, COMMON_CLASSES, UI_CONFIG } from "../constants";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        
        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters long";
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        
        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters long";
        }
        
        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // Announce errors to screen readers
            const firstErrorField = Object.keys(newErrors)[0];
            document.getElementById(firstErrorField)?.focus();
            return;
        }
        
        setIsSubmitting(true);
        setErrors({});
        
        // Simulate API call
        setTimeout(() => {
            setSuccessMessage("Thank you for contacting us! We'll get back to you within 24 hours.");
            setFormData({
                name: "",
                email: "",
                message: ""
            });
            setIsSubmitting(false);
            
            // Announce success to screen readers
            document.getElementById('success-message')?.focus();
        }, 1000);
    };

    return (
        <main className={`${UI_CONFIG.LAYOUT.main.minHeight} ${UI_CONFIG.LAYOUT.main.background} py-8 px-4`}>
            <div className="max-w-4xl mx-auto">

                <div className="text-center mb-12">
                    <h1 className={`${UI_CONFIG.TYPOGRAPHY.headings.h1} mb-4`}>
                        Contact {APP_CONFIG.NAME}
                    </h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <section className="bg-background-primary rounded-xl shadow-wcag border border-border-light p-8">
                        <h2 className={`${UI_CONFIG.TYPOGRAPHY.headings.h3} mb-6`}>
                            Send us a Message
                        </h2>
                        
                        <form onSubmit={handleSubmit} noValidate className="space-y-6">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label 
                                    htmlFor="name" 
                                    className="block text-sm font-medium text-text-primary"
                                >
                                    Full Name <span className="text-error" aria-label="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`${COMMON_CLASSES.INPUT_BASE} ${
                                        errors.name 
                                            ? 'border-error focus:ring-error' 
                                            : 'border-border-default focus:ring-secondary-dark'
                                    }`}
                                    placeholder="Enter your full name"
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                    aria-invalid={!!errors.name}
                                    required
                                />
                                {errors.name && (
                                    <p 
                                        id="name-error" 
                                        className="text-sm text-error mt-1"
                                        role="alert"
                                    >
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label 
                                    htmlFor="email" 
                                    className="block text-sm font-medium text-text-primary"
                                >
                                    Email Address <span className="text-error" aria-label="required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`${COMMON_CLASSES.INPUT_BASE} ${
                                        errors.email 
                                            ? 'border-error focus:ring-error' 
                                            : 'border-border-default focus:ring-secondary-dark'
                                    }`}
                                    placeholder="your.email@example.com"
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                    aria-invalid={!!errors.email}
                                    required
                                />
                                {errors.email && (
                                    <p 
                                        id="email-error" 
                                        className="text-sm text-error mt-1"
                                        role="alert"
                                    >
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Message Field */}
                            <div className="space-y-2">
                                <label 
                                    htmlFor="message" 
                                    className="block text-sm font-medium text-text-primary"
                                >
                                    Message <span className="text-error" aria-label="required">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="5"
                                    className={`${COMMON_CLASSES.INPUT_BASE} resize-vertical min-h-32 ${
                                        errors.message 
                                            ? 'border-error focus:ring-error' 
                                            : 'border-border-default focus:ring-secondary-dark'
                                    }`}
                                    placeholder="Tell us how we can help you..."
                                    aria-describedby={errors.message ? "message-error" : undefined}
                                    aria-invalid={!!errors.message}
                                    required
                                ></textarea>
                                {errors.message && (
                                    <p 
                                        id="message-error" 
                                        className="text-sm text-error mt-1"
                                        role="alert"
                                    >
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`${COMMON_CLASSES.BUTTON_BASE} w-full ${
                                    isSubmitting
                                        ? 'bg-secondary-medium cursor-not-allowed'
                                        : 'bg-secondary-dark hover:bg-secondary-medium focus:ring-secondary'
                                } text-primary font-medium`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg 
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <circle 
                                                className="opacity-25" 
                                                cx="12" 
                                                cy="12" 
                                                r="10" 
                                                stroke="currentColor" 
                                                strokeWidth="4"
                                            ></circle>
                                            <path 
                                                className="opacity-75" 
                                                fill="currentColor" 
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    'Send Message'
                                )}
                            </button>

                            {/* Success Message */}
                            {successMessage && (
                                <div 
                                    id="success-message"
                                    className="bg-success-light border border-success text-success-dark p-4 rounded-md"
                                    role="alert"
                                    tabIndex="-1"
                                >
                                    <div className="flex">
                                        <svg 
                                            className="h-5 w-5 text-success mr-2 mt-0.5" 
                                            fill="currentColor" 
                                            viewBox="0 0 20 20"
                                            aria-hidden="true"
                                        >
                                            <path 
                                                fillRule="evenodd" 
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                                                clipRule="evenodd" 
                                            />
                                        </svg>
                                        <span>{successMessage}</span>
                                    </div>
                                </div>
                            )}
                        </form>
                    </section>

                    {/* Contact Information */}
                    <section className="space-y-8">
                        {/* Direct Contact */}
                        <div className="bg-background-primary rounded-xl shadow-wcag  border border-border-light p-8">
                            <h2 className={`${UI_CONFIG.TYPOGRAPHY.headings.h3} mb-6`}>
                                Get in Touch
                            </h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-secondary-light rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-secondary-dark" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-text-primary">Email</h3>
                                        <p className="text-text-secondary mt-1">
                                            <a 
                                                href="mailto:gluguide01@gmail.com" 
                                                className="text-secondary-dark hover:text-secondary-medium underline focus:outline-none focus:ring-2 focus:ring-secondary-dark focus:ring-offset-2 rounded"
                                            >
                                                gluguide01@gmail.com
                                            </a>
                                        </p>
                                        <p className="text-sm text-text-tertiary mt-1">
                                            We typically respond within 24 hours
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-secondary-light rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-secondary-dark" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-text-primary">Phone</h3>
                                        <p className="text-text-secondary mt-1">
                                            <a 
                                                href="tel:+1234567890" 
                                                className="text-secondary-dark hover:text-secondary-medium underline focus:outline-none focus:ring-2 focus:ring-secondary-dark focus:ring-offset-2 rounded"
                                            >
                                                +1 (234) 567-890
                                            </a>
                                        </p>
                                        <p className="text-sm text-text-tertiary mt-1">
                                            Monday - Friday, 9 AM - 6 PM EST
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="bg-background-primary rounded-xl shadow-wcag border border-border-light p-8">
                            <h2 className={`${UI_CONFIG.TYPOGRAPHY.headings.h3} mb-6`}>
                                Common Questions
                            </h2>
                            
                            <div className="space-y-4">
                                <details className="group">
                                    <summary className="list-none cursor-pointer text-text-primary font-medium py-2 focus:outline-none focus:ring-2 focus:ring-secondary-dark focus:ring-offset-2 rounded border border-border-default focus:border-secondary-dark">
                                        <span className="flex items-center justify-between">
                                            How do I reset my password?
                                            <svg 
                                                className="w-5 h-5 text-text-tertiary group-open:rotate-180 transition-transform" 
                                                fill="currentColor" 
                                                viewBox="0 0 20 20"
                                                aria-hidden="true"
                                            >
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="mt-2 pl-4 text-text-secondary">
                                        Visit the login page and click "Forgot Password" to receive a reset link via email.
                                    </div>
                                </details>

                                <details className="group">
                                    <summary className="list-none cursor-pointer text-text-primary font-medium py-2 focus:outline-none focus:ring-2 focus:ring-secondary-dark focus:ring-offset-2 rounded border border-border-default focus:border-secondary-dark">
                                        <span className="flex items-center justify-between">
                                            Is my health data secure?
                                            <svg 
                                                className="w-5 h-5 text-text-tertiary group-open:rotate-180 transition-transform" 
                                                fill="currentColor" 
                                                viewBox="0 0 20 20"
                                                aria-hidden="true"
                                            >
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="mt-2 pl-4 text-text-secondary">
                                        Yes, we use industry-standard encryption and comply with healthcare privacy regulations to protect your data.
                                    </div>
                                </details>

                                <details className="group">
                                    <summary className="list-none cursor-pointer text-text-primary font-medium py-2 focus:outline-none focus:ring-2 focus:ring-secondary-dark focus:ring-offset-2 rounded border border-border-default focus:border-secondary-dark">
                                        <span className="flex items-center justify-between">
                                            How do I export my glucose data?
                                            <svg 
                                                className="w-5 h-5 text-text-tertiary group-open:rotate-180 transition-transform" 
                                                fill="currentColor" 
                                                viewBox="0 0 20 20"
                                                aria-hidden="true"
                                            >
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="mt-2 pl-4 text-text-secondary">
                                        Go to your dashboard and look for the "Export Data" option to download your glucose logs in CSV format.
                                    </div>
                                </details>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default ContactUs;
