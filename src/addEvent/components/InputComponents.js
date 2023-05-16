import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, KeyboardAvoidingView, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { StyleSheet } from 'react-native';

const TitleInputComponent = ({ onTitleChange }) => {
  const [title, setTitle] = useState('');
  const [titlePlaceholderVisible, setTitlePlaceholderVisible] = useState(true);
  const textInputRef = useRef(null);
  
  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  const handleTitleChange = (newText) => {
    setTitle(newText);
    setTitlePlaceholderVisible(newText === '');
    onTitleChange(newText);
  };

  return (
    <View style={textInputStyles.titleContainer}>
      <View style={textInputStyles.titlePlaceholderContainer}>
        {titlePlaceholderVisible && <Text style={textInputStyles.titlePlaceholder}>make plans</Text>}
      </View>
      <TextInput
        style={textInputStyles.titleTextInput}
        ref={textInputRef}
        value={title}
        selectionColor={'#666564'}
        onChangeText={handleTitleChange}
      />
    </View>
  );
};

const DescriptionInputComponent = ({ onDescriptionChange }) => {
  const [description, setDescription] = useState('');
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const textInputRef = useRef(null);
  const scrollViewRef = useRef(null);

  const handleTextChange = (newText) => {
    setDescription(newText);
    setIsPlaceholderVisible(newText === '');
    onDescriptionChange(newText); 
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <KeyboardAwareScrollView
        contentContainerStyle={textInputStyles.descriptionContainer}
        innerRef={scrollViewRef}>
        <View style={textInputStyles.descriptionPlaceholderContainer}>
          {isPlaceholderVisible && <Text style={textInputStyles.descriptionPlaceholder}>what would you like to do?</Text>}
        </View>
        <TextInput
          style={textInputStyles.descriptionTextInput}
          ref={textInputRef}
          selectionColor={'black'}
          value={description}
          onChangeText={handleTextChange}
          onFocus={() => setIsPlaceholderVisible(false)}
          onBlur={() => setIsPlaceholderVisible(description === '')}
          numberOfLines={5} // Specify the initial number of lines to display
          textAlignVertical="top" // Align text to the top of the input
          multiline={true} // Allow multiple lines
        />
    </KeyboardAwareScrollView>
  );
};

const textInputStyles = StyleSheet.create({
  titleContainer: {
    paddingTop: '2%',
    paddingBottom: '5%',
  },
  titleTextInput: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 30,
    lineHeight: 40,
    color: '#666564',
    selectionWidth: 6,
    paddingTop: '10%', // Adjust this value to vertically align the cursor with the placeholder
  },
  titlePlaceholderContainer: {
    top: '10%', // Adjust this value to vertically align the placeholder with the cursor
    left: 0,
    right: 0,
  },
  titlePlaceholder: {
    position: 'absolute',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 30,
    lineHeight: 60,
    color: '#666564',
    paddingTop: '5%', // Adjust this value to vertically align the cursor with the placeholder
  },
  descriptionContainer: {
    paddingTop: '2%',
    paddingLeft: '3%',
  },
      descriptionTextInput: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 20,
    color: 'black',
  },
  descriptionPlaceholderContainer: {
    top: '10%', // Adjust this value to vertically align the placeholder with the cursor
    left: 0,
    right: 0,
  },
  descriptionPlaceholder: {
    position: 'absolute',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 20,
    color: 'black',
  },
});

export { TitleInputComponent, DescriptionInputComponent };