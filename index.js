//define variables
const wordElements = [];
let level = 1;
let points = 0;
let interval = getRandomInt(50, 200);

//return words from json file
const getWords = () => {
  const request = new XMLHttpRequest();
  request.open("get", "words.json", false);
  request.send();
  if (request.status !== 200) {
    return {};
  }
  return JSON.parse(request.responseText);
};
const wordList = getWords();

//word entity
const word = {
  x: 0,
  y: 0,
  vx: 0,
  text: "...",
  direction: 1,
  element: "",
  create: function(x, y, vx, text) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.text = text;
    this.element = document.createElement("div");
    this.element.innerHTML = `<span class="word">${this.text}</span>`;
    document.querySelector("body").appendChild(this.element);
    return this.element;
  },
  update: function() {
    this.x += this.vx;
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
};

//handle typing event
const input = document.querySelector("input");
input.addEventListener("keyup", function(event) {
  const value = event.target.value;
  wordElements.forEach(function(activeWord, index) {
    const pattern = new RegExp(`${activeWord.element.innerText}`, "i");
    if (pattern.test(value)) {
      activeWord.element.remove();
      wordElements.splice(index, 1);
      input.value = "";
    }
  });
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//add word to DOM
const setWord = () => {
  let source;
  switch (level) {
    case 1: {
      source = wordList.easy;
      break;
    }
    case 2: {
      source = wordList.medium;
      break;
    }
    case 3: {
      source = wordList.hard;
      break;
    }
  }
  const newWord = source[Math.floor(Math.random() * source.length)];
  const newWordObj = Object.assign({}, word);
  newWordObj.create(0, 0, 1, newWord);
  wordElements.push(newWordObj);
};

//add word each random time
(function loop() {
  setTimeout(function() {
    setWord();
    loop();
  }, getRandomInt(2000, 5000));
})();


//Game loop
const run = () => {
  input.focus();
  wordElements.forEach(function(word) {
    word.update();
  });
  requestAnimationFrame(run);
};

//initialize game
const start = () => {
  setWord();
  run();
};

start();
