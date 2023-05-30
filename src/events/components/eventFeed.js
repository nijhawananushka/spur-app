import React from 'react';
import { FlatList, View } from 'react-native';
import MyEventCard from "../components/myEventCard";
import OtherEventCard from "../components/otherEventCard";

const EventFeed = ({ events, isHorizontal, isMyEvent }) => {
  return (
    <FlatList
      data={events}
      renderItem={({ item }) =>
        isMyEvent ? <MyEventCard event={item} /> : <OtherEventCard event={item} />
      }
      keyExtractor={(item) => item.id}
      horizontal={isHorizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default EventFeed;