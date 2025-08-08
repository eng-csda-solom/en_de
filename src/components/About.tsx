import React from 'react';
import { Shield, Key, Hash, Link2, Lock, Eye, Zap, Globe } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Symmetric Encryption',
      description: 'AES-256 encryption using a single password for both encryption and decryption.',
      color: 'from-blue-500 to-purple-600',
    },
    {
      icon: Key,
      title: 'Asymmetric Encryption',
      description: 'RSA encryption with public/private key pairs for secure communication.',
      color: 'from-green-500 to-blue-600',
    },
    {
      icon: Hash,
      title: 'Cryptographic Hashing',
      description: 'SHA-256 and SHA-3 algorithms for data integrity and verification.',
      color: 'from-orange-500 to-red-600',
    },
    {
      icon: Link2,
      title: 'Link Encryption',
      description: 'Obfuscate and encrypt URLs for enhanced privacy protection.',
      color: 'from-purple-500 to-pink-600',
    },
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: 'Client-Side Processing',
      description: 'All encryption operations are performed in your browser for maximum security.',
    },
    {
      icon: Eye,
      title: 'No Data Storage',
      description: 'We never store your passwords, keys, or encrypted data on our servers.',
    },
    {
      icon: Zap,
      title: 'Fast & Efficient',
      description: 'Optimized algorithms provide fast encryption without compromising security.',
    },
    {
      icon: Globe,
      title: 'Open Source',
      description: 'Transparent, auditable code that you can trust with your sensitive data.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-16 h-16 text-purple-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          About Aura Encrypt
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          A comprehensive, secure, and user-friendly encryption suite designed to protect your digital communications
          and data with military-grade cryptographic algorithms.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 mb-12 border border-purple-800/50">
        <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
        <p className="text-slate-300 leading-relaxed text-lg">
          To democratize access to enterprise-grade encryption tools by providing an intuitive, 
          web-based platform that makes complex cryptographic operations simple and accessible to everyone. 
          We believe that privacy and security should be fundamental rights, not privileges.
        </p>
      </div>

      {/* Encryption Tools */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Encryption Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Features */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Security Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex items-start space-x-4"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Algorithm Details */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Cryptographic Standards</h2>
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-3 text-blue-400">AES-256</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Advanced Encryption Standard with 256-bit keys. Used by governments and military organizations worldwide.
                Provides symmetric encryption with exceptional security and performance.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 text-green-400">RSA-2048</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Rivest-Shamir-Adleman algorithm with 2048-bit keys. Industry standard for asymmetric encryption,
                digital signatures, and secure key exchange protocols.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 text-orange-400">SHA-256/SHA-3</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Secure Hash Algorithms producing 256-bit hashes. Used for data integrity verification,
                digital forensics, and blockchain applications.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Common Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Secure Communication',
              description: 'Encrypt messages and files before sending through insecure channels.',
            },
            {
              title: 'Data Protection',
              description: 'Protect sensitive documents and personal information from unauthorized access.',
            },
            {
              title: 'File Integrity',
              description: 'Verify that files haven\'t been corrupted or tampered with using hashes.',
            },
            {
              title: 'Password Security',
              description: 'Generate secure hashes for password storage and verification.',
            },
            {
              title: 'Link Privacy',
              description: 'Hide sensitive URLs when sharing links in public communications.',
            },
            {
              title: 'Digital Forensics',
              description: 'Create cryptographic fingerprints for evidence and audit trails.',
            },
          ].map((useCase, index) => (
            <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold mb-3 text-white">{useCase.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-white">Security Best Practices</h2>
        <div className="space-y-4 text-slate-300">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
            <p>Always use strong, unique passwords for encryption. Consider using a password manager.</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
            <p>Never share your private keys or encryption passwords through insecure channels.</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
            <p>Verify file hashes to ensure data integrity when transferring sensitive information.</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
            <p>Regularly update your encryption keys and use different keys for different purposes.</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
            <p>Keep backup copies of important encrypted data and store them securely offline.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;