``
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
    NAME_CHANGED,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    FORGOT_PASSWORD,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER,
    UPDATE_PROFILE,
    FORGOT_FAIL,
    AVATAR_CHANGED,
    PROFILE_SET,
} from './types';

export const nameChanged = (text) => {
    return {
        type: NAME_CHANGED,
        payload: text
    };
};

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
};

export const avatarChanged = (uri) => {
    return {
        type: AVATAR_CHANGED,
        payload: uri
    }
};

export const updateProfile = ({name, avatar}) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_PROFILE
        });

        console.log("PROFILE", name, avatar)

        let user = firebase.auth().currentUser
        user.updateProfile({
            displayName: name,
            photoURL: avatar
        }).then(() => {
            let user = firebase.auth().currentUser;
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: user,
            })
        }).catch(error => {
            loginUserFail(dispatch, "Failed to update profile!")
        })
    }
}

export const loginUser = (info) => {

    let email = null, password = null

    if(info) {
        email = info.email;
        password = info.password
    }

    return (dispatch) => {
        dispatch({
            type: LOGIN_USER
        });

        console.log("Attempt login...");

        if(!email) {
            let user = firebase.auth().currentUser;
            loginUserSuccess(dispatch, user);
            return;
        }

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                let user = firebase.auth().currentUser;
                loginUserSuccess(dispatch, user);
            })
            .catch((error) => {
                console.log("we caught an error!", error.message);
                console.log(error);
                loginUserFail(dispatch, error.message);
            });
    };
};

export const signupUser = ({name, email, password, avatar}) => {
    return (dispatch) => {
        if(name.length == 0) {
            loginUserFail(dispatch, "User name must not be empty!");
            return;
        }

        if(!email || email.length == 0) {
            loginUserFail(dispatch, "Email must not be empty!");
            return
        }

        if(!password || password.length == 0) {
            loginUserFail(dispatch, "Password must not be empty!");
            return
        }

        dispatch({
            type: SIGNUP_USER
        });

        console.log("Attempt login...");
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                let user = firebase.auth().currentUser;
                return user.updateProfile({
                    displayName: name,
                    photoURL: avatar
                });
            })
            .then(() => {
                let user = firebase.auth().currentUser;
                loginUserSuccess(dispatch, user);
            })
            .catch((error) => {
                console.log("we caught an error!");
                console.log(error);
                loginUserFail(dispatch, error.message);
            });
    };
};

export const sendResetLink = ({email}) => {
    return (dispatch) => {
        dispatch({
            type: FORGOT_PASSWORD,
        });

        console.log("Send verify email...");
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                dispatch({
                    type: LOGIN_USER_FAIL,
                    payload: 'Please check your email to reset password!'
                })
            })
            .catch((error) => {
                console.log("we caught an error!");
                console.log(error);
                forgotFail(dispatch);
            });
    };
}

const toMainView = (dispatch, user) => {
    console.log("Profile Page!");
    dispatch({
        type: PROFILE_SET,
        payload: user,
    });

    initInput();
    Actions.replace('scarlet');
}

const initInput = () => {
    emailChanged('');
    passwordChanged('');
    nameChanged('');
    avatarChanged('');
}

const loginUserSuccess = (dispatch, user) => {
    console.log("login successful!");
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    toMainView(dispatch, user);
}

const loginUserFail = (dispatch, errDescription) => {
    console.log("login fail!");
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: errDescription,
    })
}

const forgotFail = (dispatch) => {
    console.log("verify fail!");
    dispatch({
        type: FORGOT_FAIL,
    })
}