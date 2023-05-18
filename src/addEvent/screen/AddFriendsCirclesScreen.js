import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text,TextInput, TouchableOpacity } from 'react-native';
import addEventStyles from '../styles/AddEventStyles';
import FriendCard from '../../auth/components/friendCard';
import CircleCard from '../../auth/components/circleCard';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import HapticFeedback from 'react-native-haptic-feedback';
import addFriendsCirclesStyles from '../styles/components/addFriendsCirclesScreenStyles';

const EventCard = ({ event }) => {
  return (
    <View style={[addEventStyles.roundedContainer3, { borderColor: event.color }]}>
      <Text style={addEventStyles.eventTitle}>{event.title}</Text>
      <Text style={addEventStyles.eventDate}>{event.date}</Text>
      <Text style={addEventStyles.eventLocation}>{event.location}</Text>
      <Text style={addEventStyles.eventDescription}>{event.description}</Text>
    </View>
  );
};

const AddFriendsCircles = ({ navigation }) => {
  const currentUser = auth().currentUser;
  const db = firestore();

  const [selectedFriends, setSelectedFriends] = useState([]);
  const [selectedCircles, setSelectedCircles] = useState([]);
  const [friends, setFriends] = useState([]);
  const [circles, setCircles] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (currentUser) {
      db.collection('UserProfiles')
        .doc(currentUser.uid)
        .get()
        .then(async (documentSnapshot) => {
          if (documentSnapshot.exists) {
            const userData = documentSnapshot.data();

            // Check if user has friends
            if (userData.friends && userData.friends.length > 0) {
              const friendData = await Promise.all(
                userData.friends.map(async (friendId) => {
                  const friendSnapshot = await db.collection('UserProfiles').doc(friendId).get();
                  if (friendSnapshot.exists) {
                    return { id: friendSnapshot.id, ...friendSnapshot.data() };
                  }
                  return null;
                })
              );
              setFriends(friendData.filter((friend) => friend !== null));
            }
          }
        })
        .catch((error) => {
          console.log('Error fetching user data:', error);
        });
    }
  }, [currentUser, db]);

  useEffect(() => {
    db.collection('Circles')
      .get()
      .then((querySnapshot) => {
        const circleData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCircles(circleData);
      })
      .catch((error) => {
        console.log('Error fetching circles data:', error);
      });
  }, [db]);

  const handleAddFriend = (friend) => {
    HapticFeedback.trigger('impactMedium');
    setSelectedFriends((prevSelectedFriends) => [...prevSelectedFriends, friend]);
  };

  const handleRemoveFriend = (friend) => {
    HapticFeedback.trigger('impactMedium');
    setSelectedFriends((prevSelectedFriends) =>
      prevSelectedFriends.filter((selectedFriend) => selectedFriend.id !== friend.id)
    );
  };

  const handleAddCircle = (circle) => {
    HapticFeedback.trigger('impactMedium');
    setSelectedCircles((prevSelectedCircles) => [...prevSelectedCircles, circle]);
  };

  const handleRemoveCircle = (circle) => {
    HapticFeedback.trigger('impactMedium');
    setSelectedCircles((prevSelectedCircles) =>
      prevSelectedCircles.filter((selectedCircle) => selectedCircle.id !== circle.id)
    );
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const createEvent = async () => {
    try {
      const eventRef = db.collection('Events').doc();
      const eventId = eventRef.id;

      const eventData = {
        title: 'Your Event Title',
        description: 'Your Event Description',
        participants: [...selectedFriends, ...selectedCircles],
      };

      await eventRef.set(eventData);

      // Reset selected friends and circles
      setSelectedFriends([]);
      setSelectedCircles([]);

      // Navigate to the desired screen
      navigation.navigate('EventsRendering');
    } catch (error) {
      console.log('Error creating event:', error);
    }
  };

  const myEvent = {
    id: '1',
    title: 'Event 1',
    date: '2023-05-20',
    location: 'Location 1',
    description: 'Description for Event 1',
    color: '#FFFFFF',
  };

  return (
    <View style={addFriendsCirclesStyles.container}>
      <View style={addEventStyles.testHeader}>
        <EventCard event={myEvent} />
      </View>
      <View style={{ borderRadius: 10, borderWidth: 1, marginTop: 20, marginLeft: 20, marginRight: 20 }}>
        <TextInput
          style={{ height: 40, paddingHorizontal: 10 }}
          onChangeText={handleSearchTextChange}
          value={searchText}
          placeholder="Search friends/circles"
        />
      </View>
      <ScrollView contentContainerStyle={addFriendsCirclesStyles.scrollViewContainer}>
      <Text style={addFriendsCirclesStyles.headerText}>circles</Text>
        <View style={addFriendsCirclesStyles.contentContainer}>
        {circles
            .filter((circle) => circle.title.toLowerCase().includes(searchText.toLowerCase()))
            .map((circle) => (
              <CircleCard
                key={circle.id}
                circle={circle}
                onAddCircle={handleAddCircle}
                onRemoveCircle={handleRemoveCircle}
                isSelected={selectedCircles.some((selectedCircle) => selectedCircle.id === circle.id)}
              />
            ))}
            </View> 
        <Text style={addFriendsCirclesStyles.headerText}>friends</Text>
        
        <View style={addFriendsCirclesStyles.contentContainer}>
          {friends
            .filter((friend) => friend.username.toLowerCase().includes(searchText.toLowerCase()))
            .map((friend) => (
              <FriendCard
                key={friend.id}
                friend={friend}
                onAddFriend={handleAddFriend}
                onRemoveFriend={handleRemoveFriend}
                isSelected={selectedFriends.some((selectedFriend) => selectedFriend.id === friend.id)}
              />
            ))}

         
        </View>
      </ScrollView>
      <TouchableOpacity onPress={createEvent} style={addFriendsCirclesStyles.buttonContainer}>
          <Text style={addFriendsCirclesStyles.buttonText}>create spur! </Text>
        </TouchableOpacity>
    </View>
  );
};

export default AddFriendsCircles;