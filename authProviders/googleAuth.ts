// authProviders/googleAuth.ts
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID',
});

export const signInWithGoogle = async () => {
  try {
    // Get the user's ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign in the user with the credential
    await auth().signInWithCredential(googleCredential);
  } catch (error) {
    throw error;
  }
};