import React, { useState, useCallback } from 'react';

/**
 * Props for the PayButton component
 */
export interface PayButtonProps {
  /** Text to display on the button */
  children: React.ReactNode;
  /** Function to call when payment is complete */
  onPaymentComplete: () => void;
  /** Function to call when payment fails */
  onPaymentError: (error: Error) => void;
  /** Custom styles for the button */
  style?: React.CSSProperties;
  /** Custom class name for the button */
  className?: string;
  /** URL for the payment page */
  paymentUrl?: string;
  /** Type of payment */
  paymentType?: 'payment-link' | 'invoice' | 'recurring-payment';
}

/**
 * A customizable payment button that opens a popup for processing payments
 */
export const PayButton: React.FC<PayButtonProps> = ({
  children,
  onPaymentComplete,
  onPaymentError,
  style,
  className,
  paymentUrl,
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
      if (data.success) {
        return true;
      } else if (data.error) {
        return false;
      } else {
        throw new Error('Invalid response from verification endpoint');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }, []);

  const handlePayWithMileston = useCallback(async () => {
    setIsLoading(true);

    try {
      const popupWidth = 500;
      const popupHeight = 500;

      const screenWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
      const screenHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;

      const systemLeft = (screenWidth - popupWidth) / 2;
      const systemTop = (screenHeight - popupHeight) / 2;

      const url = paymentUrl || (paymentType
        ? `https://checkout.mileston.co/${paymentType}`
        : 'https://demo.mileston.co/pay');

      const authWindow = window.open(
        url,
        "_blank",
        `width=${popupWidth},height=${popupHeight},toolbar=no,menubar=no,scrollbars=yes,resizable=no,top=${systemTop},left=${systemLeft}`
      );

      if (authWindow) {
        window.addEventListener('message', async (event) => {
          if (event.origin === 'https://checkout.mileston.co' && event.data.walletAddress && event.data.paymentId) {
            authWindow.close();
            setIsVerifying(true);
            try {
              const success = await verifyPayment(paymentType || 'payment-link', event.data.paymentId, event.data.walletAddress);
              if (success) {
                setIsComplete(true);
                onPaymentComplete();
              } else {
                throw new Error('Payment was not successful');
              }
            } catch (error) {
              onPaymentError(error as Error);
            } finally {
              setIsVerifying(false);
              setIsLoading(false);
            }
          }
        }, { once: true });

        const timer = setInterval(() => {
          if (authWindow.closed) {
            clearInterval(timer);
            setIsLoading(false);
          }
        }, 500);
      }
    } catch (error) {
      console.error("Error in payment flow:", error);
      onPaymentError(error as Error);
      setIsLoading(false);
    }
  }, [paymentUrl, paymentType, verifyPayment, onPaymentComplete, onPaymentError]);

  let buttonText = children;
  if (isVerifying) {
    buttonText = 'Verifying Payment';
  } else if (isComplete) {
    buttonText = 'Payment Complete';
  }

  return (
    <button
      onClick={handlePayWithMileston}
      style={style}
      className={className}
      disabled={isLoading || isVerifying || isComplete}
    >
      {isLoading || isVerifying ? (
        <span className="loading-icon">⟳</span>
      ) : null}
      {buttonText}
    </button>
  );
};
