import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const refreshToken = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem('calRefreshToken');
        if (!refreshToken) {
            console.log('No refresh token found in AsyncStorage');
            return null;
        }

        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `client_id=469727035724-jqjifc7sj20ftvivttoh21k01k583fbh.apps.googleusercontent.com&refresh_token=${refreshToken}&grant_type=refresh_token`,
        });

        if (!response.ok) {
            console.log('Refresh token request failed with status:', response.status);
            return null;
        }

        const data = await response.json();
        if (!data.access_token) {
            console.log('No access token in response:', data);
            return null;
        }
        await AsyncStorage.setItem('calAccessToken', data.access_token);
        return data.access_token;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        return null;
    }
};