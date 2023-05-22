import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/components/myEventCardStyles';

const MyEventCard = ({ event }) => {
  const formattedDate = event.eventDate
  console.log('eventDate',event.eventDate)
  console.log('eventTime',event.startTime)
    ? new Date(event.eventDate * 1000).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const formattedTime = event.startTime
    ? new Date(event.startTime * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      })
    : '';

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{event.eventDate}</Text>
      <Text style={styles.time}>{formattedTime}</Text>
      <Text style={styles.title}>{event.title}</Text>
      <View style={styles.locationWrapper}>
        <Text style={styles.location}>{event.location}</Text>
      </View>
    </View>
  );
};

export default MyEventCard;
