import { getUserDetails } from "@/core/fetchUser"
import { useEffect, useState } from "react"
import { usePaymentContext } from "../components"
import { IGetUser } from "@/types"

export function useUserDetails(pathBusinessId?: string) {
    const [data, setData] = useState<IGetUser | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const { apikey, businessid: headerBusinessId } = usePaymentContext()

    useEffect(() => {
        if (!apikey || !headerBusinessId) return

        async function fetchData() {
            setLoading(true)
            try {
                const result = await getUserDetails(apikey, headerBusinessId, pathBusinessId)
                setData(result)
                setError(null)
            } catch (err: any) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [apikey, headerBusinessId, pathBusinessId])

    return { data, loading, error }
}
