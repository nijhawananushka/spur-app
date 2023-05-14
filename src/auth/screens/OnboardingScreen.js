import { View, Text } from 'react-native';
import LogOutButton from '../../feed/components/logOutButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Create components for adding Username
    // query database to ensure username is unique
    // add user and related info to 'UserProfile' in firestore
// Set Async state to hold userToken!!! VERY IMPORTANT
// Navigate to Main Feed if successful
// Navigate back to sign up creen if unsuccessful

const OnboardingScreen = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    const { idToken } = route.params;

    const registerUserToFireStore = async () => {
        // Get the user profile
        const user = auth().currentUser;
        const userProfile = {
            displayName: user.displayName,  
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            username: 'testUsername',
            // Add any additional fields you want to store in the document
        };
        // Create a document under the "UserProfiles" collection
        await firestore().collection('UserProfiles').doc(user.uid).set(userProfile);
        await AsyncStorage.setItem('userToken', idToken);
        await AsyncStorage.setItem('uid', user.uid);
        setLoading(false);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
    }
  
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Onboarding Screen</Text>
            <Button onPress={registerUserToFireStore} title="Registration"> Register User </Button>   
        </View>
    );
};

export default OnboardingScreen;