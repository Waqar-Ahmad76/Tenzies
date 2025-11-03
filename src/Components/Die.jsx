import "./Die.css";
export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "White",
  };
  return (
    <>
      <button
        onClick={() => props.hold()}
        style={styles}
        aria-pressed={props.isHeld}
        aria-label={`This is a button with value ${props.value}, ${
          props.isHeld ? "is held" : "not held"
        } `}
      >
        {props.value}
      </button>
    </>
  );
}
