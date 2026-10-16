import { getAxiosError } from "@/utility/getAxiosError"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { useAuthStore } from "../store/authStore"
import { errorMessageMapperAuth } from "../utility/error.message.mapper"
import { useLoginMutation } from "./useAuthMutations"

export const useLogin = () => {
    const { mutate, isError, isPending, isSuccess, error, data } = useLoginMutation()
    const [showPopUp, setShowPopUp] = useState(true)
  
    const { logIn } = useAuthStore()
  
    useEffect(() => {
      if (!isSuccess || !data) return
      logIn(data.name, data.lastName, data.email, data.password, data.role, data.token)
      router.push("/dashboard")
    }, [isSuccess, data])
  
    useEffect(() => {
      if (isError) {
        setShowPopUp(true)
      }
    }, [isError])
  
    const errorMessageFromServer = getAxiosError(error)
    const errorMessage = errorMessageMapperAuth(errorMessageFromServer)
  
    return {
        mutate,
        isError,
        isPending,
        isSuccess,
        errorMessage,
        showPopUp,
        setShowPopUp
    }
}