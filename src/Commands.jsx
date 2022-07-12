const speech = new SpeechSynthesisUtterance();
speech.lang = "en";
// const crawler = require("crawler-request");

const read = () => {
  let url = localStorage.getItem("oldurl");
  console.log(url);

  // crawler(url).then(function (response) {
  //   console.log(response.text);
  // });

  let dataBuffer = fs.readFileSync(url);

  pdf(dataBuffer)
    .then(function (data) {
      console.log(data.text);
    })
    .catch(function (error) {
      console.error(error);
    });

  // speech.text = "This is the read command";
  // speech.rate = 0.8;
  // speech.pitch = 1;
  // speech.volume = 4;
  // speech.voice = speechSynthesis.getVoices()[2];
  // window.speechSynthesis.speak(speech);
};

const com = {
  hello: () => {
    speech.text = "hi how are you?";
    speech.rate = 0.8;
    speech.pitch = 1;
    speech.volume = 4;
    speech.voice = speechSynthesis.getVoices()[2];
    window.speechSynthesis.speak(speech);
  },

  yes: () => {
    read();
  },
  no: () => {
    speech.text = "Okay I will keep Quiet";
    speech.rate = 0.8;
    speech.pitch = 1;
    speech.volume = 4;
    speech.voice = speechSynthesis.getVoices()[2];
    window.speechSynthesis.speak(speech);
  },
  search: () => {
    speech.text =
      "Please, press the button and  Say the term you want to search when finished place again the button";
    speech.rate = 0.8;
    speech.pitch = 1;
    speech.volume = 4;
    speech.voice = speechSynthesis.getVoices()[2];
    window.speechSynthesis.speak(speech);
  },
};

export default com;
