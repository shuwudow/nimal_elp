import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useContext } from 'react';
import 'react-native-reanimated';
import { AuthProvider, AuthContext } from '../context/AuthContext';
// import { useAuth } from '../context/AuthContext';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ColorSchemeName } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

  function RootLayoutNav() {
    const colorScheme = useColorScheme();
    const { user, loading } = useContext(AuthContext);  // Add isLoading from your auth context
  
    // Don't render routes until auth is initialized
    if(loading) {
      return null;
    }

    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name={user === null ? "(auth)" : "(tabs)"}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    );
  }

  export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
  
    useEffect(() => {
      if (loaded) {
        SplashScreen.hideAsync();
      }
    }, [loaded]);
  
    if (!loaded) {
      return null;
    }

    return (
      <AuthProvider>
        <RootLayoutNav />
        <StatusBar style="auto" />
      </AuthProvider>
    );
  }
