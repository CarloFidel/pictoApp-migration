import { BlurComponent, CustomLoading, CustomPopUp } from "@/components/common"
import { BackButton } from "@/components/ui/BackButton"
import { useRegister } from "@/modules/auth/hooks/useRegister"
import { useAuthStore } from "@/modules/auth/store/authStore"
import { BlurTargetView } from "expo-blur"
import { router } from "expo-router"
import { useRef } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { PersonalInfoForm } from "../components/PersonalInfoForm"

export const PersonalInfo = () => {
    const { email, name, logOut, avatar, roles } = useAuthStore.getState()
    const { mutate, isError, isPending, showPopUp, setShowPopUp, errorMessage } = useRegister()
    const blurTargetRef = useRef<View>(null)

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
                            <PersonalInfoForm />
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
        </View>)
}
