import React from "react";
import { useSearchParams } from "react-router-dom";
import logo from "./assets/logo.png";
import yoga from "./assets/yoga.png";
import swimming from "./assets/swimming.png";
import bike from "./assets/bike.png";
import bodybuilding from "./assets/bodybuilding.png";
import { useEffect, useState } from "react";
import getDatas from "./services/getDatas";

function App() {
  // Use useSearchParams hook to get query parameters
  const [searchParams] = useSearchParams();
  // Get userId from query parameters and set it to 12 by default if not specified.
  const [userId] = useState(parseInt(searchParams.get("userId")) ?? 12);
  // Get isMockedData from query parameters and set it to true by default - Only use true or false in query.
  const [isMockedData] = useState(
    !(searchParams.get("isMockedData") === "false")
  );
  //console.log(typeof isMockedData);
  console.log("userId: %s", userId);
  console.log("isMoackedData: %s", isMockedData.toString());

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
  //console.log(userDatas);
  //console.log(activityDatas);
  //console.log(averageSessionDatas);
  //console.log(performanceDatas);

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
                  <article className="statsCard dailyActivity"></article>
                  <article className="statsCard averageTimeSession"></article>
                  <article className="statsCard performance"></article>
                  <article className="statsCard score"></article>
                </div>
                <div className="statsRightColumn">
                  <article className="statsCard statsCardRight"></article>
                  <article className="statsCard statsCardRight"></article>
                  <article className="statsCard statsCardRight"></article>
                  <article className="statsCard statsCardRight"></article>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
