import { BlurComponent, ConfirmModal, CustomLoading, CustomPopUp } from "@/components/common"
import { BackButton } from "@/components/ui/BackButton"
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
    const { mutate, isError: isErrorEditProfile, isPending: isPendingEditProfile, showPopUp: showPopUpEditProfile, setShowPopUp: setShowPopUpEditProfile, errorMessage: errorMessageEditProfile } = useEditProfile()
    const { mutate: mutateRemoveProfile, isError: isErrorRemoveProfile, isPending: isPendingRemoveProfile, errorMessage: errorMessageRemoveProfile } = useRemoveProfile()
    const [showRemoveAccountPopup, setShowRemoveAccountPopup] = useState(false)
    const [showPasswordChangePopup, setShowPasswordChangePopup] = useState(false)

    const blurTargetRef = useRef<View>(null)

    const handleDeleteAccountPopup = () => {
        setShowRemoveAccountPopup((prev) => !prev)
    }

    const handlePasswordChangePopup = () => {
        setShowPasswordChangePopup((prev) => !prev)
    }
    const handleDeleteAccount = () => {
        mutateRemoveProfile()
    }

    return (
        <View style={{ flex: 1 }}>
            <BlurTargetView ref={blurTargetRef} style={{ flex: 1 }}>
                <SafeAreaView className="flex-1" style={{ backgroundColor: 'white' }}>
                    <StatusBar barStyle="dark-content" />
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="">
                        <ScrollView
                            className=" bg-white"
                            contentContainerStyle={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}>
                            <BackButton onPress={() => router.back()} top={10} left={10} />
                            <PersonalInfoForm setShowPopUpEditProfile={setShowPopUpEditProfile} setShowPasswordChangePopup={handlePasswordChangePopup} onEditProfile={mutate} />
                            <Animated.View entering={FadeInDown.duration(800)} exiting={FadeOut.duration(300)} className='gap-5'>
                                <Pressable onPress={() => { handleDeleteAccountPopup() }}>
                                    <Text className="text-lg font-hanken-light text-center w-full px-6 text-alert mb-10">Eliminar cuenta</Text>
                                </Pressable>
                            </Animated.View>

                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </BlurTargetView>
            {isPendingRemoveProfile && (
                <>
                    {
                        setShowRemoveAccountPopup(false)

                    }
                    <BlurComponent blurTarget={blurTargetRef}>
                        <CustomLoading />
                    </BlurComponent>

                </>
            )}
            {isPendingEditProfile && (
                <>
                    {
                        setShowPopUpEditProfile(false)

                    }
                    <BlurComponent blurTarget={blurTargetRef}>
                        <CustomLoading />
                    </BlurComponent>

                </>
            )}
            {isErrorEditProfile && (
                <BlurComponent blurTarget={blurTargetRef}>
                    <CustomPopUp
                        text={errorMessageEditProfile}
                        onPress={() => { setShowPopUpEditProfile(false) }}
                        buttonText="Ok"
                        warning
                    />
                </BlurComponent>
            )}
            {
                showRemoveAccountPopup && (
                    <BlurComponent blurTarget={blurTargetRef} >
                    </BlurComponent>
                )
            }
            <ConfirmModal
                visible={showRemoveAccountPopup}
                titleOne="Eliminar"
                titleTwo="Cancelar"
                variantOne="alert"
                variantTwo="outline"
                text='¿Seguro desea eliminar su cuenta?'
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
                            info
                        />
                    </BlurComponent>
                )
            }
        </View>)
}
