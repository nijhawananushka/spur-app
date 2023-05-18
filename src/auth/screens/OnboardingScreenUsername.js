import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInputComponent from '../components/textInput';
import logInButtonStyles from '../styles/components/signInButtonStyles';
import HapticFeedback from 'react-native-haptic-feedback';
import { checkUsernameExists } from '../components/usernameValidation';
import {Animated,  Easing } from 'react-native';
import { useEffect } from 'react';

const OnboardingScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const { idToken } = route.params;
  const [username, setUsername] = useState('');
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isInvalidCharacters, setIsInvalidCharacters] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);
  const shakeAnimation = new Animated.Value(0);

  useEffect(() => {
    if (shouldShake) {
      startShakeAnimation();
    }
  }, [shouldShake]);

  const startShakeAnimation = () => {
    shakeAnimation.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -1,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const shakeTransformStyle = {
    transform: [
      {
        translateX: shakeAnimation.interpolate({
          inputRange: [-1, 1],
          outputRange: [-5, 5],
        }),
      },
    ],
  };

  const registerUserToFireStore = async () => {
    HapticFeedback.trigger('selection');
    const user = auth().currentUser;

    if (!username.trim()) {
      console.log('Username cannot be empty');
      setShouldShake(true);
      return;
    }
    const trimmedUsername = username.trim(); // trim username to remove whitespace

    // Check for invalid characters using regular expression
    const invalidCharactersRegex = /[^a-zA-Z0-9_.]/;
    if (invalidCharactersRegex.test(trimmedUsername)) {
      setIsInvalidCharacters(true);
      setShouldShake(true);
      return;
    }

    const usernameExists = await checkUsernameExists(trimmedUsername);
    if (usernameExists) {
      HapticFeedback.trigger('notificationError');
      setIsUsernameTaken(true);
      setShouldShake(true);
      return;
    }

    const userProfile = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      username: trimmedUsername,
      friends: [],
      circles: [],
      myEvents: [], 
      otherEvents: [],
    };

    await firestore().collection('UserProfiles').doc(user.uid).set(userProfile);
    await AsyncStorage.setItem('userToken', idToken);
    await AsyncStorage.setItem('uid', user.uid);
    setLoading(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'OnboardFriends' }],
    });
  };

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
    setIsUsernameTaken(false);
    setIsInvalidCharacters(false);
    setShouldShake(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInputComponent onUsernameChange={handleUsernameChange} placeholder="Enter Username"/>
      {isUsernameTaken && (
        <Text style={{ color: 'red', position: 'absolute', top: '43%' }}>username not available</Text>
      )}
      {isInvalidCharacters && (
        <Text style={{ color: 'blue', position: 'absolute', top: '43%' }}>no need to punctuate here ;)</Text>
      )}
      <TouchableOpacity
        style={[logInButtonStyles.googleButton, { marginTop: '2%', position: 'absolute', top: '52%' }, shouldShake && shakeTransformStyle]}
        onPress={registerUserToFireStore}>
        <Text style={logInButtonStyles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;