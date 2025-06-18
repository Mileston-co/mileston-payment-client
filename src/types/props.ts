import { ReactNode } from "react";
import { env, PaymentDto, PaymentType } from "./core";

/**
 * Props for the PayButton component.
 * This component provides a customizable button for initiating payment processes.
 */
export interface PayButtonProps {
    /** React node to be rendered as the button's content */
    children: React.ReactNode;

    /** Callback function executed when payment is successfully completed */
    onPaymentComplete: () => void;

    /**
     * Callback function executed when payment data is received before verification.
     * Useful for handling cases where payment verification fails due to network issues.
     * The data can be saved and verification can be retried later using the verification endpoints.
     * @param data - Object containing wallet address and payment ID
     */
    onPaymentDataRecieved: (data: { walletAddress: string, id: string }) => void;

    /** 
     * Callback function executed when payment process encounters an error
     * @param error - The error object containing details about what went wrong
     */
    onPaymentError: (error: Error) => void;

    /** Theme setting for the checkout page. Defaults to light or system settings */
    theme: 'dark' | 'light';

    /** Optional custom styles to apply to the button */
    style?: React.CSSProperties;

    /** Optional CSS class name for custom styling */
    className?: string;

    /** Optional URL for the payment page */
    paymentUrl?: string;

    /** Optional unique identifier for the payment */
    paymentId?: string;

    /** Optional type of payment to process */
    paymentType?: 'payment-link' | 'invoice' | 'recurring-payment';
}

export interface Theme {
    colorScheme: "light" | "dark" | "system"
    primaryColor?: string
    secondaryColor?: string
    backgroundColor?: string
    textColor?: string
}

/**
 * Represents a subscription plan
 */
export interface SubscriptionPlan {
    /** Unique identifier for the plan */
    id: string
    /** Name of the subscription plan */
    name: string
    /** Optional description of the plan */
    description?: string
    /** Billing interval (daily, weekly, monthly, yearly) */
    interval: "daily" | "weekly" | "monthly" | "yearly"
    /** Number of intervals between billings (e.g., 1 for monthly, 3 for quarterly) */
    intervalCount: number
    /** Price amount for the subscription */
    amount: number
    /** Currency code (e.g., USD, EUR) */
    currency?: string
}

/**
 * Common props shared across different payment method components.
 * Provides a standardized interface for handling various payment scenarios.
 */
export interface PaymentMethodProps {
    /** 
     * Callback for successful wallet connect payments
     * @param networkId - ID of the blockchain network used
     * @param tokenId - ID of the token used for payment
     */
    onWalletConnectPaymentComplete: (networkId: string, tokenId: string) => void;

    /** 
     * Callback for wallet connect payment errors
     * @param error - Error object with failure details
     */
    onWalletConnectPaymentError: (error: Error) => void;

    /** 
     * Callback for successful QR code payments
     * @param networkId - ID of the blockchain network used
     * @param tokenId - ID of the token used for payment
     */
    onQrCodePaymentComplete: (networkId: string, tokenId: string) => void;

    /** 
     * Callback for QR code payment errors
     * @param error - Error object with failure details
     */
    onQrCodePaymentError: (error: Error) => void;

    /** Callback for successful card payments */
    onCardPaymentComplete: () => void;

    /** 
     * Callback for card payment errors
     * @param error - Error object with failure details
     */
    onCardPaymentError: (error: Error) => void;

    /** Payment amount as a string */
    amount: string;

    /** Environment setting (test/prod) */
    env: env;

    /** Unique identifier for the payment link */
    paymentLinkId: string;

    /** 
     * Mapping of blockchain networks to wallet addresses
     * Keys are network identifiers, values are wallet addresses
     */
    recipientWalletAddress: {
        [key: string]: string;
    };

    /** Optional custom text for the wallet connect button */
    walletConnectButtonText?: string;

    /** Optional custom text for the QR code button */
    qrCodeButtonText?: string;

