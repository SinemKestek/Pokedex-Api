const searchInput = document.querySelector(".search-bar");
const pokeContainer = document.querySelector(".poke-container");
const pokeCount = 48;
const pokedexURL = `https://pokeapi.co/api/v2/pokemon/`;

const initPokemon = async () => {
  for (let i = 1; i <= pokeCount; i++) {
    await getPokemon(i);
  }
};
const getPokemon = async (id) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let res = await fetch(url);
  let data = await res.json();
  //   console.log(data);
  createPokeBox(data);
};

const createPokeBox = (pokemon) => {
  const name = pokemon.name.toUpperCase();
  const id = pokemon.id.toString().padStart(3, "0");
  const weight = pokemon.weight;
  const type = pokemon.types[0].type.name;

  const pokeEl = document.createElement("div");

  pokeEl.classList.add("pokemon");
  pokeEl.innerHTML = `
  <div class="img-container">
  <img
    src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png"
    alt="${name} img "
  />
</div>
<div class="info">
  <span class="number">${id}</span>
  <h3 class="name">${name}</h3>
  <small class="type">Type: <span>${type}</span></small>
  <small class="weight">Type: <span>${weight}</span></small>
</div>`;

  pokeContainer.appendChild(pokeEl);
};
initPokemon();

const filterPoke = (e) => {
  const search = searchInput.value.trim().toLowerCase();
  console.log(search);
  const pokeNames = document.querySelectorAll(".name");

  pokeNames.forEach((pokeName) => {
    pokeName.parentElement.parentElement.style.display = "block";
    if (!pokeName.innerHTML.toLowerCase().includes(search)) {
      pokeName.parentElement.parentElement.style.display = "none";
    }
  });
};

searchInput.addEventListener("input", filterPoke);
