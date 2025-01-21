const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


document.addEventListener('alpine:init', () => {
    Alpine.store('gameState', {
        points: 0,
        level: 1,
        completedModules: [],
        addPoints(amount) {
            this.points += amount;
            if (this.points >= 100) {
                this.level += 1;
                this.points -= 100;
            }
        },
        completeModule(moduleId) {
            if (!this.completedModules.includes(moduleId)) {
                this.completedModules.push(moduleId);
                this.addPoints(25);
            }
        }
    });
});
{/*}
const isLoggedIn = localStorage.getItem('isLoggedIn');
if (!isLoggedIn || isLoggedIn !== 'true') {
    window.location.href = './Animated-Login-Signup-Page/index.html'; // Redirect to the login page
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = './Animated-Login-Signup-Page/index.html';
}*/}

document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.getElementById('quiz-container');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const feedbackElement = document.getElementById('feedback'); // Feedback element
    const nextButton = document.getElementById('next-button');
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (container && registerBtn && loginBtn) {
        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
        });

        loginBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });
    } else {
        console.error("One or more elements not found.");
    }
    const quizQuestions = [
        {
            question: "What is your right to education?",
            options: [
                "You can go to school for free.",
                "You must pay for school.",
                "You can skip school whenever you want.",
                "You can only go to school if you want."
            ],
            answer: 0 // Index of the correct answer
        },
        {
            question: "What should you do if you are bullied?",
            options: [
                "Ignore it.",
                "Tell a teacher or trusted adult.",
                "Fight back.",
                "Keep it a secret."
            ],
            answer: 1
        },
        {
            question: "What is the age limit for child labor?",
            options: [
                "There is no limit.",
                "Children under 14 should not work.",
                "Children can work at any age.",
                "Only teenagers can work."
            ],
            answer: 1
        },
        {
            question: "What is your right to health?",
            options: [
                "You can access healthcare services.",
                "You must pay for all medical services.",
                "You can only see a doctor if you are sick.",
                "You have no rights regarding health."
            ],
            answer: 0
        },
        {
            question: "What should you do if you see a child being abused?",
            options: [
                "Ignore it.",
                "Tell a trusted adult or authority.",
                "Join in the abuse.",
                "Keep it a secret."
            ],
            answer: 1
        },
        {
            question: "What is the right to play?",
            options: [
                "Children have the right to play and rest.",
                "Children must work all the time.",
                "Playing is a privilege, not a right.",
                "Only some children can play."
            ],
            answer: 0
        },
        {
            question: "What is your right to express your opinion?",
            options: [
                "You can express your opinion freely.",
                "You must always agree with adults.",
                "You have no right to express your opinion.",
                "Only older children can express their opinions."
            ],
            answer: 0
        },
        {
            question: "What should you do if you feel unsafe?",
            options: [
                "Stay quiet and do nothing.",
                "Tell someone you trust.",
                "Try to handle it alone.",
                "Ignore your feelings."
            ],
            answer: 1
        },
        {
            question: "What is the right to privacy?",
            options: [
                "You have the right to keep your personal information private.",
                "Everyone can know your personal information.",
                "You have no right to privacy.",
                "Only adults have the right to privacy."
            ],
            answer: 0
        },
        {
            question: "What should you do if you are in danger?",
            options: [
                "Call for help.",
                "Stay quiet.",
                "Run away without telling anyone.",
                "Do nothing."
            ],
            answer: 0
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0; // Initialize score

    function loadQuestion() {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = '';
        feedbackElement.textContent = ''; // Clear feedback

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'w-full text-left p-2 border rounded hover:bg-gray-100';
            button.onclick = () => selectOption(index);
            optionsElement.appendChild(button);
        });

        nextButton.style.display = 'none'; // Hide next button initially
    }

    function selectOption(index) {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        if (index === currentQuestion.answer) {
            feedbackElement.textContent = 'Correct! 🎉'; // Show correct feedback
            feedbackElement.className = 'mt-2 text-lg font-semibold text-green-600'; // Green text 
            score++; // Increment score for correct answer
        } else {
            feedbackElement.textContent = 'Wrong answer. Try again! ❌'; // Show incorrect feedback
            feedbackElement.className = 'mt-2 text-lg font-semibold text-red-600'; // Red text
        }
        nextButton.style.display = 'block'; // Show next button
    }

    nextButton.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion();
        } else {
            feedbackElement.textContent = `Quiz completed! Your score is ${score} out of ${quizQuestions.length}. 🎓`; // Final message with score
            feedbackElement.className = 'mt-2 text-lg font-semibold text-blue-600'; // Blue text
            nextButton.textContent = 'Restart Quiz'; // Change button text for restart
            nextButton.onclick = restartQuiz; // Set restart function
        }
    };

    function restartQuiz() {
        currentQuestionIndex = 0; // Reset question index
        score = 0; // Reset score
        feedbackElement.textContent = ''; // Clear feedback
        nextButton.style.display = 'none'; // Hide next button
        nextButton.onclick = () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                loadQuestion();
            }
        }
    }
    loadQuestion(); // Load the first question
});
