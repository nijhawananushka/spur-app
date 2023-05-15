import addSpurButtonStyles from '../styles/components/addSpurButtonStyles';
import HapticFeedback from 'react-native-haptic-feedback';
import React, { useState } from 'react';
import { TouchableOpacity, Animated, Text, StyleSheet, View, Alert, Dimensions } from 'react-native';

const AddSpurButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0))
  const buttonSize = Dimensions.get('window').width * 0.15;
  const containerSize = buttonSize * 2.2;
  const x_coord = Dimensions.get('window').width * 0.06;
  const y_coord = Dimensions.get('window').height * 0.05;
  
  // Toggling Animation
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

  // Animation details and coordinates for Button 1
  const spur1Transform = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -x_coord],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -y_coord],
        }),
      },
    ],
    opacity: animation,
  };

   // Animation details and coordinates for Button 1
  const spur2Transform = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, x_coord],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -y_coord],
        }),
      },
    ],
    opacity: animation,
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
        <TouchableOpacity style={addSpurButtonStyles.button1} onPress={onPressButton1} pointerEvents="box-none">
          <Text> 1 </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[ spur2Transform ]} >
        <TouchableOpacity style={addSpurButtonStyles.button2} onPress={onPressButton2} pointerEvents="box-none">
          <Text> 2 </Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
    ) : (
      <Text style = {addSpurButtonStyles.plusButtonText}> + </Text>    
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