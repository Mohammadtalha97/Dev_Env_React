import * as courseApi from "../../api/courseApi";
import * as types from "./actionTypes";

//Actions
export function loadCoursesSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses: courses,
  };
}
export function updateCourseSuccess(course) {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course: course,
  };
}
export function createCourseSuccess(course) {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course: course,
  };
}

//Thunk
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

export function saveCourse(course) {
  return function (dispatch, getState) {
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        throw error;
      });
  };
}

//(1)
//this like goes to the middleware redux-thun
//it passes dispatch as an argument to thunk that's why we declare second function with dispatch argument
