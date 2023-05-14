import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreen = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.getItem('userToken').then((userToken) => {
      if (!userToken) {
        navigation.navigate('Login');
      }
    });
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Main Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default MainScreen;