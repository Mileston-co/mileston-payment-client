import {
    FetchPaymentOptions,
    PaymentType,
    PaymentTypeToResponseMap
} from "../types";
import { BASE_URL } from "./utils";

const paymentTypeToPattern: Record<PaymentType, string> = {
    'invoice': 'invoice.get',
    'payment-link': 'paymentlink.get',
    'recurring': 'recurring.get',
};

export async function fetchPayment<T extends FetchPaymentOptions>(
    options: T
): Promise<PaymentTypeToResponseMap[T['paymentType']]> {
    const { apikey, businessid, paymentId, paymentType } = options;
    const pattern = paymentTypeToPattern[paymentType];

    if (!pattern) throw new Error('Invalid payment type.');

    const url = `preview-checkout-service.mileston.co/data/${pattern}/${paymentId}`;

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'apikey': apikey,
                'businessid': businessid,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch payment.');
        }

        const data = await res.json();
        return data as PaymentTypeToResponseMap[T['paymentType']];
    } catch (err: any) {
        console.error('fetchPayment error:', err);
        throw new Error(err.message || 'Something went wrong.');
    }
}
