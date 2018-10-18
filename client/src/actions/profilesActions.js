import axios from 'axios';

import {
  GET_PROFILES,
  LOADING_PROFILES
} from './types';

// Get Profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfilesLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_PROFILES,
        payload: []
      })
    });
};

// Set loading state
export const setProfilesLoading = () => {
  return {
    type: LOADING_PROFILES
  };
};

// Initial Redux Setup - step 5