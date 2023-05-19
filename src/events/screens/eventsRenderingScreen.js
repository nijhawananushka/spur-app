import React, { useState, useEffect } from 'react';
import {SafeAreaView, TouchableOpacity, View, Text } from 'react-native';
import EventFeed from '../components/eventFeed';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../styles/screens/eventRenderingScreenStyles";
import AddSpurButton from '../../feed/components/addSpurButton';
import LogOutButton from '../../feed/components/logOutButton';
import Icon from 'react-native-vector-icons/Ionicons';

const EventRenderingScreen = ({navigation}) => {
  const [myEvents, setMyEvents] = useState([]);
  const [otherEvents, setOtherEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [greetingMessage, setGreetingMessage] = useState('');
  const [today, setToday] = useState('');
  const [tomorrow, setTomorrow] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userToken').then((userToken) => {
      if (!userToken) {
        navigation.replace('Login');
      }
    });
    AsyncStorage.getItem('uid').then(async (uid) => {
      const userDoc = await firestore().collection('UserProfiles').doc(uid).get();
      setUser(userDoc.data());
    });
     // morning greeting
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    if (6 < currentHour && currentHour < 12) {
      setGreetingMessage('good morning');
    } else if (12 <= currentHour && currentHour < 18) {
      setGreetingMessage('good afternoon');
    } else {
      setGreetingMessage('good evening');
    }
    setToday(currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }));

    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    setTomorrow(tomorrowDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }));
  }, []);


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
        // Format and display the eventDate property
        const formattedEventDate = new Date(event.eventDate).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        });
        return {
          ...event,
          participants,
          formattedEventDate,
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
            console.log('userDoc',userDocData);
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
      <View style={styles.headerContainer}>
        <Text style={styles.header}> {`${greetingMessage}, ${user?.displayName.toLowerCase().split(' ')[0]}`} </Text>
        <TouchableOpacity onPress={() => {navigation.replace('AddNewFriendsCircles')}}>
          <Icon name="people-outline" size={28} color="black"/>
        </TouchableOpacity>
      </View>
    <View style={styles.contentContainer}>
    <LogOutButton navigation={navigation} /> 
      <Text style={styles.headerText}>your spurs</Text>
        <View style={styles.myEventsContainer}>
          <EventFeed events={myEvents} isHorizontal={true} isMyEvent={true} />
        </View>
      <Text style={styles.headerText}>spurs happening</Text>
      <View style={styles.otherEvents}>
        <EventFeed events={otherEvents} isHorizontal={false} isMyEvent={false} />
      </View>
    </View>
    <AddSpurButton navigation={navigation} />
  </SafeAreaView>
  );
};


export default EventRenderingScreen;