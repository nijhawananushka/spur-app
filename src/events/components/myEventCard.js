import React, { useState } from 'react';
import { View, Image, Text, Animated, TouchableOpacity, Easing, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/components/myEventCardStyles';
import CreateGCalEventRequest from '../../utils/CreateGCalEventRequest.js';

const dateStringFormatLocationStyle = 'en-US';

const MyEventCard = ({ event }) => {
    const eventDate = new Date(event.eventDate);
    const startTime = new Date(event.startTime);
    const endTime = new Date(event.endTime);
    const participantImages = event.participantImages ? event.participantImages.slice(0, 4) : [];
    const [joinState, setJoinState] = useState('add');
    const animatedValue = new Animated.Value(0);

    const formattedDate = eventDate
      ? eventDate.toLocaleDateString(dateStringFormatLocationStyle, {
          weekday: 'short',
          month: 'long',
          day: 'numeric',
        })
      : '';
  
    const formattedStartTime = startTime
      ? startTime.toLocaleTimeString(dateStringFormatLocationStyle, {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
      : '';

    const formattedEndTime = endTime
      ? endTime.toLocaleTimeString(dateStringFormatLocationStyle, {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
      : '';

    const rotateIcon = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: joinState === 'add' ? ['0deg', '360deg'] : ['360deg', '0deg'],
    });

    const handlePress = () => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        if (joinState === 'add') {
          Alert.alert(
            "Add to Calendar",
            "Would you like to add this event to your Google Calendar?",
            [
              {
                text: "No",
                onPress: () => console.log("Cancelled"),
                style: "cancel"
              },
              { text: "Yes", onPress: () => CreateGCalEventRequest() }
            ],
            { cancelable: true }
          );
        }
        setJoinState(joinState === 'add' ? 'checkmark' : 'add');
        animatedValue.setValue(0);
      });
    };

  return (
    <View style={styles.card}>
     <Text style={styles.title}>{event.title}</Text>
     <Text style={styles.time}>{formattedDate} . {formattedStartTime} - {formattedEndTime}</Text>
      <View style={styles.locationWrapper}>
        <Text style={styles.location}>{event.location}</Text>
      </View>
      <TouchableOpacity style={styles.joinButton} onPress={handlePress}>
        <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
          <Ionicons name={joinState} size={24} color="black" />
        </Animated.View>
      </TouchableOpacity>
      <View style={styles.participantImageContainer}>
        {participantImages.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.participantImage} />
        ))}
      </View>
    </View>
  );
};

export default MyEventCard;