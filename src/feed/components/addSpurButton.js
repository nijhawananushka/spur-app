// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
import addSpurButtonStyles from '../styles/components/addSpurButtonStyles';
import HapticFeedback from 'react-native-haptic-feedback';
// const AddSpurButton = () => {
//   return (
//     <View style={addSpurButtonStyles.container}>
//       <TouchableOpacity style={addSpurButtonStyles.button}>
//         <Text style={addSpurButtonStyles.buttonText}>+</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default AddSpurButton;
import React, { useState } from 'react';
import { TouchableOpacity, Animated, Text, StyleSheet, View, Alert } from 'react-native';

const AddSpurButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleButton = () => {
    HapticFeedback.trigger('selection');
    if (isExpanded) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsExpanded(false);
        HapticFeedback.trigger('selection');
    });
    } else {
      setIsExpanded(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
    });
    }
  };

  const buttonSize = 70;
  const containerSize = buttonSize * 2;

  const spur1Transform = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -15],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -40],
        }),
      },
    ],
  };

  const spur2Transform = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 15],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -40],
        }),
      },
    ],
  };
  const onPressButton1 = () => {
    console.log('Button 1 pressed');
    Alert.alert('Button 1 pressed');
  };
  const onPressButton2 = () => {
    console.log('Button 2 pressed');
    Alert.alert('Button 2 pressed');
  };

  const mainButtonContent = isExpanded ? (
    <Animated.View style={{ width: containerSize, height: containerSize }}>
      <Animated.View style={[ spur1Transform ]}>
        <TouchableOpacity style={addSpurButtonStyles.button1} onPress={onPressButton1}>
          <Text> 1 </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[ spur2Transform, addSpurButtonStyles.button2 ]}>
        <TouchableOpacity onPress={onPressButton2}>
          <Text> 2 </Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
    ) : (
      <Text style = {addSpurButtonStyles.buttonText}> + </Text>    
    );

    return (
        <View style={styles.container}>
          <TouchableOpacity style={addSpurButtonStyles.plusButton} onPress={toggleButton}> 
            {mainButtonContent}
          </TouchableOpacity>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 275,
    },
});
    
export default AddSpurButton;
    
    
    
    
    
    
    
