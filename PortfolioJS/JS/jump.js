document.addEventListener('DOMContentLoaded', function() {
    // Link to the html and draw the canvas
    const canvas = document.getElementById("flappyBirdCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 600;

    // Game variables
    let birdX = 50;
    let birdY = 200;
    const birdRadius = 10;
    let birdVelocity = 0;
    const gravity = 0.1;
    const jump = -4;

    const pipes = [];
    const pipeWidth = 50;
    const gapHeight = 150;
    const pipeSpeed = 1;

    let score = 0;
    let isGameOver = false;
    let gameStarted = false; // Flag to check if game has started

    // Handle bird jump (spacebar only)
    document.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            if (!gameStarted) {
                gameStarted = true; // Start the game on first spacebar press
            } else if (!isGameOver) {
                birdVelocity = jump; // Make the bird jump after the game starts
            }
        }
    });

    // Create pipes
    function createPipe() {
        const pipeY = Math.random() * (canvas.height - gapHeight - 50) + 25;
        pipes.push({ x: canvas.width, y: pipeY });
    }

    // Update the game every frame
    function update() {
        if (!gameStarted || isGameOver) return; // Don't update if game hasn't started or if game is over

        birdVelocity += gravity;
        birdY += birdVelocity;

        // Move pipes
        for (let i = 0; i < pipes.length; i++) {
            pipes[i].x -= pipeSpeed;

            // Check for collisions
            if (
                birdX + birdRadius > pipes[i].x &&
                birdX - birdRadius < pipes[i].x + pipeWidth &&
                (birdY - birdRadius < pipes[i].y || birdY + birdRadius > pipes[i].y + gapHeight)
            ) {
                isGameOver = true;
            }

            // Remove off-screen pipes and increment score
            if (pipes[i].x + pipeWidth < 0) {
                pipes.splice(i, 1);
                score++;
            }
        }

        // End game if bird hits the ground or flies out of bounds
        if (birdY + birdRadius > canvas.height || birdY - birdRadius < 0) {
            isGameOver = true;
        }

        // Add new pipes periodically
        if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
            createPipe();
        }
    }

    // Draw the game
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw bird
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(birdX, birdY, birdRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw pipes (light green)
        ctx.fillStyle = "lightgreen";
        for (let i = 0; i < pipes.length; i++) {
            ctx.fillRect(pipes[i].x, 0, pipeWidth, pipes[i].y); // Top pipe
            ctx.fillRect(pipes[i].x, pipes[i].y + gapHeight, pipeWidth, canvas.height - pipes[i].y + gapHeight); // Bottom pipe
        }

        // Draw score
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${score}`, 10, 30);

        // Draw game over text
        if (isGameOver) {
            ctx.fillStyle = "red";
            ctx.font = "40px Arial";
            ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);

            // Draw play again button or prompt here (optional)
            ctx.font = "20px Arial";
            ctx.fillText("Press R to restart", canvas.width / 2 - 70, canvas.height / 2 + 40);
        }

        // Draw "Press Space to Start" text
        if (!gameStarted) {
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText("Press Space to Start", canvas.width / 2 - 135, canvas.height / 2);
        }
    }

    // Game loop
    function loop() {
        update();
        draw();
        if (!isGameOver) requestAnimationFrame(loop);
    }

    // Restart game on 'R' key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'r' && isGameOver) {
            // Reset game variables
            birdY = 200;
            birdVelocity = 0;
            pipes.length = 0;
            score = 0;
            isGameOver = false;
            gameStarted = false; // Game needs to be started again with spacebar
            loop();
        }
    });

    // Start the game loop (but won't run until space is pressed)
    loop();
});
