//Utilize Strict Mode
'use strict';

/*
PUB QUIZ GAME GENERAL FUNCTIONALITY:
- Player generates a randomized question by clicking the 'Next Question' button
- Player guesses the answer to the question (as many times as they like)
- Player then submits answer and the awaits correct/incorrect response
- If answer is correct, player moves onto next question
- If answer is incorrect, player can either move onto next question, reveal the correct answer or attempt to answer again
- Game notifies the player of the correct answer at any point once game starts if player clicks on the 'Reveal Answer' button
- Player generates next randomized question by clicking the 'Next Question' button to continue the game
*/

//Define all variables
const getQuestion = document.getElementById('get-question'),
      getAnswer = document.getElementById('reveal-answer'),
      question = document.getElementById('random-question'),
      answer = document.getElementById('revealed-answer'),
      submittedAnswer = document.getElementById('submit-answer'),
      enteredAnswer = document.getElementById('question-guess-input'),        
      result = document.getElementById('result-msg');
      
let json,
    numberOfQuestions,
    randomID;
    
//Define all Event Listeners
getQuestion.addEventListener('click', generateNewRandomData);
getAnswer.addEventListener('click', showAnswer);
submittedAnswer.addEventListener('click', submitAnswer);

//Generate Next Question
function generateNewRandomData() {

     //Form Ajax XHR Object
     const xhr = new XMLHttpRequest();
    
     //Open an Asynchronous GET Request to the Pub Quiz JSON data file
     xhr.open('GET', 'pub-quiz-data.json', true);

     //Open an Async Request 
     xhr.onload = function () {

        //Define the logic if status is OK
        if(this.status === 200) {

            //Retrieve & Parse the JSON string data from file to an object & put result into a variable to work with
            json = JSON.parse(this.responseText);
            //Total number of quiz questions in the JSON data file (Calculate JSON data objects size)
            numberOfQuestions = json.length;
            //Generate a random value to work with based off the total number of questions defined
            randomID = Math.floor(Math.random() * Math.floor(numberOfQuestions));

            //Generate Random Data
            //random question
            let theQuestion = `<strong>Question:</strong> ${json[randomID].question}`;
            //random questions answer
            let theAnswer = `<strong>Answer:</strong> ${json[randomID].answer}`;

            //Insert and style the elements accordingly
            question.innerHTML = theQuestion;
            answer.innerHTML = theAnswer;
            answer.style.display ='none';
            
            //Set answer section visible upon starting the game (hidden by default)
            submittedAnswer.style.visibility ='visible';
            enteredAnswer.style.visibility ='visible';
            getAnswer.style.visibility ='visible';
            answer.style.visibility ='visible';
            
            //Clean up the answer section when new question is generated
            //clear the answer field contents and animation
            enteredAnswer.disabled = false;
            //revert the answer entry field border back to initial style
            enteredAnswer.style.border = 'initial';
            //clear the answer entry field
            enteredAnswer.value = '';
            //clear the resulting message
            result.textContent = '';
            //re-enable submit answer button
            submittedAnswer.disabled = false;            
            //re-enable reveal answer button
            getAnswer.disabled = false;

        } else {
            //Warning with specific status code if the request goes wrong and an error occurs
            console.log('The following error has occurred: ', this.status);
        }
     }

     //Initiate the Ajax request
     xhr.send();
  };

//Reveal Answer
function showAnswer() {
    
     //Reveal the actual answer
     answer.style.display ='block';
     //Clear the answer entry field
     enteredAnswer.value = '';
     //Disable the answer entry field once user reveals the answer
     enteredAnswer.disabled = true;
     //Disable the submit answer button once user reveals the answer
     submittedAnswer.disabled = true;
     //Inform the user that they revealed the answer to the question and that they have to move onto the next question
     result.innerHTML = `The answer was revealed, hence this question can no longer be answered, please skip to the next question...`;
     result.style.color = '#003C9E';
};

//Submit Answer
function submitAnswer(e) {

  //Define the text variables to be compared (questions answer vs. user entered answer)
  let textEntered = enteredAnswer.value.toLowerCase(),
      currentRandomAnswerText = `${json[randomID].answer.toLowerCase()}`;

        if(textEntered === currentRandomAnswerText) {

            //Disable the answer entry field once user reveals the answer and display relevant result message
            enteredAnswer.disabled = true;
            //Disable reveal answer button as answer was guessed correctly so not required
            getAnswer.disabled = true;

            //If the user entered answer and the actual answer do match, style the UI accordingly and display relevant message
            enteredAnswer.style.border = '2.5px solid green';
            result.innerHTML = `<strong>${enteredAnswer.value}</strong> is correct, CONGRATULATIONS!`; 
            result.style.color = 'green';          
  
        } else if(textEntered === '') {

            //If the user enters an empty value, style the UI accordingly and display relevant message
            enteredAnswer.style.border = '2.5px solid red';
            result.innerHTML = `Please enter at least one character...`;
            result.style.color = 'red';

        } else {

            //If the user enters an answer and the entered answer and the actual answer do NOT match, style the UI accordingly and display relevant message  
            enteredAnswer.style.border = '2.5px solid red';
            result.innerHTML = `Sorry, <strong>${enteredAnswer.value}</strong> is not correct, please try again...`;
            result.style.color = 'red';
            enteredAnswer.value = '';
        };

     //Prevent default submit form to server action on submit button       
     e.preventDefault();
};

