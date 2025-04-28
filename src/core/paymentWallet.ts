import { 
    WalletType, 
    PaymentDto, 
    PaymentVerifyPattern, 
    GetPaymentWallet,
    VerifyPaymentWithWallet
} from "@/types";
import { BASE_URL } from "./utils";

export async function getPaymentWallet(params: {
  apikey: string;
  businessid: string;
  walletType: WalletType;
}): Promise<GetPaymentWallet> {
  const { apikey, businessid, walletType } = params;

  const res = await fetch(`${BASE_URL}/payment-wallet/${walletType}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "apikey": apikey,
      "businessid": businessid,
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
  apikey: string;
  businessid: string;
  type: 'invoice' | 'payment-link' | 'recurring';
  body: PaymentDto;
  nativeTokens?: string;
}): Promise<VerifyPaymentWithWallet> {
  const { apikey, businessid, type, body, nativeTokens } = params;

  const patternMap: Record<string, PaymentVerifyPattern> = {
    invoice: 'invoice.save',
    'payment-link': 'paymentlink.save',
    recurring: 'recurring.save',
  };

  const pattern = patternMap[type];

  const url = new URL(`${process.env.BASE_URL}/verify-payment/${pattern}`);
  if (nativeTokens) {
    url.searchParams.append('nativeTokens', nativeTokens);
  }

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": apikey,
      "businessid": businessid,
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
