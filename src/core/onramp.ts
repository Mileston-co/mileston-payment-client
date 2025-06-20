import { GetOnRampDataParams, GetOnRampPaymentStatusParams, OnRampLinkResponse, OnRampPaymentStatusResponse } from "@/types";
import { BASE_URL } from "./utils";

export async function getOnRampData(
  params: GetOnRampDataParams,
  apikey: string,
  businessid: string
): Promise<OnRampLinkResponse> {
  const query = new URLSearchParams({
    amount: params.amount,
    recipientWalletAddress: params.recipientWalletAddress,
    chain: params.chain,
  }).toString();

  const res = await fetch(`${BASE_URL}/onramp-data?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "apikey": apikey,
      "businessid": businessid,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch onramp data");
  }

  return res.json();
}


export async function getOnRampPaymentStatus(
  params: GetOnRampPaymentStatusParams,
  apikey: string,
  businessid: string
): Promise<OnRampPaymentStatusResponse> {
  const { id, amount, chain, recipientWalletAddress, subWalletUuid, userUUID } = params;

  const res = await fetch(`${BASE_URL}/onramp-payment-status/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": apikey,
      "businessid": businessid,
    },
    body: JSON.stringify({
      amount,
      chain,
      recipientWalletAddress,
      subWalletUuid,
      userUUID
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch onramp payment status");
  }

  return res.json();
}
