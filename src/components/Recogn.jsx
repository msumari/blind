import React, { useState, useEffect } from "react";
import mic from "/mic.svg";
import com from "../Commands";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const BPA = new SpeechRecognition();

BPA.continous = true;
BPA.lang = "en-US";
BPA.interimResults = true;

function Recogn() {
  const [text, setText] = useState(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    SP2TXT();
  }, [isListening]);

  const SP2TXT = () => {
    if (isListening) {
      BPA.start();
      BPA.onend = () => {
        console.log("continue...");
        BPA.start();
      };
    } else {
      BPA.stop();
      BPA.onend = () => {
        console.log("stopped");
      };
    }

    BPA.onstart = () => {
      console.log("Mics on");
    };

    BPA.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript.toLowerCase();
      if (com[transcript]) {
        com[transcript]();
      } else {
        alert("command not found");
      }
      setText(transcript);
      console.log(transcript);
    };
  };

  const listen = () => {
    setIsListening(true);
  };

  const stop = () => {
    setIsListening(false);
  };

  return (
    <div className="w-full h-1/2 p-5 bg-gray-700 text-white grid place-items-center">
      <div className="grid place-items-center">
        <h1>Speech recognition module</h1>
        <div className="flex justify-around place-items-center">
          {!isListening ? (
            <img
              src={mic}
              alt="mic"
              className="h-12 bg-green-400 p-2 rounded-full mx-2"
              onClick={listen}
            />
          ) : (
            <img
              src={mic}
              alt="mic"
              className="h-12 p-2 bg-red-700 rounded-full"
              onClick={stop}
            />
          )}
        </div>
        <p className="w-full h-11">{text}</p>
      </div>
    </div>
  );
}

export default Recogn;
