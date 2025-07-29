# EVM Wallet Detection & Selection System

This system provides automatic detection of EVM-compatible wallets in the browser and allows users to select their preferred wallet before making payments.

## Features

- **Automatic Wallet Detection**: Detects installed EVM wallets in the browser
- **Custom Wallet Selection Modal**: Beautiful, accessible modal for wallet selection
- **Enhanced Payment Flow**: Integrates wallet selection into the payment process
- **Multi-Wallet Support**: Supports MetaMask, Coinbase Wallet, Trust Wallet, Rainbow, Phantom, Brave Wallet, OKX Wallet, and WalletConnect
- **Connection Status**: Shows which wallets are installed, connected, or not installed
- **Error Handling**: Comprehensive error handling for wallet connection issues

## Components

### 1. Wallet Detection Utility (`src/core/walletDetection.ts`)

Core utility for detecting available EVM wallets in the browser.

```typescript
import { detectEVMWallets, connectToWallet, DetectedWallet } from '@/core/walletDetection';

// Detect available wallets
const result = detectEVMWallets();
console.log('Available wallets:', result.wallets);
console.log('Has any wallet:', result.hasAnyWallet);
console.log('Connected wallet:', result.connectedWallet);

// Connect to a specific wallet
const wallet = result.wallets[0];
const connection = await connectToWallet(wallet);
console.log('Connected address:', connection.address);
```

### 2. Wallet Selection Modal (`src/react/components/WalletSelectionModal.tsx`)

Custom modal component for wallet selection.

```typescript
import { WalletSelectionModal } from '@/react/components/WalletSelectionModal';

<WalletSelectionModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onWalletSelected={(wallet, address, provider) => {
    console.log('Selected wallet:', wallet.name);
    console.log('Address:', address);
  }}
  onError={(error) => {
    console.error('Wallet selection error:', error);
  }}
/>
```

### 3. Enhanced Wallet Connect (`src/core/enhancedWalletConnect.ts`)

Enhanced version of the payment function that integrates with wallet detection.

```typescript
import { handlePayWithEVMWalletConnectEnhanced } from '@/core/enhancedWalletConnect';

const result = await handlePayWithEVMWalletConnectEnhanced({
  env: 'test',
  evm: 'base',
  recipientAddress: '0x...',
  amount: '100',
  token: 'USDC',
  // Optional: pre-selected wallet
  selectedWallet: detectedWallet,
  walletAddress: '0x...',
  walletProvider: provider,
});
```

### 4. Updated Payment Component (`src/react/components/payment-methods/wallet-connect-payment.tsx`)

The payment component now automatically shows the wallet selection modal for EVM chains when no wallet is connected.

## How It Works

### 1. Wallet Detection

When a user clicks "Pay" on an EVM chain:

1. **Check for Connected Wallet**: The system first checks if any wallet is already connected
2. **Show Modal if Needed**: If no wallet is connected, the wallet selection modal appears
3. **User Selection**: User selects their preferred wallet from the list
4. **Connection**: The selected wallet is connected automatically
5. **Payment Proceeds**: The payment flow continues with the selected wallet

### 2. Supported Wallets

The system detects and supports:

- 🦊 **MetaMask** - Most popular Ethereum wallet
- 🔷 **Core Wallet** - Avalanche's official wallet
- 🔗 **WalletConnect** - Multi-wallet connection protocol
- 🪙 **Coinbase Wallet** - Coinbase's official wallet
- 🛡️ **Trust Wallet** - Binance's mobile wallet
- 🌈 **Rainbow** - Beautiful mobile wallet
- 👻 **Phantom** - Popular Solana wallet (EVM support)
- 🦁 **Brave Wallet** - Built into Brave browser
- ⚡ **OKX Wallet** - OKX exchange wallet
- 🐰 **Rabby Wallet** - DeBank's security-focused wallet
- 💼 **TokenPocket** - Popular mobile wallet
- 🟡 **Bitget Wallet** - Bitget exchange wallet
- 📊 **Bybit Wallet** - Bybit exchange wallet
- 🚪 **Gate Wallet** - Gate.io exchange wallet
- 🔥 **Huobi Wallet** - Huobi exchange wallet
- 🟡 **Binance Wallet** - Binance exchange wallet

### 3. Connection States

Each wallet shows its current state:

- **Connected** (Green) - Wallet is installed and connected
- **Installed** (Blue) - Wallet is installed but not connected
- **Not Installed** (Gray) - Wallet is not installed

## Usage Examples

### Basic Wallet Detection

```typescript
import { detectEVMWallets } from '@/core/walletDetection';

// Detect wallets
const { wallets, hasAnyWallet, connectedWallet } = detectEVMWallets();

if (!hasAnyWallet) {
  console.log('No wallets found');
} else if (connectedWallet) {
  console.log('Wallet already connected:', connectedWallet.name);
} else {
  console.log('Wallets available but none connected');
}
```

### Integration with Payment Flow

The wallet detection is automatically integrated into the payment flow. When using the `WalletConnectPayment` component:

1. User selects an EVM network (Base, Ethereum, etc.)
2. User selects a token (USDC, ETH, etc.)
3. User clicks "Connect Wallet & Pay"
4. If no wallet is connected, the wallet selection modal appears
5. User selects their wallet
6. Payment proceeds automatically

### Custom Wallet Selection

```typescript
import { WalletSelectionModal } from '@/react/components/WalletSelectionModal';

function MyComponent() {
  const [showModal, setShowModal] = useState(false);

  const handleWalletSelected = (wallet, address, provider) => {
    console.log('Selected wallet:', wallet.name);
    // Proceed with payment using the selected wallet
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Select Wallet
      </button>
      
      <WalletSelectionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onWalletSelected={handleWalletSelected}
        onError={(error) => console.error(error)}
      />
    </div>
  );
}
```

## Error Handling

The system handles various error scenarios:

- **No Wallets Found**: Shows helpful links to install popular wallets
- **Connection Failed**: Displays specific error messages
- **Network Mismatch**: Automatically attempts to switch networks
- **User Rejection**: Handles when users reject connection requests

## Styling

The wallet selection modal uses Tailwind CSS and includes:

- Responsive design
- Loading states
- Hover effects
- Accessibility features (ARIA labels, keyboard navigation)
- Dark/light mode support

## Browser Compatibility

The wallet detection works in all modern browsers that support:

- `window.ethereum` (MetaMask and other wallet providers)
- `window.WalletConnect` (WalletConnect)
- Modern JavaScript features

## Testing

Use the `WalletDetectionDemo` component to test the wallet detection:

```typescript
import { WalletDetectionDemo } from '@/react/components/WalletDetectionDemo';

// In your app
<WalletDetectionDemo />
```

This will show:
- Available wallets in the browser
- Connection status of each wallet
- The wallet selection modal
- Selected wallet information

## Future Enhancements

Potential improvements:

1. **More Wallet Support**: Add support for more wallet providers
2. **Wallet Preferences**: Remember user's preferred wallet
3. **Mobile Detection**: Better detection for mobile wallets
4. **Chain Switching**: Automatic chain switching for incompatible networks
5. **Analytics**: Track wallet usage patterns
6. **Custom Styling**: Allow customization of the modal appearance

## Troubleshooting

### Common Issues

1. **No wallets detected**: Ensure you have a wallet extension installed
2. **Connection fails**: Check if the wallet is unlocked and the correct network is selected
3. **Modal doesn't appear**: Check if the component is properly imported and the state is managed correctly

### Debug Mode

Enable debug logging by checking the browser console for detailed information about:
- Wallet detection results
- Connection attempts
- Error messages
- Payment flow status 