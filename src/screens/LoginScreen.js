import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from './../firebase';

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);

      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      console.log(result);
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>My App</Text>
      </View>
      <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle} disabled={loading}>
        {loading ? (
          <Text style={styles.buttonText}>Loading...</Text>
        ) : (
          <>
            <Text style={styles.buttonText}>Sign-In with Google</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default LoginScreen;