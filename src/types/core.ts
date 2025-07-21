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
     * Can be one of: "payment-link", "invoice", or "recurring-payment"
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
     * @param error - The error object containing details about what went wrong
     * Required.
     */
    onPaymentError: (error: Error) => void;

    /**
     * The theme of the payment button.
     * Can be either "dark" or "light"
     * Required.
     */
    theme: 'dark' | 'light';
}

/**
 * Union type representing different possible payment response types
 */
export type PaymentResponse = FetchInvoiceResponse | FetchPaymentLinkResponse | FetchRecurringPaymentResponse;

/**
 * Options required for fetching payment information
 */
export interface FetchPaymentOptions extends OptionsForPayment {
    /** API key for authentication */
    apikey: string;
    /** Unique identifier for the business */
    businessid: string;
}

/**
 * Base options required for any payment operation
 */
export interface OptionsForPayment {
    /** Unique identifier for the payment */
    paymentId: string;
    /** Type of payment being processed */
    paymentType: PaymentType;
}

/**
 * Supported payment types in the system
 */
export type PaymentType = 'invoice' | 'payment-link' | 'recurring';

/**
 * Result structure for payment fetch operations
 */
export interface FetchPaymentResult {
    /** Payment data if fetch was successful */
    data?: PaymentResponse;
    /** Error message if fetch failed */
    error?: string;
    /** Loading state indicator */
    loading: boolean;
}

/**
 * Response structure for invoice fetch operations
 */
export interface FetchInvoiceResponse {
    /** HTTP status code */
    statusCode: number;
    /** Response message */
    message: string;
    /** URL to access the invoice */
    invoiceLink: string;
    /** Detailed invoice information */
    invoiceData: InvoiceData;
}

/**
 * Response structure for payment link fetch operations
 */
export interface FetchPaymentLinkResponse {
    /** HTTP status code */
    statusCode: number;
    /** Response message */
    message: string;
    /** URL to access the payment */
    paymentLink: string;
    /** Detailed payment link information */
    paymentData: PaymentLinkData;
}

/**
 * Response structure for recurring payment fetch operations
 */
export interface FetchRecurringPaymentResponse {
    /** HTTP status code */
    statusCode: number;
    /** Response message */
    message: string;
    /** Detailed recurring payment information */
    recurringPaymentData: RecurringPaymentData;
}

export interface SubWalletDetails {
    subWalletUuid?: string;
    subWalletUserName?: string;
}

/**
 * Structure containing invoice details
 */
export interface InvoiceData extends SubWalletDetails {
    /** Unique identifier for the invoice */
    invoiceId: string;
    /** Payment amount */
    amount: string;
    /** Name of the item being invoiced */
    itemName: string;
    /** Email of the customer */
    customerEmail: string;
    /** Due date for the invoice */
    dueDate: Date;
    /** Current status of the invoice */
    status: 'pending' | 'paid';
    /** Environment the invoice exists in */
    env: env;
}

/**
 * Type mapping for different payment responses
 */
export interface PaymentTypeToResponseMap {
    invoice: FetchInvoiceResponse;
    'payment-link': FetchPaymentLinkResponse;
    recurring: FetchRecurringPaymentResponse;
}

/**
 * Structure for payment link data
 */
export interface PaymentLinkData extends Partial<CreatePaymentLinkData> {
    /** Unique identifier for the payment link */
    paymentLinkId: string;
}

/**
 * Data required to create a new payment link
 */
export interface CreatePaymentLinkData extends SubWalletDetails {
    /** Payment amount */
    amount: string;
    /** Title of the payment */
    title: string;
    /** Description of what the payment is for */
    description: string;
    /** URL to redirect to after payment */
    redirectUrl: string;
    /** Optional URL for business logo */
    logoUrl?: string;
    /** Optional URL for banner image */
    bannerUrl?: string;
    /** Environment to create the payment link in */
    env: env;
}

/**
 * Structure for recurring payment information
 */
export interface RecurringPaymentData extends SubWalletDetails {
    /** Unique identifier for the recurring payment */
    recurringPaymentId: string;
    /** Payment amount */
    amount: string;
    /** Name of the subscription */
    subscriptionName: string;
    /** Full name of the subscriber */
    subscriberFullName: string;
    /** Email of the subscriber */
    subscriberEmail: string;
    /** Optional wallet address of the subscriber */
    subscriberWalletAddress?: string;
    /** Current payment status */
    currentPaymentStatus: "paid" | "unpaid";
    /** Date when payment recurs */
    recurringDate: Date;
    /** Interval between payments in days */
    recurringInterval: number;
    /** Environment the recurring payment exists in */
    env: env;
}

/** Environment type for the application */
export type env = 'test' | 'prod'

/** Supported EVM blockchain types */
export type evmType = 'avax' | 'pol' | 'base' | 'eth' | 'arb'

/** All supported blockchain types */
export type Chain = evmType | 'sui' | 'solana';

/**
 * Parameters for EVM wallet connect payments
 */
export interface PayWithWalletConnect {
    /** EVM chain to use */
    evm: evmType;
    /** Environment to process payment in */
    env: env;
    /** Payment amount */
    amount: string;
    /** Recipient's wallet address */
    recipientAddress: string;
    /** Token to use for payment */
    token: Token;
}

/**
 * Parameters for Solana payments
 */
