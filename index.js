const questions = [
  {
    que: "Which of the following is a markup language?",
    a: "HTML",
    b: "CSS",
    c: "JavaScript",
    d: "PHP",
    correct: "a",
  },
  {
    que: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
  {
    que: "What does CSS stand for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "JSON Object Notation",
    d: "Helicopters Terminals Motorboats Lamborghinis",
    correct: "b",
  },
  {
    que: "Which tag is used to define a hyperlink in HTML?",
    a: "<link>",
    b: "<a>",
    c: "<href>",
    d: "<url>",
    correct: "b"
  },
  {
    que: "Which of the following is used to style HTML elements?",
    a: "HTML",
    b: "JavaScript",
    c: "CSS",
    d: "PHP",
    correct: "c"
  },
  {
    que: "Which language is used for web page scripting?",
    a: "HTML",
    b: "JavaScript",
    c: "CSS",
    d: "SQL",
    correct: "b"
  },
  {
    que: "Which HTML attribute is used to define the background color of a webpage?",
    a: "bgcolor",
    b: "color",
    c: "background",
    d: "style",
    correct: "a"
  },
  {
    que: "What is the correct syntax for referring to an external script called 'script.js' in HTML?",
    a: "<script href='script.js'>",
    b: "<script src='script.js'>",
    c: "<script name='script.js'>",
    d: "<script file='script.js'>",
    correct: "b"
  },
  {
    que: "Which of the following is NOT a valid CSS selector?",
    a: ".class-name",
    b: "#id-name",
    c: "<tag-name>",
    d: "tagname.classname",
    correct: "c"
  },
  {
    que: "Which of the following is an example of a JavaScript data type?",
    a: "number",
    b: "array",
    c: "string",
    d: "all of the above",
    correct: "d"
  }
];

let index = 0;
let total = questions.length;
let right = 0, wrong = 0;

const quebox = document.getElementById("quebox");
const optionInput = document.querySelectorAll(".options");
const submitBtn = document.getElementById("submitBtn");
const timerDisplay = document.getElementById("timer");

let timer; // To store the timer interval
let timeLeft = 30; // Time limit for each question

// Function to load each question and start the timer
const loadQuestion = () => {
  if (index === total) {
    return endQuiz();
  }
  
  reset();  // Reset previous question's state
  let data = questions[index];

  quebox.innerHTML = `${index + 1}) ${data.que}`;

  optionInput[0].nextElementSibling.innerText = data.a;
  optionInput[1].nextElementSibling.innerText = data.b;
  optionInput[2].nextElementSibling.innerText = data.c;
  optionInput[3].nextElementSibling.innerText = data.d;

  if (index === total - 1) {
    submitBtn.innerText = "Submit";
  } else {
    submitBtn.innerText = "Next";
  }

  submitBtn.disabled = true;  // Disable the submit button initially

  // Start the timer for the current question
  startTimer();

  // Enable submit button when any option is selected
  optionInput.forEach(input => {
    input.addEventListener("change", () => {
      submitBtn.disabled = false;
    });
  });
};

// Function to start the timer for each question
const startTimer = () => {
  timeLeft = 30; // Reset time for each question
  // Update the timer every second
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerHTML = `Time left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);  // Clear timer when it hits 0
      submitQuiz();  // Automatically submit the quiz when time is up
    }
  }, 1000);
};

// Function to submit the current question
const submitQuiz = () => {
  const data = questions[index];
  const ans = getAnswer();

  if (ans === data.correct) {
    right++;
  } else {
    wrong++;
  }

  index++;

  // If quiz is finished, show the result
  if (index === total) {
    return endQuiz();
  } else {
    loadQuestion();  // Load the next question
  }
};

// Get the selected answer
const getAnswer = () => {
  let answer;
  optionInput.forEach((input) => {
    if (input.checked) {
      answer = input.value;
    }
  });
  return answer;
};

// Function to reset the previous question's state and timer
const reset = () => {
  optionInput.forEach((input) => {
    input.checked = false; // Uncheck previous options
  });

  clearInterval(timer); // Clear the timer immediately when moving to the next question
  timeLeft = 30; // Reset the time left to 30 seconds for the next question
  timerDisplay.innerHTML = `Time left: ${timeLeft}s`; // Display the initial time
};

// Function to display the result at the end of the quiz
const endQuiz = () => {
  document.getElementById("box").innerHTML = `
    <h3>Congratulations!</h3>
    <h2>${right} / ${total} Correct</h2>
    <p>Incorrect Answers: ${wrong}</p>
  `;
};

// Load the first question to start the quiz
loadQuestion();
