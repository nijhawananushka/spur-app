import React, { useState, useEffect } from 'react';
import {SafeAreaView, StyleSheet, View, Text } from 'react-native';
import EventFeed from '../components/eventFeed';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../styles/screens/eventRenderingScreenStyles";
const EventRenderingScreen = () => {
    const [myEvents, setMyEvents] = useState([]);
    const [otherEvents, setOtherEvents] = useState([]);

  const convertEventList = async (eventList) => {
    return Promise.all(
      eventList.map(async (event) => {
        // Check if 'participants' is an array as expected
        if (!Array.isArray(event.participants)) {
            console.error('participants is not an array:', event.participants);
            return Promise.resolve(event);  // Return the event unchanged
          }
          
  
        const uniqueParticipantIds = [...new Set(event.participants.map(id => id.trim()))];  // Trim the ids
  
        console.log('uniqueParticipantIds:', uniqueParticipantIds);
  
        // Fetch the user profiles of the participants
        const usersSnapshot = await firestore()
          .collection('UserProfiles')
          .where(firebase.firestore.FieldPath.documentId(), 'in', uniqueParticipantIds)
          .get();
  
        // Create a map of userId to user data
        const userIdToUser = {};
        usersSnapshot.forEach((doc) => {
          userIdToUser[doc.id] = doc.data();
        });
  
        // Replace the participant userIds with the actual user data
        const participants = event.participants.map((id) => userIdToUser[id.trim()]);  // Trim the id
  
        return {
          ...event,
          participants,
        };
      })
    );
  };

  useEffect(() => {
    const fetchEvents = async () => {
        try {
            const uid = await AsyncStorage.getItem('uid');
            console.log('uid:', uid);
            
            // Fetch 'myEvents', events that you have created, and you are going to go for? 
            const userDoc = await firestore().collection('UserProfiles').doc(uid).get();
            const userDocData = userDoc.data();
            const myEventIds = Array.isArray(userDocData.myEvents) ? userDocData.myEvents : [];
    
            Promise.all(myEventIds.map(async id => {
                id = id.trim();  // remove leading and trailing spaces
                const doc = await firestore().collection('Events').doc(id).get();
                if (!doc.exists) {
                console.error('No document found for id:', id);
                return null;  // or some default value
                }
                console.log('Event doc data:', doc.data());
                return { id: doc.id, ...doc.data() };  
            }))
            .then(myEventsData => {
                const validMyEvents = myEventsData.filter(event => event !== null);
                return convertEventList(validMyEvents);
            })
            .then(setMyEvents)
            .catch(err => console.error('Error fetching myEventsData:', err));
            
            // Fetch 'otherEvents' events that you have been invited to, but not yet accepted (vertical scroll)
            const otherEventIds = Array.isArray(userDocData.invitedEvents) ? userDocData.invitedEvents : [];
    
            Promise.all(otherEventIds.map(async id => {
                const doc = await firestore().collection('Events').doc(id).get();
                console.log('Event doc data:', doc.data());  // Add this line
                return { id: doc.id, ...doc.data() };  // change here
            }))
            .then(otherEventsData => {
                const validOtherEvents = otherEventsData.filter(event => event !== null);
                return convertEventList(validOtherEvents);
            })
            .then(setOtherEvents)
            .catch(err => console.error('Error fetching otherEventsData:', err));
            
        } catch (err) {
            console.error('Error in fetchEvents:', err);
        }
    };
    
    
    fetchEvents();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>your spurs</Text>
      <View style={styles.myEventsContainer}>
        <EventFeed events={myEvents} isHorizontal={true} isMyEvent={true} />
      </View>
      <Text style={styles.headerText}>spurs happening</Text>
      <View style={styles.otherEvents}>
        <EventFeed events={otherEvents} isHorizontal={false} isMyEvent={false} />
      </View>
    </SafeAreaView>
  );
};

export default EventRenderingScreen;