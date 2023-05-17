import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/auth/screens/LoginScreen';
import MainScreen from './src/feed/screens/MainScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './src/auth/screens/OnboardingScreenUsername';
import AddFriendsOnboarding from './src/auth/screens/addFriendsOnboarding';
import AddEventScreen from './src/addEvent/screen/AddEventScreen';
import CalendarScreen from './src/addEvent/screen/ChooseDateScreen';

const Stack = createStackNavigator();

const RootStack = () => {
  const [initialRoute, setInitialRoute] = useState('Login');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userToken').then((userToken) => {
      if (userToken) {
        setInitialRoute('Main');
      } else {
        setInitialRoute('Login');
      }
      setIsLoading(false);
    });
  }, []);

  const verticalAnimation = {
    gestureDirection: 'vertical',
    headerShown: false,
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.height, 0],
              }),
            },
          ],
        },
      };
    },
  };
  
  if (!isLoading) {
    return (
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
          initialParams={{ navigation: null }} // Pass navigation as initialParams
        />
        <Stack.Screen 
          name="Main" 
          component={MainScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Onboard" 
          component={OnboardingScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="OnboardFriends" 
          component={AddFriendsOnboarding} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddEvent"
          component={AddEventScreen}
          options={verticalAnimation}/>
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={verticalAnimation}/>
      </Stack.Navigator>
    );
  }
}

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;