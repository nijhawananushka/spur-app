// import React from 'react';
// import { SafeAreaView, StyleSheet, View } from 'react-native';
// import EventFeed from '../components/eventFeed';

// // Static data for testing
// const mockEvents = [
//   {
//     id: '1',
//     dateTime: '2023-06-10 18:00',
//     title: 'Test Event 1',
//     location: 'Test Location 1',
//     circleName: 'Test Circle 1',
//     participants: [
//       { id: '1', photoURL: 'https://example.com/user1.jpg' },
//       { id: '2', photoURL: 'https://example.com/user2.jpg' },
//     ],
//   },
//   {
//     id: '2',
//     dateTime: '2023-06-12 20:00',
//     title: 'Test Event 2',
//     location: 'Test Location 2',
//     circleName: 'Test Circle 2',
//     participants: [
//       { id: '3', photoURL: 'https://example.com/user3.jpg' },
//       { id: '4', photoURL: 'https://example.com/user4.jpg' },
//     ],
//   },
// ];

// const EventRenderingScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.myEvents}>
//         <EventFeed events={mockEvents} isHorizontal={true} />
//       </View>
//       <View style={styles.otherEvents}>
//         <EventFeed events={mockEvents} isHorizontal={false} />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   myEvents: {
//     flex: 1,
//   },
//   otherEvents: {
//     flex: 2,
//   },
// });

// export default EventRenderingScreen;

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import EventFeed from '../components/eventFeed';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventRenderingScreen = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [otherEvents, setOtherEvents] = useState([]);
  const convertEventList = async (eventList) => {
    return Promise.all(eventList.map(async (event) => {
      const uniqueParticipantIds = [...new Set(event.participants)];
  
      // Fetch the user profiles of the participants
      const usersSnapshot = await firestore().collection('UserProfiles').where(firebase.firestore.FieldPath.documentId(), 'in', uniqueParticipantIds).get();
  
      // Create a map of userId to user data
      const userIdToUser = {};
      usersSnapshot.forEach((doc) => {
        userIdToUser[doc.id] = doc.data();
      });
  
      // Replace the participant userIds with the actual user data
      const participants = event.participants.map((id) => userIdToUser[id]);
  
      return {
        ...event,
        participants,
      };
    }));
  };
  useEffect(() => {
    const fetchEvents = async () => {
      const uid = await AsyncStorage.getItem('uid');
      console.log('uid', uid); // currently logged user's uid
      // Fetch 'myEvents'
    //   const myEventsSnapshot = await firestore().collection('Events').where('uid', '==', uid).get();
    //   console.log('myEventsSnapshot', myEventsSnapshot.docs);
    //   const myEventsData = myEventsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //   setMyEvents(await convertEventList(myEventsData));

      // Fetch 'otherEvents'
      const otherEventsSnapshot = await firestore().collection('Events').where('participants', 'array-contains', uid).get();
      console.log('otherEventsSnapshot', otherEventsSnapshot.docs);
      const otherEventsData = otherEventsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOtherEvents(await convertEventList(otherEventsData));
    };

    fetchEvents();
  }, []);

  // Other code...

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.myEvents}>
        <EventFeed events={myEvents} isHorizontal={true} />
      </View>
      <View style={styles.otherEvents}>
        <EventFeed events={otherEvents} isHorizontal={false} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  myEvents: {
    flex: 1,
  },
  otherEvents: {
    flex: 2,
  },
});

export default EventRenderingScreen;