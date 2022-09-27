import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PropTypes from "prop-types";
import { useState } from "react";

/**
 * React component for average session duration.
 *
 * @param {Object} averageSessionDatas The object of datas
 * @returns {ReactComponentElement} A react component
 */
function AverageSessionDuration({ averageSessionDatas }) {
  const { sessions } = averageSessionDatas;
  const [tooltipX, setTooltipX] = useState(0);

  // Set 2 values at the ends for line continuity
  let sessionsToDisplay = [
    { ...sessions.slice(-1)[0], tickDisplay: false },
    ...sessions,
    { ...sessions[0], tickDisplay: false },
  ];
  //console.log(sessionsToDisplay);

  /**
   * Function to format tick from index to first day letter
   *
   * @param {number} value
   * @returns {string} The formated tick
   */
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

  /**
   * Function to custom tooltip display
   *
   * @param {boolean} active The state of the tooltip
   * @param {payload} any Object with value of the tooltip
   * @returns The customized Tooltip
   */
  const CustomTooltip = ({ active, payload, coordinate }) => {
    if (active && payload && payload.length) {
      if (payload[0].payload.tickDisplay === false) return null;
      // Hack to avoid warning update component while rendering another
      // by send it back to the callback queue
      setTimeout(() => setTooltipX(coordinate.x), 0);
      return <div className="customTooltip">{`${payload[0].value} min`}</div>;
    }
    return null;
  };

  /**
   * Function to draw or delete overlay with tooltip
   *
   * @param {Object} state Object onMouse
   */
  const drawOverlay = (state) => {
    if (state.isTooltipActive) {
      const overlay = document.querySelector(".averageTimeSession__overlay");
      const container = document.querySelector(".averageTimeSession");
      const containerWidth = container.clientWidth;
      const calculatedWidth = containerWidth - tooltipX;
      overlay.style.width = calculatedWidth + "px";
    } else {
      deleteOverlay();
    }
  };

  const deleteOverlay = () => {
    const overlay = document.querySelector(".averageTimeSession__overlay");
    overlay.style.width = "0px";
  };

  return (
    <article className="statsCard averageTimeSession">
      <div className="averageTimeSession__overlay"></div>
      <h2>Durée moyenne des sessions</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sessionsToDisplay}
          margin={{ left: -20, right: -20, top: 100, bottom: 15 }}
          onMouseMove={drawOverlay}
          onMouseLeave={deleteOverlay}
        >
          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
            wrapperStyle={{ outline: "none" }}
            animationDuration={0}
            margin={{ right: -100 }}
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
            interval={0}
          />
          <YAxis hide={true} domain={["dataMin", "dataMax"]} />
        </LineChart>
      </ResponsiveContainer>
    </article>
  );
}

AverageSessionDuration.prototype = {
  averageSessionDatas: PropTypes.shape({
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.number.isRequired,
        sessionLength: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};

export default AverageSessionDuration;
