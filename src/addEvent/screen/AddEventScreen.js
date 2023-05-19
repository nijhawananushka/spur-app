import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Keyboard, Image, Button } from 'react-native';
import addEventStyles from '../styles/AddEventStyles';
import {TitleInputComponent, DescriptionInputComponent} from '../components/InputComponents';
import Camera from '../components/Camera';
import PastelColorPicker from '../components/PastelColorPicker';
import CalendarView from '../components/ChooseDateCalendar';
import DatePicker from 'react-native-date-picker'

const AddEventScreen = ({ navigation }) => {
  const date = new Date();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [imageURI, setimageURI] = useState(false);
  const [color, setColor] = useState('#FFFFFF');
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(60); // Initial duration is set to 60 minutes

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
            <TitleInputComponent onTitleChange={setTitle} onEnterPressed={focusOnDescription}/>
            <DescriptionInputComponent ref={descriptionRef} onDescriptionChange={setDescription} onEnterPressed={() => setCalendarVisible(true)}/>          
        </View>
        }
        {calendarVisible &&
          <View style={addEventStyles.calendarContainer}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%', paddingTop: '2%'}}>
              <Button title="Start Time" onPress={() => setOpen(true)} />
              <DatePicker
                modal
                open={open}
                date={date}
                mode="time"
                onConfirm={(date) => {
                  setOpen(false)
                  setSelectedStartTime(date)
                }}
                onCancel={() => {
                  setOpen(false)
                }}
              />
              <Button title="End Time" onPress={() => setOpen1(true)} />
              <DatePicker
                modal
                open={open1}
                date={date}
                mode="time"
                onConfirm={(date) => {
                  setOpen1(false)
                  if (date < selectedStartTime){
                    const nextDate = new Date(date.getTime());
                    nextDate.setDate(date.getDate() + 1);
                    setSelectedEndTime(nextDate)
                  }
                  else {
                    setSelectedEndTime(date)
                  }
                }}
                onCancel={() => {
                  setOpen1(false)
                }}
              />
            </View>
            <CalendarView color={color} returnSelectedDate={setSelectedDate} setEventDate={setEventDate}/>
            <View style={[{position:'absolute', top: 500, width:'90%', alignSelf: 'center', justifyContent:'space-between', flexDirection: 'row'}]}>
              <TouchableOpacity style={{backgroundColor: 'grey', padding: '5%', alignContent: 'center', justifyContent: 'center'}} onPress={() => setCalendarVisible(false)}>
                <Text>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: 'grey', alignContent: 'center', justifyContent: 'center'}} onPress={() => {   
                const eventObject = {
                  title: title,
                  description: description,
                  selectedDate: selectedDate,
                  eventDate: eventDate,
                  selectedStartTime: selectedStartTime,
                  selectedEndTime: selectedEndTime,
                };
                // navigation.navigate('AddFriends', { eventObject: eventObject });
              }}>
                <Text>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        } 
      </View>
    </View>
  );
};

export default AddEventScreen;