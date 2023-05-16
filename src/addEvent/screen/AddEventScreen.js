import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, Button } from 'react-native';
import addEventStyles from '../styles/AddEventStyles';
import ImagePicker from 'react-native-image-picker';
import { StyleSheet } from 'react-native';
import {TitleInputComponent, DescriptionInputComponent} from '../components/InputComponents';
import Camera from '../components/Camera';

const AddEventScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  return (
    <View style={addEventStyles.container}>
      <View style={addEventStyles.header}>
        {/* <TouchableOpacity onPress={() => { navigation.goBack(); }}>
          <Text style={addEventStyles.headerText}> &lt; </Text>
        </TouchableOpacity> */}
        <Camera />
        {/* <Text style={addEventStyles.headerText}>spur it up</Text>
        <TouchableOpacity onPress={() => { Alert.alert('Button 2 pressed'); }}>
          <Text style={addEventStyles.headerText}> &gt; </Text>
        </TouchableOpacity> */}
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