import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
import textInputStyles from '../styles/components/textInputStyles';

const TextInputComponent = ({ onUsernameChange }) => {
  const [text, setText] = useState('');
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const textInputRef = useRef(null);

  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  const handleTextChange = (newText) => {
    setText(newText);
    setIsPlaceholderVisible(newText === '');
    onUsernameChange(newText); // Pass the updated username to the parent component
  };

  const handleTextSubmit = () => {
    console.log('Submitted:', text);
    setText('');
  };

  return (
    <View style={textInputStyles.container}>
      <TextInput
        style={textInputStyles.textInput}
        ref={textInputRef}
        value={text}
        onChangeText={handleTextChange}
        onSubmitEditing={handleTextSubmit}
        autoCorrect={false} // Disable autocorrect
      />
      <View style={textInputStyles.placeholderContainer}>
        {isPlaceholderVisible && <Text style={textInputStyles.placeholder}>Enter Username</Text>}
      </View>
    </View>
  );
};

export default TextInputComponent;