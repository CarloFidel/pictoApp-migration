import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'HankenGrotesk-Light': require('@/assets/fonts/HankenGrotesk-Light.ttf'),
    'HankenGrotesk-Regular': require('@/assets/fonts/HankenGrotesk-Regular.ttf'),
    'HankenGrotesk-Medium': require('@/assets/fonts/HankenGrotesk-Medium.ttf'),
    'HankenGrotesk-Bold': require('@/assets/fonts/HankenGrotesk-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <Slot />;
}
