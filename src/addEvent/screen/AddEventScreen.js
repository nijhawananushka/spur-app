import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Keyboard, Image } from 'react-native';
import addEventStyles from '../styles/AddEventStyles';
import {TitleInputComponent, DescriptionInputComponent} from '../components/InputComponents';
import Camera from '../components/Camera';
import PastelColorPicker from '../components/PastelColorPicker';

const AddEventScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURI, setimageURI] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [color, setColor] = useState('#FFFFFF');

  return (
    <View style={addEventStyles.container}>
      <View style={addEventStyles.header}>
        {!isCameraVisible && !imageURI &&
            <TouchableOpacity style={[addEventStyles.heading, {backgroundColor: 'transparent', height: '100%', width: '100%'}]} onPress={() => { setIsCameraVisible(true);  Keyboard.dismiss(); }}>
              <Text style={addEventStyles.headerText}>spur it up</Text>
            </TouchableOpacity>
        }
        {isCameraVisible && !imageURI &&
          <Camera setColor={color} onPhotoTaken={setimageURI} cameraVisbility={setIsCameraVisible}/>
        } 
        {imageURI && !isCameraVisible &&
          <>
            <Image source={{ uri: imageURI }} style={addEventStyles.imagePreview} />
            <TouchableOpacity style={{position: 'absolute', top: '20%', right: '5%'}} 
              onPress={() => {setimageURI(null); setIsCameraVisible(false);}}>
              <Text style= {{fontFamily: 'Inter-ExtraBold', fontSize: 30, lineHeight: 18, paddingTop: 6}}> x </Text>
            </TouchableOpacity>
          </>
        }
      </View>
      <View style={[addEventStyles.roundedContainer, {borderColor: color}]}>
        <View style={addEventStyles.inputContainer}>
          <PastelColorPicker setColor={setColor}/>
          <TitleInputComponent onTitleChange={setTitle} />
          <DescriptionInputComponent onDescriptionChange={setDescription} />
        </View>
      </View>
    </View>
  );
};

export default AddEventScreen;