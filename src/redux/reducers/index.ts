import { combineReducers } from 'redux';
import Auth from './Auth';
import { AUTH_ACTION_TYPES } from 'redux/constants/Auth';

const reducers = combineReducers({
    auth: Auth,
});

const rootReducer = (state: any, action: any) => {   
    // Clear all data in redux store to initial.
    if(action.type === AUTH_ACTION_TYPES.SIGN_OUT)
       state = undefined;    
    return reducers(state, action);
 };

export default rootReducer;