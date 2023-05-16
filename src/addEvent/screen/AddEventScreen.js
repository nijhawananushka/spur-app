import React from 'react';
import { View, Text } from 'react-native';
import addEventStyles from '../styles/AddEventStyles';
import Icon from 'react-native-ionicons'

const AddEventScreen = ({ navigation }) => {
    return (
    <View style={addEventStyles.container}>
        <View style={addEventStyles.header}>
          <Icon name="ios-close-outline" size={30} color="#6B6363" onPress={() => navigation.goBack()} />
          <Text style={addEventStyles.headerText}>spur it up</Text>
          <Icon name="ios-checkmark-outline" size={30} color="#6B6363" onPress={() => navigation.goBack()} />
        </View>
        <View style={addEventStyles.roundedContainer}>
        </View>
    </View>
  );
};

export default AddEventScreen;
