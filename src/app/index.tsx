import { useAuthStore } from '@/modules/auth/store/authStore';
import { Redirect } from 'expo-router';


const index = () => {

  const {isLoggedIn} = useAuthStore()

  if(isLoggedIn) {
    return <Redirect href="/dashboard" />
  }

  return (
    <Redirect href="/onboarding" />
  );
}

export default index