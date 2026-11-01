import { GoogleSignin, isSuccessResponse } from '@react-native-google-signin/google-signin';
import { useState } from 'react';



export const useGoogleSignIn = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleGoogleSignIn = async () => {
        try {
            setIsSubmitting(true)
            await GoogleSignin.hasPlayServices()
            const response = await GoogleSignin.signIn()
            if (isSuccessResponse(response)) {
                const { idToken } = response.data
                return idToken
            }

            setIsSubmitting(false)
        } catch (error) {
            setIsSubmitting(false)
            console.log(error)

        }
    }
    return {
        isSubmitting,
        handleGoogleSignIn,
    }
}