import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInputComponent from '../components/textInput';
import logInButtonStyles from '../styles/components/signInButtonStyles';
import HapticFeedback from 'react-native-haptic-feedback';
import { checkUsernameExists } from '../components/usernameValidation';

const OnboardingScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const { idToken } = route.params;
  const [username, setUsername] = useState('');
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isInvalidCharacters, setIsInvalidCharacters] = useState(false);

  const registerUserToFireStore = async () => {
    HapticFeedback.trigger('selection');
    const user = auth().currentUser;

    if (!username.trim()) {
      console.log('Username cannot be empty');
      return;
    }
    const trimmedUsername = username.trim(); // trim username to remove whitespace

    // Check for invalid characters using regular expression
    const invalidCharactersRegex = /[^a-zA-Z0-9_.]/;
    if (invalidCharactersRegex.test(trimmedUsername)) {
      setIsInvalidCharacters(true);
      return;
    }

    const usernameExists = await checkUsernameExists(trimmedUsername);
    if (usernameExists) {
      HapticFeedback.trigger('notificationError');
      setIsUsernameTaken(true);
      return;
    }

    const userProfile = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      username: trimmedUsername,
      friends: [],
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
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInputComponent onUsernameChange={handleUsernameChange} placeholder="Enter Username"/>
      {isUsernameTaken && (
        <Text style={{ color: 'red', marginTop: 10 }}>Username is already taken</Text>
      )}
      {isInvalidCharacters && (
        <Text style={{ color: 'blue', marginTop: 10 }}>no need for punctuation here!</Text>
      )}
      <TouchableOpacity
        style={[logInButtonStyles.googleButton, { marginTop: '20%' }]}
        onPress={registerUserToFireStore}
      >
        <Text style={logInButtonStyles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;