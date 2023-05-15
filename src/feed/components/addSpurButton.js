import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import addSpurButtonStyles from '../styles/components/addSpurButtonStyles';

const AddSpurButton = () => {
  return (
    <View style={addSpurButtonStyles.container}>
      <TouchableOpacity style={addSpurButtonStyles.button}>
        <Text style={addSpurButtonStyles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddSpurButton;