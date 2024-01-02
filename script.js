// Sample questions and answers
const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "High Tech Markup Language", "Hyperlink Text Markup Language", "Home Tool Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
    },
    // Add more questions as needed
    {
        question: "Which technology is primarily responsible for the styling of web pages?",
        choices: ["JavaScript", "HTML", "CSS", "Python"],
        correctAnswer: "CSS"
    },
    {
        question: "Which programming language is mainly used for adding interactivity to websites?",
        choices: ["HTML", "CSS", "Python", "JavaScript"],
        correctAnswer: "JavaScript"
    },
    {
        question: "What is the purpose of a front-end web development framework like React or Angular?",
        choices: ["To manage databases and server-side logic", "To create a visually appealing user interface", "To handle server-side routing", "To interact with web servers"],
        correctAnswer: "To create a visually appealing user interface"
    },
    {
        question: "What is the primary function of a web server in the context of web development?",
        choices: ["Rendering web pages on the client's browser", "Executing JavaScript code", "Storing user data", "Handling HTTP requests and serving web pages"],
        correctAnswer: "Handling HTTP requests and serving web pages"
    },
    {
        question: "Which type of web development allows for both front-end and back-end development using a single language?",
        choices: ["Full-stack development", "Cross-platform development", "Multi-language development", "Hybrid development"],
        correctAnswer: "Full-stack development"
    },
];

const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices-container");
const timerElement = document.getElementById("time");
const startButton = document.getElementById("start-btn");
const gameOverContainer = document.getElementById("game-over-container");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit-btn");

let currentQuestionIndex = 0;
let timer;
let timeLeft = 60; // Set your desired quiz duration

// Function to start the quiz
function startQuiz() {
    quizContainer.style.display = "block";
    startButton.style.display = "none";
    displayQuestion();
    timer = setInterval(updateTimer, 1000);
}

// Function to display a question
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {

        const selectedAnswer = event.target.textContent;
        const correctAnswer = currentQuestion.correctAnswer;    
        questionContainer.textContent = currentQuestion.question;
        choicesContainer.innerHTML = "";

    currentQuestion.choices.forEach(choice => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", (event) => checkAnswer(event)); // Pass the event object
        choicesContainer.appendChild(choiceButton);
        });
    }else {
        // Handle the case when currentQuestion is undefined or missing properties
        console.error("Invalid question format:", currentQuestion);
    }
}

// Function to check the selected answer
function checkAnswer(event) {
    // Check if event is defined
    if (event) {
        const selectedAnswer = event.target.textContent;
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;

        if (selectedAnswer === correctAnswer) {
            // Correct answer, update score or perform any other actions
        } else {
            // Incorrect answer, deduct time or perform any other actions
            timeLeft -= 10; // Deduct 10 seconds for incorrect answer
        }

    



    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        // Quiz is over
        endQuiz();
    }
    }
}

// Function to update the timer
function updateTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        // Quiz is over when time runs out
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = "none";
    gameOverContainer.style.display = "block";
    finalScoreElement.textContent = timeLeft;

    // Reset the quiz for a new start
    currentQuestionIndex = 0;
    timeLeft = 60; // Reset the timer to your desired duration

    // Optionally, you can clear initialsInput value or perform other reset actions
    initialsInput.value = '';

    // Optionally, you can reset any other relevant state or UI elements

    // Start the quiz again
    //startQuiz();

}

// Event listener for starting the quiz
startButton.addEventListener("click", startQuiz);

function startDelay() {
    // Set the display property to "none" initially
    startButton.style.display = "none";
    quizContainer.style.display = "none";
    gameOverContainer.style.display = "block";
  
    // Use setTimeout to delay the execution of the following code block for 10 seconds (10000 milliseconds)
    setTimeout(function() {
      // After the delay, set the display property to "block"
      quizContainer.style.display = "none";
      startButton.style.display = "block";
      gameOverContainer.style.display = "block";
      //initialsInput.value = '';
      //questionContainer.style.display = "none";
      //choicesContainer.style.display = "none";

    }, 3000); // 10000 milliseconds = 10 seconds
  }
// Event listener for submitting initials
submitButton.addEventListener("click", () => {
    const initials = initialsInput.value;
    const score = timeLeft;

    // Retrieve existing high scores from localStorage or initialize an empty array
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Create a new high score entry
    const newScoreEntry = {initials, score };

    // Add the new entry to the high scores list
    highScores.push(newScoreEntry);

    // Sort the high scores in descending order based on the score
    //highScores.sort((a, b) => b.score - a.score);
    highScores.sort((a, b) => b.score - a.score);

    // Keep only the top 3 high scores
    const top3HighScores = highScores.slice(0, 3);

    // Save the updated high scores back to localStorage
    localStorage.setItem("highScores", JSON.stringify(top3HighScores));

    // Redirect to a high scores page if needed
    // For now, just log the updated high scores to the console
    console.log("Updated High Scores:", top3HighScores);


    // Save initials and score, e.g., store in localStorage or send to a server
    // Call this function when you need to update the dropdown, such as after submitting a new high score
    updateHighScoresDropdown();
    // Redirect to a high scores page if needed
    // Function to start the delay
    startDelay(setTimeout); 
});
// Function for update the high scores dropdown
function updateHighScoresDropdown() {
    const highScoresDropdown = document.getElementById("high-scores-dropdown");

    // Retrieve existing high scores from localStorage or initialize an empty array
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Clear existing options
    highScoresDropdown.innerHTML = "";

    // Populate the dropdown with the top 3 high scores
    highScores.slice(0, 3).forEach((entry, index) => {
        const option = document.createElement("option");
        option.value = index + 1; // Assign a value if needed
        option.text = `${entry.initials}: ${entry.score}`;
        highScoresDropdown.add(option);
    });
}



// Call the startDelay function to initiate the delay
//
// Assuming you have a reference to the quizContainer element
//const quizContainer = document.getElementById('quizContainer'); // Replace 'quizContainer' with the actual ID or selector

  

// Call the startDelay function to initiate the delay
startDelay();
//localStorage.remove.Math.min(...highScores);
