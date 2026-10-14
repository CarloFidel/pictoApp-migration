import { Stack } from 'expo-router';
import { StackScreen } from 'expo-router/build/layouts/stack-utils';

const dashboardLaoyout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={false}>
        <StackScreen name='dashboard' />
      </Stack.Protected>
    </Stack>
  );
};

export default dashboardLaoyout;