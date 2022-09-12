import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
} from "recharts";

function DailyActivity({ activityDatas }) {
  const { sessions } = activityDatas;

  const renderCustomAxisTick = ({ x, y, payload }) => {
    console.log(payload);
    return payload.value;
  };

  return (
    <article className="statsCard dailyActivity">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sessions} barGap="8">
          <CartesianGrid
            stroke="#DEDEDE"
            strokeDasharray="1"
            vertical={false}
          />
          <XAxis dataKey="day" tick={renderCustomAxisTick} />
          <YAxis dataKey="kilogram" domain={["dataMin - 1", "dataMax + 1"]} />
          <YAxis dataKey="calories" domain={["auto", "auto"]} />
          <Bar
            dataKey="kilogram"
            fill="#282D30"
            barSize={7}
            radius={[50, 50, 0, 0]}
          />
          <Bar
            dataKey="calories"
            fill="#E60000"
            barSize={7}
            radius={[50, 50, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </article>
  );
}

export default DailyActivity;
