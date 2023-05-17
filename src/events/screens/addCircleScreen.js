import React, { useState, useRef, useEffect } from 'react';
import { View,TextInput, TouchableOpacity, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInputComponent from '../../auth/components/textInput';
import logInButtonStyles from '../../auth/styles/components/signInButtonStyles';
import HapticFeedback from 'react-native-haptic-feedback';
import textInputStyles from '../../auth/styles/components/textInputStyles';

// you want to use anushkas pop up screen for this, title and description
const AddCircle = ({navigation }) => {
    const [username, setUsername] = useState('');
  
    const handleUsernameChange = (newUsername) => {
        setUsername(newUsername);
      };
    
    const handleCircleName = () => {
        navigation.navigate("CreateNewCircleWithFriends", { circleTitle: username });
      };
    return (
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInputComponent onUsernameChange={handleUsernameChange} placeholder="Enter Name of Circle"/>
      
        <TouchableOpacity
          style={[logInButtonStyles.googleButton, { marginTop: '20%' }]}
          onPress={handleCircleName}
        >
          <Text style={logInButtonStyles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

export default AddCircle;