import React, { useState } from 'react';
import { Shield, Key, Hash, Link2, Home, Info, Menu, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import SymmetricEncryption from './components/SymmetricEncryption';
import AsymmetricEncryption from './components/AsymmetricEncryption';
import Hashing from './components/Hashing';
import LinkEncryption from './components/LinkEncryption';
import About from './components/About';

type ActiveView = 'dashboard' | 'symmetric' | 'asymmetric' | 'hashing' | 'links' | 'about';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'symmetric', label: 'Symmetric', icon: Shield },
    { id: 'asymmetric', label: 'Asymmetric', icon: Key },
    { id: 'hashing', label: 'Hashing', icon: Hash },
    { id: 'links', label: 'Link Encrypt', icon: Link2 },
    { id: 'about', label: 'About', icon: Info },
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveView} />;
      case 'symmetric':
        return <SymmetricEncryption />;
      case 'asymmetric':
        return <AsymmetricEncryption />;
      case 'hashing':
        return <Hashing />;
      case 'links':
        return <LinkEncryption />;
      case 'about':
        return <About />;
      default:
        return <Dashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <div className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-purple-400" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Aura Encrypt
            </h1>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveView(item.id as ActiveView);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeView === item.id
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-slate-300 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-purple-400" />
            <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Aura Encrypt
            </span>
          </div>
          <div className="w-6 h-6" /> {/* Spacer */}
        </div>

        {/* Page content */}
        <div className="p-4 lg:p-8">
          {renderActiveView()}
        </div>
      </div>
    </div>
  );
}

export default App;