export interface PayWithSolana {
    /** Environment to process payment in */
    env: env;
    /** Recipient's Solana address */
    recipientAddress: string;
    /** Payment amount */
    amount: string;
    /** Token to use for payment */
    token: 'SOL' | 'USDC' | 'USDT';
}

/**
 * Input parameters for saving payment information
 */
export interface SavePaymentInput {
    /** ID of the payment link */
    paymentLinkId: string;
    /** Address of the payer */
    payer: string;
    /** Address of the recipient */
    recipientWalletAddress: string;
    /** Payment amount */
    amount: string;
    /** UUID of the user */
    userUUID: string;
    /** Transaction signature */
    transactionSignature: string;
    /** Optional fee transaction signature */
    feeSignature?: string;
    /** Blockchain used for payment */
    chain: Chain;
    /** Environment the payment was processed in */
    env: "test" | "prod";
    /** Sub wallet UUID */
    subWalletUuid?: string;
}

/**
 * Options for saving payment information
 */
export interface SavePaymentOptions {
    /** API key for authentication */
    apikey: string;
    /** Business ID */
    businessid: string;
    /** Type of payment */
    type: PaymentType;
    /** Payment details */
    body: SavePaymentInput;
    /** Optional native token information */
    nativeTokens?: string;
}

/** Supported wallet types */
export type WalletType = 'sui' | 'evm' | 'solana';

/** Payment verification patterns */
export type PaymentVerifyPattern = 'invoice.save' | 'paymentlink.save' | 'recurring.save';

/**
 * Structure for payment data transfer
 */
export interface PaymentDto {
    /** ID of the payment link */
    paymentLinkId: string;
    /** Public key of the payer */
    publicKey: string;
    /** Payment amount */
    amount: string;
    /** Recipient's wallet address */
    recipientWalletAddress: string;
    /** Blockchain used */
    chain: Chain;
    /** Environment */
    env: 'test' | 'prod';
    /** User UUID */
    userUUID: string;
    /** Sub wallet UUID */
    subWalletUuid?: string;
    /** Optional customer information */
    customerInformation?: string;
    /** Token used for payment */
    token: Token;
    /** EVM chain for QR payment (optional) */
    evmChain?: 'eth' | 'avax' | 'pol' | 'base' | 'arb';
    /** Wallet address for QR payment (optional) */
    walletAddress?: string;
}

/**
 * Parameters for getting on-ramp data
 */
export type GetOnRampDataParams = {
    /** Payment amount */
    amount: string;
    /** Recipient's wallet address */
    recipientWalletAddress: string;
    /** EVM chain to use (OnRamp only supports EVM chains) */
    chain: evmType;
};

/**
 * Parameters for getting on-ramp payment status
 */
export type GetOnRampPaymentStatusParams = GetOnRampDataParams & Pick<SubWalletDetails, 'subWalletUuid'> & {
    /** Unique identifier for the on-ramp transaction */
    id: string;
    userUUID?: string;
};

/**
 * Response structure for on-ramp link generation
 */
export interface OnRampLinkResponse {
    data: {
        /** Unique identifier for the on-ramp transaction */
        id: string;
        /** Generated payment link */
        link: string;
    };
}

/**
 * Response structure for on-ramp payment status
 */
export interface OnRampPaymentStatusResponse {
    /** HTTP status code */
    statusCode: number;
    /** Response message */
    message: string;
    data: {
        data: {
            /** Payment status */
            status: "COMPLETED";
            /** Transaction hash on the blockchain */
            transactionHash: string;
        };
    };
}

/** Supported token types */
export type Token = "USDC" | "USDT" | "AVAX" | "ETH" | "POL" | "SOL"

/**
 * Base response interface
 */
interface IResponse {
    /** HTTP status code */
    statusCode: number;
}

/**
 * Wallet address mapping interface
 */
interface IWalletAddress {
    /** Key-value pairs of chain to wallet address */
    [key: string]: string;
}

/**
 * User data structure
 */
export interface UserData {
    /** Whether user has completed onboarding */
    onboarded?: boolean;
    /** Name of the business */
    businessName?: string;
    /** Business address */
    businessAddress?: string;
    /** Industry the business operates in */
    businessIndustry?: string;
    /** Description of the business */
    businessDescription?: string;
    /** First name of business admin */
    businessAdminFirstName?: string;
    /** Last name of business admin */
    businessAdminLastName?: string;
    /** Email of business admin */
    businessAdminEmail?: string;
    /** URL of business image */
    image?: string;
    /** Whether to delete associated keys */
    deleteKeys?: boolean;
}

/**
 * Response structure for user data retrieval
 */
export interface IGetUser extends IResponse {
    /** User information */
    userData: UserData
    /** Mapping of blockchain to wallet addresses */
    walletAddress: IWalletAddress;
    /** Whether secret has been copied */
    isSecretCopied: boolean;
    /** Wallet balance */
    walletBalance: string;
}

export interface UseSubWalletsParams {
    apikey: string;
    businessid: string;
    subWalletUuid: string;
    env: 'test' | 'prod';
}

export interface IWalletBalances {
    [key: string]: string;
}

export interface ISubWalletResponse {
    statusCode: number;
    message: string;
    data: {
        type: 'all';
        address: IWalletAddress;
        balance: string;
        balances: IWalletBalances;
    };
}

export interface ISubWalletError {
    statusCode: number;
    message: string;
    error?: string;
} 