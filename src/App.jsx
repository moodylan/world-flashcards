import { useState } from "react";
import flashcards from "./data/flashcards.js";
import Card from "./components/Card";
import UserInput from "./components/UserInput";
import "./css/card.css";
import stringSimilarity from "string-similarity";

const App = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [availableCards, setAvailableCards] = useState([...flashcards]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [feedbackColor, setFeedbackColor] = useState("");

  const showNextCard = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setCurrentCardIndex(0);
      return;
    }

    if (currentCardIndex < availableCards.length - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
      setUserGuess("");
      setFeedback("");
    }
  };

  const showPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
      setUserGuess("");
      setFeedback("");
    }
  };

  const shuffleFlashcards = () => {
    let shuffledCards = [...flashcards];

    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }

    setAvailableCards(shuffledCards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setUserGuess("");
    setFeedback("");
    setHasStarted(true);
  };

  const onSubmitGuess = () => {
    if (!availableCards[currentCardIndex]) return;

    const correctAnswer =
      availableCards[currentCardIndex].location.toLowerCase();
    const userAnswer = userGuess.trim().toLowerCase();

    if (userAnswer === correctAnswer) {
      setFeedback("correct!");
      setCurrentStreak((prev) => prev + 1);
      setLongestStreak((prev) => Math.max(prev, currentStreak + 1));
      return;
    }

    const similarity = stringSimilarity.compareTwoStrings(
      userAnswer,
      correctAnswer
    );
    if (similarity >= 0.8) {
      setFeedback("close enough!");
      setFeedbackColor("green");
      setCurrentStreak((prev) => prev + 1);
      setLongestStreak((prev) => Math.max(prev, currentStreak + 1));
    } else {
      setFeedback("incorrect, try again!");
      setFeedbackColor("red");
      setCurrentStreak(0);
    }
  };

  return (
    <div className="app">
      <div className="gradient-background"></div>
      <h1>Where in the World?</h1>
      <h3>
        Guess the location from these <strong>{flashcards.length}</strong>{" "}
        images! 🌎
      </h3>
      <div className="streaks">
        <p>
          current streak: <strong>{currentStreak}</strong>, longest streak:{" "}
          <strong>{longestStreak}</strong>
        </p>
      </div>
      {hasStarted ? (
        <>
          <Card
            flashcard={availableCards[currentCardIndex]}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
          />
          <UserInput
            userGuess={userGuess}
            setUserGuess={setUserGuess}
            onSubmitGuess={onSubmitGuess}
          />
          <div className="feedback">{feedback}</div>
        </>
      ) : (
        <div className="card-placeholder">
          <h3>
            Click next "<strong>→</strong>" below to begin!
          </h3>
        </div>
      )}
      <div className="buttons-section">
        <button className="shuffle-button" onClick={shuffleFlashcards}>
          🔀
        </button>
        <button className="prev-button" onClick={showPreviousCard}>
          <strong>←</strong>
        </button>
        <button className="next-button" onClick={showNextCard}>
          <strong>→</strong>
        </button>
      </div>
    </div>
  );
};

export default App;
