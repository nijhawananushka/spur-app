import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInputComponent from '../components/textInput';
import logInButtonStyles from '../styles/components/signInButtonStyles';
import HapticFeedback from 'react-native-haptic-feedback';
import { nodeModuleNameResolver } from 'typescript';

const OnboardingScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const { idToken } = route.params;
  const [username, setUsername] = useState('');

  const registerUserToFireStore = async () => {
    // Get the user profile
    HapticFeedback.trigger('selection');
    const user = auth().currentUser;
    const userProfile = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      username: username,
      friends: [],
    };
    // Create a document under the "UserProfiles" collection
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
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInputComponent onUsernameChange={handleUsernameChange} />
      <TouchableOpacity style={[logInButtonStyles.googleButton, {marginTop: '20%'}]} onPress={registerUserToFireStore}>
        <Text style={logInButtonStyles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;