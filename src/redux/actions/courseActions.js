import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export const createCourse = (course) => {
  return { type: types.CREATE_COURSE, course: course };
};

//action
export function loadCoursesSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses: courses,
  };
}

export function loadCourse() {
  return async function (dispatch) {
    try {
      const courses = await courseApi.getCourses();
      dispatch(loadCoursesSuccess(courses));
    } catch (error) {
      throw error;
    }
  };
}

//(1)
//this like goes to the middleware redux-thun
//it passes dispatch as an argument to thunk that's why we declare second function with dispatch argument
