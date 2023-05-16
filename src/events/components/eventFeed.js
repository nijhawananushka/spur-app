import React from 'react';
import { FlatList } from 'react-native';
import MyEventCard from './myEventCard';
import OtherEventCard from './otherEventCard';

const EventFeed = ({ events, isHorizontal, isMyEvent }) => {
  return (
    <FlatList
      data={events}
      renderItem={({ item }) => 
        isMyEvent ? <MyEventCard event={item} /> : <OtherEventCard event={item} />
      }
      keyExtractor={(item) => item.id}
      horizontal={isHorizontal}
    />
  )
};

export default EventFeed;

// need to reduce the gap between the items in this