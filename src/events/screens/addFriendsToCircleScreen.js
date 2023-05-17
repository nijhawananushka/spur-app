import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, TextInput, View, TouchableOpacity, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import FriendCard from '../../auth/components/friendCard';
import HapticFeedback from 'react-native-haptic-feedback';
import styles from '../styles/components/addFriendsCircleButtonStyles';

const CreateNewCircleWithFriends = ({ navigation, route }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [searchText, setSearchText] = useState('');
  const db = firestore();
  const currentUser = auth().currentUser;
  const { circleTitle } = route.params;


  // only displays the people you are already friends with !!! 
  // we are also getting the friends in batches since the 'in' query in firebase can only retrieve 10 items at a time  
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
  

  const handleAddFriend = useCallback((userId) => {
    setSelectedFriends((prevSelectedFriends) => [...prevSelectedFriends, userId]);
  }, []);

  const handleRemoveFriend = useCallback((userId) => {
    setSelectedFriends((prevSelectedFriends) => prevSelectedFriends.filter((id) => id !== userId));
  }, []);

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const filteredFriends = friends.filter((friend) => {
    const friendName = friend.displayName ? friend.displayName.toLowerCase() : '';
    const searchLower = searchText.toLowerCase();
    return friendName.includes(searchLower);
  });

  const saveCircle = async () => {
    try {
      await db.collection('Circles').add({
        title: circleTitle,
        members: [currentUser.uid, ...selectedFriends],
      });

      // Navigate to the desired screen after saving the circle, navigating to main for now but will change this to reflect feed page with all the new events added
      navigation.navigate('Main');
    } catch (error) {
      console.log('Error saving circle:', error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ borderRadius: 10, borderWidth: 1, marginTop: 60, marginLeft: 30, marginRight: 30 }}>
        <TextInput
          style={{ height: 40, paddingHorizontal: 10 }}
          onChangeText={handleSearchTextChange}
          value={searchText}
          placeholder="Search friends"
        />
      </View>
      <ScrollView contentContainerStyle={{ paddingTop: 40 }}>
        {filteredFriends.map(friend => (
          <FriendCard
            key={friend.uid}
            friend={friend}
            onAddFriend={handleAddFriend}
            onRemoveFriend={handleRemoveFriend}
          />
        ))}
        {/* <OnboardingCompleteButton navigation={navigation} />  */}
        <TouchableOpacity 
        style={styles.buttonStyle} 
        onPress={saveCircle}
        activeOpacity = {0.5}
        >
        <Text style = {styles.buttonText}>Create Circle</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateNewCircleWithFriends;
