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


export type PaymentResponse = FetchInvoiceResponse | FetchPaymentLinkResponse | FetchRecurringPaymentResponse;

export interface FetchPaymentOptions extends OptionsForPayment {
    apikey: string;
    businessid: string;
}

export interface OptionsForPayment {
    paymentId: string;
    paymentType: PaymentType;
}

export type PaymentType = 'invoice' | 'payment-link' | 'recurring';

export interface FetchPaymentResult {
    data?: PaymentResponse;
    error?: string;
    loading: boolean;
}

export interface FetchInvoiceResponse {
    statusCode: number;
    message: string;
    invoiceLink: string;
    invoiceData: InvoiceData;
}

export interface FetchPaymentLinkResponse {
    statusCode: number;
    message: string;
    paymentLink: string;
    paymentData: PaymentLinkData;
}

export interface FetchRecurringPaymentResponse {
    statusCode: number;
    message: string;
    recurringPaymentData: RecurringPaymentData;
}

export interface InvoiceData {
    invoiceId: string;
    amount?: string;
    itemName?: string;
    customerEmail?: string;
    dueDate?: Date;
    status: 'pending' | 'paid';
    env: env;
}

export interface PaymentTypeToResponseMap {
    invoice: FetchInvoiceResponse;
    'payment-link': FetchPaymentLinkResponse;
    recurring: FetchRecurringPaymentResponse;
}

export interface PaymentLinkData extends Partial<CreatePaymentLinkData> {
    paymentLinkId: string;
}

export interface CreatePaymentLinkData {
    amount: string;
    title?: string;
    description?: string;
    redirectUrl?: string;
    logoUrl?: string;
    bannerUrl?: string;
}

export interface RecurringPaymentData {
    recurringPaymentId: string;
    amount?: string;
    subscriptionName?: string;
    subscriberFullName?: string;
    subscriberEmail?: string;
    subscriberWalletAddress?: string;
    currentPaymentStatus?: "paid" | "unpaid";
    recurringDate?: Date;
    recurringInterval?: number;
}


export type env = 'test' | 'prod'

export type evmType = 'avax' | 'pol' | 'base' | 'eth' | 'arb'


export interface PayWithWalletConnect {
    evm: evmType;
    env: env;
    amount: string;
    recipientAddress: string;
    token: 'AVAX' | 'POL' | 'ETH' | 'USDC' | 'USDT'
}


export interface SavePaymentInput {
    paymentLinkId: string;
    payer: string;
    recipientWalletAddress: string;
    amount: string;
    userUUID: string;
    transactionSignature: string;
    feeSignature?: string;
    chain: "avax" | "base" | "pol" | "eth" | "arb" | "sui";
    env: "test" | "prod";
}

export interface SavePaymentOptions {
    apikey: string;
    businessid: string;
    type: PaymentType;
    body: SavePaymentInput;
    nativeTokens?: string;
}


export type WalletType = 'sui' | 'evm';

export type PaymentVerifyPattern = 'invoice.save' | 'paymentlink.save' | 'recurring.save';

export interface PaymentDto {
    paymentLinkId: string;
    publicKey: string;
    amount: string;
    payable: string;
    recipientWalletAddress: string;
    chain: 'sui' | 'eth' | 'avax' | 'pol' | 'base' | 'arb';
    env: 'test' | 'prod';
    userUUID: string;
    customerInformation?: string;
    token: Token;
}

export type GetOnRampDataParams = {
    amount: string;
    recipientWalletAddress: string;
    chain: "avax" | "base" | "pol" | "eth" | "arb";
};

export type GetOnRampPaymentStatusParams = GetOnRampDataParams & {
    id: string;
};

export interface OnRampLinkResponse {
    data: {
        id: string;
        link: string;
    };
}

export interface OnRampPaymentStatusResponse {
    statusCode: number;
    message: string;
    data: {
        data: {
            status: "COMPLETED";
            transactionHash: string;
        };
    };
}


export type Token = "USDC" | "USDT" | "AVAX" | "ETH" | "POL"


interface IResponse {
    statusCode: number;
}

interface IWalletAddress {
    [key: string]: string;
}

export interface IGetUser extends IResponse {
    onboarded?: boolean;
    businessName?: string;
    businessAddress?: string;
    businessIndustry?: string;
    businessDescription?: string;
    businessAdminFirstName?: string;
    businessAdminLastName?: string;
    businessAdminEmail?: string;
    image?: string;
    deleteKeys?: boolean;
    walletBalance: string;
    walletAddress: IWalletAddress;
    isSecretCopied: boolean;
}
