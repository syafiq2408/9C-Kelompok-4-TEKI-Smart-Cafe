import React from 'react';
import { CafeProvider, useCafe } from './context/CafeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ReceiptModal } from './components/ReceiptModal';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { DesignView } from './views/DesignView';
import { MenuView } from './views/MenuView';
import { SmartTechView } from './views/SmartTechView';
import { BusinessPromoView } from './views/BusinessPromoView';
import { ReportTextView } from './views/ReportTextView';
import { CustomerPortalView } from './views/CustomerPortalView';
import { CashierView } from './views/CashierView';

const MainContent: React.FC = () => {
  const { currentPage, activeReceiptOrder, setActiveReceiptOrder } = useCafe();

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'about':
        return <AboutView />;
      case 'design':
        return <DesignView />;
      case 'menu':
        return <MenuView />;
      case 'tech':
        return <SmartTechView />;
      case 'business':
        return <BusinessPromoView />;
      case 'report':
        return <ReportTextView />;
      case 'pembeli':
        return <CustomerPortalView />;
      case 'kasir':
        return <CashierView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between selection:bg-amber-500 selection:text-stone-950">
      <Navbar />
      <main className="flex-1 animate-fadeIn">{renderCurrentView()}</main>
      <Footer />

      {/* Global Thermal Receipt Modal */}
      <ReceiptModal
        order={activeReceiptOrder}
        onClose={() => setActiveReceiptOrder(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <CafeProvider>
      <MainContent />
    </CafeProvider>
  );
}
