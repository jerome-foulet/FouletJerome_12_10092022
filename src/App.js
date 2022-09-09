import React from "react";
import { useSearchParams } from "react-router-dom";

/* import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "./assets/mockedData/data"; */

function App() {
  /* console.log(
    USER_MAIN_DATA,
    USER_ACTIVITY,
    USER_AVERAGE_SESSIONS,
    USER_PERFORMANCE
  ); */

  // Use useSearchParams hook to get query parameters
  const [searchParams] = useSearchParams();
  // Get userId from query parameters and set it to 12 if not specified.
  const userId = searchParams.get("userId") ?? 12;
  // Get isMockedData from query parameters and set it to true by default - Only use true or false in query.
  const isMockedData = !(searchParams.get("isMockedData") === "false");
  //console.log(typeof isMockedData);
  console.log("userId: %s", userId);
  console.log("isMoackedData: %s", isMockedData.toString());

  return <div className="App"></div>;
}

export default App;
