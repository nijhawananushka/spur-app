import React, { useState, useRef, useEffect } from 'react';
import { Alert, StyleSheet, FlatList, View, Text } from 'react-native';
import CalendarStrip from 'react-native-scrollable-calendar-strip';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchEvents = async (date, accessToken) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const startTime = startOfDay.toISOString();
  const endTime = endOfDay.toISOString();

  const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startTime}&timeMax=${endTime}&orderBy=startTime&singleEvents=true`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const data = await response.json();
  return data.items;
};

const darkenColor = (color, saturate, darken) => {
    const hslRegex = /^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/;
    const [, hue, saturation, lightness] = color.match(hslRegex);
    const newLightness = Math.max(Number(lightness) - darken, 0);
    const newSaturation = Math.min(Number(saturation) + saturate, 100);
    const newColor = `hsl(${hue}, ${newSaturation}%, ${newLightness}%)`;  
    return newColor;
};
  
const CalendarView = ({color, returnSelectedDate, setEventDate}) => {
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
  const accent = color !== '#FFFFFF' ? color : `hsl(0, 0%, 75%)`;
  const darkenedAccent = color !== '#FFFFFF' ? darkenColor(accent, 60, 40): `hsl(0, 0%, 20%)`;
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    async function fetchToken() {
      const token = await AsyncStorage.getItem('userToken');
      setAccessToken(token);
    }
    fetchToken();
  }, []);

  const onDateSelected = async (date) => {
    setEventDate(new Date(date));
    if (accessToken) {
      const fetchedEvents = await fetchEvents(date, accessToken);
      setEvents(fetchedEvents);
    }
    else{
      Alert.alert('Unable to fetch events');
    }
  }; 

  return (
    <>
      <CalendarStrip 
        scrollable
        ref={calendarRef}
        calendarAnimation={{type: 'sequence', duration: 30}}
        onHeaderSelected={(d1, d2) => {calendarRef.current.setSelectedDate(currentDate); calendarRef.current.scrollToInitialIndex();}}
        style={styles.outerContainer}
        onDateSelected={(date) => setEventDate(new Date(date))}
        selectedDate={currentDate}
        calendarHeaderStyle={styles.dateHeaderText}
        innerStyle={{backgroundColor: '#ffffff', flex:1}}
        calendarHeaderContainerStyle={[styles.innerContainer, {backgroundColor: accent}]}
        dateNumberStyle={{fontWeight: 300, fontSize: 17}}
        dateNameStyle={{color: '#2d4150', marginBottom: '10%', fontSize: 10, fontWeight: '300'}}
        highlightDateNumberStyle={{color: darkenedAccent}}
        calendarHeaderFormat={'MMMM YYYY'}
        daySelectionAnimation={{type: 'background', duration: 200, highlightColor: accent}}
        highlightDateNameStyle={{color: 'black'}}
        iconContainer={{flex: 0.1}}
      />
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.summary}</Text>
            <Text style={styles.eventTime}>{item.start.dateTime ? new Date(item.start.dateTime).toLocaleTimeString() : 'All day'}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    height: '12.5%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    backgroundColor: '#ffffff',
    alignContent: 'center',
    paddingTop: '3%',
    paddingBottom: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateHeaderText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
  },
  eventItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventTime: {
    fontSize: 14,
    color: '#777',
  },

});

export default CalendarView;