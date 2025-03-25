const Card = ({ flashcard, isFlipped, setIsFlipped }) => {
  return (
    <div className="flip-card" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className={`flip-card-front ${flashcard.category.toLowerCase()}`}>
          <img
            src={flashcard.image}
            alt="Guess the location"
            className="card-image"
          />
          <div className="category-label">{flashcard.category}</div>
        </div>
        <div className={`flip-card-back ${flashcard.category.toLowerCase()}`}>
          <h2>{flashcard.location}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
