import { useAuthStore } from "@/modules/auth/store/authStore"
import { errorMessageMapperAuth } from "@/modules/auth/utility/error.message.mapper"
import { getAxiosError } from "@/utility/getAxiosError"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { useRemoveProfileMutation } from "./profileMutation"

export const useRemoveProfile = () => {
    const { mutate, isError, isPending, isSuccess, error, data } = useRemoveProfileMutation()
    const [showPopUp, setShowPopUp] = useState(true)

    const { logOut } = useAuthStore()

    useEffect(() => {
        if (!isSuccess || !data) return
        logOut()
        router.push("/onboarding")
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