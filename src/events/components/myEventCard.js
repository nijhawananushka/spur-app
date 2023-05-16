import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/components/myEventCardStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
const MyEventCard = ({ event }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.dateTime}>{event.dateTime.seconds}</Text>
            <View style={styles.locationWrapper}>
            <Ionicons name="location-outline" size={20} color="black" />
                <Text style={styles.location}>{event.location}</Text>
            </View>
        </View>
    );
};
export default MyEventCard;