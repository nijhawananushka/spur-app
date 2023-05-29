import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import styles from '../styles/components/otherEventCardStyles';

const OtherEventCard = ({ event }) => {
  const [randomColor, setRandomColor] = useState('#F6BCD5');
    // get the participant images,max2
  const participantImages = event.participantImages ? event.participantImages.slice(0, 2) : [];
  useEffect(() => {
    const pastelColors = ['#F6BCD5', '#BCC5F3', '#BCEBF3', '#E8ECF8'];
    setRandomColor(pastelColors[Math.floor(Math.random() * pastelColors.length)]);
  }, []);

  const eventDate = new Date(event.eventDate);
  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);

  const formattedDate = eventDate
    ? eventDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
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
    <View style={[styles.card, { borderColor: randomColor }]}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.time}>{formattedDate} . {formattedStartTime} - {formattedEndTime}</Text>
      <View style={styles.locationWrapper}>
        <Text style={styles.location}>{event.location}</Text>
      </View>
      <View style = {styles.joinButton}>
        <Button title="join" onPress = {() => console.log("Join button pressed")} />
      </View>
      <View style={styles.participantImageContainer}>
        {participantImages.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.participantImage} />
        ))}
      </View>
    </View>
  );
};

export default OtherEventCard;