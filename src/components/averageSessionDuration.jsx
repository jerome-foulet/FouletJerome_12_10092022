import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function AverageSessionDuration({ averageSessionDatas }) {
  const { sessions } = averageSessionDatas;

  const formatTick = (value) => {
    const ticks = {
      1: "L",
      2: "M",
      3: "M",
      4: "J",
      5: "V",
      6: "S",
      7: "D",
    };
    return ticks[value];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return <div className="customTooltip">{`${payload[0].value} min`}</div>;
    }
    return null;
  };

  return (
    <article className="statsCard averageTimeSession">
      <h2>Durée moyenne des sessions</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sessions}
          margin={{ left: 10, right: 10, top: 100, bottom: 15 }}
        >
          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
            wrapperStyle={{ outline: "none" }}
          />
          <Line
            type="natural"
            dataKey="sessionLength"
            dot={false}
            strokeWidth={2}
            stroke="#fff"
          />
          <XAxis
            dataKey="day"
            stroke="rgba(255, 255, 255, 0.5)"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={formatTick}
            dy={15}
            interval={"preserveStartEnd"}
          />
          <YAxis hide={true} domain={["dataMin", "dataMax"]} />
        </LineChart>
      </ResponsiveContainer>
    </article>
  );
}

export default AverageSessionDuration;
