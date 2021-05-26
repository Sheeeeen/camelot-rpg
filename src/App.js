import { Fragment } from "react";
import "./styles.css";
import { useState } from "react";
import Dialogue from "./dialogue.json";

export default function App() {
  const [progress, setProgress] = useState(0);
  const [winStatus, setWinStatus] = useState("");

  // handleReset
  // setProgress
  // setWinStatus

  let screen;

  if (winStatus === "") {
    screen = (
      <DialogueScreen
        dialogueScene={Dialogue[progress]}
        progress={progress}
        setProgress={setProgress}
        setWinStatus={setWinStatus}
      />
    );
  } else if (winStatus === "win") {
    screen = (
      <SummaryScreen
        resultHeader="Victory"
        winStatus={winStatus}
        setWinStatus={setWinStatus}
        setProgress={setProgress}
      />
    );
  } else if (winStatus === "loss") {
    screen = (
      <SummaryScreen
        resultHeader="Game Over"
        winStatus={winStatus}
        setWinStatus={setWinStatus}
        setProgress={setProgress}
      />
    );
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
  return <img className="portrait" src={props.characterArt} />;
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
    if (props.dialogueScene.death.includes(parseInt(selection, 10))) {
      props.setWinStatus("loss");
    } else if (props.dialogueScene.victory && props.dialogueScene.victory.includes(parseInt(selection, 10))) {
      props.setWinStatus("win");
    } else {
      props.setProgress(props.progress + 1);
    }
  }

  return (
    <div className="screen dialogue-screen">
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
  function handleReset(reset) {
    props.setWinStatus("");
    if (reset) {
      props.setProgress(0);
    }
  }
  let option;
  let statusClassName = props.winStatus;
  if (props.winStatus === "win") {
    // onClick={handleReset}
    option = <Button buttonText="Play Again" buttonClick={() => handleReset(true)}/>;
  } else if (props.winStatus === "loss") {
    option = (
      <Fragment>
        <Button buttonText="Press on" buttonClick={() => handleReset(false)} />
        <Button buttonText="Start Over" buttonClick={() => handleReset(true)} />
      </Fragment>
    );
  }

  return (
    <div className={`screen ${statusClassName}`}>
      <h1>{props.resultHeader}</h1>
      <div class="dialogue-options">{option}</div>
    </div>
  );
}
