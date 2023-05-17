import React from 'react';
import { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import CalendarView from '../components/ChooseDateCalendar';
import addEventStyles from '../styles/AddEventStyles';
const CalendarScreen = ({ route, navigation }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [eventDate, setEventDate] = useState('');
  
    const accentColor = route.params.accentColor;
    return (
      <View style={{alignContent:'center', height:'100%', width:'100%', top:'20%', flexDirection:'row'}}>
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <View style={addEventStyles.calendarContainer}>
            <View style={[addEventStyles.navigationButtonsContainer, {paddingTop: '2%', width:'90%', alignSelf: 'center'}]}>
                <Button title='<' style={{fontFamily: 'Inter-Bold', color: 'black', height: '10%', width: '10%'}} onPress={() => navigation.goBack()} />
                <Button title='>' style={{fontFamily: 'Inter-Bold', color: 'black', height: '10%', width: '10%'}} onPress={() => Alert.alert("Calendar")} />
            </View>
            <CalendarView color={accentColor} returnSelectedDate={setSelectedDate} setEventDate={setEventDate}/>
        </View>
        </View>
      </View>
    );
  };
  
export default CalendarScreen;
