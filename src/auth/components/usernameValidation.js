import firestore from '@react-native-firebase/firestore';

export const checkUsernameExists = async (username) => {
  const db = firestore();
  const querySnapshot = await db
    .collection('UserProfiles')
    .where('username', '==', username)
    .get();
  return !querySnapshot.empty;
};