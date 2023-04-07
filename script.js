document.querySelector("#search").addEventListener("click", getPokemon);

function lowerCaseName(string) {
    return string.toLowerCase()
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPokemon(e) {
    const name = document.querySelector("#pokemonName").value;
    const pokemonName = lowerCaseName(name);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
            const sortedMoves = data.moves.map(move => move.move.name).sort();
            moves = sortedMoves.join('<br> ');

            document.querySelector(".pokemonBox").innerHTML = `
                <div>
                    <img src="${data.sprites.other["official-artwork"].front_default}"
                    alt="${capitalizeFirstLetter(data.name)}"/>
                </div>
                <div class="pokemonInfo">
                    <h1>${capitalizeFirstLetter(data.name)}</h1>
                    <p><strong>Weight:</strong> ${data.weight}</p>
                    <p><strong>Moves:</strong><br> ${moves}</p>
                </div>
            `;
        })
        .catch((err) => {
            console.log('Pokemon', err);
        });
        
    e.preventDefault();
}
function searchOnEnter(e) {
    if (e.key === "Enter") {
      document.querySelector("#search").click();
    }
  }
  
  const searchInput = document.querySelector("#pokemonName");
  searchInput.addEventListener("keydown", searchOnEnter);
  
  document.querySelector("#search").addEventListener("click", getPokemon);

let availableKeywords = [`https://pokeapi.co/api/v2/pokemon`]

const resultBox = document.querySelector('.result');
const inputBox = document.querySelector('#pokemonName');

function availablePokemon(request, response) {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
        .then(response => response.json())
        .then(data => {
            const pokemonNames = data.results.map(pokemon => pokemon.name);
            const filteredNames = pokemonNames.filter(name => name.toLowerCase().startsWith(request.term.toLowerCase()));
            response(filteredNames);
        })
        .catch(error => {
            console.error('Available Pokemon', error);
        });
}

$(pokemonName).on("keyup", function() {
    const input = pokemonName.value.toLowerCase();
    if (input.length) {
      availablePokemon(input);
    } else {
      document.querySelector(".result-box").innerHTML = "";
    }
  });
  $(document).ready(function() {
    // Initialize the autocomplete function
    $("#pokemonName").autocomplete({
        source: availablePokemon,
        minLength: 1
    });

    // Define the event listener for the search button
    $("#search").on("click", function(e) {
    e.preventDefault();
    const name = $("#pokemonName").val();
    getPokemon(name);
});
});