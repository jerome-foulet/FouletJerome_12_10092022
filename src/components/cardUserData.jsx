function CardUserData({ type, quantity, children }) {
  const unit = type === "calories" ? "kCal" : "g";
  return (
    <article className={`statsCard statsCardRight ${type}`}>
      <div className="statsCard__icon">
        <img src={children} alt="Calories" />
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

export default CardUserData;
