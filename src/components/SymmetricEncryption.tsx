import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Copy, Upload, Download, Check, AlertCircle } from 'lucide-react';

const SymmetricEncryption: React.FC = () => {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [inputText, setInputText] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const processText = async () => {
    if (!inputText.trim() || !password.trim()) {
      setError('Please provide both text and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate encryption/decryption process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (mode === 'encrypt') {
        // Mock encryption result
        const mockEncrypted = btoa(inputText + ':' + password + ':encrypted:' + Date.now());
        setResult(mockEncrypted);
      } else {
        // Mock decryption result
        try {
          const decoded = atob(inputText);
          const parts = decoded.split(':');
          if (parts.length >= 2 && parts[1] === password) {
            setResult(parts[0]);
          } else {
            throw new Error('Invalid password or corrupted data');
          }
        } catch {
          setError('Invalid encrypted text or incorrect password');
        }
      }
    } catch (err) {
      setError('An error occurred during processing');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setInputText('');
    setPassword('');
    setResult('');
    setError('');
    setCopied(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-white">Symmetric Encryption</h1>
        <p className="text-slate-300">Encrypt and decrypt data using AES-256 with a password</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => { setMode('encrypt'); reset(); }}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              mode === 'encrypt'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Encrypt
          </button>
          <button
            onClick={() => { setMode('decrypt'); reset(); }}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              mode === 'decrypt'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Decrypt
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold mb-4 text-white">
              {mode === 'encrypt' ? 'Text to Encrypt' : 'Encrypted Text'}
            </h3>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === 'encrypt' ? 'Enter your text here...' : 'Enter encrypted text here...'}
              className="w-full h-32 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold mb-4 text-white">Password</h3>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 pr-12 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            onClick={processText}
            disabled={isLoading || !inputText.trim() || !password.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                <span>{mode === 'encrypt' ? 'Encrypting...' : 'Decrypting...'}</span>
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                <span>{mode === 'encrypt' ? 'Encrypt Text' : 'Decrypt Text'}</span>
              </>
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                {mode === 'encrypt' ? 'Encrypted Result' : 'Decrypted Result'}
              </h3>
              {result && (
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              )}
            </div>
            <div className="min-h-32 bg-slate-700 border border-slate-600 rounded-xl p-4">
              {result ? (
                <p className="text-white font-mono text-sm break-all leading-relaxed">{result}</p>
              ) : (
                <p className="text-slate-400 text-center py-8">
                  {mode === 'encrypt' ? 'Encrypted text will appear here' : 'Decrypted text will appear here'}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-700 rounded-xl p-4 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {result && (
            <button
              onClick={reset}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-xl transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Information */}
      <div className="mt-12 bg-blue-900/30 border border-blue-800/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-3 text-white">About Symmetric Encryption</h3>
        <p className="text-slate-300 leading-relaxed">
          Symmetric encryption uses the same key (password) for both encryption and decryption. 
          AES-256 is a highly secure encryption standard used by governments and organizations worldwide. 
          Make sure to use a strong, unique password and keep it safe - without it, your encrypted data cannot be recovered.
        </p>
      </div>
    </div>
  );
};

export default SymmetricEncryption;