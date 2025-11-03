import auth from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';

export const signInWithApple = async () => {
  try {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identity token
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identity token returned');
    }

    // Create a Firebase credential with the token
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

    // Sign in to Firebase with that credential
    const userCredential = await auth().signInWithCredential(appleCredential);

    console.log('User signed in with Apple:', userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error('Apple Sign-In Error:', error);
    throw error;
  }
};
