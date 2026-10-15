import { getPayloadJwt, PayloadJwt } from "@/utility/getPayloadJwt"
import { router } from "expo-router"
import { useEffect } from "react"
import { useAuthStore } from "../store/authStore"




export const useCustomLoginExpire = () => {
    const token = useAuthStore((state) => state.token)
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    const sessionExpired = useAuthStore((state) => state.sessionExpired)

    
    useEffect(() => {
        if (!isLoggedIn || !token) return

        let payload: PayloadJwt

        try {
            payload = getPayloadJwt(token)
        } catch {
            sessionExpired()
            router.replace('/login')
            return
        }
        const delay = payload.exp * 1000 - Date.now()

        if (delay <= 0) {
            sessionExpired()
            router.replace('/login')
            return
        }
        const timeOut = setTimeout(() => {
            sessionExpired()
            router.replace('/login')
        }, delay)

        return () => clearTimeout(timeOut)

    }, [token, isLoggedIn, sessionExpired])
}