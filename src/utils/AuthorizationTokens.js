import AsyncStorage from "@react-native-async-storage/async-storage";

export const refreshToken = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem('calRefreshToken');
        const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `client_id=469727035724-jqjifc7sj20ftvivttoh21k01k583fbh.apps.googleusercontent.com&client_secret=3Q4Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z&refresh_token=${refreshToken}&grant_type=refresh_token`,
    });
        const data = await response.json();
        await AsyncStorage.setItem('calAccessToken', data.access_token);
        return data.access_token;
    } catch (error) {
        console.error('Failed to refresh token:', error);
    }
};
