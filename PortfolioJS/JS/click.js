document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");

    const audio = document.getElementById("catAudio");
    audio.volume = 0.3; 
    const myText = document.getElementById("clicked");
    const myButton = document.getElementById("checker");
    const resetButton = document.getElementById("reset");
    let boost = 0;
    let boostTimeout;
    let confettiPlayed = false; // Flag to check if confetti has been played

    let clicked = parseInt(window.localStorage.getItem('clicked') || 0);
    myText.textContent = clicked;

    let isAnimating = false;

  

    // Function to reset boost after 3 seconds of inactivity
    function resetBoost() {
        boost = 0;
        confettiPlayed = false; // Reset confetti flag when boost is reset
        console.log("Boost reset to 0");
        fadeOutConfetti(); // Trigger the fade-out effect before stopping the confetti
        audio.pause(); // Reset audio
        audio.currentTime = 0;
        document.getElementById("catimg").src = "../Images/Maxwell.webp";
    }

    // Function to trigger confetti effect
    function triggerConfetti() {
        if (boost > 5 && !confettiPlayed) { // Check if boost is greater than 5 and confetti has not been played
            document.getElementById("catimg").src = "../Images/catspin.gif";
            var flakes = '',
                randomColor;
            for (var i = 0, len = 400; i < len; i++) {
                randomColor = Math.floor(Math.random() * 16777215).toString(16);
                flakes += '<div class="ball" style="background: #' + randomColor;
                flakes += '; animation-duration: ' + (Math.random() * 9 + 2) + 's; animation-delay: ';
                flakes += (Math.random() * 2 + 0) + 's;"></div>';
            }

            document.getElementById('confetti').innerHTML = flakes;
            confettiPlayed = true; // Set the flag to true after playing confetti
        }
    }

    // Function to fade out confetti effect
    function fadeOutConfetti() {
        const confettiElement = document.getElementById('confetti');
        
        // Apply the fade-out animation
        confettiElement.classList.add('fade-out');
        
        // Once the animation ends, clear the confetti content
        setTimeout(function() {
            confettiElement.innerHTML = ''; // Clear the confetti after fade-out
            confettiElement.classList.remove('fade-out'); // Remove fade-out class for future use
        }, 1000); // Wait for the fade-out duration before clearing confetti
    }

    // Reset the boost counter after 3 seconds if there's no button click
    function setupBoostResetTimeout() {
        // Clear any existing timeout to avoid multiple reset triggers
        clearTimeout(boostTimeout);

        // Set a new timeout to reset boost after 3 seconds of inactivity
        boostTimeout = setTimeout(resetBoost, 3000);
    }

    myButton.addEventListener("click", function() {
        audio.play().catch(error => {
            console.error("Audio play failed:", error);
        });

        // Reset the timeout 
        setupBoostResetTimeout();

        if (isAnimating) return;

        isAnimating = true;
        myButton.classList.add("rotate");

        setTimeout(function() {
            myButton.classList.remove("rotate");
            myButton.classList.add("rotate-back");
        }, 150); 

        setTimeout(function() {
            myButton.classList.remove("rotate-back");
            isAnimating = false; 
        }, 300); 

        // Increment boost and clicked count and set data
        boost++;
        clicked++;
        console.log("Boost:", boost);
        window.localStorage.setItem('clicked', clicked); 
        myText.textContent = clicked; 

        triggerConfetti();

        
    });


    // Reset function
    resetButton.addEventListener("click", function() {
        clicked = 0;
        boost = 0; // Reset boost when the reset button is clicked
        confettiPlayed = false; // Reset confetti flag on reset
        window.localStorage.setItem('clicked', clicked); 
        myText.textContent = clicked; 
        fadeOutConfetti(); // Fade out confetti when reset
    });

    // Set the initial timeout when the page loads to handle inactivity reset
    setupBoostResetTimeout();
});
