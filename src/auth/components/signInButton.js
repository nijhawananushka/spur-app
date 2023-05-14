import React, { useState } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import logInButtonStyles from '../styles/components/signInButtonStyles';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId: '469727035724-jqjifc7sj20ftvivttoh21k01k583fbh.apps.googleusercontent.com',
});

const SignInWithGoogleButton = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

      // Sign in with Firebase using the Google ID token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      const user = await firestore().collection('userProfiles').doc(idToken).get();
      if (user.exists) {
        // User document exists, navigate to Main Screen
        await AsyncStorage.setItem('userToken', idToken);
        navigation.replace('Main');
      } else {
        // User document doesn't exist, navigate to Onboarding Screen
        navigation.navigate('Onboard');
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
            )
          }
        </TouchableOpacity>
    );
};

export default SignInWithGoogleButton;