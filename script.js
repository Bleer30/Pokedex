const poke_container = document.getElementById('poke-container');
const pokemon_count = 150;
const colors = {
  fire: '#E74C3C',
  grass: '#52BE80',
  electric: '#E2E81A',
  water: '#2980B9',
  ground: '#DC7633',
  rock: '#EB984E',
  fairy: '#CB69CF',
  poison: '#A569BD',
  bug: '#48C9B0',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#85C1E9',
  fighting: '#973E24',
  normal: '#BBB7BE',
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};

const createPokemonCard = pokemon => {
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, '0');

  const poke_types = pokemon.types.map(type => type.type.name);
  const type = main_types.find(type => poke_types.indexOf(type) > -1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
    </div>
    `;

  pokemonEl.innerHTML = pokemonInnerHTML;

  poke_container.appendChild(pokemonEl);
};

fetchPokemons();
