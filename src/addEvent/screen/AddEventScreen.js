import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, Button, Image } from 'react-native';
import addEventStyles from '../styles/AddEventStyles';
import ImagePicker from 'react-native-image-picker';
import { StyleSheet } from 'react-native';
import {TitleInputComponent, DescriptionInputComponent} from '../components/InputComponents';
import Camera from '../components/Camera';

const AddEventScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURI, setimageURI] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  return (
    <View style={addEventStyles.container}>
      <View style={addEventStyles.header}>
        {!isCameraVisible && !imageURI &&
          <View style={{width: '80%', padding: '30%'}}>
            <View>
              <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                <Text style={addEventStyles.headerText}> &lt; </Text>
              </TouchableOpacity>
              <Text style={addEventStyles.headerText}>spur it up</Text>
              <TouchableOpacity onPress={() => { Alert.alert('Button 2 pressed'); }}>
                <Text style={addEventStyles.headerText}> &gt; </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={{position: 'absolute', backgroundColor: 'white', width: 80, height: 80}} onPress={() => { setIsCameraVisible(true); }} />
            </View>
          </View>
        }
        {isCameraVisible && !imageURI &&
          <Camera onPhotoTaken={setimageURI} prop2={setIsCameraVisible}/>
        } 
        {imageURI && !isCameraVisible &&
          <>
            <Image source={{ uri: imageURI }} style={addEventStyles.imagePreview} />
            <TouchableOpacity style={{position: 'absolute', top: '20%', right: '10%'}} 
              onPress={() => {setimageURI(null); setIsCameraVisible(false);}}>
              <Text style= {{fontFamily: 'Inter-Bold', fontSize: 30}}> x </Text>
            </TouchableOpacity>
          </>
        }
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