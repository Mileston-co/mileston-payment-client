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


export type PaymentType = 'invoice' | 'payment-link' | 'recurring';

export type PaymentResponse = FetchInvoiceResponse | FetchPaymentLinkResponse | FetchRecurringPaymentResponse;

export interface FetchPaymentOptions {
  apiKey: string;
  businessId: string;
  paymentId: string;
  paymentType: PaymentType;
}

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


