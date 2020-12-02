document.addEventListener("DOMContentLoaded", (event) => {
  const initialTime = 75;
  let time = 75;
  let score = 0;
  let qCount = 0;
  let timeset;
  let answers = document.querySelectorAll("#quizContainer button");

  let recordsArray = [];

  localStorage.getItem("recordsArray")
    ? (recordsArray = JSON.parse(localStorage.getItem("recordsArray")))
    : (recordsArray = []);

  let queryElement = (element) => {
    return document.querySelector(element);
  };

  let onlyDisplaySection = (element) => {
    let sections = document.querySelectorAll("section");
    Array.from(sections).forEach((userItem) => {
      userItem.classList.add("hide");
    });
    queryElement(element).classList.remove("hide");
  };

  let recordsHtmlReset = () => {
    queryElement("#highScore div").innerHTML = "";
    var i = 1;
    recordsArray.sort((a, b) => b.score - a.score);
    Array.from(recordsArray).forEach((check) => {
      var scores = document.createElement("div");
      scores.innerHTML = i + ". " + check.initialRecord + " - " + check.score;
      queryElement("#highScore div").appendChild(scores);
      i = i + 1;
    });
    i = 0;
    Array.from(answers).forEach((answer) => {
      answer.classList.remove("disable");
    });
  };

  let setQuestionData = () => {
    queryElement("#quizContainer h2").innerHTML = questions[qCount].title;
    queryElement(
      "#quizContainer button:nth-of-type(1)"
    ).innerHTML = `1. ${questions[qCount].choices[0]}`;
    queryElement(
      "#quizContainer button:nth-of-type(2)"
    ).innerHTML = `2. ${questions[qCount].choices[1]}`;
    queryElement(
      "#quizContainer button:nth-of-type(3)"
    ).innerHTML = `3. ${questions[qCount].choices[2]}`;
    queryElement(
      "#quizContainer button:nth-of-type(4)"
    ).innerHTML = `4. ${questions[qCount].choices[3]}`;
  };

  let quizUpdate = (answerCopy) => {
    queryElement("#scoreIndication p").innerHTML = answerCopy;
    queryElement("#scoreIndication").classList.remove(
      "invisible",
      scoreIndicator()
    );
    Array.from(answers).forEach((answer) => {
      answer.classList.add("disable");
    });

    setTimeout(() => {
      if (qCount === questions.length) {
        onlyDisplaySection("#finish");
        time = 0;
        queryElement("#time").innerHTML = time;
      } else {
        setQuestionData();
        Array.from(answers).forEach((answer) => {
          answer.classList.remove("disable");
        });
      }
    }, 1000);
  };

  let myTimer = () => {
    if (time > 0) {
      time = time - 1;
      queryElement("#time").innerHTML = time;
    } else {
      clearInterval(clock);
      queryElement("#score").innerHTML = score;
      onlyDisplaySection("#finish");
    }
  };

  let clock;
  queryElement("#intro button").addEventListener("click", (e) => {
    setQuestionData();
    onlyDisplaySection("#quizContainer");
    clock = setInterval(myTimer, 1000);
  });

  let scoreIndicator = () => {
    clearTimeout(timeset);
    timeset = setTimeout(() => {
      queryElement("#scoreIndication").classList.add("invisible");
    }, 1000);
  };

  Array.from(answers).forEach((check) => {
    check.addEventListener("click", function (event) {
      if (
        this.innerHTML.substring(3, this.length) === questions[qCount].answer
      ) {
        score = score + 5;
        qCount = qCount + 1;
        quizUpdate("Correct");
      } else {
        time = time - 10;
        qCount = qCount + 1;
        quizUpdate("Wrong");
      }
    });
  });

  let errorIndicator = () => {
    clearTimeout(timeset);
    timeset = setTimeout(() => {
      queryElement("#errorIndication").classList.add("invisible");
    }, 3000);
  };

  queryElement("#records button").addEventListener("click", () => {
    let initialsRecord = queryElement("#initials").value;
    if (initialsRecord === "") {
      queryElement("#errorIndication p").innerHTML =
        "You need at least 1 character";
      queryElement("#errorIndication").classList.remove(
        "invisible",
        errorIndicator()
      );
    } else if (initialsRecord.match(/[[A-Za-z]/) === null) {
      queryElement("#errorIndication p").innerHTML =
        "Only letters for initials allowed.";
      queryElement("#errorIndication").classList.remove(
        "invisible",
        errorIndicator()
      );
    } else if (initialsRecord.length > 5) {
      queryElement("#errorIndication p").innerHTML =
        "Maximum of 5 characters allowed.";
      queryElement("#errorIndication").classList.remove(
        "invisible",
        errorIndicator()
      );
    } else {
      recordsArray.push({
        initialRecord: initialsRecord,
        score: score,
      });
      localStorage.setItem("recordsArray", JSON.stringify(recordsArray));
      queryElement("#highScore div").innerHTML = "";
      onlyDisplaySection("#highScore");
      recordsHtmlReset();
      queryElement("#initials").value = "";
    }
  });

  queryElement("#clearScore").addEventListener("click", () => {
    recordsArray = [];
    queryElement("#highScore div").innerHTML = "";
    localStorage.removeItem("recordsArray");
  });

  queryElement("#reset").addEventListener("click", () => {
    time = initialTime;
    score = 0;
    qCount = 0;
    onlyDisplaySection("#intro");
  });

  queryElement("#scores").addEventListener("click", (e) => {
    e.preventDefault();
    clearInterval(clock);
    queryElement("#time").innerHTML = 0;
    time = initialTime;
    score = 0;
    qCount = 0;
    onlyDisplaySection("#highScore");
    recordsHtmlReset();
  });
});
