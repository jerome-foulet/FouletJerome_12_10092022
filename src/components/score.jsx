import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

function Score({ userDatas }) {
  //userDatas.score = 0.9;
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
      <ResponsiveContainer width="100%" height="100%">
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
            endAngle={360}
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

export default Score;
