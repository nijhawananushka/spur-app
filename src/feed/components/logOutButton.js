
import React from 'react';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogOutButton = ({ navigation }) => {
    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('uid');
        await AsyncStorage.removeItem('calAccessToken');
        navigation.replace('Login');
    };
    return (
        <Button title="Logout" onPress={handleLogout} />
    );
};

export default LogOutButton;
