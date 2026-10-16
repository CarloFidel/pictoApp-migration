import { getPayloadJwt } from "@/utility/getPayloadJwt"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { useAuthStore } from "../store/authStore"




export const useCustomLoginExpire = () => {
    const token = useAuthStore((state) => state.token)
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    const sessionExpired = useAuthStore((state) => state.sessionExpired)

    const [delay, setDelay] = useState<number>(0)

    
    
    useEffect(() => {
        if (!isLoggedIn || !token) {
          setDelay(0)
          return
        }
      
        let remaining: number
        try {
          const payload = getPayloadJwt(token)
          remaining = payload.exp * 1000 - Date.now()
        } catch {
          sessionExpired()
          router.replace('/login')
          setDelay(0)
          return
        }
      
        if (remaining <= 0) {
          sessionExpired()
          router.replace('/login')
          setDelay(0)
          return
        }
      
        setDelay(remaining)
      
        const warningIn = remaining - 30_000
        const warningTimeout =
          warningIn > 0
            ? setTimeout(() => setDelay(30_000), warningIn)
            : undefined
      
        const expireTimeout = setTimeout(() => {
          sessionExpired()
          router.replace('/login')
        }, remaining)
      
        return () => {
          clearTimeout(expireTimeout)
          if (warningTimeout) clearTimeout(warningTimeout)
        }
      }, [token, isLoggedIn, sessionExpired])
      
    return delay
}