    /** Optional custom text for the card payment button */
    cardButtonText?: string;

    /** Optional CSS class name for styling buttons */
    buttonClassName?: string;

    /** Optional title for the card payment dialog */
    dialogTitle?: string;

    /** Optional description for the card payment dialog */
    dialogDescription?: string;

    /** Optional user id of the user */
    userUUID?: string;

    /** Optional sub wallet uuid */
    subWalletUuid?: string;

    /** Optional flag to show or hide the card payment option */
    showCardPayment?: boolean;
}

/**
 * Props for the Subscription Checkout component.
 * Extends PaymentMethodProps with subscription-specific properties.
 */
export interface SubscriptionCheckoutProps extends PaymentMethodProps {
    /** Name of the business offering the subscription */
    businessName: string;

    /** Optional URL to the business logo */
    businessLogo?: string;

    /** Subscription plan details */
    plan: SubscriptionPlan;

    /** Optional CSS class name for custom styling */
    className?: string;

    /** Optional text to display in the component footer */
    footerText?: string;

    /** Optional text for the cancel button */
    cancelText?: string;
}

/**
 * Props for the PaymentOptions component.
 * Extends PaymentMethodProps with tab-related properties.
 */
export interface PaymentOptionsProps extends PaymentMethodProps {
    /** Default selected payment tab */
    defaultTab?: "wallet" | "qrcode" | "card";

    /** 
     * Callback triggered when payment tab changes
     * @param tab - The newly selected tab
     */
    onTabChange?: (tab: string) => void;

    /** Type of payment being processed */
    paymentType: PaymentType;
}

/**
 * Props for the Invoice Checkout component.
 * Extends PaymentMethodProps with invoice-specific properties.
 */
export interface InvoiceCheckoutProps extends PaymentMethodProps {
    /** Name of the business issuing the invoice */
    businessName: string;

    /** Optional URL to the business logo */
    businessLogo?: string;

    /** Unique identifier for the invoice */
    invoiceId: string;

    /** Optional currency code (e.g., USD, EUR) */
    currency?: string;

    /** Optional description of the invoice */
    description?: string;

    /** Optional CSS class name for custom styling */
    className?: string;

    /** Optional text to display in the component footer */
    footerText?: string;
}

/**
 * Props for the Payment Link Checkout component.
 * Extends PaymentMethodProps with payment link specific properties.
 */
export interface PaymentLinkCheckoutProps extends PaymentMethodProps {
    /** Name of the business */
    businessName: string;

    /** Optional URL to the business logo */
    businessLogo?: string;

    /** Optional URL to a banner image */
    bannerImage?: string;

    /** Optional title for the payment */
    title?: string;

    /** Optional currency code (e.g., USD, EUR) */
    currency?: string;

    /** Optional payment description */
    description?: string;

    /** Optional CSS class name for custom styling */
    className?: string;

    /** Optional text to display in the component footer */
    footerText?: string;
}

/**
 * Props for the QR Code Payment component.
 * Defines properties needed for QR code-based payments.
 */
export interface QrCodePaymentProps {
    /** Optional text to display on the payment button */
    buttonText?: string;

    /** Optional CSS class name for styling the button */
    buttonClassName?: string;

    /** Type of payment being processed */
    paymentType: PaymentType;

    /** 
     * Callback for successful payments
     * @param networkId - ID of the blockchain network used
     * @param tokenId - ID of the token used
     */
    onPaymentComplete: (networkId: string, tokenId: string) => void;

    /** 
     * Callback for payment errors
     * @param error - Error object with failure details
     */
    onPaymentError: (error: Error) => void;

    /** 
     * Mapping of blockchain networks to wallet addresses
     * Keys are network identifiers, values are wallet addresses
     */
    recipientWalletAddress: {
        [key: string]: string;
    };

    /** Payment amount */
    amount: string;

