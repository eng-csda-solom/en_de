import React, { useState } from 'react';
import { Key, Copy, Check, AlertCircle, RefreshCw, Lock, Unlock } from 'lucide-react';

const AsymmetricEncryption: React.FC = () => {
  const [step, setStep] = useState<'generate' | 'encrypt' | 'decrypt'>('generate');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<'public' | 'private' | 'result' | null>(null);

  const generateKeyPair = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate key generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock key pair generation
      const timestamp = Date.now();
      const mockPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA${btoa('public-key-' + timestamp).slice(0, 50)}
...
-----END PUBLIC KEY-----`;

      const mockPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC${btoa('private-key-' + timestamp).slice(0, 50)}
...
-----END PRIVATE KEY-----`;

      setPublicKey(mockPublicKey);
      setPrivateKey(mockPrivateKey);
      setStep('encrypt');
    } catch (err) {
      setError('Failed to generate key pair');
    } finally {
      setIsLoading(false);
    }
  };

  const encryptText = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to encrypt');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock encryption
      const encrypted = btoa(inputText + ':encrypted-with-public-key:' + Date.now());
      setResult(encrypted);
    } catch (err) {
      setError('Encryption failed');
    } finally {
      setIsLoading(false);
    }
  };

  const decryptText = async () => {
    if (!inputText.trim()) {
      setError('Please enter encrypted text');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock decryption
      try {
        const decoded = atob(inputText);
        const parts = decoded.split(':');
        if (parts.length >= 2 && parts[1] === 'encrypted-with-public-key') {
          setResult(parts[0]);
        } else {
          throw new Error('Invalid encrypted data');
        }
      } catch {
        setError('Invalid encrypted text or decryption failed');
      }
    } catch (err) {
      setError('Decryption failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (type: 'public' | 'private' | 'result') => {
    let textToCopy = '';
    switch (type) {
      case 'public':
        textToCopy = publicKey;
        break;
      case 'private':
        textToCopy = privateKey;
        break;
      case 'result':
        textToCopy = result;
        break;
    }

    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const reset = () => {
    setStep('generate');
    setPublicKey('');
    setPrivateKey('');
    setInputText('');
    setResult('');
    setError('');
    setCopied(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
            <Key className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-white">Asymmetric Encryption</h1>
        <p className="text-slate-300">Generate RSA key pairs and encrypt/decrypt messages</p>
      </div>

      {/* Step Navigation */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {['generate', 'encrypt', 'decrypt'].map((stepName, index) => (
            <React.Fragment key={stepName}>
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  step === stepName
                    ? 'bg-purple-600 text-white'
                    : publicKey && privateKey
                    ? 'bg-slate-700 text-slate-300 cursor-pointer hover:bg-slate-600'
                    : 'bg-slate-800 text-slate-500'
                }`}
                onClick={() => publicKey && privateKey && setStep(stepName as any)}
              >
                <div className="w-2 h-2 rounded-full bg-current" />
                <span className="capitalize font-medium">{stepName}</span>
              </div>
              {index < 2 && <div className="w-8 h-px bg-slate-600" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 1: Key Generation */}
      {step === 'generate' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center">
            <Key className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4 text-white">Generate Key Pair</h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Generate a new RSA public/private key pair. The public key can be shared to encrypt messages,
              while the private key must be kept secret for decryption.
            </p>
            <button
              onClick={generateKeyPair}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center space-x-2 mx-auto disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span>Generating Keys...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  <span>Generate Key Pair</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Key Display */}
      {(publicKey && privateKey) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Public Key */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Lock className="w-5 h-5 text-green-400" />
                <span>Public Key</span>
              </h3>
              <button
                onClick={() => handleCopy('public')}
                className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
              >
                {copied === 'public' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm">{copied === 'public' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-slate-700 rounded-xl p-4 max-h-32 overflow-y-auto">
              <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap break-all">
                {publicKey}
              </pre>
            </div>
            <p className="text-xs text-slate-400 mt-2">Share this key to receive encrypted messages</p>
          </div>

          {/* Private Key */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Unlock className="w-5 h-5 text-red-400" />
                <span>Private Key</span>
              </h3>
              <button
                onClick={() => handleCopy('private')}
                className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
              >
                {copied === 'private' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm">{copied === 'private' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-slate-700 rounded-xl p-4 max-h-32 overflow-y-auto">
              <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap break-all">
                {privateKey}
              </pre>
            </div>
            <p className="text-xs text-slate-400 mt-2">Keep this key secret - used for decryption</p>
          </div>
        </div>
      )}

      {/* Step 2 & 3: Encrypt/Decrypt */}
      {(step === 'encrypt' || step === 'decrypt') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold mb-4 text-white">
                {step === 'encrypt' ? 'Message to Encrypt' : 'Encrypted Message'}
              </h3>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={step === 'encrypt' ? 'Enter your message...' : 'Enter encrypted message...'}
                className="w-full h-32 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              onClick={step === 'encrypt' ? encryptText : decryptText}
              disabled={isLoading || !inputText.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span>{step === 'encrypt' ? 'Encrypting...' : 'Decrypting...'}</span>
                </>
              ) : (
                <>
                  {step === 'encrypt' ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                  <span>{step === 'encrypt' ? 'Encrypt Message' : 'Decrypt Message'}</span>
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {step === 'encrypt' ? 'Encrypted Result' : 'Decrypted Result'}
                </h3>
                {result && (
                  <button
                    onClick={() => handleCopy('result')}
                    className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {copied === 'result' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span className="text-sm">{copied === 'result' ? 'Copied!' : 'Copy'}</span>
                  </button>
                )}
              </div>
              <div className="min-h-32 bg-slate-700 border border-slate-600 rounded-xl p-4">
                {result ? (
                  <p className="text-white font-mono text-sm break-all leading-relaxed">{result}</p>
                ) : (
                  <p className="text-slate-400 text-center py-8">
                    {step === 'encrypt' ? 'Encrypted message will appear here' : 'Decrypted message will appear here'}
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

            <button
              onClick={reset}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-xl transition-colors"
            >
              Generate New Keys
            </button>
          </div>
        </div>
      )}

      {/* Information */}
      <div className="mt-12 bg-green-900/30 border border-green-800/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-3 text-white">About Asymmetric Encryption</h3>
        <p className="text-slate-300 leading-relaxed">
          Asymmetric encryption uses a pair of mathematically related keys: a public key for encryption and a private key for decryption. 
          Anyone can use your public key to send you encrypted messages, but only you can decrypt them with your private key. 
          RSA is widely used for secure communication and digital signatures.
        </p>
      </div>
    </div>
  );
};

export default AsymmetricEncryption;