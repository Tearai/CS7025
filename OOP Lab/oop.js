// Creating the class
class Counter {
  constructor() {
    this.value = 0;
  }

  // Increment the counter
  increment() {
    this.value++;
  }

  // Reset the counter
  reset() {
    this.value = 0;
  }

  // Get the current value
  getValue() {
    return this.value;
  }
}

// Linking to the html
const counterDisplay = document.getElementById('counter-display');
const incrementBtn = document.getElementById('increment-btn');
const resetBtn = document.getElementById('reset-btn');

// Create a new Counter
const counter = new Counter();

// Update the counter display
function updateDisplay() {
  counterDisplay.textContent = counter.getValue();
}

// Linking the button to add
incrementBtn.addEventListener('click', () => {
  counter.increment();
  updateDisplay();
});

// Linking the button to reset
resetBtn.addEventListener('click', () => {
  counter.reset();
  updateDisplay();
});

// Initialize the display
updateDisplay();
