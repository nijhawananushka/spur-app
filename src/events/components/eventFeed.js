import React from 'react';
import { FlatList, View, Text } from 'react-native';
import MyEventCard from "../components/myEventCard";
import OtherEventCard from "../components/otherEventCard";
const ItemSeparator = () => <View style={{ marginHorizontal: 10 }} />;

const EventFeed = ({ events, isHorizontal, isMyEvent }) => {
  return (
    <FlatList
      data={events}
      renderItem={({ item }) =>
        isMyEvent ? <MyEventCard event={item} /> : <OtherEventCard event={item} />
      }
      keyExtractor={(item) => item.id}
      horizontal={isHorizontal}
      ItemSeparatorComponent={ItemSeparator} // Add this line
      contentContainerStyle={{ paddingHorizontal: 10 }} // Optional: Adjust the container's padding
    />
  );
};

export default EventFeed;