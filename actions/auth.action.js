import { authConstants } from './constants';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// console.log(firebase);
// Your app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
console.log(firebase.auth);

export default firebase;

export const checkSignin = () => async (dispatch) => {
  try {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        let role;
          await fetch(
          process.env.addUserEndpoint.concat("/users/").concat(user.email)
        )
          .then((response) => response.json())
          .then((data) => {
            if (data==null){
              role='user'
            }
            else{
              role=data.role
            }
          });
        dispatch({
          type: authConstants.SIGNIN_SUCCESS,
          userId:user.email,
          payload: JSON.stringify(user),
          accessToken: user.multiFactor.user.accessToken,
          role: role,
        });
      }else{
        dispatch({
          type: authConstants.SIGNIN_ERROR,
          authenticate:false,

        });
      }
    });
  } catch (err) {
    dispatch({ type: authConstants.SIGNIN_ERROR, payload: 'Invalid login credentials' });
  }
};

export const signup =
  ({ email, password,fname,lname , role }) =>
  async (dispatch) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((dataBeforeEmail) => {
          firebase.auth().onAuthStateChanged(function (user) {
            user.sendEmailVerification();
          });
        })
        .then((dataAfterEmail) => {
          firebase.auth().onAuthStateChanged(function (user) {
            fetch(process.env.addUserEndpoint.concat("/users/add"), {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  firstname: fname,
                  lastname: lname,
                  email: email,
                  role: role,
                }),
              });
            if (user.emailVerified) {
              console.log(user)
              // Emailconsole is verified
              dispatch({
                type: authConstants.SIGNUP_SUCCESS,
                userId:user.email,
                payload:
                  'Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox.',
              });
            } else {
              // Email is not verified
              dispatch({
                type: authConstants.SIGNUP_ERROR,
                payload: "Something went wrong, we couldn't create your account. Please try again.",
              });
            }
          });
        })
        .catch(function (error) {
          console.log(error);
          dispatch({
            type: authConstants.SIGNUP_ERROR,
            payload: "Something went wrong, we couldn't create your account. Please try again.",
          });
        });
    } catch (err) {
      console.log(err);
      dispatch({
        type: authConstants.SIGNUP_ERROR,
        payload: "Something went wrong, we couldn't create your account. Please try again.",
      });
    }
  };

export const signin =
  ({ email, password, role }) =>
  async (dispatch) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((e) => {
          firebase.auth().onAuthStateChanged(function (user) {
            dispatch({
              type: authConstants.SIGNIN_SUCCESS,
              userId:user.email,
              payload: JSON.stringify(user),
              role: role,
            });
          });
        })
        .catch(() => {
          dispatch({
            type: authConstants.SIGNIN_ERROR,
            payload: 'Invalid login credentials',
          });
        });
    } catch (err) {
      dispatch({ type: authConstants.SIGNIN_ERROR, payload: 'Invalid login credentials' });
    }
  };

export const signout = () => async (dispatch) => {
  try {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: authConstants.SIGNOUT_SUCCESS });
      })
      .catch(() => {
        dispatch({
          type: authConstants.SIGNOUT_ERROR,
          payload: '...some error message for the user...',
        });
      });
  } catch (err) {
    dispatch({
      type: authConstants.SIGNOUT_ERROR,
      payload: '...some error message for the user...',
    });
  }
};


export const googleSignIn =
() =>
  async (dispatch) => {
    try {

      const provider = new GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then((result) => {

          const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user)
          dispatch({
            type: authConstants.SIGNIN_SUCCESS,
            userId:user.email,
            payload: JSON.stringify(user),
            accessToken: result.credential.idToken,
          });

          fetch(process.env.addUserEndpoint.concat("/users/add"), {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstname: user.displayName.split(' ')[0],
              lastname: user.displayName.split(' ')[1]?user.displayName.split(' ')[1]:' ',
              email: user.email,
            }),
          });

        })
        .catch((error) => {
          console.log(error)
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          dispatch({
            type: authConstants.SIGNIN_ERROR,
            payload: errorMessage,
          });
        });
    } catch (err) {
      dispatch({ type: authConstants.SIGNIN_ERROR, payload: 'Invalid login credentials' });
    }
  };