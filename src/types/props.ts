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
