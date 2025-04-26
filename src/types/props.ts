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
 * Options for configuring the MilestonPayButton component.
 */
export interface MilestonPayButtonOptions {
    /**
     * The URL to initiate the payment process.
     * Optional.
     */
    paymentUrl?: string;

    /**
     * The unique identifier for the payment.
     * Optional.
     */
    paymentId?: string;

    /**
     * The type of payment being processed.
     * Can be one of the following:
     * - `"payment-link"`: A payment link.
     * - `"invoice"`: An invoice payment.
     * - `"recurring-payment"`: A recurring payment.
     * Optional.
     */
    paymentType?: "payment-link" | "invoice" | "recurring-payment";

    /**
     * Callback function to be executed when the payment is successfully completed.
     * Required.
     */
    onPaymentComplete: () => void;

    /**
     * Callback function to be executed when an error occurs during the payment process.
     * Receives an `Error` object as a parameter.
     * Required.
     */
    onPaymentError: (error: Error) => void;

    /**
     * The theme of the payment button.
     * Can be either:
     * - `"dark"`: Dark theme.
     * - `"light"`: Light theme.
     * Required.
     */
    theme: 'dark' | 'light';
}