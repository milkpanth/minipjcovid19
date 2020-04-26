import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCJPK1wJOFVSlYM1gLf7dwHmnsyFx1yJvo",
  authDomain: "miprojectcovi-19.firebaseapp.com",
  databaseURL: "https://miprojectcovi-19.firebaseio.com",
  projectId: "miprojectcovi-19",
  storageBucket: "miprojectcovi-19.appspot.com",
  messagingSenderId: "427662856846",
  appId: "1:427662856846:web:3b9efa6574347fa2b9afdf",
  measurementId: "G-NL928PS726"
  };
  const fire = firebase.initializeApp(firebaseConfig)

  export default fire;