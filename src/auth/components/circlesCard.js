import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import friendCardStyles from '../styles/components/friendCardStyles';

const CirclesCard = ({ friend, onAddCircle, onRemoveCircle, resetState }) => {
  const { uid, username, displayName, photoURL } = circle; // change this info accordingly
  const [isAdded, setIsAdded] = useState(false);
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (resetState) {
      setAdded(false);
    }
  }, [resetState]);
  const handleAddCircle = () => {
    if (!isAdded) {
      setIsAdded(true);
      onAddCircle(uid);
    } else {
      setIsAdded(false);
      onRemoveCircle(uid);
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

export default CirclesCard;