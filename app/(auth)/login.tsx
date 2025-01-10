// app/(auth)/LoginScreen.tsx
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';

export default function LoginScreen() {
  const { signIn, error, loading } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Continue</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        mode="contained"
        onPress={() => signIn('google')}
        style={styles.button}
        disabled={loading}
      >
        Sign in with Google
      </Button>
      <Button
        mode="contained"
        onPress={() => signIn('facebook')}
        style={styles.button}
        disabled={loading}
      >
        Sign in with Facebook
      </Button>
      <Button
        mode="contained"
        onPress={() => signIn('apple')}
        style={styles.button}
        disabled={loading}
      >
        Sign in with Apple
      </Button>
      {/* Add more sign-in options as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
  },
  button: {
    width: '80%',
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});