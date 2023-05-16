import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/components/otherEventCardStyles';
// import Icon from 'react-native-vector-icons/Ionicons'; // Uncomment this line if you have installed react-native-vector-icons

const pastelColors = ['#F6BCD5', '#BCC5F3', '#BCEBF3', '#E8ECF8']; // add your pastel colors here

const OtherEventCard = ({ event }) => {
    const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];

    return (
        <View style={[styles.card, {borderColor: randomColor}]}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.dateTime}>{event.dateTime.seconds}</Text>
            <View style={styles.locationWrapper}>
                {/* <Icon name="location-outline" size={20} color="black" /> */}
                <Text style={styles.location}>{event.location}</Text>
            </View>
        </View>
    );
};

export default OtherEventCard;