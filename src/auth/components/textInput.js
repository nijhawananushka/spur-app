import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
import textInputStyles from '../styles/components/textInputStyles';
import { checkUsernameExists } from './usernameValidation';

const TextInputComponent = ({ onUsernameChange }) => {
  const [text, setText] = useState('');
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const textInputRef = useRef(null);

  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  const handleTextChange = (newText) => {
    setText(newText);
    setIsPlaceholderVisible(newText === '');
    setIsUsernameValid(true);
    onUsernameChange(newText);
  };

  const handleTextSubmit = async () => {
    if (text.trim() === '') {
      setIsUsernameValid(false);
      return;
    }

    const usernameExists = await checkUsernameExists(text);

    if (usernameExists) {
      setIsUsernameValid(false);
    } else {
      setIsUsernameValid(true);
      setText('');
      onUsernameChange(text);
    }
  };

  return (
    <View style={textInputStyles.container}>
      <TextInput
        style={[textInputStyles.textInput, !isUsernameValid && textInputStyles.invalidInput]}
        ref={textInputRef}
        value={text}
        onChangeText={handleTextChange}
        onSubmitEditing={handleTextSubmit}
        autoCorrect={false}
      />
      <View style={textInputStyles.placeholderContainer}>
        {isPlaceholderVisible && <Text style={textInputStyles.placeholder}>Enter Username</Text>}
      </View>
      {!isUsernameValid && <Text style={textInputStyles.errorText}>Username is already taken.</Text>}
    </View>
  );
};

export default TextInputComponent;