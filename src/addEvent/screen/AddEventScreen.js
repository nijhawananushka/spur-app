import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, Button } from 'react-native';
import addEventStyles from '../styles/AddEventStyles';
import ImagePicker from 'react-native-image-picker';
import { StyleSheet } from 'react-native';
import {TitleInputComponent, DescriptionInputComponent} from '../components/InputComponents';
const AddEventScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURI, setImageURI] = useState(null);
  
  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.uri) {
        setImageURI(response.uri);
      }
    });
  };

  return (
    <View style={addEventStyles.container}>
      <View style={addEventStyles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
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
          <View style={styles.imageContainer}>
            {imageURI && <Image source={{ uri: imageURI }} style={styles.image} />}
          </View>
          <TouchableOpacity style={styles.cameraButton} onPress={openCamera}></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddEventScreen;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },

  cameraButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },

  cameraButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
