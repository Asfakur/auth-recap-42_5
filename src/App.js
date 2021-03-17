import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
// import "firebase/firestore";



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

function App() {

  const [user, setUser] = useState({})

  var provider = new firebase.auth.GoogleAuthProvider();

  var fbProvider = new firebase.auth.FacebookAuthProvider();

  var gitProvider = new firebase.auth.GithubAuthProvider();


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

  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {

        var credential = result.credential;

        var user = result.user;
        var accessToken = credential.accessToken;
        console.log('fb user', user);
        setUser(user);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  }

  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(gitProvider)
      .then((result) => {
        
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log('git user', user);
        setUser(user);
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log('error', errorCode, errorMessage, email, credential);
      });

  }

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign in using google</button>
      <br />
      <button onClick={handleFacebookSignIn}>Sign in using Facebook</button>
      <br />
      <button onClick={handleGithubSignIn}>Sign in using Github</button>
      <h3>Email : {user.email}</h3>
      <h3>Display Name : {user.displayName}</h3>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
