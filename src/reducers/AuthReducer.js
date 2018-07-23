import { 
    NAME_CHANGED,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    FORGOT_PASSWORD,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER,
    FORGOT_FAIL,
    AVATAR_CHANGED,
    PROFILE_SET,
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    email: 'andevparadise14@outlook.com',
    password: 'aaaaaa',
    avatar: '',
    user: null,
    error: '',
    loading: false
};

// set state to initial_state if it is undefined
export default (state = INITIAL_STATE, action) => {
    console.log("AUTH REDUCERS: " + action.type);
    console.log("AUTH REDUCERS: " + action.payload);

    switch (action.type) {
        case NAME_CHANGED:
            return {
                ...state,
                name: action.payload
            };
        case EMAIL_CHANGED:
            return {
                ...state,
                error: '',
                email: action.payload
            };
        case PASSWORD_CHANGED:
            console.log(state);
            return {
                ...state,
                error: '',
                password: action.payload
            };
        case AVATAR_CHANGED:
            return {
                ...state,
                error: '',
                avatar: action.payload
            };
        case PROFILE_SET:
            return {
                ...state,
                name: action.payload ? action.payload.displayName : '',
                email: action.payload ? action.payload.email : '',
                avatar: action.payload ? action.payload.photoURL : '',
            };
        case FORGOT_PASSWORD:
        case LOGIN_USER:
        case SIGNUP_USER:
            return {
                ...state,
                loading: true,
                error: ''
            };        
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE,
                user: action.payload
            };
        case LOGIN_USER_FAIL:
            let error = action.payload ? action.payload : 'Authentication Failed!';
            return {
                ...state,
                error: error,
                loading: false
            };
        case FORGOT_FAIL:
            return {
                ...state,
                error: 'Send Reset Link Failed.',
                loading: false
            };
        default:
            return state;
    }
};