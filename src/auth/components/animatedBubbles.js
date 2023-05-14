import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Svg, Ellipse } from 'react-native-svg';
import bubbleStyles from '../styles/components/animatedBubblesStyles';

const AnimatedBubbles = () => {
  const moveAnimation1 = useRef(new Animated.Value(0)).current;
  const moveAnimation2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(moveAnimation1, {
          toValue: 1,
          duration: 12000,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnimation2, {
          toValue: 1,
          duration: 12000,
          useNativeDriver: true,
        })
      ]),
      { iterations: -1 }
    ).start();
  }, [moveAnimation1, moveAnimation2]);

  const translateX1 = moveAnimation1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 360],
  });

  const translateY1 = moveAnimation1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 350],
  });

  const translateX2 = moveAnimation2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -350],
  });

  const translateY2 = moveAnimation2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -450],
  });

  return (
      <Svg style={bubbleStyles.background} height="100%" width="100%">
        <Animated.View style={[{ transform: [{ translateX: translateX1 }, { translateY: translateY1 }] }]}>
          <Svg style = {bubbleStyles.ellipse1}>
            <Ellipse cx={225} cy={225} rx={225} ry={225}/>
          </Svg>
        </Animated.View>
        <Animated.View style={[{ transform: [{ translateX: translateX2 }, { translateY: translateY2 }] }]}>
          <Svg style = {bubbleStyles.ellipse2}>
            <Ellipse cx={225} cy={225} rx={225} ry={225}/>
          </Svg>
        </Animated.View>    
      </Svg>
  );
};

export default AnimatedBubbles;