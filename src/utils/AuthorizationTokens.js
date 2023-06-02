import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const refreshToken = async () => {
    try {
        const { accessToken } = await GoogleSignin.signInSilently();
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
