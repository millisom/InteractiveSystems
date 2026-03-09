import { APP_CONFIG, COMMON_CLASSES, UI_CONFIG } from '../constants';

const AboutUs = () => {
    const currentTeamMembers = [
        {
            name: 'Emili',
            role: 'Project Manager',
            image: 'https://gdewomenhealth.wordpress.com/wp-content/uploads/2024/09/integration-2031395_1920.png',
            description: 'Leading project coordination and team management with expertise in agile methodologies.',
        },
        {
            name: 'Hossay',
            role: 'Software Architect',
            image: 'https://gdewomenhealth.wordpress.com/wp-content/uploads/2024/09/database-4941338_1920-1.png',
            description: 'Designing scalable systems and implementing robust backend solutions for optimal performance.',
        },
        {
            name: 'Maja',
            role: 'User-Interface Designer',
            image: 'https://gdewomenhealth.wordpress.com/wp-content/uploads/2024/09/laptop-2282328_1920.png',
            description: 'Creating intuitive and accessible user experiences with a focus on user-centered design.',
        },
        {
            name: 'Nilgün',
            role: 'User Stakeholder',
            image: 'https://gdewomenhealth.wordpress.com/wp-content/uploads/2024/09/baby-7318695_1920.jpg',
            description: 'Representing user needs and ensuring the application meets real-world requirements.',
        },
    ];

    const honorableMentions = [
        {
            name: 'Hafsa',
            role: 'Former Project Manager & Mentor',
            image: 'https://gdewomenhealth.wordpress.com/wp-content/uploads/2024/09/priority-4303707_1920.png',
            note: 'Hafsa was instrumental in the last semester of GluGuide as our Project Manager. She has since moved on to her maternity leave. We honor her foundational work and wish her all the best!',
        },
    ];

    const features = [
        {
            icon: (
                <svg className="w-8 h-8 text-secondary-dark" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
            ),
            title: 'Glucose Tracking',
            description: 'Easy-to-use logging system for monitoring blood glucose levels throughout your pregnancy.',
        },
        {
            icon: (
                <svg className="w-8 h-8 text-secondary-dark" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Smart Reminders',
            description: 'Customizable alerts to help you stay on track with medication, testing, and appointments.',
        },
        {
            icon: (
                <svg className="w-8 h-8 text-secondary-dark" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
            ),
            title: 'Meal Planning',
            description: 'Comprehensive meal planning tools with nutritional guidance tailored for gestational diabetes.',
        },
        {
            icon: (
                <svg className="w-8 h-8 text-secondary-dark" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
            ),
            title: 'Expert Resources',
            description: 'Access to educational content and evidence-based information from healthcare professionals.',
        },
    ];

    const stats = [
        { label: 'Active Users', value: '1,200+', description: 'Women managing their diabetes journey' },
        { label: 'Data Points', value: '50,000+', description: 'Glucose readings tracked successfully' },
        { label: 'Success Rate', value: '95%', description: 'Users report improved glucose control' },
        { label: 'Support Rating', value: '4.9/5', description: 'Average user satisfaction score' },
    ];

    return (
        <main className={`${UI_CONFIG.LAYOUT.main.minHeight} ${UI_CONFIG.LAYOUT.main.background}`}>
            <div className={`${UI_CONFIG.LAYOUT.container.maxWidth} ${UI_CONFIG.LAYOUT.container.margin} ${UI_CONFIG.LAYOUT.container.padding} py-8 space-y-20`}>
                {/* Mission Section */}
                <section>
                    <div className="text-center mb-12">
                        <h1 className={`${UI_CONFIG.TYPOGRAPHY.headings.h1} mb-4`}>
                            About {APP_CONFIG.NAME}
                        </h1>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className={`${UI_CONFIG.TYPOGRAPHY.headings.h2} mb-6`}>
                                Our Mission
                            </h2>
                            <div className="space-y-4 text-text-secondary leading-relaxed">
                                <p>
                                    Welcome to <strong className="text-text-primary">{APP_CONFIG.NAME}</strong>, 
                                    your companion in managing gestational diabetes. Our mission is to develop 
                                    {APP_CONFIG.NAME} into a helpful resource for women managing gestational diabetes. 
                                    Each feature, from tracking to reminders, is crafted with care to make life a little easier.
                                </p>
                                <p>
                                    We are a team of computer science students committed to creating an app that 
                                    listens to the needs of mothers and provides tools that make managing gestational 
                                    diabetes less stressful. Along the way, we're constantly learning and evolving 
                                    to ensure {APP_CONFIG.NAME} becomes the best it can be.
                                </p>
                            </div>
                        </div>
                        <div className="bg-background-primary rounded-xl p-8 shadow-wcag border border-border-light">
                            <h3 className={`${UI_CONFIG.TYPOGRAPHY.headings.h3} mb-6`}>Our Vision</h3>
                            <blockquote className="text-lg text-text-secondary italic border-l-4 border-secondary-medium pl-6">
                                "To code a web app that empowers women with gestational diabetes through 
                                supportive technology, evidence-based resources, and a community that understands their journey."
                            </blockquote>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-background-primary rounded-2xl p-8 lg:p-12 shadow-wcag border border-border-light">
                    <h2 className={`${UI_CONFIG.TYPOGRAPHY.headings.h2} text-center mb-12`}>
                        Our Impact
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl lg:text-4xl font-bold text-secondary-dark mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-medium text-text-primary mb-1">
                                    {stat.label}
                                </div>
                                <div className="text-xs text-text-secondary">
                                    {stat.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features Section */}
                <section>
                    <h2 className={`${UI_CONFIG.TYPOGRAPHY.headings.h2} text-center mb-12`}>
                        What We Offer
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-background-primary rounded-xl p-8 shadow-wcag border border-border-light hover:shadow-wcag-lg transition-shadow duration-300">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-secondary-light rounded-lg flex items-center justify-center">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-text-primary mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-text-secondary">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team Section */}
                <section>
                    <h2 className={`${UI_CONFIG.TYPOGRAPHY.headings.h2} text-center mb-12`}>
                        Meet Our Team
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {currentTeamMembers.map((member, index) => (
                            <div key={`team-${index}`} className="bg-background-primary rounded-xl p-6 shadow-wcag border border-border-light text-center hover:shadow-wcag-lg transition-shadow duration-300">
                                <div className="mb-6">
                                    <img
                                        src={member.image}
                                        alt={`${member.name}, ${member.role}`}
                                        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-secondary-light"
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-text-primary mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-secondary-dark font-medium mb-3">
                                    {member.role}
                                </p>
                                <p className="text-sm text-text-secondary">
                                    {member.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Special Thanks Section */}
                    <div className="bg-background-primary rounded-2xl p-8 border border-border-light shadow-wcag">
                        <h3 className={`${UI_CONFIG.TYPOGRAPHY.headings.h3} text-center mb-8`}>
                            With Special Thanks
                        </h3>
                        {honorableMentions.map((member, index) => (
                            <div key={`honor-${index}`} className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6 bg-background-primary rounded-xl p-6">
                                <div className="flex-shrink-0">
                                    <img
                                        src={member.image}
                                        alt={`${member.name}, ${member.role}`}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-secondary-light"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="text-center md:text-left">
                                    <h4 className="text-xl font-semibold text-text-primary mb-2">
                                        {member.name}
                                    </h4>
                                    <p className="text-secondary-dark font-medium mb-4">
                                        {member.role}
                                    </p>
                                    <p className="text-text-secondary leading-relaxed">
                                        {member.note}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Closing Section */}
                <section className="text-center bg-background-primary rounded-2xl p-12 border border-border-light shadow-wcag">
                    <h2 className={`${UI_CONFIG.TYPOGRAPHY.headings.h2} mb-6`}>
                        Join Our Journey
                    </h2>
                    <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
                        Together, our team is passionate about creating a positive impact on maternal health. 
                        We believe that with the right tools and support, managing gestational diabetes 
                        can become less overwhelming and more empowering.
                    </p>
                    <p className="text-xl font-semibold text-secondary-dark">
                        Thank you for choosing {APP_CONFIG.NAME}!
                    </p>
                </section>
            </div>
        </main>
    );
};

export default AboutUs;
