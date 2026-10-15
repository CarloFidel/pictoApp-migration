import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import GlobalProvider from '@/config/providers/GlobalProvider';
import { customDate } from '@/utility/customDate';
import { getPayloadJwt, PayloadJwt } from '@/utility/getPayloadJwt';
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

  const token: PayloadJwt = getPayloadJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoiYTA3MjRhMzktMWRjMC00YThmLWE3NDctZjAwNmRiMzRlMmM4IiwibmFtZSI6IkFkbWluIiwibGFzdE5hbWUiOiJBZG1pbiIsInJvbGVzIjpbInRoZXJhcGlzdCJdLCJpYXQiOjE3OTIwNjgyMjYsImV4cCI6MTc5MjA3NTQyNn0.Y-CfHQaOVXkSXRtkv1gWjkPvt8suShS70vKDxVTSOrA');
  console.log(token.exp);
  const expDate = customDate(token.exp);
  console.log(expDate.getHours(), expDate.getMinutes(), expDate.getSeconds());



  return (
    <GlobalProvider>
      <Slot />
    </GlobalProvider>)
}
