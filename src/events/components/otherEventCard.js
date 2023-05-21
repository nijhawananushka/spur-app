import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/components/otherEventCardStyles';

const OtherEventCard = ({ event }) => {
  let formattedDateTime = '';
  if (event.dateTime && event.dateTime.seconds) {
    formattedDateTime = new Date(event.dateTime.seconds * 1000).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  const pastelColors = ['#F6BCD5', '#BCC5F3', '#BCEBF3', '#E8ECF8'];
  const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];

  return (
    <View style={[styles.card, { borderColor: randomColor }]}>
      <Text style={styles.dateTime}>{formattedDateTime}</Text>
      <Text style={styles.title}>{event.title}</Text>
      <View style={styles.locationWrapper}>
        <Text style={styles.location}>{event.location}</Text>
      </View>
    </View>
  );
};

export default OtherEventCard;
