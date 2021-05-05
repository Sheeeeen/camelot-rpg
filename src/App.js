import "./styles.css";
import { useState } from "react";
import Dialogue from "./dialogue.json";

export default function App() {
  const [progress, setProgress] = useState(0);
  return (
    <div className="App">
      <DialogueScreen dialogueScene={Dialogue[progress]} progress={progress} setProgress={setProgress}/>
    </div>
  );
}

// Button Component
// Prop Names: buttonText, buttonClick
function Button(props) {
    return (
      <button onClick={props.buttonClick} index={props.index}>{props.buttonText}</button>
    )
}
// Dialogue Box
function Speech(props) {
  return(
    <p>{props.speechBubble}</p>
  )
}

// Avatar/Img
function Portrait(props){
  return(
    <img src={props.characterArt} />
  )
}
// Name Plate
function Name(props){
  return(
    <h4>{props.characterName}</h4>
  )
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map


function DialogueScreen(props) {
  function buttonClick(event) {
    const selection = event.target.attributes.index.value;
    // if i clicked death button
      // console log im dead
    // else
     // return(selection===death : )
      props.setProgress(props.progress+1)
  }

  return (
    <div className="dialogue-screen">
      <Portrait characterArt={props.dialogueScene.character_art} />
      <Name characterName={props.dialogueScene.name} />
      <Speech speechBubble={props.dialogueScene.text} />
      <div class="dialogue-options">
        {props.dialogueScene.choices.map((choize, index) => <Button buttonText={choize} buttonClick={buttonClick} index={index} /> )}
      </div>
    </div>
  );
}
