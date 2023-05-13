/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.app().options;

console.log(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
