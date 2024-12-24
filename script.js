const questions = [
  {
    question: "What is the output of `2 + 2`?",
    options: ["3", "4", "5", "22"],
    correctAnswer: 1,
  },
  {
    question: "Which of these is not a JavaScript data type?",
    options: ["Number", "String", "Boolean", "Character"],
    correctAnswer: 3,
  },
  {
    question: "Which method is used to join two arrays?",
    options: ["concat()", "push()", "splice()", "join()"],
    correctAnswer: 0,
  },
  {
    question: "What is the correct syntax to declare a variable in ES6?",
    options: ["var x", "let x", "dim x", "define x"],
    correctAnswer: 1,
  },
  {
    question: "Which operator is used for strict equality comparison?",
    options: ["==", "===", "!=", "<>"],
    correctAnswer: 1,
  },
  {
    question: "Which of these methods can be used to iterate over an array?",
    options: ["forEach()", "map()", "filter()", "All of the above"],
    correctAnswer: 3,
  },
  {
    question: "What will `typeof null` return?",
    options: ["null", "object", "undefined", "string"],
    correctAnswer: 1,
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onmouseover", "onchange", "onclick", "onmouseclick"],
    correctAnswer: 2,
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Document Oriented Mapping",
      "Data Oriented Mapping",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which of these is not a loop in JavaScript?",
    options: ["for", "foreach", "while", "do-until"],
    correctAnswer: 3,
  },
];

// Global Variable Declaration

let QuesNum = -1; // To Track Question Number
let Score = 0; // to store score after each question

// Variables to Stored SetTimeoutID
let UpdateQuesAfterClickTimerID;
let IntevalID15Sec;

// Handling CheckScore Function Error
let CheckScoreArr = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

// Selecting DOM Elements
const StartQuizButton = document.getElementById("startQuiz"); // Start Quiz Button
const welcomeScreen = document.getElementById("welcomeScreen"); // Welcome Screen
const quizScreen = document.getElementById("quizScreen"); // Quiz Screen
const prevButton = document.getElementById("prevButton"); // Prev Button
const nextButton = document.getElementById("nextButton"); // Next Button
const restartQuiz = document.getElementById("restartQuiz"); // restartQuiz
const scoreScreen = document.getElementById("scoreScreen"); // score screen

// Functions Definations

function UpdateTimer() {
  // Update Ques Will Show Each Ques for 15 and When 15 sec are over then it will automatically Update the Ques
  let Time = 15;
  clearInterval(IntevalID15Sec);
  const timeLeft = document.getElementById("timeLeft");

  IntevalID15Sec = setInterval(() => {
    timeLeft.textContent = Time;
    --Time;
    if (Time < 0) {
      clearInterval(IntevalID15Sec);
      UpdateQuesionNum();
    }
  }, 1000);
}

function ShowScore() {
  welcomeScreen.classList.add("hidden");
  scoreScreen.classList.remove("hidden");
  const scoreText = document.getElementById("scoreText");
  scoreText.textContent = `You scored ${Score}/10!`;
  clearInterval(IntevalID15Sec);
  clearTimeout(UpdateQuesAfterClickTimerID);
}

// This Function will check the selected option is correct or not and if its correct it will update the Score variable
function CheckAns() {
  //   Event Delegation

  const optionsList = document.getElementById("optionsList");

  if (CheckScoreArr[QuesNum] === 1) {
    // console.log("Already Checked Question Num", QuesNum);
    // UpdateQuesionNum();
    return;
  }

  optionsList.addEventListener("click", function (event) {
    // check the selected item is li or not
    // console.log(event.target.textContent);

    if (CheckScoreArr[QuesNum] === 1) {
      return;
    }

    let Userans = event.target.textContent;
    let CorrectOption = questions[QuesNum].correctAnswer;

    if (questions[QuesNum].options[CorrectOption] === Userans) {
      // event.target.classList.add("Correct"); // Add the "Correct" class
      // event.target.style.backgroundColor = "green";

      event.target.style.backgroundColor = "lightgreen"; // Apply style to clicked child
      event.target.style.border = "1px solid black"; // Apply style to clicked child

      if (CheckScoreArr[QuesNum] !== 1) {
        Score = Score + 1; // Update the score
        console.log("Correct Answer! Score:", Score);
      }
    } else {
      event.target.classList.add("Wrong"); // Add the "Wrong" class
      console.log("Wrong Answer!");
      event.target.style.backgroundColor = "red"; // Apply style to clicked child
      event.target.style.border = "1px solid black"; // Apply style to clicked child
    }

    CheckScoreArr[QuesNum] = 1;

    if (QuesNum + 1 === 10) {
      console.log("ShowScore Function Called");
      return ShowScore();
    }

    clearTimeout(UpdateQuesAfterClickTimerID);
    UpdateQuesAfterClickTimer();
  });
}

// This function will insert the options from questions array into optionsList
function InsertOptions() {
  const optionsList = document.getElementById("optionsList");
  optionsList.innerHTML = ""; // This clears all existing content, including the class.

  for (let j = 0; j < 4; j++) {
    let li = document.createElement("li");
    li.textContent = questions[QuesNum].options[j];
    optionsList.appendChild(li);
  }
}

// Function to Update Question
function UpdateQuesion() {
  const questionNumber = document.getElementById("questionNumber");
  const questionText = document.getElementById("questionText");

  UpdateTimer(); // starts 15 sec timer

  if (QuesNum < 10) {
    let Num = QuesNum + 1;
    questionNumber.textContent = `Question ${Num}`;
    questionText.textContent = questions[QuesNum].question;

    InsertOptions(); // this will show options of the ques

    CheckAns(); // this will verify the selected options whether correct or not
  }
}

// Function Which Update Question Number
function UpdateQuesionNum() {
  QuesNum += 1;
  // Stop if all questions are completed
  if (QuesNum >= questions.length) {
    ShowScore();
    return;
  }
  UpdateQuesion();
}

// Function which will update Question Automatically after every 3 second
function UpdateQuesAfterClickTimer() {
  UpdateQuesAfterClickTimerID = setTimeout(() => {
    UpdateQuesionNum();
  }, 3000);
}

// Function to Start Quiz
function StartQuiz() {
  welcomeScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  // CheckScoreArr = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
  CheckScoreArr = Array(questions.length).fill(-1);
  QuesNum = -1;
  Score = 0;
  UpdateQuesionNum(); // Start with the first question
}

// Handle Navigation Buttons
prevButton.addEventListener("click", function () {
  clearTimeout(UpdateQuesAfterClickTimerID);

  if (QuesNum === 0) {
    return;
  }
  clearInterval(IntevalID15Sec);
  QuesNum = QuesNum - 1;
  UpdateQuesion();
});

nextButton.addEventListener("click", function () {
  clearTimeout(UpdateQuesAfterClickTimerID);

  if (QuesNum === 9) {
    return CheckAns();
  }
  clearInterval(IntevalID15Sec);
  QuesNum = QuesNum + 1;
  UpdateQuesion();
});

// Flow Of Execution

StartQuizButton.addEventListener("click", StartQuiz);

restartQuiz.addEventListener("click", function () {
  clearInterval(IntevalID15Sec);
  Score = 0;
  clearTimeout(UpdateQuesAfterClickTimerID);
  QuesNum = -1;
  welcomeScreen.classList.remove("hidden");
  scoreScreen.classList.add("hidden");
  CheckScoreArr = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
  StartQuiz();
});
