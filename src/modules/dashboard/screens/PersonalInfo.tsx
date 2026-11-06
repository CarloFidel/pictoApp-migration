import { BlurComponent, CustomLoading, CustomPopUp } from "@/components/common"
import { BackButton } from "@/components/ui/BackButton"
import { useRegister } from "@/modules/auth/hooks/useRegister"
import { BlurTargetView } from "expo-blur"
import { router } from "expo-router"
import { useRef, useState } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { PersonalInfoForm } from "../components/PersonalInfoForm"

export const PersonalInfo = () => {
    const { mutate, isError, isPending, showPopUp, setShowPopUp, errorMessage } = useRegister()

    const blurTargetRef = useRef<View>(null)
    const [showPopup, setShowPopup] = useState(false)
    const [showPasswordChangePopup, setShowPasswordChangePopup] = useState(false)

    const handleDeleteAccountPopup = (term: boolean) => {
        if (term) {
            setShowPopup(true)
        } else {
            setShowPopup(false)
        }
    }

    const handlePasswordChangePopup = (term: boolean) => {
        if (term) {
            setShowPasswordChangePopup(true)
        } else {
            setShowPasswordChangePopup(false)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <BlurTargetView ref={blurTargetRef} style={{ flex: 1 }}>
                <SafeAreaView className="flex-1" style={{ backgroundColor: 'white' }} edges={['top']}>
                    <StatusBar barStyle="dark-content" />
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="">
                        <ScrollView
                            className=" bg-white"
                            contentContainerStyle={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}>
                            <BackButton onPress={() => router.back()} top={10} left={10} />
                            <PersonalInfoForm setShowDeleteAccountPopup={handleDeleteAccountPopup} setShowPasswordChangePopup={handlePasswordChangePopup} />
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </BlurTargetView>
            {isPending && (
                <BlurComponent blurTarget={blurTargetRef}>
                    <CustomLoading />
                </BlurComponent>
            )}
            {isError && showPopUp && (
                <BlurComponent blurTarget={blurTargetRef}>
                    <CustomPopUp
                        text={errorMessage}
                        onPress={() => { setShowPopUp(false) }}
                        buttonText="Ok"
                        warning
                    />
                </BlurComponent>
            )}
            {
                showPopup && (
                    <BlurComponent onTap={() => { setShowPopup(false) }} blurTarget={blurTargetRef} >
                        <CustomPopUp
                            text='Esta acción no se puede deshacer'
                            onPress={() => { }}
                            buttonText="Eliminar cuenta"
                            warning
                            buttonVariant="alert"
                        />
                    </BlurComponent>


                )
            }
            {
                showPasswordChangePopup && (
                    <BlurComponent onTap={() => { setShowPasswordChangePopup(false) }} blurTarget={blurTargetRef} >
                        <CustomPopUp
                            text='En breve recibirá un mail con las instrucciones para cambiar su contraseña'
                            onPress={() => {setShowPasswordChangePopup(false) }}
                            buttonText="Ok"
                            buttonVariant="filled"
                        />
                    </BlurComponent>
                )
            }
        </View>)
}
