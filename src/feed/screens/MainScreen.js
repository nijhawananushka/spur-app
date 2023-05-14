import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogOutButton from '../components/logOutButton';

const MainScreen = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.getItem('userToken').then((userToken) => {
      if (!userToken) {
        navigation.replace('Login');
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Main Screen</Text>
        <LogOutButton navigation={navigation} />   
      </View>
  );
};

export default MainScreen;