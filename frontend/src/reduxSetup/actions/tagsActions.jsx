import { TAGS_LOADING, TAGS_LOADED, SET_SELECTED_TAGS } from './types';
import axios from 'axios';
import { tokenConfig } from './tokenConfig';

export const getTags = () => (dispatch, getState) => {
  dispatch({
    type: TAGS_LOADING,
  });
  axios.get('/api/tags', tokenConfig(getState)).then((res) => {
    dispatch({
      type: TAGS_LOADED,
      payload: res.data,
    });
  });
};

export const postSelectedTags = ({ selectedTagValues, id }) => (
  dispatch,
  getState
) => {
  axios
    .post(
      `/api/tags/selectedtags/${id}`,
      { selectedTagValues },
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: SET_SELECTED_TAGS,
        payload: res.data,
      });
    });
};

export const deleteTags = ({ deletedTags, id }) => (dispatch, getState) => {
  axios
    .post(`/api/tags/delete/${id}`, { deletedTags }, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: SET_SELECTED_TAGS,
        payload: res.data,
      });
    });
};