    /** Environment setting (test/prod) */
    env: env;

    /** Unique identifier for the payment link */
    paymentLinkId: string;

    /** Optional user id of the user */
    userUUID?: string;

    /** Optional sub wallet uuid */
    subWalletUuid?: string;
}

/**
 * Props for the WalletConnect Payment component.
 * Defines properties needed for wallet-based payments.
 */
export interface WalletConnectPaymentProps {
    /** 
     * Callback for successful payments
     * @param networkId - ID of the blockchain network used
     * @param tokenId - ID of the token used
     */
    onPaymentComplete: (networkId: string, tokenId: string) => void;

    /** 
     * Callback for payment errors
     * @param error - Error object with failure details
     */
    onPaymentError: (error: Error) => void;

    /** Optional text to display on the payment button */
    buttonText?: string;

    /** Optional CSS class name for styling the button */
    buttonClassName?: string;

    /** 
     * Mapping of blockchain networks to wallet addresses
     * Keys are network identifiers, values are wallet addresses
     */
    recipientWalletAddress: {
        [key: string]: string;
    };

    /** Payment amount */
    amount: string;

    /** Unique identifier for the payment link */
    paymentLinkId: string;

    /** Environment setting (test/prod) */
    env: env;

    /** Type of payment being processed */
    paymentType: PaymentType;

    /** Optional user id of the user */
    userUUID?: string;

    /** Optional sub wallet uuid */
    subWalletUuid?: string;
}

/**
 * Response structure for saved payments.
 * Extends the base Response interface.
 */
export interface SavePaymentResponse extends Response {
    /** Response message indicating save status */
    message: string;
}

interface Response {
    statusCode: number;
}

/**
 * Response structure for payment wallet information.
 * Extends the base Response interface.
 */
export interface GetPaymentWallet extends Response {
    /** Public key of the wallet */
    publicKey: string;
}

/**
 * Response structure for payment verification.
 * Extends the base Response interface.
 */
export interface VerifyPaymentWithWallet extends Response {
    /** Verification status message */
    message: string;
}

/**
 * Props for the Payment Context.
 * Defines required authentication information.
 */
export interface PaymentContextProps {
    /** API key for authentication */
    apikey: string;

    /** Unique identifier for the business */
    businessid: string;
}

/**
 * Props for the Payment Provider component.
 * Extends PaymentContextProps to include React children.
 */
export interface PaymentProviderProps extends PaymentContextProps {
    /** Child components to be wrapped by the provider */
    children: ReactNode;
}

/**
 * Props for the Card Payment component.
 * Defines properties needed for card-based payments.
 */
export interface CardPaymentProps extends SubWalletProps {
    /** Optional text to display on the payment button */
    buttonText?: string;

    /** Optional CSS class name for styling the button */
    buttonClassName?: string;

    /** Optional title for the payment dialog */
    dialogTitle?: string;

    /** Optional description for the payment dialog */
    dialogDescription?: string;

    /** Payment amount */
    amount: string;

    /** 
     * Mapping of blockchain networks to wallet addresses
     * Keys are network identifiers, values are wallet addresses
     */
    recipientWalletAddress: {
        [key: string]: string;
    };

    /** Callback for successful payments */
    onPaymentComplete: () => void;

    /** 
     * Callback for payment errors
     * @param error - Error object with failure details
     */
    onPaymentError: (error: Error) => void;

    /** Type of payment being processed */
    paymentType: PaymentType;

    /** Unique identifier for the payment link */
    paymentLinkId: string;

    /** Environment setting (test/prod) */
    env: env;

    /** Optional user id of the user */
    userUUID?: string;
}

export interface SubWalletProps {
    subWalletAddress?: { [key: string]: string; };
    subWalletUuid?: string;
}


export type TokenMetadata = {
    id: string
    name: string
    symbol: string
    networkId: string
    icon: string
}

export type Network = {
    id: string
    name: string
    icon: string
}