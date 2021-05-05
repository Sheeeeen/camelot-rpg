import "./styles.css";
import { useState } from "react";
import Dialogue from "./dialogue.json";

export default function App() {
  const [progress, setProgress] = useState(0);
  const [winStatus, setWinStatus] = useState("");
  let screen;

  if (winStatus === "") {
    screen = (
      <DialogueScreen
        dialogueScene={Dialogue[progress]}
        progress={progress}
        setProgress={setProgress}
      />
    );
  } else if (winStatus === "win") {
    screen = <SummaryScreen resultHeader="Victory" />;
  } else if (winStatus === "loss") {
    screen = <SummaryScreen resultHeader="Game Over" />;
  }

  // https://reactjs.org/docs/conditional-rendering.html

  return <div className="App">{screen}</div>;
}

// Button Component
// Prop Names: buttonText, buttonClick
function Button(props) {
  return (
    <button onClick={props.buttonClick} index={props.index}>
      {props.buttonText}
    </button>
  );
}
// Dialogue Box
function Speech(props) {
  return <p>{props.speechBubble}</p>;
}

// Avatar/Img
function Portrait(props) {
  return <img src={props.characterArt} />;
}
// Name Plate
function Name(props) {
  return <h4>{props.characterName}</h4>;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

function DialogueScreen(props) {
  function buttonClick(event) {
    const selection = event.target.attributes.index.value;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    if (props.dialogueScene.death.includes(parseInt(selection))) {
      console.log("im dead");
    } else {
      props.setProgress(props.progress + 1);
    }
  }

  return (
    <div className="dialogue-screen">
      <Portrait characterArt={props.dialogueScene.character_art} />
      <Name characterName={props.dialogueScene.name} />
      <Speech speechBubble={props.dialogueScene.text} />
      <div class="dialogue-options">
        {props.dialogueScene.choices.map((choize, index) => (
          <Button buttonText={choize} buttonClick={buttonClick} index={index} />
        ))}
      </div>
    </div>
  );
}

function SummaryScreen(props) {
  return (
    <h1>{props.resultHeader}</h1>
    //<Button />
  );
}
