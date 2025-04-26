import {
    FetchPaymentOptions,
    FetchPaymentResult,
    PaymentResponse,
    PaymentType
} from "../types";

const BASE_URL = 'https://checkout-service.mileston.co/data';

const paymentTypeToPattern: Record<PaymentType, string> = {
    'invoice': 'invoice.get',
    'payment-link': 'paymentlink.get',
    'recurring': 'recurring.get',
};

export async function fetchPayment<T extends PaymentResponse>(
    options: FetchPaymentOptions
): Promise<FetchPaymentResult> {
    const { apiKey, businessId, paymentId, paymentType } = options;
    const pattern = paymentTypeToPattern[paymentType];

    if (!pattern) {
        return { loading: false, error: 'Invalid payment type provided.' };
    }

    const url = `${BASE_URL}/${pattern}/${paymentId}`;

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'apikey': apiKey,
                'businessid': businessId,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { loading: false, error: errorData.message || 'Failed to fetch payment details.' };
        }

        const data = await res.json();
        return { data, loading: false };
    } catch (err: any) {
        console.error('Payment fetch error:', err);
        return { loading: false, error: err.message || 'Something went wrong.' };
    }
}
