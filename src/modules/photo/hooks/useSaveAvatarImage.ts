import { getAxiosError } from "@/utility/getAxiosError"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { errorMessageMapperPhoto } from "../utility/error.message.mapper"
import { useUploadPhotoMutation } from "./photoMutations"

export const useSaveAvatarImage = () => {
    const { mutate, isError, isPending, isSuccess, data, error } = useUploadPhotoMutation()
    const [showPopUp, setShowPopUp] = useState(false)

    useEffect(() => {
        if (!isSuccess || !data) return
        router.push("/dashboard")
    }, [isSuccess, data])


    useEffect(() => {
        if (isError) {
            setShowPopUp(true)
        }
    }, [isError])

    const errorMessageFromServer = getAxiosError(error)
    const errorMessage = errorMessageMapperPhoto(errorMessageFromServer)

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