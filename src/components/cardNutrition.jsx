import PropTypes from "prop-types";

/**
 * React component for Nutritional card.
 *
 * @param {string} type The type of CardUserData, one of ["calories", "proteines", "glucides", "lipides"]
 * @param {number} quantity The quantity of nutritional data
 * @param {string} icon Link or data about the icon
 * @returns {ReactComponentElement} A react component
 */
function CardNutrition({ type, quantity, icon }) {
  const unit = type === "calories" ? "kCal" : "g";
  return (
    <article className={`statsCard statsCardRight ${type}`}>
      <div className="statsCard__icon">
        <img src={icon} alt="Calories" />
      </div>
      <div className="statsCard__infos">
        <p>
          {quantity}
          {unit}
        </p>
        <p>{type}</p>
      </div>
    </article>
  );
}

CardNutrition.prototype = {
  type: PropTypes.oneOf(["calories", "proteines", "glucides", "lipides"])
    .isRequired,
  quantity: PropTypes.number,
  icon: PropTypes.string.isRequired,
};

export default CardNutrition;
