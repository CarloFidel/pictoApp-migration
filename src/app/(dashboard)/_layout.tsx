import { Stack } from 'expo-router';
import { StackScreen } from 'expo-router/build/layouts/stack-utils';

const dashboardLaoyout = () => {
  return (
    <Stack.Protected guard={false}>
      <Stack screenOptions={{ headerShown: false }}>
        <StackScreen name='dashboard' />
      </Stack>
    </Stack.Protected>
  );
};

export default dashboardLaoyout;