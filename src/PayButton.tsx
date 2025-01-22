import React, { useState, useCallback, useEffect } from 'react';

/**
 * Props for the PayButton component
 */
export interface PayButtonProps {
  /** Text to display on the button */
  children: React.ReactNode;
  /** Function to call when payment is complete */
  onPaymentComplete: () => void;
  /** Custom styles for the button */
  style?: React.CSSProperties;
  /** Custom class name for the button */
  className?: string;
  /** URL for the payment page */
  paymentUrl?: string;
  /** Type of payment */
  paymentType?: 'payment-link' | 'invoice' | 'recurring-payment';
  /** ID of the payment */
  paymentId?: string;
}

/**
 * A customizable payment button that opens a popup for processing payments
 */
export const PayButton: React.FC<PayButtonProps> = ({
  children,
  onPaymentComplete,
  style,
  className,
  paymentUrl,
  paymentType,
  paymentId,
}) => {
  const [popupWindow, setPopupWindow] = useState<Window | null>(null);

  const openPopup = useCallback(() => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const url = paymentUrl || (paymentType && paymentId
      ? `https://checkout.mileston.co/${paymentType}/${paymentId}`
      : '');

    if (!url) {
      console.error('PayButton: No payment URL provided');
      return;
    }

    const popup = window.open(
      url,
      'PaymentPopup',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    setPopupWindow(popup);
  }, [paymentUrl, paymentType, paymentId]);

  useEffect(() => {
    const checkPopupClosed = setInterval(() => {
      if (popupWindow && popupWindow.closed) {
        clearInterval(checkPopupClosed);
        onPaymentComplete();
      }
    }, 1000);

    return () => clearInterval(checkPopupClosed);
  }, [popupWindow, onPaymentComplete]);

  return (
    <button
      onClick={openPopup}
      style={style}
      className={className}
    >
      {children}
    </button>
  );
};
