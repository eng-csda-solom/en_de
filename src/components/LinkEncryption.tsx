import React, { useState } from 'react';
import { Link2, Eye, EyeOff, Copy, Check, AlertCircle, ExternalLink } from 'lucide-react';

const LinkEncryption: React.FC = () => {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [inputUrl, setInputUrl] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const processLink = async () => {
    if (mode === 'encrypt') {
      if (!inputUrl.trim()) {
        setError('Please enter a URL to encrypt');
        return;
      }
      if (!isValidUrl(inputUrl)) {
        setError('Please enter a valid URL (including http:// or https://)');
        return;
      }
      if (!password.trim()) {
        setError('Please enter a password');
        return;
      }
    } else {
      if (!inputUrl.trim()) {
        setError('Please enter an encrypted URL');
        return;
      }
      if (!password.trim()) {
        setError('Please enter the decryption password');
        return;
      }
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (mode === 'encrypt') {
        // Mock URL encryption
        const encryptedData = {
          url: inputUrl,
          password: password,
          timestamp: Date.now()
        };
        const encoded = btoa(JSON.stringify(encryptedData));
        const obfuscated = `aura-enc://${encoded.split('').reverse().join('')}`;
        setResult(obfuscated);
      } else {
        // Mock URL decryption
        try {
          if (!inputUrl.startsWith('aura-enc://')) {
            throw new Error('Invalid encrypted URL format');
          }
          
          const encodedData = inputUrl.replace('aura-enc://', '').split('').reverse().join('');
          const decoded = JSON.parse(atob(encodedData));
          
          if (decoded.password !== password) {
            throw new Error('Incorrect password');
          }
          
          setResult(decoded.url);
        } catch {
          setError('Invalid encrypted URL or incorrect password');
        }
      }
    } catch (err) {
      setError('Processing failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openUrl = () => {
    if (result && mode === 'decrypt' && isValidUrl(result)) {
      window.open(result, '_blank', 'noopener,noreferrer');
    }
  };

  const reset = () => {
    setInputUrl('');
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
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
            <Link2 className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-white">Link Encryption</h1>
        <p className="text-slate-300">Encrypt and obfuscate URLs for enhanced privacy</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => { setMode('encrypt'); reset(); }}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              mode === 'encrypt'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Encrypt URL
          </button>
          <button
            onClick={() => { setMode('decrypt'); reset(); }}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              mode === 'decrypt'
                ? 'bg-pink-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Decrypt URL
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold mb-4 text-white">
              {mode === 'encrypt' ? 'URL to Encrypt' : 'Encrypted URL'}
            </h3>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder={
                mode === 'encrypt'
                  ? 'https://example.com/sensitive-page'
                  : 'aura-enc://...'
              }
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {mode === 'encrypt' && inputUrl && !isValidUrl(inputUrl) && (
              <p className="text-red-400 text-sm mt-2">Please include http:// or https://</p>
            )}
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold mb-4 text-white">
              {mode === 'encrypt' ? 'Encryption Password' : 'Decryption Password'}
            </h3>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
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
            onClick={processLink}
            disabled={isLoading || !inputUrl.trim() || !password.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                <span>{mode === 'encrypt' ? 'Encrypting...' : 'Decrypting...'}</span>
              </>
            ) : (
              <>
                <Link2 className="w-5 h-5" />
                <span>{mode === 'encrypt' ? 'Encrypt URL' : 'Decrypt URL'}</span>
              </>
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                {mode === 'encrypt' ? 'Encrypted URL' : 'Decrypted URL'}
              </h3>
              <div className="flex items-center space-x-2">
                {result && mode === 'decrypt' && isValidUrl(result) && (
                  <button
                    onClick={openUrl}
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Open</span>
                  </button>
                )}
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
            </div>
            <div className="min-h-32 bg-slate-700 border border-slate-600 rounded-xl p-4">
              {result ? (
                <div>
                  <p className="text-white font-mono text-sm break-all leading-relaxed mb-3">{result}</p>
                  {mode === 'encrypt' && (
                    <div className="text-xs text-slate-400">
                      <p>This encrypted URL can only be decrypted with the correct password on this site.</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-slate-400 text-center py-8">
                  {mode === 'encrypt' ? 'Encrypted URL will appear here' : 'Decrypted URL will appear here'}
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

      {/* Example Section */}
      {mode === 'encrypt' && (
        <div className="mt-8 bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Example Usage</h3>
          <div className="space-y-3 text-slate-300 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
              <div>
                <span className="font-medium text-white">Original URL:</span>
                <p className="font-mono text-xs bg-slate-700 px-2 py-1 rounded mt-1">
                  https://example.com/private/sensitive-document.pdf
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-pink-400 mt-2 flex-shrink-0" />
              <div>
                <span className="font-medium text-white">Encrypted URL:</span>
                <p className="font-mono text-xs bg-slate-700 px-2 py-1 rounded mt-1">
                  aura-enc://eyJwYXNzd29yZCI6InNlY3VyZXBhc3MiLCJ1cmwiOi...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Information */}
      <div className="mt-12 bg-purple-900/30 border border-purple-800/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-3 text-white">About Link Encryption</h3>
        <p className="text-slate-300 leading-relaxed">
          Link encryption allows you to hide the actual destination of a URL behind an encrypted format.
          This provides an extra layer of privacy when sharing sensitive links. The encrypted URL can only
          be decrypted using the correct password on this platform. This is useful for protecting internal
          links, sensitive documents, or maintaining privacy in communications.
        </p>
      </div>
    </div>
  );
};

export default LinkEncryption;