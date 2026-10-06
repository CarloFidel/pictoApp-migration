import { BackButton } from '@/components/ui/BackButton'
import { router } from 'expo-router'
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomForm from '../components/CustomForm'

export const LoginScreen = () => {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: 'white' }} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="">
        <ScrollView
          className=" bg-white"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <BackButton onPress={() => router.back()} top={10} left={10} />
          <CustomForm onSubmitTrigger='login' formType='login' />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

