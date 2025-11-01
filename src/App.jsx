import { useState } from "react";
import Die from "./Components/Die";
import "./App.css";

function App() {
  function getRandomNumber() {
    let numArr=[];
    for (let i = 0; i < 10; i++) {
      numArr.push(Math.round(Math.random() * 6) + 1);
    }
    return numArr;
  }
  const [dice, setDice] = useState(getRandomNumber());

  let diceElements = dice.map((num) => <Die value={num} />);
  function handleRoll(){
    setDice(getRandomNumber())
  }

  return (
    <main>
      <div className="container item">{diceElements}</div>
      <button  className="item" onClick={handleRoll}>Roll</button>
    </main>
  );
}

export default App;
