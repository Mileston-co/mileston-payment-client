import { BASE_URL } from "./utils";

export async function fetchSubWallets({
  apikey,
  businessid,
  subWalletUuid,
  env
}: {
  apikey: string;
  businessid: string;
  subWalletUuid: string;
  env: 'test' | 'prod';
}): Promise<any> {
  if (!apikey) throw new Error("API key is required");
  if (!businessid) throw new Error("Business ID is required");
  if (!subWalletUuid) throw new Error("subWalletUuid is required");

  const url = `${BASE_URL}/sub-wallets/${subWalletUuid}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "apikey": apikey,
        "businessid": businessid,
        "env": env,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || `Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch subwallets");
  }
} 