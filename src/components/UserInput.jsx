const UserInput = ({ userGuess, setUserGuess, onSubmitGuess }) => {
  return (
    <div className="user-input-form">
      <input
        type="text"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        placeholder="Answer here..."
      />
      <button className="submit-button" onClick={onSubmitGuess}>
        🤔
      </button>
    </div>
  );
};

export default UserInput;
