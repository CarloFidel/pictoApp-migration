import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { BlurComponent, CustomPopUp } from '@/components/common';
import GlobalProvider from '@/config/providers/GlobalProvider';
import { useCustomLoginExpire } from '@/modules/auth/hooks/useCustomLoginExpire';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { View } from 'react-native';
import '../global.css';

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded, error] = useFonts({
    'HankenGrotesk-Light': require('@/assets/fonts/HankenGrotesk-Light.ttf'),
    'HankenGrotesk-Regular': require('@/assets/fonts/HankenGrotesk-Regular.ttf'),
    'HankenGrotesk-Medium': require('@/assets/fonts/HankenGrotesk-Medium.ttf'),
    'HankenGrotesk-Bold': require('@/assets/fonts/HankenGrotesk-Bold.ttf'),
  });

  const [showPopUp, setShowPopUp] = useState<boolean>(true)
  const [timeCounter, setTimeCounter] = useState<number>(30)

  const delay = useCustomLoginExpire()
  const sessionEnding = delay > 0 && delay <= 30_000

  useEffect(() => {
    if (sessionEnding) {
      const timeout = setTimeout(() => {
        setTimeCounter(timeCounter - 1)
      }, 1000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [timeCounter, sessionEnding])

  useEffect(() => {
    GoogleSignin.configure({
      profileImageSize: 120,
    })

  })


  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }




  return (
    <GlobalProvider>
      <View style={{ flex: 1 }}>
        <Slot />
        {sessionEnding && showPopUp && (
          <BlurComponent>
            <CustomPopUp
              warning
              text={`Tu sesión caducará en ${timeCounter} segundos`}
              onPress={() => { setShowPopUp(false) }}
            />
          </BlurComponent>
        )}
      </View>
    </GlobalProvider>
  )
}