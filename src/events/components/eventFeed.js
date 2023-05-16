// import React, { useEffect, useState } from 'react';
// import { FlatList } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import EventCard from './eventCard';

// const EventFeed = ({ isHorizontal }) => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       const snapshot = await firestore().collection('Events').get();
//       const eventsData = snapshot.docs.map(doc => doc.data());

//       const participants = eventsData.reduce((acc, event) => [...acc, ...event.participants], []);
//       const uniqueParticipantIds = [...new Set(participants)];

//       const usersSnapshot = await firestore().collection('UserProfiles').where(firebase.firestore.FieldPath.documentId(), 'in', uniqueParticipantIds).get();
//       const usersData = usersSnapshot.docs.map(doc => doc.data());

//       const eventsWithParticipants = eventsData.map(event => ({
//         ...event,
//         participants: event.participants.map(id => usersData.find(user => user.id === id)),
//       }));

//       setEvents(eventsWithParticipants);
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <FlatList
//       data={events}
//       renderItem={({ item }) => <EventCard event={item} />}
//       keyExtractor={(item) => item.id}
//       horizontal={isHorizontal}
//     />
//   );
// };

// export default EventFeed;

import React from 'react';
import { FlatList } from 'react-native';
import EventCard from './eventCard';

const EventFeed = ({ events, isHorizontal }) => (
  <FlatList
    data={events}
    renderItem={({ item }) => <EventCard event={item} />}
    keyExtractor={(item) => item.id}
    horizontal={isHorizontal}
  />
);

export default EventFeed;