import React, { useState, useRef, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Dimensions, View, Text, Animated } from 'react-native';
import CalendarStrip from 'react-native-scrollable-calendar-strip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rgbToHsl, hexToRgb, darkenColor } from '../../utils/Colors';
import { refreshToken } from '../../utils/AuthorizationTokens';

const hourHeight = Dimensions.get('window').height * 0.06;
const minHeight = Dimensions.get('window').height * 0.055;

const fetchEvents = async (date, accessToken) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const startTime = startOfDay.toISOString();
  const endTime = endOfDay.toISOString();

  // First fetch all calendars
  let calendarResponse = await fetch(`https://www.googleapis.com/calendar/v3/users/me/calendarList`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (calendarResponse.status === 401) {
    // Refresh the token
    accessToken = await refreshToken();

    // Try again with the new access token
    calendarResponse = await fetch(`https://www.googleapis.com/calendar/v3/users/me/calendarList`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  const calendarData = await calendarResponse.json();

  // Then fetch events from each calendar
  let allEvents = [];
  if (calendarData.items) {
    const fetchPromises = calendarData.items.map(async calendar => {
      try {
        const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendar.id)}/events?timeMin=${startTime}&timeMax=${endTime}&orderBy=startTime&singleEvents=true`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await response.json();
  
        // Add color to each event
        data.items.forEach(event => {
          event.color = calendar.backgroundColor;  // use this color to display event
        });
        return data.items;
      } catch (error) {
        console.error(`Failed to fetch events for calendar ${calendar.id}:`, error);
      }
    });
  
    const results = await Promise.all(fetchPromises);
  
    // Flatten the result arrays into allEvents array
    results.forEach(items => {
      if (items) { // Check if there was an error
        allEvents = [...allEvents, ...items];
      }
    });
  
    // Sort all events by start time
    allEvents.sort((a, b) => new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date));
  
    return allEvents;
  } else {
    console.log("No calendar items found.");
    return [];
  }
};
  
const CalendarView = ({color, setEventDate}) => {
  const date = new Date();
  const accent = color !== '#FFFFFF' && color !== 'white' ? color : `hsl(0, 0%, 75%)`;
  const darkenedAccent = color !== '#FFFFFF' && color !== 'white' ? darkenColor(accent, 20, 60): `hsl(0, 0%, 20%)`;
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0)); // For animation
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      const token = await AsyncStorage.getItem('calAccessToken');
      await setAccessToken(token);
    }
    fetchToken();
  }, []);

  useEffect(() => {
    const fetchInitialEvents = async () => {
      if (accessToken) {
        const fetchedEvents = await fetchEvents(date, accessToken);
        setEvents(fetchedEvents);
        setLoadingEvents(false);
        // Start the fade-in animation
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }).start();
      }
      else{
        console.log('Unable to fetch events', accessToken);
      }
    };
    fetchInitialEvents();
  }, [accessToken]);  // fetch events when the component mounts and the accessToken changes  
  
  const onDateSelected = async (date) => {
    setLoadingEvents(true);
    setEvents([]);
    setEventDate(new Date(date));
    if (accessToken) {
      const fetchedEvents = await fetchEvents(date, accessToken);
      setLoadingEvents(false);
      setEvents(fetchedEvents);
      // Stop any ongoing fade-in animations
      fadeAnim.stopAnimation();
      // Start the fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();
    }
    else{
      console.log('Unable to fetch events');
    }
  }; 

  return (
    <>
      <CalendarStrip 
        scrollable
        ref={calendarRef}
        calendarAnimation={{type: 'sequence', duration: 30}}
        onHeaderSelected={(d1, d2) => {calendarRef.current.setSelectedDate(date); calendarRef.current.scrollToInitialIndex();}}
        style={styles.outerContainer}
        onDateSelected={(date) => {setEventDate(new Date(date)); onDateSelected(date);}}
        selectedDate={date}
        calendarHeaderStyle={styles.dateHeaderText}
        innerStyle={{backgroundColor: '#ffffff', flex:1}}
        calendarHeaderContainerStyle={[styles.innerContainer, {backgroundColor: accent}]}
        dateNumberStyle={{fontWeight: 300, fontSize: 17}}
        dateNameStyle={{color: '#2d4150', marginBottom: '5%', fontSize: 10, fontWeight: '300', marginTop: '5%'}}
        highlightDateNumberStyle={{color: darkenedAccent}}
        calendarHeaderFormat={'MMMM YYYY'}
        daySelectionAnimation={{type: 'background', duration: 200, highlightColor: accent}}
        highlightDateNameStyle={{color: 'black'}}
        iconContainer={{flex: 0.1}}
      />
      {
        loadingEvents ?
        <ActivityIndicator size="small" color="black"/> :
        <Animated.FlatList
          data={events}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id + + item.start.dateTime + item.end.dateTime}
          renderItem={({ item }) => {
            const rgbColor = hexToRgb(item.color);
            const pastelColor = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b);   
            const startDateTime = item.start.dateTime ? new Date(item.start.dateTime) : new Date(item.start.date);
            const endDateTime = item.end.dateTime ? new Date(item.end.dateTime) : new Date(item.end.date);
            const isAllDayEvent = !(item.start.dateTime && item.end.dateTime);
            const durationInMilliseconds = isAllDayEvent ? 24 * 60 * 60 * 1000 : endDateTime - startDateTime;
            const durationInMinutes = Math.floor(durationInMilliseconds / (1000 * 60));
            const durationWithinDayInMinutes = Math.min(durationInMinutes, 24 * 60);
            const durationWithinDayInHours = durationWithinDayInMinutes / 60;
            const eventStyle = isAllDayEvent ? 
            {
              height: hourHeight,
            }
            : {
              height: durationWithinDayInHours * hourHeight < minHeight ? minHeight : durationWithinDayInHours * hourHeight,
            };
            return (
              <View style={[styles.eventItem, {backgroundColor: pastelColor}, eventStyle]}>
                <Text style={styles.eventTitle}>{item.summary}</Text>
                <Text style={styles.eventTime}>
                    {isAllDayEvent ? 'All day' :
                      (new Date(item.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) +
                      ' - ' +
                      (new Date(item.end.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))}
                  </Text>
              </View>
            );
          }}
        />
    }
    </>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    height: '20%',
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
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    borderRadius: 10,
    width: '95%',
    alignContent: 'center',
    padding: '2%',
    marginTop: '2%',
    alignSelf: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventTime: {
    fontSize: 14,
    color: 'black',
  },
});

export default CalendarView;