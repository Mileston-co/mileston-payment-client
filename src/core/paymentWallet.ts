import { 
    WalletType, 
    PaymentDto, 
    PaymentVerifyPattern 
} from "@/types";

export async function getPaymentWallet(params: {
  apiKey: string;
  businessId: string;
  walletType: WalletType;
}) {
  const { apiKey, businessId, walletType } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment-wallet/${walletType}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "apiKey": apiKey,
      "businessId": businessId,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch wallet: ${err}`);
  }

  const data = await res.json();
  return data;
}


export async function verifyPaymentWithWallet(params: {
  apiKey: string;
  businessId: string;
  type: 'invoice' | 'payment-link' | 'recurring';
  body: PaymentDto;
  nativeTokens?: string;
}) {
  const { apiKey, businessId, type, body, nativeTokens } = params;

  const patternMap: Record<string, PaymentVerifyPattern> = {
    invoice: 'invoice.save',
    'payment-link': 'paymentlink.save',
    recurring: 'recurring.save',
  };

  const pattern = patternMap[type];

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/verify-payment/${pattern}`);
  if (nativeTokens) {
    url.searchParams.append('nativeTokens', nativeTokens);
  }

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apiKey": apiKey,
      "businessId": businessId,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Payment Verification Failed: ${err}`);
  }

  const data = await res.json();
  return data;
}
