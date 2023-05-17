import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Keyboard, Image, Button } from 'react-native';
import addEventStyles from '../styles/AddEventStyles';
import {TitleInputComponent, DescriptionInputComponent} from '../components/InputComponents';
import Camera from '../components/Camera';
import PastelColorPicker from '../components/PastelColorPicker';
import CalendarScreen from './ChooseDateScreen';
import CalendarView from '../components/ChooseDateCalendar';

const AddEventScreen = ({ navigation }) => {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURI, setimageURI] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [color, setColor] = useState('#FFFFFF');

  const descriptionRef = useRef(null);
  const focusOnDescription = () => {
    descriptionRef.current.focus();
  };

  return (
    <View style={addEventStyles.container}>
      <View style={addEventStyles.header}>
        {!isCameraVisible && !imageURI && 
            <TouchableOpacity style={[addEventStyles.heading, {backgroundColor: 'transparent', height: '100%', width: '100%'}]} onPress={() => { setIsCameraVisible(true);  Keyboard.dismiss(); }}>
              <Text style={addEventStyles.headerText}>spur it up</Text>
            </TouchableOpacity>
        }
        {isCameraVisible && !imageURI &&
          <>
          <Camera setColor={color} onPhotoTaken={setimageURI} cameraVisbility={setIsCameraVisible}/>
            <TouchableOpacity style={{position: 'absolute', top: '20%', right: '5%'}} 
                onPress={() => {setimageURI(null); setIsCameraVisible(false);}}>
            <Text style= {{fontFamily: 'Inter-ExtraBold', fontSize: 30, lineHeight: 18, paddingTop: 6, zIndex: 2}}> x </Text>
          </TouchableOpacity>
          </>
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
        {!calendarVisible &&
          <View style={addEventStyles.inputContainer}>
            <PastelColorPicker setColor={setColor}/>
            <View style={[addEventStyles.navigationButtonsContainer, {paddingTop: '5%'}]}>
              <Button title='x' style={{fontFamily: 'Inter-Bold', color: 'black', zIndex: 2, height: '10%', width: '10%'}} onPress={() => navigation.goBack()} />
              <Button title='>' style={{fontFamily: 'Inter-Bold', color: 'black', zIndex: 2, height: '10%', width: '10%'}} onPress={() => setCalendarVisible(true)} />
            </View>
            <TitleInputComponent onTitleChange={setTitle} onEnterPressed={focusOnDescription} />
            <DescriptionInputComponent ref={descriptionRef} onDescriptionChange={setDescription} onEnterPressed={() => setCalendarVisible(true)}/>          
        </View>
        }
        {calendarVisible &&
          <View style={addEventStyles.calendarContainer}>
            <View style={[addEventStyles.navigationButtonsContainer, {paddingTop: '2%', width:'90%', alignSelf: 'center'}]}>
              <Button title='<' style={{fontFamily: 'Inter-Bold', color: 'black', height: '10%', width: '10%'}} onPress={() => setCalendarVisible(false)} />
              <Button title='>' style={{fontFamily: 'Inter-Bold', color: 'black', height: '10%', width: '10%'}} onPress={() => Alert.alert("Calendar")} />
            </View>
            <CalendarView color={color} returnSelectedDate={setSelectedDate} setEventDate={setEventDate}/>
          </View>
        } 
      </View>
    </View>
  );
};

export default AddEventScreen;