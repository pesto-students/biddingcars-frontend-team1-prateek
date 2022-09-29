import { authConstants } from './constants';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

console.log(firebase);
// Your app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDQEo0aBj6UC-FMeV2FbUkDO71Gg4ljQj4',
  authDomain: 'biddingcars-363616.firebaseapp.com',
  projectId: 'biddingcars-363616',
  storageBucket: 'biddingcars-363616.appspot.com',
  messagingSenderId: '578243658376',
  appId: '1:578243658376:web:6d384f19b163a47b60553d',
  measurementId: 'G-G1PK01GE79',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
console.log(firebase.auth);

export default firebase;

export const checkSignin = () => async (dispatch) => {
  try {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: authConstants.SIGNIN_SUCCESS,
          payload: JSON.stringify(user),
        });
      }
    });
  } catch (err) {
    dispatch({ type: authConstants.SIGNIN_ERROR, payload: 'Invalid login credentials' });
  }
};

export const signup =
  ({ email, password }) =>
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
            if (user.emailVerified) {
              // Email is verified
              dispatch({
                type: authConstants.SIGNUP_SUCCESS,
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
  ({ email, password }) =>
  async (dispatch) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((e) => {
          firebase.auth().onAuthStateChanged(function (user) {
            dispatch({
              type: authConstants.SIGNIN_SUCCESS,
              payload: JSON.stringify(user),
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
