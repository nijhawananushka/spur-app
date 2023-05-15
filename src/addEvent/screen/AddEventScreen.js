import React from 'react';
import { View, Text } from 'react-native';
import addEventStyles from '../styles/AddEventStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddEventScreen = ({ navigation }) => {
    return (
    <View style={addEventStyles.container}>
        <View style={addEventStyles.header}>
          <Ionicons name="ios-close-outline" size={30} color="#6B6363" onPress={() => navigation.goBack()} />
          <Text style={addEventStyles.headerText}>spur it up</Text>
          <Ionicons name="ios-checkmark-outline" size={30} color="#6B6363" onPress={() => navigation.goBack()} />
        </View>
        <View style={addEventStyles.roundedContainer}>
        </View>
    </View>
  );
};

export default AddEventScreen;
