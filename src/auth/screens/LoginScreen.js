import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/screens/LoginScreenStyles';
import SignInWithGoogleButton from '../components/signInButton';
import AnimatedBubbles from '../components/animatedBubbles';

const LoginScreen = ({ navigation, route }) => {
  // Check if there is an active user session
  useEffect(() => {
    AsyncStorage.getItem('userToken').then((userToken) => {
      if (userToken) {
        navigation.navigate('Main');
      }
    });
  }, []);

  return (
    <View style={styles.container}>
        <AnimatedBubbles />
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>spur</Text>
        </View>
        <SignInWithGoogleButton navigation={navigation} />
      </View>
  );
};

export default LoginScreen;