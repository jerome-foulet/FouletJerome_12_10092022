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

export default async function getDatas(userId, isMockedData) {
  let userDatas = {};
  let activityDatas = {};
  let performanceDatas = {};
  let averageSessionDatas = {};
  if (isMockedData) {
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
    const userDatasUrl = process.env.REACT_APP_BACKEND_URL + `/user/${userId}`;
    const activityDatasUrl = `${userDatasUrl}/activity`;
    const averageSessionDatasUrl = `${userDatasUrl}/average-sessions`;
    const performanceDatasUrl = `${userDatasUrl}/performance`;
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
  return [
    new UserDatas(userDatas).format(),
    new ActivityDatas(activityDatas).format(),
    new AverageSessionDatas(averageSessionDatas).format(),
    new PerformanceDatas(performanceDatas).format(),
  ];
}
