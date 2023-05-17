import HapticFeedback from 'react-native-haptic-feedback';
import React, { useState } from 'react';
import { TouchableOpacity, Button, Animated, Text, View, Alert, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import styles from "../styles/components/addFriendsCircleButtonStyles";

const AddFriendsCirclesButton = ({ navigation }) => {
    const handleAddFriends = async () => {
      navigation.replace('AddNewFriendsCircles');
    };
    
    return (

        <TouchableOpacity style={styles.buttonStyle} onPress={handleAddFriends}>
        <Text style={styles.buttonText}>Add Friends</Text>
        </TouchableOpacity>
     
    );
  };
  
  export default AddFriendsCirclesButton;