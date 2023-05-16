import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text } from 'react-native';

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

  const handleTextSubmit = () => {
    setTitle('');
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
        onSubmitEditing={handleTextSubmit}        
      />
    </View>
  );
};

const DescriptionInputComponent = ({ onDescriptionChange }) => {
  const [description, setDescription] = useState('');
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const textInputRef = useRef(null);

  const handleTextChange = (newText) => {
    setDescription(newText);
    setIsPlaceholderVisible(newText === '');
    onDescriptionChange(newText); // Pass the updated description to the parent component
  };

  const handleTextSubmit = () => {
    console.log('Submitted description:', description);
    setDescription('');
  };

  return (
    <View style={textInputStyles.descriptionContainer}>
      <View style={textInputStyles.descriptionPlaceholderContainer}>
        {isPlaceholderVisible && <Text style={textInputStyles.descriptionPlaceholder}>what would you like to do?</Text>}
      </View>
      <TextInput
        style={textInputStyles.descriptionTextInput}
        ref={textInputRef}
        selectionColor={'black'}
        value={description}
        onChangeText={handleTextChange}
        onSubmitEditing={handleTextSubmit}
      />
    </View>
  );
};

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

export default textInputStyles;


export { TitleInputComponent, DescriptionInputComponent };
