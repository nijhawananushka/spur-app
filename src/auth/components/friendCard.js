import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import friendCardStyles from '../styles/components/friendCardStyles';

const FriendCard = ({ friend, onAddFriend, onRemoveFriend }) => {
  const { uid, username, displayName, photoURL } = friend;
  const [isAdded, setIsAdded] = useState(false);

  const handleAddFriend = () => {
    if (!isAdded) {
      setIsAdded(true);
      onAddFriend(uid);
    } else {
      setIsAdded(false);
      onRemoveFriend(uid);
    }
  };

  return (
    <View style={friendCardStyles.friendContainer}>
      <Image style={friendCardStyles.friendPicture} source={{ uri: photoURL }} />
      <View style={friendCardStyles.friendTextContainer}>
        <Text style={friendCardStyles.friendName}>{displayName}</Text>
        <Text style={friendCardStyles.friendUserId}>{`@${username}`}</Text>
      </View>
      <TouchableOpacity
        style={[
          friendCardStyles.addButton,
          { backgroundColor: isAdded ? '#DDDDDD' : '#444444' },
        ]}
        onPress={handleAddFriend}
      >
        <Text style={{ color: isAdded ? '#000000' : '#FFFFFF' }}>
          {isAdded ? 'Added' : 'Add'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FriendCard;