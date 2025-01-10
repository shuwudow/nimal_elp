// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import LoginScreen from './login';

export default function AuthLayout() {
  const { user } = useAuth();
  const router = useRouter();

  console.log('LOADED (auth); user: ', user);

  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user]);

  // return(
  //   <Stack>
  //   </Stack>
  // )

  // router.replace('./login');

  return(
    <Stack screenOptions={{
      // headerShown: false, // or true based on your needs
    }}>
      <Stack.Screen 
        name="login" 
        options={{
          // Your screen options
        }}
      />
      {/* Add other auth-related screens here */}
    </Stack>
  )
}