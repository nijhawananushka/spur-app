
import React, { useEffect, useState } from 'react';
import { ScrollView, TextInput, View, Button,TouchableOpacity, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import FriendCard from '../../auth/components/friendCard';
import OnboardingCompleteButton from '../../auth/components/onboardingCompleteButton';
import HapticFeedback from 'react-native-haptic-feedback';
import styles from '../styles/screens/addFriendsCircleScreenStyles';
const AddFriendsCircleScreen = ({ navigation }) => {
  const [friends, setFriends] = useState([]);
  const [searchText, setSearchText] = useState('');
  const db = firestore();
  const currentUser = auth().currentUser;
  
  const handleAddCirlce = async () => {
    navigation.replace('AddCircle');
  };
  // need to modify this to all the people on spur that you are not yet friends with
  useEffect(() => {
    if (currentUser) {
      // Fetch current user's friends
      db.collection('UserProfiles')
        .doc(currentUser.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const userData = documentSnapshot.data();
            const userFriends = userData.friends || [];
  
            // Fetch all UserProfiles and filter out current user and their friends
            db.collection('UserProfiles')
              .get()
              .then(querySnapshot => {
                if (querySnapshot && Array.isArray(querySnapshot.docs)) {
                  const friends = querySnapshot.docs
                    .map(doc => doc.data())
                    .filter(friend => friend.uid !== currentUser.uid && !userFriends.includes(friend.uid)); // Exclude self and friends
                  setFriends(friends);
                }
              })
              .catch(error => {
                console.log('Error fetching friends:', error);
              });
          }
        })
        .catch(error => {
          console.log('Error fetching user data:', error);
        });
    }
  }, [currentUser]);

  const handleAddFriend = (userId) => {
    HapticFeedback.trigger('impactMedium');
    const userRef = db.collection('UserProfiles').doc(currentUser.uid);
    userRef.update({
      friends: firestore.FieldValue.arrayUnion(userId),
    });
  };

  const handleRemoveFriend = (userId) => {
    HapticFeedback.trigger('impactMedium');
    const userRef = db.collection('UserProfiles').doc(currentUser.uid);
    userRef.update({
      friends: firestore.FieldValue.arrayRemove(userId),
    });
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const filteredFriends = friends.filter((friend) => {
    const friendName = friend.displayName ? friend.displayName.toLowerCase() : '';
    const searchLower = searchText.toLowerCase();
    return friendName.includes(searchLower);
  });

  return (
    <View style={{ flex: 1 }}>
         <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace("EventsRendering")}>
        <Text style={styles.backButtonText}>{'<'}</Text>
    </TouchableOpacity>
    <View style={{ alignItems: 'center', marginTop: 55 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>add new friends</Text>

    </View>
      <TouchableOpacity style={styles.buttonStyle} onPress = {handleAddCirlce}>
        <Text style={styles.buttonText}>create a new circle</Text>
        </TouchableOpacity>
        
     
      <View style={{ borderRadius: 10, borderWidth: 1, marginTop: 20, marginLeft: 30, marginRight: 30 }}>
        
        <TextInput
          style={{ height: 40, paddingHorizontal: 10 }}
          onChangeText={handleSearchTextChange}
          value={searchText}
          placeholder="search for people to add"
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
      </ScrollView>
    </View>
  );
};

export default AddFriendsCircleScreen;