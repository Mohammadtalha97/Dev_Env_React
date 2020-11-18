import * as courseApi from "../../api/courseApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
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

export function deleteCourseOptimistic(course) {
  return {
    type: types.DELETE_COURSE_OPTIMISTIC,
    course,
  };
}

//Thunk
export function loadCourse() {
  return async function (dispatch) {
    dispatch(beginApiCall());
    try {
      const courses = await courseApi.getCourses();
      dispatch(loadCoursesSuccess(courses));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function saveCourse(course) {
  return async function (dispatch) {
    dispatch(beginApiCall());
    try {
      const savedCourse = await courseApi.saveCourse(course);
      course.id
        ? dispatch(updateCourseSuccess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function deleteCourse(course) {
  return function (dispatch) {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}

//(1)
//this like goes to the middleware redux-thun
//it passes dispatch as an argument to thunk that's why we declare second function with dispatch argument
