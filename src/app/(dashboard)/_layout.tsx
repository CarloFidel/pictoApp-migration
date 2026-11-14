import { useAuthStore } from '@/modules/auth/store/authStore';
import { Stack } from 'expo-router';
import { StackScreen } from 'expo-router/build/layouts/stack-utils';
import { Platform } from 'react-native';

const dashboardLaoyout = () => {


  const { isLoggedIn } = useAuthStore()

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <StackScreen name='dashboard' />
        <StackScreen name='about' />
        <StackScreen name='faqs' />
        <StackScreen name='myPhotos' />
        <StackScreen name='myProfile' />
        <StackScreen name='myArticles' />
        <StackScreen name='mySchedules' />
        <StackScreen
          name="avatarChange"
          options={{
            presentation: 'formSheet',
            sheetGrabberVisible: true,
            sheetAllowedDetents: [0.98],
            sheetCornerRadius: 28,
            sheetElevation: 24,
            headerTransparent: true,
            contentStyle: {
              backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#ffffff',
            },
          }}
        />
      </Stack.Protected>
    </Stack>
  );
};

export default dashboardLaoyout;