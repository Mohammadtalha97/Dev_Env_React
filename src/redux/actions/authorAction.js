import * as authorApi from "../../api/authorApi";
import * as types from "./actionTypes";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors: authors };
}

export function loadAuthors() {
  return async function (dispatch) {
    dispatch(beginApiCall());
    try {
      const authors = await authorApi.getAuthors();
      dispatch(loadAuthorsSuccess(authors));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}
