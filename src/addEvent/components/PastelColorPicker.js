import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

const PastelColorPicker = ({ setColor }) => {
  const [colorValue, setColorValue] = useState(-1);
  const [thumbSize, setThumbSize] = useState(20); // Initial thumb size
  const updateColorValue = (value) => {
    setColorValue(value);
    setColor(calculatePastelColor());
  };

  const handleThumbSize = (selected) => {
    if (selected) {
      setThumbSize(30); // Increase thumb size when selected
    } else {
      setThumbSize(20); // Reset thumb size when not selected
    }
  };

  const calculatePastelColor = () => {
    if (colorValue === -1) {
      return 'white';
    }
    const hue = Math.floor((colorValue / 255) * 360);
    const pastelColor = `hsl(${hue}, 80%, 90%)`;
    return pastelColor;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.colorPreview]} />
      <Slider
        style={[styles.slider]}
        minimumValue={-1}
        maximumValue={200}
        value={colorValue}
        onStart={() => handleThumbSize(true)} // Set thumb size to bigger on start of interaction
        onSlidingComplete={() => handleThumbSize(false)} // Set thumb s
        minimumTrackTintColor={"transparent"}
        maximumTrackTintColor={"transparent"}
        thumbTintColor={calculatePastelColor()}
        onValueChange={(value) => updateColorValue(value)}
        thumbStyle={[styles.thumb, { width: thumbSize, height: thumbSize }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
    height: '2%',
  },
  thumb: {
    width: 15, // Adjust the width as per your requirement
    height: 15, // Adjust the height as per your requirement
    borderRadius: 7.5, // Adjust the borderRadius as per your requirement
  },
});

export default PastelColorPicker;
