"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const ManageSubscription = () => {
  const router = useRouter();
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ error, setError ] = useState<string | null>(null)

  const redirectToCustomerPortal = async () => {
    setLoading(true)
    setError(null)

    try {
      const { url } = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/create-portal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log("Customer portal URL:", url);
      return
      router.push(url);
    } catch (err: any) {
      setError("Failed to subscribe to premium plan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={redirectToCustomerPortal} className="bg-indigo-700" disabled={loading}>
      {loading ? <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait...
      </> : "Modify Your Subscription"}
    </Button>
  )
}

export default ManageSubscription