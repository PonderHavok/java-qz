var score = 0;
var quizQuestions = 0;
var presentTime = document.querySelector("#presentTime");
var countdown = document.querySelector("#begin");
var qs = document.querySelector("#qs");
var container = document.querySelector("#container");
var remains = 75;
var pause = 0;
var ulSpawn = document.createElement("ulSpawn");
var ques = [
  {
    title: "Which of these is not used to loop?",
    choices: ["foreach", "sequence", "for", "while"],
    answer: "sequence",
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["parentheeses", "quotes", "curly brackets", "commas"],
    answer: "quotes",
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["curly brackets", "quotes", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "Which of these is not a way to save a variable",
    choices: ["var", "const", "let", "bal"],
    answer: "bal",
  },
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["alerts", "booleans", "numbers", "strings"],
    answer: "alerts",
  },
];

countdown.addEventListener("click", function () {
  if (pause === 0) {
    pause = setInterval(function () {
      remains--;
      presentTime.textContent = "Time: " + remains;
      if (remains <= 0) {
        clearInterval(pause);
        allDone();
        presentTime.textContent = "Time's up!";
      }
    }, 1000);
  }
  render(quizQuestions);
});
function render(quizQuestions) {
  qs.innerHTML = "";
  ulSpawn.innerHTML = "";
  for (var i = 0; i < ques.length; i++) {
    var userQues = ques[quizQuestions].title;
    var userDecision = ques[quizQuestions].choices;
    qs.textContent = userQues;
  }
  userDecision.forEach(function (newList) {
    var listItems = document.createElement("li");
    listItems.textContent = newList;
    qs.appendChild(ulSpawn);
    ulSpawn.appendChild(listItems);
    listItems.addEventListener("click", compare);
  });
}
function compare(event) {
  var el = event.target;
  if (el.matches("li")) {
    var makeDiv = document.createElement("div");
    makeDiv.setAttribute("id", "makeDiv");
    if (el.textContent == ques[quizQuestions].answer) {
      score++;
      makeDiv.textContent =
        "Correct! The answer is:  " + ques[quizQuestions].answer;
    } else {
      makeDiv.textContent =
        "Wrong! The correct answer is:  " + ques[quizQuestions].answer;
    }
  }
  quizQuestions++;
  if (quizQuestions >= ques.length) {
    allDone();
    makeDiv.textContent =
      "End of quiz!" +
      " " +
      "You got  " +
      score +
      "/" +
      ques.length +
      " Correct!";
  } else {
    render(quizQuestions);
  }
  qs.appendChild(makeDiv);
}
function allDone() {
  qs.innerHTML = "";
  presentTime.innerHTML = "";

  var makeH2 = document.createElement("h2");
  makeH2.setAttribute("id", "makeH2");
  makeH2.textContent = "All Done!";
  qs.appendChild(makeH2);

  var makePtag = document.createElement("p");
  makePtag.setAttribute("id", "makePtag");
  qs.appendChild(makePtag);

  if (remains >= 0) {
    var timeRemainder = remains;
    var makePtags = document.createElement("p");
    clearInterval(pause);
    makePtag.textContent = "Your final score is: " + timeRemainder;
    qs.appendChild(makePtags);
  }
  var makeLabel = document.createElement("label");
  makeLabel.setAttribute("id", "makeLabel");
  makeLabel.textContent = "Enter your initials: ";
  qs.appendChild(makeLabel);

  var makeInput = document.createElement("input");
  makeInput.setAttribute("type", "text");
  makeInput.setAttribute("id", "initials");
  makeInput.textContent = "";
  qs.appendChild(makeInput);

  var makeSubmit = document.createElement("button");
  makeSubmit.setAttribute("type", "submit");
  makeSubmit.setAttribute("id", "Submit");
  makeSubmit.textContent = "Submit";
  qs.appendChild(makeSubmit);

  makeSubmit.addEventListener("click", function () {
    var initials = makeInput.value;
    if (initials === null) {
      console.log("No value entered!");
    } else {
      var finalScore = {
        initials: initials,
        score: timeRemainder,
      };
      console.log(finalScore);
      var scoreBoard = localStorage.getItem("scoreBoard");
      if (scoreBoard === null) {
        scoreBoard = [];
      } else {
        scoreBoard = JSON.parse(scoreBoard);
      }
      scoreBoard.push(finalScore);
      var newScore = JSON.stringify(scoreBoard);
      localStorage.setItem("scoreBoard", newScore);
      window.location.replace("topScores.html");
    }
  });
}
