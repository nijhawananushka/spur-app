import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, Keyboard, Image, Button } from 'react-native';
import addEventStyles from '../styles/AddEventStyles';
import FriendCard from '../../auth/components/friendCard';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const EventCard = ({ event }) => {
  return (
    <View style={[addEventStyles.roundedContainer, { borderColor: event.color }]}>
      <Text style={addEventStyles.eventTitle}>{event.title}</Text>
      <Text style={addEventStyles.eventDate}>{event.date}</Text>
      <Text style={addEventStyles.eventLocation}>{event.location}</Text>
      <Text style={addEventStyles.eventDescription}>{event.description}</Text>
    </View>
  );
};

const AddFriendsCircles = ({ navigation }) => {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURI, setimageURI] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [color, setColor] = useState('#FFFFFF');
  const [friends, setFriends] = useState([]);
  const [searchText, setSearchText] = useState('');
  const descriptionRef = useRef(null);
  const focusOnDescription = () => {
    descriptionRef.current.focus();
  };
  const db = firestore();
  const currentUser = auth().currentUser;

  const filteredFriends = friends.filter((friend) => {
    const friendName = friend.displayName ? friend.displayName.toLowerCase() : '';
    const searchLower = searchText.toLowerCase();
    return friendName.includes(searchLower);
  });
  

  const handleAddFriend = useCallback((userId) => {
    setSelectedFriends((prevSelectedFriends) => [...prevSelectedFriends, userId]);
  }, []);

  const handleRemoveFriend = useCallback((userId) => {
    setSelectedFriends((prevSelectedFriends) => prevSelectedFriends.filter((id) => id !== userId));
  }, []);

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    if (currentUser) {
      db.collection('UserProfiles')
        .doc(currentUser.uid)
        .get()
        .then(async documentSnapshot => {
          if (documentSnapshot.exists) {
            const userData = documentSnapshot.data();
  
            // Check if user has friends
            if (userData.friends && userData.friends.length > 0) {
              const batchSize = 10;
              const friendsData = [];
              const numberOfBatches = Math.ceil(userData.friends.length / batchSize);
  
              for (let i = 0; i < numberOfBatches; i++) {
                // Get the current batch of friend UIDs (up to 10 friends)
                const batchUids = userData.friends.slice(i * batchSize, (i + 1) * batchSize);
  
                try {
                  // Retrieve data for the current batch of friends
                  const querySnapshot = await db.collection('UserProfiles')
                    .where('uid', 'in', batchUids)
                    .get();
  
                  friendsData.push(...querySnapshot.docs.map(doc => doc.data()));
                } catch (error) {
                  console.log('Error fetching friends data:', error);
                }
              }
  
              setFriends(friendsData);
            }
          }
        })
        .catch(error => {
          console.log('Error fetching user data:', error);
        });
    }
  }, [currentUser]);

  const myEvent = {
    id: '1',
    title: 'Event 1',
    date: '2023-05-20',
    location: 'Location 1',
    description: 'Description for Event 1',
    color: color,
  };

  return (
    <View style={addEventStyles.container}>
      <View style={addEventStyles.testHeader}>
        <EventCard event={myEvent} />
      </View>

      <View style={[addEventStyles.roundedContainer2, { borderColor: color }]}>
      <ScrollView contentContainerStyle={{ paddingTop: 40 }}>
        {filteredFriends.map(friend => (
          <FriendCard
            key={friend.uid}
            friend={friend}
            onAddFriend={handleAddFriend}
            onRemoveFriend={handleRemoveFriend}
          />
        ))}
        {/* <OnboardingCompleteButton navigation={navigation} /> */}
      </ScrollView>
      </View>
    </View>
  );
};

export default AddFriendsCircles;