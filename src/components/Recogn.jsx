import React, { useState, useEffect } from "react";
import mic from "/mic.svg";
import item from "/item.svg";
import search_svg from "/search_svg.svg";
import com from "../Commands";
import { Link } from "react-router-dom";

//Speech recognition Initialization
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const BPA = new SpeechRecognition();

//speech initialization
const speech = new SpeechSynthesisUtterance();
speech.lang = "en";

BPA.continous = true;
BPA.lang = "en-US";
BPA.interimResults = true;

function Recogn() {
  //state value initialization
  const [text, setText] = useState(null);
  const [search, setSearch] = useState(false);
  const [url, setUrl] = useState(JSON.parse(localStorage.getItem("url")));
  const [isListening, setIsListening] = useState(false);

  //hook for continous running the fx()
  useEffect(() => {
    SP2TXT();
  }, [isListening]);

  //fx responsible for speech to text
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
    //execute command depend on word
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

      if (transcript === "search") {
        setSearch(true);
        setIsListening(false);
      }
    };
  };

  const listen = () => {
    setIsListening(true);
  };

  const stop = () => {
    setIsListening(false);
  };

  const desicion = () => {
    speech.text =
      "New pdf was Uploaded , Do you want to hear it press center and answer YES or NO";
    speech.rate = 0.8;
    speech.pitch = 1;
    speech.volume = 4;
    speech.voice = speechSynthesis.getVoices()[2];
    window.speechSynthesis.speak(speech);

    localStorage.setItem("oldurl", JSON.stringify(url));
    localStorage.removeItem("url");
    setUrl(JSON.parse(localStorage.getItem("url")));
  };

  const search_term = () => {
    speech.text = "search reached";
    speech.rate = 0.8;
    speech.pitch = 1;
    speech.volume = 4;
    speech.voice = speechSynthesis.getVoices()[2];
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="w-full p-5 bg-gray-700 text-white grid place-items-center">
      <div className="grid place-items-center">
        {url ? (
          <>
            <h1 className="font-bold uppercase">New Upload available</h1>
            <div className="flex justify-around place-items-center pt-52">
              <img
                src={item}
                alt="file"
                className="h-16 p-2 rounded-2xl mx-2"
                onClick={desicion}
              />
            </div>
          </>
        ) : search ? (
          <>
            <h1 className="font-bold uppercase">New Upload available</h1>
            <div className="flex justify-around place-items-center pt-52">
              <img
                src={search_svg}
                alt="file"
                className="h-16 p-2 rounded-2xl mx-2"
                onClick={search_term}
              />
            </div>
          </>
        ) : (
          <>
            <h1>Press to Speak</h1>
            <div className="flex justify-around place-items-center pt-52">
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
          </>
        )}
      </div>
      <Link to="/instructor">
        <button className="text-white text-xl mt-56 bg-white rounded-full p-1">
          📓
        </button>
      </Link>
    </div>
  );
}

export default Recogn;
