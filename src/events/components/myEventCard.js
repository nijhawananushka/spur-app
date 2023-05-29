import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/components/myEventCardStyles';

const MyEventCard = ({ event }) => {
    const eventDate = new Date(event.eventDate);
    const startTime = new Date(event.startTime);
    const endTime = new Date(event.endTime);
  
    const formattedDate = eventDate
      ? eventDate.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : '';
  
    const formattedStartTime = startTime
      ? startTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
      : '';

      const formattedEndTime = endTime
      ? endTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
      : '';
  return (
    <View style={styles.card}>
      <Text style={styles.time}>{formattedStartTime}</Text>
      <Text style={styles.time}>{formattedEndTime}</Text>
      <Text style={styles.title}>{event.title}</Text>
      <View style={styles.locationWrapper}>
        <Text style={styles.location}>{event.location}</Text>
      </View>
    </View>
  );
};

export default MyEventCard;
   