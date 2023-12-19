document.addEventListener('DOMContentLoaded', function () {
    // Add head title
    document.title = "Help Monkey Game";
    const audioFiles = ['ju2.mp3', 'ju3.mp3', 'ba1.mp3', 'ba4.mp3'];
    const panda = document.getElementById('panda');
    const monkey = document.getElementById('monkey');
    const startWindow = document.getElementById('start-window');
    const mainPage = document.getElementById('main-page');
    const startButton = document.getElementById('start-button');

    let currentIndex = 0;
    let responses = [];

    // Add the text "Please help monkey"
    const helpText = document.createElement('div');
    helpText.textContent = 'Please help monkey';
    helpText.classList.add('help-text'); // You can style this class in your CSS
    mainPage.appendChild(helpText);
    
    function playRandomAudio() {
        if (currentIndex < audioFiles.length) {
            const randomAudio = 'https://daalide.github.io/repo/' + audioFiles[currentIndex];
		  const audio = new Audio(randomAudio);
             // const audio = new Audio('/Users/iFruit/Desktop/web/' + randomAudio);
            audio.preload = 'auto';

            // Introduce a 500ms (0.5 seconds) delay before playing the audio
            setTimeout(function () {
                audio.play();
                console.log('Playing audio:', randomAudio);

                // Set up an event listener for the 'ended' event
                audio.addEventListener('ended', function audioEndedHandler() {
                    // Display the selection buttons after audio playback
                    const selectionButtons = createSelectionButtons();
                    mainPage.appendChild(selectionButtons);

                    // Remove the selection buttons after 3000ms (3 seconds) or after a button click
                    const removeButtonsTimeout = setTimeout(function () {
                        mainPage.removeChild(selectionButtons);
                        currentIndex++;

                        // Play the next audio
                        playRandomAudio();
                    }, 3000);

                    // Set up an event listener for button click
                    document.addEventListener('click', function buttonClickHandler(event) {
                        clearTimeout(removeButtonsTimeout);
                        mainPage.removeChild(selectionButtons);
                        const userAnswer = event.target.textContent.toLowerCase();
                        responses.push({ audio: randomAudio, response: userAnswer });
                        currentIndex++;

                        // Play the next audio
                        playRandomAudio();

                        // Remove the click event listener after the first click
                        document.removeEventListener('click', buttonClickHandler);
                    });
                });
            }, 500);
        } else {
            // All audios have been played
            console.log('All audios played.');

            // Add the "Submit" button
            const submitButton = createButton('Submit');
            mainPage.appendChild(submitButton);

            // Set up an event listener for button click
            submitButton.addEventListener('click', function submitButtonClickHandler() {
                // Call the function to submit responses to Google Sheet
                simulateFormSubmit(responses);
                
                // You can add additional logic or UI updates after submitting
                console.log('Responses submitted.');
            });
        }
    }

    // Rest of your code remains unchanged

    function createSelectionButtons() {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        const buttonSame = createButton('Same');
        const buttonDifferent = createButton('Different');

        buttonsContainer.appendChild(buttonSame);
        buttonsContainer.appendChild(buttonDifferent);

        return buttonsContainer;
    }

    function createButton(text) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add('selection-button');
        return button;
    }

    function simulateFormSubmit(data) {
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbxJIVS3TUlJMtfjgoLqephIhr3AT0DEwMIaQSDZf7nMaJYi4yLyDUXTJD81lmIAedQe/exec'; // Replace with your Google Apps Script web app URL

        fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ responses: data }),
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('Data submitted to Google Sheet:', result);
        })
        .catch((error) => {
            console.error('Error submitting data to Google Sheet:', error);
        });
    }

    startButton.addEventListener('click', function () {
        startWindow.style.display = 'none';
        mainPage.style.display = 'block';

        // Your code to initialize the main page goes here
        // For example, you might want to play an initial audio when the main page starts
        playRandomAudio();
    });
});