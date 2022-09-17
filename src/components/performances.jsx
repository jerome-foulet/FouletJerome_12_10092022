import {
  PolarAngleAxis,
  PolarGrid,
  RadarChart,
  ResponsiveContainer,
  Radar,
} from "recharts";

function Performances({ performanceDatas }) {
  const { data, kind } = performanceDatas;

  const formatTick = (value) => {
    const translate = {
      cardio: "Cardio",
      energy: "Energie",
      endurance: "Endurance",
      strength: "Force",
      speed: "Vitesse",
      intensity: "Intensité",
    };
    return translate[kind[value]];
  };

  return (
    <article className="statsCard performance">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={data}
          margin={{ left: 30, right: 30, top: 10, bottom: 10 }}
        >
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="kind"
            stroke="#fff"
            tick={{ fontSize: 10 }}
            tickLine={false}
            tickFormatter={formatTick}
            P
          />
          <Radar
            dataKey="value"
            stroke="#ff0101"
            fill="#ff0101"
            fillOpacity={0.7}
          />
        </RadarChart>
      </ResponsiveContainer>
    </article>
  );
}

export default Performances;
