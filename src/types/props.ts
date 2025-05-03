import { ReactNode } from "react";
import { env, PaymentDto, PaymentType } from "./core";

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

export interface Theme {
    colorScheme: "light" | "dark" | "system"
    primaryColor?: string
    secondaryColor?: string
    backgroundColor?: string
    textColor?: string
}

/**
 * Represents a blockchain network
 */
export interface BlockchainNetwork {
    /** Unique identifier for the network */
    id: string
    /** Display name of the network */
    name: string
    /** Optional URL to the network's icon */
    icon?: string
}

/**
 * Represents a token option for payment
 */
export interface TokenOption {
    /** Unique identifier for the token */
    id: string
    /** Full name of the token */
    name: string
    /** Symbol of the token (e.g., ETH, BTC) */
    symbol: string
    /** Optional URL to the token's icon */
    icon?: string
    /** ID of the network this token belongs to */
    networkId: string
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
 * Common props for payment method components
 */
export interface PaymentMethodProps {
    /** Available blockchain networks */
    networks: BlockchainNetwork[]
    /** Available tokens for payment */
    tokens: TokenOption[]
    onWalletConnectPaymentComplete: (networdId: string, tokenId: string) => void
    onWalletConnectPaymentError: (error: Error) => void
    onQrCodePaymentComplete: (networdId: string, tokenId: string) => void
    onQrCodePaymentError: (error: Error) => void
    onCardPaymentComplete: () => void
    onCardPaymentError: (error: Error) => void
    amount: string
    env: env
    paymentLinkId: string
    recipientWalletAddress: {
        sui?: string,
        evm?: string
    }
    /** Custom text for wallet connect button */
    walletConnectButtonText?: string
    /** Custom text for QR code button */
    qrCodeButtonText?: string
    /** Custom text for card payment button */
    cardButtonText?: string
    /** Additional CSS class name for buttons */
    buttonClassName?: string
    /** Title for card payment dialog */
    dialogTitle?: string
    /** Description for card payment dialog */
    dialogDescription?: string
}

/**
 * Props for the Subscription Checkout component.
 * Extends the PaymentMethodProps interface to include additional properties
 * specific to subscription checkout functionality.
 *
 * @interface SubscriptionCheckoutProps
 * @extends PaymentMethodProps
 * 
 * @property {string} businessName - The name of the business associated with the subscription.
 * @property {string} [businessLogo] - Optional URL or path to the business logo.
 * @property {SubscriptionPlan} plan - The subscription plan details.
 * @property {string} [className] - Optional CSS class name for custom styling.
 * @property {string} [footerText] - Optional text to display in the footer of the component.
 * @property {string} [cancelText] - Optional text for the cancel button.
 */
export interface SubscriptionCheckoutProps extends PaymentMethodProps {
    businessName: string
    businessLogo?: string
    plan: SubscriptionPlan
    className?: string
    footerText?: string
    cancelText?: string
}

/**
 * Interface representing the properties for the PaymentOptions component.
 * Extends the `PaymentMethodProps` interface.
 *
 * @property {("wallet" | "qrcode" | "card")} [defaultTab] - Specifies the default tab to be selected.
 *     Can be one of "wallet", "qrcode", or "card".
 * @property {(tab: string) => void} [onTabChange] - Callback function triggered when the tab changes.
 *     Receives the new tab as a string parameter.
 */
export interface PaymentOptionsProps extends PaymentMethodProps {
    defaultTab?: "wallet" | "qrcode" | "card"
    onTabChange?: (tab: string) => void
    paymentType: PaymentType
}

/**
 * Interface representing the properties for the Invoice Checkout component.
 * Extends the `PaymentMethodProps` interface to include additional details
 * specific to invoice checkout functionality.
 *
 * @extends PaymentMethodProps
 *
 * @property {string} businessName - The name of the business associated with the invoice.
 * @property {string} [businessLogo] - Optional URL or path to the business logo.
 * @property {string} invoiceId - Unique identifier for the invoice.
 * @property {number} amount - The total amount to be paid for the invoice.
 * @property {string} [currency] - Optional currency code (e.g., USD, EUR) for the payment.
 * @property {string} [description] - Optional description or details about the invoice.
 * @property {string} [className] - Optional CSS class name for custom styling.
 * @property {string} [footerText] - Optional text to display in the footer of the component.
 */
export interface InvoiceCheckoutProps extends PaymentMethodProps {
    businessName: string
    businessLogo?: string
    invoiceId: string
    currency?: string
    description?: string
    className?: string
    footerText?: string
}

export interface PaymentLinkCheckoutProps extends PaymentMethodProps {
    businessName: string
    businessLogo?: string
    bannerImage?: string
    title?: string
    currency?: string
    description?: string
    className?: string
    footerText?: string
}

/**
 * Props for the QR Code Payment component.
 */
export interface QrCodePaymentProps {
    /**
     * List of blockchain networks available for payment.
     */
    networks: BlockchainNetwork[];

    /**
     * List of token options available for payment.
     */
    tokens: TokenOption[];

    /**
     * Optional text to display on the payment button.
     */
    buttonText?: string;

    /**
     * Optional CSS class name for styling the payment button.
     */
    buttonClassName?: string;

    paymentType: PaymentType;

    onPaymentComplete: (networkId: string, tokenId: string) => void;

    onPaymentError: (error: Error) => void;

    recipientWalletAddress: {
        sui?: string;
        evm?: string
    }
    amount: string,
    env: env,
    paymentLinkId: string
}

/**
 * Props for the WalletConnectPayment component.
 */
export interface WalletConnectPaymentProps {
    /**
     * List of blockchain networks available for payment.
     */
    networks: BlockchainNetwork[];

    /**
     * List of token options available for selection.
     */
    tokens: TokenOption[];

    /**
     * Callback function triggered when a payment is initiated.
     * 
     * @param networkId - The ID of the selected blockchain network.
     * @param tokenId - The ID of the selected token.
     */
    onPaymentComplete: (networkId: string, tokenId: string) => void;

    onPaymentError: (error: Error) => void;

    /**
     * Optional text to display on the payment button.
     */
    buttonText?: string;

    /**
     * Optional CSS class name to apply to the payment button.
     */
    buttonClassName?: string;

    recipientWalletAddress: {
        sui?: string;
        evm?: string
    };
    amount: string;
    paymentLinkId: string;
    env: env,
    paymentType: PaymentType
}

export interface SavePaymentResponse extends Response {
    message: string;
}

interface Response {
    statusCode: number;
}

export interface GetPaymentWallet extends Response {
    qrCode: string;
    publicKey: string;
}

export interface VerifyPaymentWithWallet extends Response {
    message: string;
}

export interface PaymentContextProps {
    apikey: string;
    businessid: string;
}

export interface PaymentProviderProps extends PaymentContextProps {
    children: ReactNode;
}

export interface CardPaymentProps {
    buttonText?: string
    buttonClassName?: string
    dialogTitle?: string
    dialogDescription?: string
    amount: string
    recipientWalletAddress: {
        sui?: string;
        evm?: string
    }
    onPaymentComplete: () => void
    onPaymentError: (error: Error) => void
    networks: BlockchainNetwork[]
    paymentType: PaymentType
    paymentLinkId: string
    env: env
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