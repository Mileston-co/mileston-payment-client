import React, { useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Props for the PayButton component
 */
export interface PayButtonProps {
  /** Text to display on the button */
  children: React.ReactNode;
  /** Function to call when payment is complete */
  onPaymentComplete: () => void;
  /** Function to call when payment data is received from opened window before verification.
   * In case if payment verification failed due to network issues or other issues, 
   * you can immediately save the data and recall the verification 
   * endpoints you will find in our doc to verify payments and give value to your users.
   */
  onPaymentDataRecieved: (data: { walletAddress: string, id: string }) => void;
  /** Function to call when payment fails */
  onPaymentError: (error: Error) => void;
  /** Set a theme for the checkout page. Defaults to light or system settings */
  theme: 'dark' | 'light'
  /** Custom styles for the button */
  style?: React.CSSProperties;
  /** Custom class name for the button */
  className?: string;
  /** URL for the payment page */
  paymentUrl?: string;
  /** Id for the payment page */
  paymentId?: string;
  /** Type of payment */
  paymentType?: 'payment-link' | 'invoice' | 'recurring-payment';
}

/**
 * A customizable payment button that opens a popup for processing payments
 */
export const PayButton: React.FC<PayButtonProps> = ({
  children,
  onPaymentComplete,
  onPaymentDataRecieved,
  onPaymentError,
  theme = 'light',
  style,
  className,
  paymentUrl,
  paymentId,
  paymentType,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const getVerificationEndpoint = (type: string): string => {
    switch (type) {
      case 'invoice':
        return 'https://invoice-service.mileston.co/invoice/verify';
      case 'payment-link':
        return 'https://payment-service.mileston.co/payment-link/verify';
      case 'recurring-payment':
        return 'https://recurring-service.mileston.co/recurring-payment/verify';
      default:
        throw new Error('Invalid payment type');
    }
  };

  const verifyPayment = useCallback(async (type: string, id: string, walletAddress: string) => {
    try {
      const endpoint = getVerificationEndpoint(type);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress, id }),
      });
      if (!response.ok) {
        throw new Error('Payment verification request failed');
      }
      const data = await response.json();
      return data.success || false;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }, []);

  const handlePayWithMileston = useCallback(async () => {
    setIsLoading(true);
    const popupWidth = 500;
    const popupHeight = 500;
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;
    const systemLeft = (screenWidth - popupWidth) / 2;
    const systemTop = (screenHeight - popupHeight) / 2;

    const url = `${paymentUrl}?parentOrigin=${encodeURIComponent(window.location.origin)}` || (paymentType && paymentId
      ? `https://checkout.mileston.co/${paymentType}/${paymentId}?parentOrigin=${encodeURIComponent(window.location.origin)}?theme=${theme}`
      : 'https://demo.mileston.co/pay');

    const authWindow = window.open(
      url,
      "_blank",
      `width=${popupWidth},height=${popupHeight},toolbar=no,menubar=no,scrollbars=yes,resizable=no,top=${systemTop},left=${systemLeft}`
    );

    if (authWindow) {
      const messageHandler = async (event: MessageEvent) => {
        if (event.origin !== 'https://checkout.mileston.co') return;

        if (event.data.walletAddress && event.data.paymentId) {
          try {
            onPaymentDataRecieved({
              walletAddress: event.data.walletAddress,
              id: event.data.paymentId,
            });
            setIsVerifying(true);
            const success = await verifyPayment(
              paymentType || 'payment-link',
              event.data.paymentId,
              event.data.walletAddress
            );
            authWindow.close();
            if (success) {
              setIsComplete(true);
              onPaymentComplete();
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            onPaymentError(error as Error);
          } finally {
            setIsVerifying(false);
            setIsLoading(false);
          }
        }
      };

      window.addEventListener('message', messageHandler, false);

      const timer = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(timer);
          window.removeEventListener('message', messageHandler);
          setIsLoading(false);
        }
      }, 500);
    } else {
      console.error('Failed to open payment popup');
      setIsLoading(false);
    }
  }, [paymentUrl, paymentType, verifyPayment, onPaymentComplete, onPaymentError]);

  return (
    <button
      onClick={handlePayWithMileston}
      style={style}
      className={className}
      disabled={isLoading || isVerifying || isComplete}
    >
      {isLoading || isVerifying ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader2
            style={{
              animation: 'spin 1s linear infinite',
              marginRight: '8px', // This replaces `mr-2`
            }}
          />
          {isVerifying ? 'Verifying Payment' : 'Processing Payment...'}
        </div>
      ) : (
        children
      )}
    </button>
  );
};
