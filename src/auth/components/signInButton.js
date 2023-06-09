import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import logInButtonStyles from '../styles/components/signInButtonStyles';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId: '469727035724-ohvcq11f86v39udoauv7nncvq32prlo4.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  offlineAccess: true,      // for refresh token
});

const SignInWithGoogleButton = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const { idToken, serverAuthCode } = await GoogleSignin.signIn();
      const { id, accessToken } = await GoogleSignin.getTokens();
      // Sign in with Firebase using the Google ID token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const userUid = userCredential.user.uid;
      const user = await firestore().collection('UserProfiles').doc(userUid).get();

      // Save the tokens to AsyncStorage
      if (accessToken) {
        await AsyncStorage.setItem('calAccessToken', accessToken);
        console.log('Access Token:', accessToken);
      } else {
        await AsyncStorage.removeItem('calAccessToken');
      }
      if (serverAuthCode) {
        await AsyncStorage.setItem('calRefreshToken', serverAuthCode);
        console.log('Refresh Token:', serverAuthCode);
      } else {
        await AsyncStorage.removeItem('calRefreshToken');
      }

      if (user.exists) {
        // User document exists, navigate to Main Screen
        await AsyncStorage.setItem('uid', user.data().uid);
        await AsyncStorage.setItem('userToken', idToken);
        navigation.replace('EventsRendering');
      } else {
        // User document doesn't exist, navigate to Onboarding Screen
        navigation.navigate('Onboard', {idToken});
      }
    } catch (error) {
      console.log('Google Sign-In Error:', error);
      Alert.alert('Unable to Sign In!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity style={logInButtonStyles.googleButton} onPress={signInWithGoogle} disabled={loading}>
      {loading ? (
        <Text style={logInButtonStyles.buttonText}>Loading...</Text>
      ) : (
        <Text style={logInButtonStyles.buttonText}>Sign-In with Google</Text>
      )}
    </TouchableOpacity>
  );
};

export default SignInWithGoogleButton;