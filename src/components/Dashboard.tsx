import React from 'react';
import { Shield, Key, Hash, Link2, ArrowRight, Sparkles } from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const tools = [
    {
      id: 'symmetric',
      title: 'Symmetric Encryption',
      description: 'Encrypt and decrypt data using AES-256 with a single password',
      icon: Shield,
      color: 'from-blue-500 to-purple-600',
      features: ['Text encryption', 'File encryption', 'Image encryption'],
    },
    {
      id: 'asymmetric',
      title: 'Asymmetric Encryption',
      description: 'Use RSA public/private key pairs for secure communication',
      icon: Key,
      color: 'from-green-500 to-blue-600',
      features: ['Key pair generation', 'Public key encryption', 'Private key decryption'],
    },
    {
      id: 'hashing',
      title: 'Cryptographic Hashing',
      description: 'Generate SHA-256 and SHA-3 hashes for data integrity',
      icon: Hash,
      color: 'from-orange-500 to-red-600',
      features: ['SHA-256 hashing', 'SHA-3 hashing', 'File verification'],
    },
    {
      id: 'links',
      title: 'Link Encryption',
      description: 'Encrypt and obfuscate URLs for enhanced privacy',
      icon: Link2,
      color: 'from-purple-500 to-pink-600',
      features: ['URL encryption', 'Password protection', 'Privacy enhancement'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <Shield className="w-16 h-16 text-purple-400" />
            <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
          Welcome to Aura Encrypt
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Your comprehensive suite of encryption tools. Secure your data with military-grade encryption,
          generate cryptographic hashes, and protect your digital communications with ease.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="group relative bg-slate-800 rounded-2xl p-8 hover:bg-slate-750 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-slate-700 hover:border-slate-600"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${tool.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                {tool.title}
              </h3>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                {tool.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => onNavigate(tool.id)}
                className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 font-semibold group-hover:translate-x-2 transition-all duration-200"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-blue-800/50">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-white">Security First</h3>
            <p className="text-slate-300 leading-relaxed">
              All cryptographic operations are performed using industry-standard algorithms and best practices.
              Your passwords and keys are never stored on our servers, ensuring maximum security and privacy.
              This application uses the Web Crypto API for secure client-side operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;