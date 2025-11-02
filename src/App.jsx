import { useState } from "react";
import Die from "./Components/Die";
import { nanoid } from "nanoid";
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

  function hold(id) {
    // console.log(id);
    // let heldDice=dice.find(dice => dice.id===id);
    setDice((prev) => {
      return prev.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }
  const [dice, setDice] = useState(getRandomNumber());

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
    setDice((prev) => {
      return prev.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.round(Math.random() * 6) + 1 };
      });
    });
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container item">{diceElements}</div>
      <button className="item" onClick={handleRoll}>
        Roll
      </button>
    </main>
  );
}

export default App;
