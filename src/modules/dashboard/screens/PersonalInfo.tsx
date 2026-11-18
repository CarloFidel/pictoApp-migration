import { BlurComponent, CustomLoading, CustomPopUp } from "@/components/common"
import ConfirmModal from "@/components/common/ConfirmModal"
import { BackButton } from "@/components/ui/BackButton"
import { useAuthStore } from "@/modules/auth/store/authStore"
import { BlurTargetView } from "expo-blur"
import { router } from "expo-router"
import { useRef, useState } from "react"
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, Text, View } from "react-native"
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { PersonalInfoForm } from "../components/PersonalInfoForm"
import { useEditProfile } from "../hooks/useEditProfile"
import { useRemoveProfile } from "../hooks/useRemoveProfile"

export const PersonalInfo = () => {
    const { mutate, isError, isPending, showPopUp, setShowPopUp, errorMessage } = useEditProfile()
    const { mutate: mutateRemoveProfile, isError: isErrorRemoveProfile, isPending: isPendingRemoveProfile, showPopUp: showPopUpRemoveProfile, setShowPopUp: setShowPopUpRemoveProfile, errorMessage: errorMessageRemoveProfile } = useRemoveProfile()
    const { token } = useAuthStore()
    const blurTargetRef = useRef<View>(null)
    const [showRemoveAccountPopup, setShowRemoveAccountPopup] = useState(false)
    const [showPasswordChangePopup, setShowPasswordChangePopup] = useState(false)

    const handleDeleteAccountPopup = () => {
        setShowRemoveAccountPopup((prev) => !prev)
    }

    const handlePasswordChangePopup = () => {
        setShowPasswordChangePopup((prev) => !prev)
    }
    const handleDeleteAccount = () => {
        mutateRemoveProfile(token ?? '')
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
                            <PersonalInfoForm setShowDeleteAccountPopup={handleDeleteAccountPopup} setShowPasswordChangePopup={handlePasswordChangePopup} onEditProfile={mutate} />
                            <Animated.View entering={FadeInDown.duration(800)} exiting={FadeOut.duration(300)} className='gap-5'>
                                <Pressable onPress={() => { handleDeleteAccountPopup() }}>
                                    <Text className="text-lg font-hanken-light text-center w-full px-6 text-alert mb-10">Eliminar cuenta</Text>
                                </Pressable>
                            </Animated.View>

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
                showRemoveAccountPopup && (
                    <BlurComponent blurTarget={blurTargetRef} outDelay={100} >
                    </BlurComponent>
                )
            }
            <ConfirmModal
                visible={showRemoveAccountPopup}
                titleOne="Eliminar"
                titleTwo="Cancelar"
                variantOne="alert"
                variantTwo="outline"
                text='¿ºSeguro desea eliminar su cuenta?'
                onPressOne={handleDeleteAccount}
                onPressTwo={handleDeleteAccountPopup}
            />

            {
                showPasswordChangePopup && (
                    <BlurComponent onTap={() => { setShowPasswordChangePopup(false) }} blurTarget={blurTargetRef} >
                        <CustomPopUp
                            text='En breve recibirá un mail con las instrucciones para cambiar su contraseña'
                            onPress={() => { setShowPasswordChangePopup(false) }}
                            buttonText="Ok"
                            buttonVariant="filled"
                        />
                    </BlurComponent>
                )
            }
        </View>)
}
