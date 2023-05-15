import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogOutButton from '../components/logOutButton';
import mainScreenStyles from '../styles/MainScreenStyles';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import AddSpurButton from '../components/addSpurButton';

const MainScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [greetingMessage, setGreetingMessage] = useState('');
  const [today, setToday] = useState('');
  const [tomorrow, setTomorrow] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userToken').then((userToken) => {
      if (!userToken) {
        navigation.replace('Login');
      }
    });
    AsyncStorage.getItem('uid').then(async (uid) => {
      const userDoc = await firestore().collection('UserProfiles').doc(uid).get();
      setUser(userDoc.data());
    });

    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    if (currentHour < 12) {
      setGreetingMessage('good morning');
    } else if (currentHour < 18) {
      setGreetingMessage('good afternoon');
    } else {
      setGreetingMessage('good evening');
    }
    setToday(currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }));

    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    setTomorrow(tomorrowDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }));
  }, []);

  return (
    <View style={mainScreenStyles.container}>
      <Text style={mainScreenStyles.header}> {`${greetingMessage}, ${user?.displayName.toLowerCase().split(' ')[0]}`} </Text>
      <View style={mainScreenStyles.logoContainer}>
        <Text style={mainScreenStyles.logo}>spur</Text>
      </View>
      <View style={mainScreenStyles.scrollContainer}>
        <Text style={mainScreenStyles.subheadings}>your spurs</Text>
      </View>
      <View style={mainScreenStyles.scrollContainer}>
        <Text style={mainScreenStyles.subheadings}>today, {today.toLowerCase()}</Text>
        <Text style={mainScreenStyles.subheadings}>tomorrow, {tomorrow.toLowerCase()}</Text>
      </View>
      <View style={mainScreenStyles.buttonContainer}>
        <LogOutButton navigation={navigation} />   
      </View>
      <AddSpurButton></AddSpurButton>
    </View>
  );
};

export default MainScreen;