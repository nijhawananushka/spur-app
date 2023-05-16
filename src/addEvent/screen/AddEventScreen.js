import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, Button } from 'react-native';
import addEventStyles from '../styles/AddEventStyles';
import Icon from 'react-native-ionicons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {TextInputComponent, TitleInputComponent, DescriptionInputComponent} from '../components/InputComponents';
const AddEventScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const renderTitlePlaceholder = () => {
    if (title === '') {
      return <Text style={addEventStyles.placeholderText}>Title</Text>;
    }
    return null;
  };

  const renderDescriptionPlaceholder = () => {
    if (description === '') {
      return <Text style={addEventStyles.placeholderText}>Description</Text>;
    }
    return null;
  };

  return (
    <View style={addEventStyles.container}>
      <View style={addEventStyles.header}>
        <TouchableOpacity style={{color: 'transparent'}} onPress={() => {
          navigation.goBack();}}>
          <Text style={addEventStyles.headerText}> &lt; </Text>
          </TouchableOpacity>
        <Text style={addEventStyles.headerText}>spur it up</Text>
        <TouchableOpacity onPress={() => { Alert.alert('Button 2 pressed'); }}>
          <Text style={addEventStyles.headerText}> &gt; </Text>
        </TouchableOpacity>
      </View>
      <View style={addEventStyles.roundedContainer}>
        <View style={addEventStyles.inputContainer}>
          <TitleInputComponent onTitleChange={setTitle} />
          <DescriptionInputComponent onDescriptionChange={setDescription} />
        </View>
      </View>
    </View>
  );
};

export default AddEventScreen;