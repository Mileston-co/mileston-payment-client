"use client";

import React, { useState, useEffect } from 'react';
import { X, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { detectEVMWallets, connectToWallet, DetectedWallet } from '@/core/walletDetection';

interface WalletSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletSelected: (wallet: DetectedWallet, address: string, provider: any) => void;
  onError: (error: Error) => void;
}

export function WalletSelectionModal({
  isOpen,
  onClose,
  onWalletSelected,
  onError,
}: WalletSelectionModalProps) {
  const [wallets, setWallets] = useState<DetectedWallet[]>([]);
  const [loading, setLoading] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const detectionResult = detectEVMWallets();
      setWallets(detectionResult.wallets);
    }
  }, [isOpen]);

  const handleWalletSelect = async (wallet: DetectedWallet) => {
    if (loading) return;

    try {
      setLoading(true);
      setConnectingWallet(wallet.name);

      const result = await connectToWallet(wallet);
      
      onWalletSelected(wallet, result.address, result.provider);
      onClose();
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
      onError(error as Error);
    } finally {
      setLoading(false);
      setConnectingWallet(null);
    }
  };

  const getWalletStatusIcon = (wallet: DetectedWallet) => {
    if (wallet.isConnected) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    if (wallet.isInstalled) {
      return <CheckCircle className="w-5 h-5 text-blue-500" />;
    }
    return <AlertCircle className="w-5 h-5 text-gray-400" />;
  };

  const getWalletStatusText = (wallet: DetectedWallet) => {
    if (wallet.isConnected) {
      return 'Connected';
    }
    if (wallet.isInstalled) {
      return 'Installed';
    }
    return 'Not Installed';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Connect Your Wallet
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
            aria-label="Close wallet selection modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {wallets.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Wallets Found
              </h3>
              <p className="text-gray-600 mb-4">
                No EVM-compatible wallets were detected in your browser.
              </p>
              <div className="space-y-2">
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Install MetaMask
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
                <br />
                <a
                  href="https://walletconnect.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Learn about WalletConnect
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Choose a wallet to connect and complete your payment:
              </p>
              
              {wallets.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => handleWalletSelect(wallet)}
                  disabled={loading || !wallet.isInstalled}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                    loading && connectingWallet === wallet.name
                      ? 'border-blue-300 bg-blue-50'
                      : wallet.isConnected
                      ? 'border-green-300 bg-green-50'
                      : wallet.isInstalled
                      ? 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50'
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{wallet.icon}</span>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">
                        {wallet.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getWalletStatusText(wallet)}
                      </div>
                      {wallet.address && (
                        <div className="text-xs text-gray-400 font-mono">
                          {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getWalletStatusIcon(wallet)}
                    {loading && connectingWallet === wallet.name && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            By connecting your wallet, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
} 