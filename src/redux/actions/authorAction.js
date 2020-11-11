import * as authorApi from "../../api/authorApi";
import * as types from "./actionTypes";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors: authors };
}

export function loadAuthors() {
  return async function (dispatch) {
    try {
      const authors = await authorApi.getAuthors();
      console.log(authors);
      dispatch(loadAuthorsSuccess(authors));
    } catch (error) {
      throw error;
    }
  };
}

// export function loadAuthors() {
//   return async function (dispatch) {
//     const authors = await authorApi.getAuthors();
//     dispatch(loadAuthorsSuccess(authors)).catch((error) => {
//       throw error;
//     });
//   };
// }
