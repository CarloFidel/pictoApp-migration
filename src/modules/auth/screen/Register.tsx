import BlurComponent from '@/components/BlurComponent';
import CustomLoading from '@/components/CustomLoading';
import CustomPopUp from '@/components/PopUp';
import { BackButton } from '@/components/ui/BackButton';
import { getAxiosError } from '@/utility/getAxiosError';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomForm from '../components/CustomForm';
import { useRegisterMutation } from '../hooks/useRegisterMutation';


export const RegisterScreen = () => {
  const { mutate, isError, isPending, isSuccess, error } = useRegisterMutation()
  const [showPopUp, setShowPopUp] = useState(true)


  useEffect(() => {
    if (isError) {
      setShowPopUp(true)
    }
  }, [isError])

  const errorMessageFromServer = getAxiosError(error)

  return (
    <>
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
      {isPending && <>
        <BlurComponent />
        <CustomLoading />
      </>}
      {isError && showPopUp && <>
        <BlurComponent />
        <CustomPopUp
          text={errorMessageFromServer}
          onPress={() => { setShowPopUp(false) }}
          buttonText="Ok"
          warning
        />
      </>}
    </>
  )
}

