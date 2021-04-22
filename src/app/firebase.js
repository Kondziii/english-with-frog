import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/remote-config';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyC0ZMmF_9E_FC6_fdPLxLMlzHp-al2yiwQ',
  authDomain: 'english-with-frog.firebaseapp.com',
  projectId: 'english-with-frog',
  storageBucket: 'english-with-frog.appspot.com',
  messagingSenderId: '357664612765',
  appId: '1:357664612765:web:af8b2e68ce7bc2b7fc8f74',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

export { auth, database };
export default firebase;
