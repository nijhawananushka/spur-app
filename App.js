import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/auth/screens/LoginScreen';
import MainScreen from './src/feed/screens/MainScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './src/auth/screens/OnboardingScreenUsername';
import AddFriendsOnboarding from './src/auth/screens/addFriendsOnboarding';
import EventsRendering from './src/events/screens/eventsRenderingScreen';
import AddFriendsCircleScreen from './src/events/screens/addFriendsCircleScreen';
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
          name="EventsRendering" 
          component={EventsRendering} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AddNewFriendsCircles" 
          component={AddFriendsCircleScreen} 
          options={{ headerShown: false }}
        />
        

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