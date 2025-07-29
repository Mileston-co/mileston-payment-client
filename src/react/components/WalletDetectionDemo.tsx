"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { detectEVMWallets, DetectedWallet, isWalletAvailable, getBestAvailableWallet } from '@/core/walletDetection';
import { WalletSelectionModal } from './WalletSelectionModal';

export function WalletDetectionDemo() {
  const [detectionResult, setDetectionResult] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<DetectedWallet | null>(null);

  useEffect(() => {
    // Detect wallets on component mount
    const result = detectEVMWallets();
    setDetectionResult(result);
  }, []);

  const handleWalletSelected = (wallet: DetectedWallet, address: string, provider: any) => {
    setSelectedWallet(wallet);
    setShowModal(false);
    console.log('Selected wallet:', wallet.name, 'Address:', address);
  };

  const handleError = (error: Error) => {
    console.error('Wallet selection error:', error);
    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Wallet Detection Demo</h2>
      
      {detectionResult && (
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Detection Results:</h3>
            <p>Has any wallet: {detectionResult.hasAnyWallet ? 'Yes' : 'No'}</p>
            <p>Connected wallet: {detectionResult.connectedWallet?.name || 'None'}</p>
            <p>Available wallets: {detectionResult.wallets.length}</p>
          </div>

          {detectionResult.wallets.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Available Wallets:</h3>
              {detectionResult.wallets.map((wallet: DetectedWallet) => (
                <div key={wallet.name} className="flex items-center space-x-2 p-2 bg-white border rounded">
                  <span className="text-xl">{wallet.icon}</span>
                  <span className="font-medium">{wallet.name}</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    wallet.isConnected 
                      ? 'bg-green-100 text-green-800' 
                      : wallet.isInstalled 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    {wallet.isConnected ? 'Connected' : wallet.isInstalled ? 'Installed' : 'Not Installed'}
                  </span>
                  {wallet.address && (
                    <span className="text-xs text-gray-500 font-mono">
                      {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <Button 
            onClick={() => setShowModal(true)}
            className="w-full"
          >
            Show Wallet Selection Modal
          </Button>

          {selectedWallet && (
            <div className="p-4 bg-green-100 rounded-lg">
              <h3 className="font-semibold text-green-800">Selected Wallet:</h3>
              <p className="text-green-700">
                {selectedWallet.icon} {selectedWallet.name}
              </p>
            </div>
          )}

          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Utility Functions:</h3>
            <div className="space-y-2 text-sm">
              <p>Core Wallet Available: {isWalletAvailable('Core Wallet') ? 'Yes' : 'No'}</p>
              <p>MetaMask Available: {isWalletAvailable('MetaMask') ? 'Yes' : 'No'}</p>
              <p>Best Available Wallet: {getBestAvailableWallet()?.name || 'None'}</p>
            </div>
          </div>
        </div>
      )}

      <WalletSelectionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onWalletSelected={handleWalletSelected}
        onError={handleError}
      />
    </div>
  );
} 