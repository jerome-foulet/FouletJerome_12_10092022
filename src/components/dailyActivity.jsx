import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import PropTypes from "prop-types";
import useWindowDimensions from "../hooks/useWindowDImensions";

/**
 * React component for daily activity.
 *
 * @param {Object} activityDatas The object of datas
 * @returns {ReactComponentElement} A react component
 */
function DailyActivity({ activityDatas }) {
  const { sessions } = activityDatas;
  const { width } = useWindowDimensions();

  /**
   * Function to custom tooltip display
   *
   * @param {boolean} active The state of the tooltip
   * @param {payload} any Object with value of the tooltip
   * @returns {DOMElement} The customized Tooltip
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="customTooltip">
          <div>{`${payload[0].value}kg`}</div>
          <div>{`${payload[1].value}kCal`}</div>
        </div>
      );
    }
    return null;
  };

  /**
   * Calculate Xaxis padding
   *
   * @returns {number} Padding for Xaxis
   */
  const getXaxisPadding = () => {
    if (width < 1200) return -24;
    return -80;
  };

  return (
    <article className="statsCard dailyActivity">
      <h2>Activité quotidienne</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sessions}
          barGap={8}
          width="100%"
          height="100%"
          margin={{ top: 50, left: 32, bottom: 23, right: 20 }}
        >
          <Legend
            verticalAlign="top"
            align="right"
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ top: 24, right: 20 }}
          />
          <Tooltip
            content={<CustomTooltip />}
            offset={50}
            itemStyle={{ background: "rgba(196, 196, 196, 0.5)" }}
            wrapperStyle={{ outline: "none" }}
          />
          <CartesianGrid
            stroke="#DEDEDE"
            strokeDasharray="2 2"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(value) => value.substring(value.length - 1)}
            tickLine={false}
            dy={15}
            tick={{ fill: "#9B9EAC", fontSize: 14 }}
            stroke={"#DEDEDE"}
            padding={{ left: getXaxisPadding(), right: getXaxisPadding() }}
          />
          <YAxis
            yAxisId="kilogram"
            dataKey="kilogram"
            domain={["dataMin-1", "dataMax+1"]}
            orientation="right"
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            dx={25}
            tick={{ fill: "#9B9EAC", fontSize: 14 }}
          />
          <YAxis
            yAxisId="calories"
            dataKey="calories"
            hide={true}
            domain={["dataMin-100", "dataMax+100"]}
          />
          <Bar
            dataKey="kilogram"
            fill="#282D30"
            barSize={7}
            radius={[50, 50, 0, 0]}
            yAxisId="kilogram"
            name="Poids (kg)"
          />
          <Bar
            dataKey="calories"
            fill="#E60000"
            barSize={7}
            radius={[50, 50, 0, 0]}
            yAxisId="calories"
            name="Calories brûlées (kCal)"
          />
        </BarChart>
      </ResponsiveContainer>
    </article>
  );
}

DailyActivity.prototype = {
  activityDatas: PropTypes.shape({
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.number.isRequired,
        kilogram: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};

export default DailyActivity;
