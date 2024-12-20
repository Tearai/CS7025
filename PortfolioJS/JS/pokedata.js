document.addEventListener('DOMContentLoaded', function() {
  let score = 0;
  let currentPokemon = null;
  
  // Function to fetch a random Pokémon from the API
  async function getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1;  // There are 898 Pokémon in the PokéAPI
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();
  
    currentPokemon = {
      name: data.name,
      image: data.sprites.front_default
    };
  
  // Set the image when its fetched
  const pokemonImage = document.getElementById("pokemon-image");
  pokemonImage.src = currentPokemon.image;
  pokemonImage.alt = currentPokemon.name;  // Set the alt text to the Pokémon's name
  document.getElementById("pokemon-guess").value = "";
  document.getElementById("feedback").textContent = "";

    
  }
  
  // Function to check the player's guess is correct or wrong 
  function checkGuess() {
    const guess = document.getElementById("pokemon-guess").value.toLowerCase();
    if (guess === currentPokemon.name) {
      score++;
      document.getElementById("feedback").textContent = "Correct! Well done!";
    } else {
      document.getElementById("feedback").textContent = `Wrong! The correct answer is ${currentPokemon.name}.`;
    }
    document.getElementById("score").textContent = `Score: ${score}`;
    
    // Clear the feedback after 1 second so the player can see it
    setTimeout(() => {
      document.getElementById("feedback").textContent = "";
      getRandomPokemon();  // Get a new Pokémon after the feedback disappears
    }, 1000);
  }
  
  // Function to show pokemon name suggestion
  async function getPokemonSuggestions(query) {
    if (query.length < 1) {
      document.getElementById("suggestions-list").style.display = "none";
      return;
    }
  
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
    const data = await response.json();
    const suggestions = data.results
      .filter(pokemon => pokemon.name.startsWith(query.toLowerCase()))
      .map(pokemon => pokemon.name);
  
    const suggestionsList = document.getElementById("suggestions-list");
    suggestionsList.innerHTML = "";
  
    suggestions.forEach(suggestion => {
      const li = document.createElement("li");
      li.textContent = suggestion;
      li.onclick = () => {
        document.getElementById("pokemon-guess").value = suggestion;
        suggestionsList.style.display = "none";
      };
      suggestionsList.appendChild(li);
    });
  
    suggestionsList.style.display = suggestions.length > 0 ? "block" : "none";
  }
  
  // Event listener to detect user typing and show suggestions
  document.getElementById("pokemon-guess").addEventListener("input", (event) => {
    const query = event.target.value;
    getPokemonSuggestions(query);
  });
  
  // Initialize the game when the page loads
  window.onload = function() {
    getRandomPokemon();  // Load the first Pokémon image
  
    // Make the button check the answer
    document.getElementById("submit-button").addEventListener("click", checkGuess);
  };


});
