import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/components/myEventCardStyles';

const MyEventCard = ({ event }) => {
  const formattedDateTime = new Date(event.dateTime.seconds * 1000).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
// commented out date for testing purposes
  return (
    <View style={styles.card}>
      <Text style={styles.dateTime}>{formattedDateTime}</Text>
      <Text style={styles.title}>{event.title}</Text>
      <View style={styles.locationWrapper}>
        <Text style={styles.location}>{event.location}</Text>
      </View>
    </View>
  );
};

export default MyEventCard;
