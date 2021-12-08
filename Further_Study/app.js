const URL = "https://pokeapi.co/api/v2/pokemon/";
let allPokemonCount;
let randomPokemonsURLs = [];
let selectSpeciesURLs = [];

function getPokemons() {
  axios.get(URL)
    .then(res => {
      allPokemonCount = res.data.count;
      return axios.get(`${URL}?limit=${allPokemonCount}`);
    })
    .then(res => {
      let allPokemons = res.data.results;
      for (let i = 0; i < 3; i++) {
        let randomPokemon = allPokemons[Math.floor(Math.random() * allPokemons.length)];
        randomPokemonsURLs.push(axios.get(randomPokemon.url));
      }
    })
    .then(() => {
      Promise.all(randomPokemonsURLs)
        .then(res => res.forEach((p) => {
            selectSpeciesURLs.push(axios.get(p.data.species.url));
          })
        )
        .then(() => {
          Promise.all(selectSpeciesURLs)
            .then(res => {res.forEach(specie => {
              let name;
              let text;
              let textLength = specie.data.flavor_text_entries.length;
              for (let i = 0; i < textLength; i++) {
                if (specie.data.flavor_text_entries[i].language.name === "en") {
                  name = specie.data.name;
                  text = specie.data.flavor_text_entries[i].flavor_text;
                }
              }
              console.log(`${name}: ${text}`);
            });
          })
            .catch(err => console.log("Error", err));
        })
        .catch(err => console.log("Error", err));
    })
    .catch(err => console.log("Error", err));
}

getPokemons();
