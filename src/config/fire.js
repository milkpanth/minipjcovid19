import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC4b1CiwHTRjIyFBZygpKrNOKGLmIlZkrI",
    authDomain: "minicovid19-f9aba.firebaseapp.com",
    databaseURL: "https://minicovid19-f9aba.firebaseio.com",
    projectId: "minicovid19-f9aba",
    storageBucket: "minicovid19-f9aba.appspot.com",
    messagingSenderId: "726639890321",
    appId: "1:726639890321:web:0371e29efde85fd630d430",
    measurementId: "G-64M7T7ZEJ4"
  };
  const fire = firebase.initializeApp(firebaseConfig)

  export default fire;