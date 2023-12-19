document.addEventListener('DOMContentLoaded', function () {
    const audioFiles = ['ju2.mp3', 'ju3.mp3', 'ba1.mp3', 'ba4.mp3'];
    const panda = document.getElementById('panda');
    const monkey = document.getElementById('monkey');
    const startWindow = document.getElementById('start-window');
    const mainPage = document.getElementById('main-page');
    const startButton = document.getElementById('start-button');
    
    let currentIndex = 0;

    function playRandomAudio() {
        if (currentIndex < audioFiles.length) {
            const randomAudio = audioFiles[currentIndex];
            const audio = new Audio('/Users/iFruit/Desktop/web/' + randomAudio);

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
                    document.addEventListener('click', function buttonClickHandler() {
                        clearTimeout(removeButtonsTimeout);
                        mainPage.removeChild(selectionButtons);
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
        }
    }

    function createSelectionButtons() {
        // Create a container div for the buttons
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        // Create "Same" button
        const buttonSame = document.createElement('button');
        buttonSame.textContent = 'Same';
        buttonSame.classList.add('selection-button');
        buttonSame.addEventListener('click', function () {
            // Handle the "Same" button click
            console.log('Same button clicked.');
            // Your code to check the answer and update the feedback
            // Example: checkAnswer('same');
        });

        // Create "Different" button
        const buttonDifferent = document.createElement('button');
        buttonDifferent.textContent = 'Different';
        buttonDifferent.classList.add('selection-button');
        buttonDifferent.addEventListener('click', function () {
            // Handle the "Different" button click
            console.log('Different button clicked.');
            // Your code to check the answer and update the feedback
            // Example: checkAnswer('different');
        });

        // Append buttons to the container
        buttonsContainer.appendChild(buttonSame);
        buttonsContainer.appendChild(buttonDifferent);

        return buttonsContainer;
    }

    function checkAnswer(userAnswer) {
        // Your code to check the answer and update the feedback
        // Example: if (userAnswer === correctAnswer) { /* Correct logic */ } else { /* Incorrect logic */ }
    }

    startButton.addEventListener('click', function () {
        // Hide the start window and show the main page
        startWindow.style.display = 'none';
        mainPage.style.display = 'block';

        // Your code to initialize the main page goes here
        // For example, you might want to play an initial audio when the main page starts
        playRandomAudio();
    });

    // Add event listeners for the "Same" and "Different" buttons, and call checkAnswer accordingly
});
