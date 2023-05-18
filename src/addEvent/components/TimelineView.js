import React, { useState, useRef, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, PanResponder, ScrollView, FlatList, View, Text, Animated } from 'react-native';
import { Dimensions } from 'react-native';
const hexToRgb = (hex) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Then, define the RGB to HSL conversion function we used earlier
const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min){
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  s *= 100;
  s = Math.round(s);
  l *= 100;
  l = Math.round(l);
  h = Math.round(360*h);
  
  // Adjust the saturation and lightness to make the color pastel
  return `hsl(${h}, ${Math.max(s - 50, 40)}%, ${90}%)`;
};

const hourHeight = Dimensions.get('window').height * 0.06;

const TimelineView = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const createPanResponder = () => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (selectedEvent) {
          // Update the position of the selected event while dragging
          const { dx, dy } = gestureState;
          selectedEvent.startX += dx;
          selectedEvent.startY += dy;
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Perform actions when the drag is released
        if (selectedEvent) {
          // Determine the final position of the dragged event
          const { dx, dy } = gestureState;
          const finalX = selectedEvent.startX + dx;
          const finalY = selectedEvent.startY + dy;
          
          // Calculate the new start and end times based on the position and duration of the dropped event
          const startHour = Math.floor(finalY / hourHeight);
          const endHour = Math.floor((finalY + selectedEvent.height) / hourHeight);
          const startMinutes = Math.round(((finalY % hourHeight) / hourHeight) * 60);
          const endMinutes = Math.round((((finalY + selectedEvent.height) % hourHeight) / hourHeight) * 60);

          // Update the event's start and end times
          const startDateTime = new Date(selectedEvent.start);
          startDateTime.setHours(startHour, startMinutes, 0, 0);
          const endDateTime = new Date(selectedEvent.start);
          endDateTime.setHours(endHour, endMinutes, 0, 0);
          selectedEvent.start = startDateTime;
          selectedEvent.end = endDateTime;

          // Clear the selected event 
          setSelectedEvent(null);
        }
      },
    });
  };

  const renderEvent = ({ item }) => {
    const start = item.start.dateTime;
    const end = item.end.dateTime;
    const startDateTime = new Date(item.start.dateTime);
    const endDateTime = new Date(item.end.dateTime);
    const durationInMilliseconds = endDateTime - startDateTime;
    const durationInMinutes = Math.floor(durationInMilliseconds / (1000 * 60));
    const durationWithinDayInMinutes = Math.min(durationInMinutes, 24 * 60);
    const durationWithinDayInHours = durationWithinDayInMinutes / 60;
    const rgbColor = hexToRgb(item.color);
    const pastelColor = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b);
    const startHour = startDateTime.getHours();
    const startMinute = startDateTime.getMinutes();
    const currentDateTime = new Date();
    const currentHour = currentDateTime.getHours();
    const currentMinute = currentDateTime.getMinutes();  
    const eventStyle = {
        height: durationWithinDayInHours * hourHeight,
        // top: startHour * hourHeight + (startMinute / 60) * hourHeight,
        backgroundColor: pastelColor,
    };

    return (
      <View
        key={item.id}
        style={[styles.event, eventStyle]}
      >
        <Text>{item.summary}</Text>
        <Text>
          {`${startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endDateTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}`}
        </Text>
      </View>
    );
  };

  return (
    <>
    <ScrollView style={styles.timelineContainer}>
      <View style={styles.timeline}/>
      <View style={styles.schedulePane}>
        <Animated.FlatList
            data={events}
            renderItem={renderEvent}
            keyExtractor={(item) => item.id}
            style={{ opacity: fadeAnim, flex: 1, flexGrow: 1 }} // Apply fade-in animation
        />
      </View>
    </ScrollView>
    </>
  );
};

const styles = {
    timelineContainer: {
        flex: 1,
      },
      timeline: {
        position: 'absolute',
        width: 2,
        backgroundColor: 'grey',
        left: '6%',
        top: 0,
        height: hourHeight * 24,
        bottom: 0,
      },
      schedulePane: {
        flex: 1,
        marginLeft: '10%',
        marginRight: '5%',
        width: '90%'
      },
      event: {
        borderRadius: 5,
        width: '95%',
        zIndex: 2,
        padding: 5,
        marginVertical: 5,
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
    };

export default TimelineView;