import BlurComponent from '@/components/common/BlurComponent';
import CustomLoading from '@/components/common/CustomLoading';
import CustomPopUp from '@/components/common/PopUp';
import { BackButton } from '@/components/ui/BackButton';
import { BlurTargetView } from 'expo-blur';
import { router } from 'expo-router';
import { useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomForm from '../components/CustomForm';
import { useRegister } from '../hooks/useRegister';


export const RegisterScreen = () => {

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
              showsVerticalScrollIndicator={false}>
              <BackButton onPress={() => router.back()} top={10} left={10} />
              <CustomForm formType='register' onRegister={mutate} />
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
    </View>
  )
}

