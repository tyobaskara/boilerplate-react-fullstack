import { combineReducers } from 'redux';
import errorsReducer from './errorsReducer';
import profilesReducer from './profilesReducer';

export default combineReducers({
    profile: profilesReducer,
    errors: errorsReducer
});

// Initial Redux Setup - step 2