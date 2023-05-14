import React, { useState, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View, Alert, Animated } from 'react-native';
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

      // Navigate to Main Screen
      navigation.navigate('Main');

    } catch (error) {
      console.log('Google Sign-In Error:', error);
      Alert.alert('Unable to Sign In!');
      
    } finally {
      setLoading(false);
    }
  };

  const moveAnimation1 = useRef(new Animated.Value(0)).current;
  const moveAnimation2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(moveAnimation1, {
          toValue: 1,
          duration: 9000,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnimation2, {
          toValue: 1,
          duration: 9000,
          useNativeDriver: true,
        })
      ]),
      { iterations: -1 }
    ).start();
  }, [moveAnimation1, moveAnimation2]);

  const translateX1 = moveAnimation1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 360],
  });

  const translateY1 = moveAnimation1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 350],
  });

  const translateX2 = moveAnimation2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -350],
  });

  const translateY2 = moveAnimation2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -450],
  });

  return (
    <View style={styles.container}>
      <Svg style={styles.background} height="100%" width="100%">
        <Animated.View style={[{ transform: [{ translateX: translateX1 }, { translateY: translateY1 }] }]}>
          <Svg style = {styles.ellipse1}>
            <Ellipse cx={225} cy={225} rx={225} ry={225}/>
          </Svg>
        </Animated.View>
        <Animated.View style={[{ transform: [{ translateX: translateX2 }, { translateY: translateY2 }] }]}>
          <Svg style = {styles.ellipse2}>
            <Ellipse cx={225} cy={225} rx={225} ry={225}/>
          </Svg>
        </Animated.View>    
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