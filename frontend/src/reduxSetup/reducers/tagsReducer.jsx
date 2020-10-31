/* eslint-disable import/no-anonymous-default-export */
import { TAGS_LOADING, TAGS_LOADED } from '../actions/types';

const initialState = {
  tags: {},
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TAGS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case TAGS_LOADED:
      return {
        ...state,
        isLoading: false,
        tags: action.payload,
      };

    default:
      return state;
  }
}
