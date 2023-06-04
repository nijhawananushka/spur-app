import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const refreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('calRefreshToken');
    if (!refreshToken) {
      console.log('No refresh token found in AsyncStorage');
      return null;
    }

    const { idToken, serverAuthCode } = await GoogleSignin.signInSilently();
    if (!idToken) {
      console.log('No ID token received');
      return null;
    }

    const { accessToken } = await GoogleSignin.getTokens();
    if (!accessToken) {
      console.log('No access token received');
      return null;
    }

    await AsyncStorage.setItem('calAccessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
};