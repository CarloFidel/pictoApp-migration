import { Stack } from 'expo-router'
import { StackScreen } from 'expo-router/build/layouts/stack-utils'

const dashboardLaoyout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <StackScreen name='dashboard' />
    </Stack>
  )
}

export default dashboardLaoyout