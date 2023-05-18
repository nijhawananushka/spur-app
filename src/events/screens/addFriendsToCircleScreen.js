import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, TextInput, View, TouchableOpacity, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import FriendCard from '../../auth/components/friendCard';
import HapticFeedback from 'react-native-haptic-feedback';
import buttonStyles from '../styles/components/addFriendsCircleButtonStyles';
import styles from '../styles/screens/addFriendsCircleScreenStyles';

const CreateNewCircleWithFriends = ({ navigation, route }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [searchText, setSearchText] = useState('');
  const db = firestore();
  const currentUser = auth().currentUser;
  const { circleTitle } = route.params;

  useEffect(() => {
    if (currentUser) {
      db.collection('UserProfiles')
        .doc(currentUser.uid)
        .get()
        .then(async (documentSnapshot) => {
          if (documentSnapshot.exists) {
            const userData = documentSnapshot.data();

            if (userData.friends && userData.friends.length > 0) {
              const friendData = await Promise.all(
                userData.friends.map(async (friendId) => {
                  const friendSnapshot = await db.collection('UserProfiles').doc(friendId).get();
                  if (friendSnapshot.exists) {
                    return { uid: friendSnapshot.id, ...friendSnapshot.data() };
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
      const circleRef = db.collection('Circles').doc(currentUser.uid);

      await circleRef.set({
        id: currentUser.uid,
        title: circleTitle,
        owner: currentUser.uid,
        members: [currentUser.uid, ...selectedFriends],
      });

      setSelectedFriends([]);
      navigation.replace("EventsRendering")
    } catch (error) {
      console.log('Error saving circle:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={{ borderRadius: 10, borderWidth: 1, marginTop: 100, marginLeft: 30, marginRight: 30 }}>
        <TextInput
          style={{ height: 40, paddingHorizontal: 10 }}
          onChangeText={handleSearchTextChange}
          value={searchText}
          placeholder="Search friends"
        />
      </View>
      <ScrollView contentContainerStyle={{ paddingTop: 40, paddingBottom: 100 }}>
        {filteredFriends.map((friend) => (
          <FriendCard
            key={friend.uid}
            friend={friend}
            onAddFriend={handleAddFriend}
            onRemoveFriend={handleRemoveFriend}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={buttonStyles.buttonStyle} onPress={saveCircle} activeOpacity={0.5}>
        <Text style={buttonStyles.buttonText}>Create Circle</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateNewCircleWithFriends;
