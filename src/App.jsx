import { useState, useRef, useEffect } from "react";
import Die from "./Components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";

function App() {
  function getRandomNumber() {
    let numbers = [];
    for (let i = 0; i < 10; i++) {
      numbers.push({
        value: Math.round(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return numbers;
  }

  const [dice, setDice] = useState(() => getRandomNumber());
  const buttonRef = useRef(null);

  function hold(id) {
    // console.log(id);
    // let heldDice=dice.find(dice => dice.id===id);
    setDice((prev) => {
      return prev.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  let diceElements = dice.map((num) => (
    <Die
      key={num.id}
      value={num.value}
      isHeld={num.isHeld}
      hold={() => hold(num.id)}
      id={num.id}
    />
  ));
  function handleRoll() {
    if (gameWon) {
      setDice((prev) => {
        return prev.map((die) => {
          return {
            ...die,
            isHeld: false,
            value: Math.round(Math.random() * 6) + 1,
          };
        });
      });
    } else {
      setDice((prev) => {
        return prev.map((die) => {
          return die.isHeld
            ? die
            : { ...die, value: Math.round(Math.random() * 6) + 1 };
        });
      });
    }
  }

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congrats! You won the game. Press new game to play again</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container item">{diceElements}</div>
      <button ref={buttonRef} className="item" onClick={handleRoll}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
