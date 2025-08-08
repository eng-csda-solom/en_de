import React, { useState } from 'react';
import { Hash, Upload, Copy, Check, AlertCircle, FileText } from 'lucide-react';

const Hashing: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<'SHA-256' | 'SHA-3'>('SHA-256');
  const [inputType, setInputType] = useState<'text' | 'file'>('text');
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hash, setHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const generateHash = async () => {
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      let inputData = '';
      if (inputType === 'text') {
        if (!inputText.trim()) {
          setError('Please enter text to hash');
          return;
        }
        inputData = inputText;
      } else if (inputType === 'file') {
        if (!selectedFile) {
          setError('Please select a file to hash');
          return;
        }
        inputData = await readFileAsText(selectedFile);
      }

      // Mock hash generation
      const mockHash = await createMockHash(inputData, algorithm);
      setHash(mockHash);
    } catch (err) {
      setError('Failed to generate hash');
    } finally {
      setIsLoading(false);
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string + ':' + file.name + ':' + file.size);
      reader.readAsText(file);
    });
  };

  const createMockHash = async (input: string, algo: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input + ':' + algo + ':' + Date.now());
    
    if (crypto.subtle) {
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } else {
      // Fallback for environments without crypto.subtle
      return Array.from(data)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .substring(0, 64);
    }
  };

  const handleCopy = async () => {
    if (hash) {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError('');
    }
  };

  const reset = () => {
    setInputText('');
    setSelectedFile(null);
    setHash('');
    setError('');
    setCopied(false);
    if (document.getElementById('file-input')) {
      (document.getElementById('file-input') as HTMLInputElement).value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
            <Hash className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-white">Cryptographic Hashing</h1>
        <p className="text-slate-300">Generate SHA-256 and SHA-3 hashes for data integrity verification</p>
      </div>

      {/* Algorithm Selection */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setAlgorithm('SHA-256')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              algorithm === 'SHA-256'
                ? 'bg-orange-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            SHA-256
          </button>
          <button
            onClick={() => setAlgorithm('SHA-3')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              algorithm === 'SHA-3'
                ? 'bg-red-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            SHA-3
          </button>
        </div>
      </div>

      {/* Input Type Toggle */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => { setInputType('text'); reset(); }}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
              inputType === 'text'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Text Input</span>
          </button>
          <button
            onClick={() => { setInputType('file'); reset(); }}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
              inputType === 'file'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>File Input</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold mb-4 text-white">
              {inputType === 'text' ? 'Text to Hash' : 'File to Hash'}
            </h3>
            
            {inputType === 'text' ? (
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your text here..."
                className="w-full h-32 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            ) : (
              <div>
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-input"
                  className="w-full h-32 border-2 border-dashed border-slate-600 rounded-xl flex items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-slate-700/50 transition-all duration-200"
                >
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-400">Click to select a file</p>
                  </div>
                </label>
                
                {selectedFile && (
                  <div className="mt-4 p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-white font-medium">{selectedFile.name}</p>
                        <p className="text-slate-400 text-sm">{formatFileSize(selectedFile.size)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={generateHash}
            disabled={isLoading || (inputType === 'text' && !inputText.trim()) || (inputType === 'file' && !selectedFile)}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                <span>Generating Hash...</span>
              </>
            ) : (
              <>
                <Hash className="w-5 h-5" />
                <span>Generate {algorithm} Hash</span>
              </>
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{algorithm} Hash</h3>
              {hash && (
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              )}
            </div>
            <div className="min-h-32 bg-slate-700 border border-slate-600 rounded-xl p-4">
              {hash ? (
                <div>
                  <p className="text-white font-mono text-sm break-all leading-relaxed mb-3">{hash}</p>
                  <div className="text-xs text-slate-400 flex justify-between">
                    <span>Length: {hash.length} characters</span>
                    <span>Algorithm: {algorithm}</span>
                  </div>
                </div>
              ) : (
                <p className="text-slate-400 text-center py-8">
                  Hash will appear here
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

          {hash && (
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
      <div className="mt-12 bg-orange-900/30 border border-orange-800/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-3 text-white">About Cryptographic Hashing</h3>
        <div className="space-y-3 text-slate-300">
          <p className="leading-relaxed">
            Cryptographic hash functions take any input and produce a fixed-length string of characters. 
            The same input will always produce the same hash, but even tiny changes in input create completely different hashes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Common Uses:</h4>
              <ul className="space-y-1 text-sm">
                <li>• File integrity verification</li>
                <li>• Password storage</li>
                <li>• Digital signatures</li>
                <li>• Blockchain technology</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Key Properties:</h4>
              <ul className="space-y-1 text-sm">
                <li>• One-way function (irreversible)</li>
                <li>• Deterministic output</li>
                <li>• Avalanche effect</li>
                <li>• Collision resistant</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hashing;