import { initializeApp } from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    clientId: "469727035724-ohvcq11f86v39udoauv7nncvq32prlo4.apps.googleusercontent.com",
    reversedClientId: "com.googleusercontent.apps.469727035724-ohvcq11f86v39udoauv7nncvq32prlo4",
    apiKey: "AIzaSyC7xJT06qfjqIWCt7qtGFo4fz2qtEsIZ0Y",
    projectId: "spur-app-a114e",
    storageBucket: "spur-app-a114e.appspot.com",
    appId: "1:469727035724:ios:780d6ff96c6292b2334fe9"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = app.auth();
export const firestore = app.firestore();
export default app;