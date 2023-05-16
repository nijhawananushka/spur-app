// import React from 'react';
// import { View, Text, Image, FlatList } from 'react-native';

// const EventCard = ({ event }) => {
//   if (!event) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View style={{ borderRadius: 10, padding: 10, margin: 10, backgroundColor: 'white' }}>
//       <Text>{event.dateTime}</Text>
//       <Text>{event.title}</Text>
//       {event.circleName && <View style={{ borderRadius: 10, padding: 5, backgroundColor: 'lightgray' }}>
//         <Text>{event.circleName}</Text>
//       </View>}
//       <Text>{event.location}</Text>
//       <FlatList
//         data={event.participants}
//         renderItem={({ item }) => <Image source={{ uri: item.photoURL }} style={{ width: 50, height: 50, borderRadius: 25 }} />}
//         keyExtractor={(item) => item.id}
//         horizontal
//       />
//     </View>
//   );
// };

// export default EventCard;

import React from 'react';
import { View, Text } from 'react-native';

const EventCard = ({ event }) => {
    console.log('myevent',event);  // Add this line to log the event object
  
    return (
      <View style={{ borderRadius: 10, padding: 10, margin: 10, backgroundColor: 'white' }}>
        <Text>{event.dateTime.toDate().toString()}</Text>
        <Text>{event.title}</Text>
        <Text>{event.location}</Text>
      </View>
    );
  };
  
export default EventCard;
