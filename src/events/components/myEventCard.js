import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/components/myEventCardStyles';

const MyEventCard = ({ event }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.dateTime}>{event.dateTime.seconds}</Text>
            <View style={styles.locationWrapper}>
       
                <Text style={styles.location}>{event.location}</Text>
            </View>
        </View>
    );
};
export default MyEventCard;