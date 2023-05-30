import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import TextInputComponent from '../../auth/components/textInput';
import logInButtonStyles from '../../auth/styles/components/signInButtonStyles';
import Icon from 'react-native-vector-icons/Ionicons';

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
    // might want to change this text input component to enable autocorrect
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={{position: 'absolute', top: '10%', left: '5%'}} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" size={28} color="black"/>
      </TouchableOpacity>
      <TextInputComponent onUsernameChange={handleUsernameChange} placeholder="Enter Name of Circle"/>
      <TouchableOpacity
        style={[logInButtonStyles.googleButton, { marginTop: '20%' }]}
        onPress={handleCircleName}>
        <Text style={logInButtonStyles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCircle;