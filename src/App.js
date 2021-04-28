import "./styles.css";
import { useState } from "react";
import Dialogue from "./dialogue.json";

export default function App() {
  const [progress, setProgress] = useState(0);
  console.log(progress);
  return (
    <div className="App">
      <DialogueScreen dialogueScene={Dialogue[progress]} />
    </div>
  );
}

// Component Name: dialogueScreen

// Where will this component be located?

// Will this component use props? yes
// Name of props: dialogue, characterInfo, screenChange

// Will this component use state? yes
// Name of state variables: dialogueStep, dialogueSwitch

function DialogueScreen(props) {
  console.log(props);
  return (
    <div className="name">
      <h1> Camelot </h1>
    </div>
  );
}
