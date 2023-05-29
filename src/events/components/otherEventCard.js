import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/components/otherEventCardStyles';

const OtherEventCard = ({ event }) => {
  const [randomColor, setRandomColor] = useState('#F6BCD5');

  useEffect(() => {
    const pastelColors = ['#F6BCD5', '#BCC5F3', '#BCEBF3', '#E8ECF8'];
    setRandomColor(pastelColors[Math.floor(Math.random() * pastelColors.length)]);
  }, []);

  let formattedDateTime = '';
  if (event.dateTime && event.dateTime.seconds) {
    var date = new Date(event.dateTime.seconds * 1000);
    var day = date.toLocaleString('en-US', { weekday: 'long' });
    var time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    formattedDateTime = `${day}, ${time}`;
}

  return (
    <View style={[styles.card, { borderColor: randomColor }]}>
      <Text style={styles.title}>{event.title}</Text>
      {/* <Text style={styles.dateTime}>{formattedDateTime}</Text> */}
      <Text style={styles.startTime}>{event.startTime}</Text>
      <Text style={styles.startTime}>{event.endTime}</Text>
      <View style={styles.locationWrapper}>
        <Text style={styles.location}>{event.location}</Text>
      </View>
    </View>
  );
};

export default OtherEventCard;