import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { Svg, Ellipse } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import styles from '../styles/screens/LoginScreenStyles';

GoogleSignin.configure({
  webClientId: '469727035724-jqjifc7sj20ftvivttoh21k01k583fbh.apps.googleusercontent.com',
});

const LoginScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);

  // Check if there is an active user session
  useEffect(() => {
    AsyncStorage.getItem('userToken').then((userToken) => {
      if (userToken) {
        navigation.navigate('Main');
      }
    });
  }, []);

  // Otherwise sign in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

      // Sign in with Firebase using the Google ID token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      await AsyncStorage.setItem('userToken', idToken);

      // Send successful pop up message
      Alert.alert('Success', 'Signed in with Google successfully');

      // Navigate to Main Screen
      navigation.navigate('Main');

    } catch (error) {
      console.log('Google Sign-In Error:', error);
      Alert.alert('Error: ', error.message);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Svg style={styles.ellipse1}>
        <Ellipse cx={225} cy={225} rx={225} ry={225} />
      </Svg>
      <Svg style={styles.ellipse2}>
        <Ellipse cx={225} cy={225} rx={225} ry={225} />
      </Svg>      
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>spur</Text>
      </View>
      <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle} disabled={loading}>
        {loading ? (
          <Text style={styles.buttonText}>Loading...</Text>
          ) : (
            <Text style={styles.buttonText}>Sign-In with Google</Text>
          )
        }
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
