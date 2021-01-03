var topScore = document.querySelector("#topScore");
var clear = document.querySelector("#clear");
var reDo = document.querySelector("#return");

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
var scoreBoard = localStorage.getItem("scoreBoard");
scoreBoard = JSON.parse(scoreBoard);
if (scoreBoard !== null) {
  for (var i = 0; i < scoreBoard.length; i++) {
    var makeLi = document.createElement("li");
    makeLi.textContent = scoreBoard[i].initials + " " + scoreBoard[i].score;
    topScore.appendChild(makeLi);
  }
};
reDo.addEventListener("click", function () {
  window.location.replace("index.html");
});