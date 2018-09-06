import { GET_PROFILES, LOADING_PROFILES } from '../actions/types';

const initialState = {
  profiles: [],
  loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILES:    
            return {
              ...state,
              profiles: action.payload,
              loading: false
            };
        case LOADING_PROFILES:
            return {
              ...state,
              loading: true
            };
        default:
            return state;
    }
}

// Initial Redux Setup - step 3