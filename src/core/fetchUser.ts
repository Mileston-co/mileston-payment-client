import { IGetUser } from "@/types"
import { BASE_URL } from "./utils"

export async function getUserDetails(
  apikey: string,
  headerBusinessId: string,
  pathBusinessId?: string
): Promise<IGetUser> {
  if (!apikey) throw new Error("API key is required")
  if (!headerBusinessId) throw new Error("Header business ID is required")

  const url = `${BASE_URL}/user/${pathBusinessId || headerBusinessId}`

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "apikey": apikey,
        "businessid": headerBusinessId,
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText || `Request failed with status ${res.status}`)
    }

    return await res.json()
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch user details")
  }
}
