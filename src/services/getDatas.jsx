import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../assets/mockedData/data";
import { UserDatas } from "../models/UserDatas";
import { ActivityDatas } from "../models/ActivityDatas";
import { AverageSessionDatas } from "../models/AverageSessionDatas";
import { PerformanceDatas } from "../models/PerfomanceDatas";

/**
 *
 * @param {number} userId The id of the user to get
 * @param {boolean} isMockedData Define if we get data from mock or API
 * @returns {Array} Array of formated data
 */
export default async function getDatas(userId, isMockedData) {
  let userDatas = {};
  let activityDatas = {};
  let performanceDatas = {};
  let averageSessionDatas = {};
  if (isMockedData) {
    // USER_... are mocked data from BACKEND API so we have to filter them by the userId
    userDatas = USER_MAIN_DATA.filter((user) => user.id === userId)[0];
    activityDatas = USER_ACTIVITY.filter(
      (activity) => activity.userId === userId
    )[0];
    averageSessionDatas = USER_AVERAGE_SESSIONS.filter(
      (averageSession) => averageSession.userId === userId
    )[0];
    performanceDatas = USER_PERFORMANCE.filter(
      (performance) => performance.userId === userId
    )[0];
    console.log("Mocked");
  } else {
    // Define API URL
    const userDatasUrl = process.env.REACT_APP_BACKEND_URL + `/user/${userId}`;
    const activityDatasUrl = `${userDatasUrl}/activity`;
    const averageSessionDatasUrl = `${userDatasUrl}/average-sessions`;
    const performanceDatasUrl = `${userDatasUrl}/performance`;
    // Fetch all URL
    const [
      userDatasToFetch,
      activityDatasToFetch,
      averageSessionDatasToFetch,
      performanceDatasToFetch,
    ] = await Promise.all([
      fetch(userDatasUrl),
      fetch(activityDatasUrl),
      fetch(averageSessionDatasUrl),
      fetch(performanceDatasUrl),
    ]);
    // Json() all fetched URL
    const [
      userDatasJson,
      activityDatasJson,
      averageSessionDatasJson,
      performanceDatasJson,
    ] = await Promise.all([
      userDatasToFetch.json(),
      activityDatasToFetch.json(),
      averageSessionDatasToFetch.json(),
      performanceDatasToFetch.json(),
    ]);
    userDatas = userDatasJson.data;
    activityDatas = activityDatasJson.data;
    averageSessionDatas = averageSessionDatasJson.data;
    performanceDatas = performanceDatasJson.data;
    console.log("API");
  }
  // Use data modeling class
  return [
    new UserDatas(userDatas).format(),
    new ActivityDatas(activityDatas).format(),
    new AverageSessionDatas(averageSessionDatas).format(),
    new PerformanceDatas(performanceDatas).format(),
  ];
}
