const speech = new SpeechSynthesisUtterance();
speech.lang = "en";

const com = {
  hello: () => {
    speech.text = "hi how are you?";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 4;
    speech.voice = speechSynthesis.getVoices()[2];
    window.speechSynthesis.speak(speech);
  },
};

export default com;
