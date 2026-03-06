import { Suspense } from 'react';
import Navbar from '../Navbar.jsx';
import Footer from '../Footer';
import { UI_CONFIG } from '../../constants';

// Simple loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-64">
    <div className="text-lg text-text-secondary">Loading...</div>
  </div>
);

const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-1 ${UI_CONFIG.LAYOUT.main.padding} ${UI_CONFIG.LAYOUT.main.background}`}>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout; 