import { SavePaymentOptions } from "@/types";
import { BASE_URL, patternMap } from "./utils";

export async function savePayment({
  apikey,
  businessid,
  type,
  body,
  nativeTokens,
}: SavePaymentOptions) {
  if (!apikey || !businessid) {
    throw new Error("You forgot the API key or Business ID. You trying to sabotage yourself, bro?");
  }

  const pattern = patternMap[type];

  if (!pattern) {
    throw new Error(`Invalid payment type '${type}' passed! You must be sleep-typing bro 💤`);
  }

  const url = new URL(`preview-checkout-service.mileston.co/save-payment/${pattern}`)

  if (nativeTokens) {
    url.searchParams.append("nativeTokens", nativeTokens);
  }

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": apikey,
      "businessid": businessid,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    console.error("Failed to save payment:", errorBody);
    throw new Error(errorBody.message || "Unknown save payment error");
  }

  const responseData = await response.json();
  return responseData;
}
