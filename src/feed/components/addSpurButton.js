import addSpurButtonStyles from '../styles/components/addSpurButtonStyles';
import HapticFeedback from 'react-native-haptic-feedback';
import React, { useState } from 'react';
import { TouchableOpacity, Animated, Text, View, Alert, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';

const AddSpurButton = ({ navigation }) => {
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

   // Animation details and coordinates for Button 2
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
    toggleButton();
    Alert.alert('Button 1 pressed');
  };
  
  const onPressButton2 = () => {
    toggleButton();
    navigation.navigate('AddEvent');
  };

  const collapseButtons = () => {
    if (isExpanded) {
      toggleButton();
    }
  };

  const mainButtonContent = isExpanded ? (
    <Animated.View style={{ width: containerSize, height: containerSize }}>
      <Animated.View style={[ spur1Transform ]}>
        <TouchableOpacity style={addSpurButtonStyles.button1} onPress={onPressButton1} pointerEvents="box-none" activeOpacity={1}>
          <Text> 1 </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[ spur2Transform ]} >
        <TouchableOpacity style={addSpurButtonStyles.button2} onPress={onPressButton2} pointerEvents="box-none" activeOpacity={1}>
          <Text> 2 </Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
    ) : (
      <Text style = {addSpurButtonStyles.plusButtonText}> + </Text>    
    );

    const styles = StyleSheet.create({
        plusButton: {
            ...addSpurButtonStyles.plusButton,
            bottom: Dimensions.get('window').height * 0.03,
        },
        overlay: {
            ...addSpurButtonStyles.overlay,
            backgroundColor: isExpanded ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0)',
        },
    });   
    
    return (
        <View style={addSpurButtonStyles.container} pointerEvents='box-none'>
            {isExpanded && (
            <TouchableWithoutFeedback onPress={collapseButtons}>
                <View style={styles.overlay} pointerEvents="auto" />
            </TouchableWithoutFeedback>
            )}
          <TouchableOpacity style={styles.plusButton} onPress={toggleButton}> 
            {mainButtonContent}
          </TouchableOpacity>
        </View>
    );
};

export default AddSpurButton;
