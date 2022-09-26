import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

/**
 * React component for score.
 *
 * @param {Object} userDatas The object of datas
 * @returns {ReactComponentElement} A react component
 */
function Score({ userDatas }) {
  //userDatas.score = 340;
  return (
    <article className="statsCard score">
      <h2>Score</h2>
      <div className="score__value">
        <div>{userDatas.score}%</div>
        <div>
          de votre
          <br />
          objectif
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={[userDatas]}
            dataKey="score"
            cx="50%"
            cy="50%"
            cornerRadius={5}
            innerRadius={70}
            outerRadius={80}
            startAngle={90}
            endAngle={90 + (userDatas.score / 100) * 360}
          >
            {[userDatas].map((entry, index) => (
              <Cell key={`cell-${index}`} fill="red" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </article>
  );
}

Score.prototype = {
  userDatas: PropTypes.shape({
    score: PropTypes.number,
  }).isRequired,
};

export default Score;
