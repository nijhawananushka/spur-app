import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import circleCardStyles from '../styles/components/circleCardStyles';

const CircleCard = ({circle, onAddCircle, onRemoveCircle, resetState }) => {
  const { id,members, owner, title} = circle; // change this info accordingly
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
      onAddCircle(id); // need to change it to 
    } else {
      setIsAdded(false);
      onRemoveCircle(id);
    }
  };
// will add a picture if there is one taken upon creation of the circle 
  return (
    <View style={circleCardStyles.friendContainer}>
      {/* <Image style={friendCardStyles.friendPicture} source={{ uri: photoURL }} /> */} 
      <View style={circleCardStyles.friendTextContainer}>
        <Text style={circleCardStyles.friendName}>{title}</Text>
        {/* <Text style={circleCardStyles.friendUserId}>{`@${username}`}</Text> */}
      </View>
      <TouchableOpacity
        style={[
          circleCardStyles.addButton,
          { backgroundColor: isAdded ? '#DDDDDD' : '#444444' },
        ]}
        onPress={handleAddCircle}
      >
        <Text style={{ color: isAdded ? '#000000' : '#FFFFFF' }}>
          {isAdded ? 'Added' : 'Add'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CircleCard;