import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
// import "firebase/firestore";

firebase.initializeApp(firebaseConfig);

function App() {

  const [user, setUser] = useState({})

  var provider = new firebase.auth.GoogleAuthProvider();


  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        
        var credential = result.credential;

        
        var token = credential.accessToken;
        
        var user = result.user;
        console.log(user);
        setUser(user);
        
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorCode, errorMessage);
      });
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign in using google</button>
      <h3>Email : {user.email}</h3>
      <img src={user.photoURL} alt=""/>
    </div>
  );
}

export default App;
