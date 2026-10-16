import { useAuthStore } from '@/modules/auth/store/authStore';
import { Stack } from 'expo-router';
import { StackScreen } from 'expo-router/build/layouts/stack-utils';

const dashboardLaoyout = () => {


  const { isLoggedIn } = useAuthStore()
  console.log('isLoggedIn', isLoggedIn)

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
      </Stack.Protected>
    </Stack>
  );
};

export default dashboardLaoyout;