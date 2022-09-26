import { React, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import logo from "./assets/logo.png";
import yoga from "./assets/yoga.png";
import swimming from "./assets/swimming.png";
import bike from "./assets/bike.png";
import bodybuilding from "./assets/bodybuilding.png";
import caloriesIcon from "./assets/icon_calories.png";
import proteinesIcon from "./assets/icon_proteines.png";
import glucidesIcon from "./assets/icon_glucides.svg";
import fatIcon from "./assets/icon_fat.svg";

import getDatas from "./services/getDatas";
import DailyActivity from "./components/dailyActivity";
import AverageSessionDuration from "./components/averageSessionDuration";
import Performances from "./components/performances";
import Score from "./components/score";
import CardNutrition from "./components/cardNutrition";

function App() {
  // Use useSearchParams hook to get query parameters
  const [searchParams] = useSearchParams();
  // Get userId from query parameters and set it to 12 by default if not specified.
  const [userId] = useState(parseInt(searchParams.get("userId") ?? "12"));
  // Get isMockedData from query parameters and set it to true by default if not specified - Only use true or false in query.
  const [isMockedData] = useState(
    !(searchParams.get("isMockedData") === "false")
  );
  console.log("userId: %s", userId);
  console.log("isMockedData: %s", isMockedData.toString());

  const [isDataLoading, setDataLoading] = useState(true);
  const [userDatas, setUserDatas] = useState({});
  const [activityDatas, setActivityDatas] = useState({});
  const [averageSessionDatas, setAverageSessionDatas] = useState({});
  const [performanceDatas, setPerformanceDatas] = useState({});

  // Get datas once on loading page
  useEffect(() => {
    async function get() {
      setDataLoading(true);
      try {
        const [
          userDatasResponse,
          activityDatasResponse,
          averageSessionDatasResponse,
          performanceDatasResponse,
        ] = await getDatas(userId, isMockedData);
        setUserDatas(userDatasResponse);
        setActivityDatas(activityDatasResponse);
        setAverageSessionDatas(averageSessionDatasResponse);
        setPerformanceDatas(performanceDatasResponse);
      } catch (e) {
      } finally {
        setDataLoading(false);
      }
    }
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /*
  console.log(userDatas);
  console.log(activityDatas);
  console.log(averageSessionDatas);
  console.log(performanceDatas);
  */

  // Get user firstName from data or return empty string
  const firstName = userDatas.userInfos ? userDatas.userInfos.firstName : "";

  return (
    <div className="App">
      <header>
        <img src={logo} alt="SportSee" />
        <nav>
          <ul>
            <li>Accueil</li>
            <li>Profil</li>
            <li>Réglage</li>
            <li>Communauté</li>
          </ul>
        </nav>
      </header>
      <main>
        {isDataLoading ? (
          <p>Loading datas</p>
        ) : (
          <>
            <div className="leftColumn">
              <img src={yoga} alt="yoga" />
              <img src={swimming} alt="swimming" />
              <img src={bike} alt="bike" />
              <img src={bodybuilding} alt="bodybuilding" />
              <p>Copiryght, SportSee 2020</p>
            </div>
            <section className="rightColumn">
              <h1>
                Bonjour <span className="secondary-color">{firstName}</span>
              </h1>
              <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
              <div className="stats">
                <div className="statsLeftColumn">
                  <DailyActivity activityDatas={activityDatas} />
                  <AverageSessionDuration
                    averageSessionDatas={averageSessionDatas}
                  />
                  <Performances performanceDatas={performanceDatas} />
                  <Score userDatas={userDatas} />
                </div>
                <aside className="statsRightColumn">
                  <CardNutrition
                    type="calories"
                    quantity={userDatas.keyData.calorieCount}
                    icon={caloriesIcon}
                  />
                  <CardNutrition
                    type="proteines"
                    quantity={userDatas.keyData.carbohydrateCount}
                    icon={proteinesIcon}
                  />
                  <CardNutrition
                    type="glucides"
                    quantity={userDatas.keyData.calorieCount}
                    icon={glucidesIcon}
                  />
                  <CardNutrition
                    type="lipides"
                    quantity={userDatas.keyData.lipidCount}
                    icon={fatIcon}
                  />
                </aside>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
