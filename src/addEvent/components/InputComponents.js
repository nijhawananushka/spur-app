import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, KeyboardAvoidingView, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { StyleSheet } from 'react-native';

const TitleInputComponent = ({ onTitleChange, onEnterPressed }) => {
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
      {titlePlaceholderVisible && <Text style={textInputStyles.titlePlaceholder}>make plans</Text>}
      <TextInput
        style={textInputStyles.titleTextInput}
        ref={textInputRef}
        value={title}
        selectionColor={'#666564'}
        onChangeText={handleTitleChange}
        blurOnSubmit={false} 
        onSubmitEditing={onEnterPressed}
      />
    </View>
  );
};

const DescriptionInputComponent = React.forwardRef(({ onDescriptionChange, onEnterPressed }, ref) => {
  const [description, setDescription] = useState('');
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const scrollViewRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.nativeEvent.key === "Enter") {
      onEnterPressed && onEnterPressed();
    }
  };

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
          {isPlaceholderVisible && <Text style={textInputStyles.descriptionPlaceholder}>anything else you want to add?</Text>}
        </View>
        <TextInput
          style={textInputStyles.descriptionTextInput}
          selectionColor={'black'}
          value={description}
          onChangeText={handleTextChange}
          ref={ref}
          onKeyPress={handleKeyDown}
          onSubmitEditing={onEnterPressed}
          onFocus={() => setIsPlaceholderVisible(false)}
          onBlur={() => setIsPlaceholderVisible(description === '')}
          numberOfLines={5} 
          textAlignVertical="top" 
          multiline={true}
        />
    </KeyboardAwareScrollView>
  );
});

const textInputStyles = StyleSheet.create({
  titleContainer: {
    paddingBottom: '2%'
  },
  titleTextInput: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 30,
    color: '#666564',
  },
  titlePlaceholder: {
    position: 'absolute',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 30,
    color: '#666564',
  },
  descriptionContainer: {
    paddingTop: '2%',
    paddingLeft: '2%',
  },
  descriptionTextInput: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: 24,
    fontSize: 18,
    color: 'black',
  },
  descriptionPlaceholderContainer: {
    top: '10%',
    left: 0,
    right: 0,
  },
  descriptionPlaceholder: {
    position: 'absolute',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: 24,
    fontSize: 18,
    color: 'black',
  },
});

export { TitleInputComponent, DescriptionInputComponent };