const pokemonContainer = document.querySelector('.pokemon-container');
const btnContainer = document.querySelector('.btn');
const textContainer = document.getElementById('input');

async function getPokemon() {
    let pokemonName = textContainer.value;

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`);

        if (response.ok) {
            const data = await response.json();
            createCard(data);
        } else {
            throw new Error('Request failed!');
        }
    } catch (err) {
        alert("Nie ma takiego pokemona w API");
    }
}

function createCard(pokemon) {
    const pokemonCard = document.createElement("div");
    const pokemonCardContent = document.createElement("div");
    const pokemonStats = document.createElement("div");
    const pokemonName = document.createElement("p");
    const pokemonImg = document.createElement('img');
    
    pokemonName.textContent = pokemon.name;
    pokemonImg.src = pokemon.sprites.front_default;

    pokemonCard.classList.add('pokemon-card');
    pokemonName.classList.add('pokemon-name');
    pokemonStats.classList.add('pokemon-stats');
    pokemonCardContent.classList.add('pokemon-card-content');

    pokemonCard.appendChild(pokemonCardContent);
    pokemonCardContent.appendChild(pokemonImg);
    pokemonCardContent.appendChild(pokemonName);

    pokemon.stats.forEach(data => {
        const baseStatNameContainer = document.createElement("p");
        const baseStatNumberContainer = document.createElement("p");

        let baseStatNumber = data.base_stat;
        let baseStatName = data.stat.name;

        baseStatNumberContainer.textContent = baseStatNumber;
        baseStatNameContainer.textContent = baseStatName;

        pokemonStats.appendChild(baseStatNameContainer);
        pokemonStats.appendChild(baseStatNumberContainer);
    })

    pokemonCardContent.appendChild(pokemonStats);


    pokemonContainer.appendChild(pokemonCard);
}

btnContainer.addEventListener('click', getPokemon);