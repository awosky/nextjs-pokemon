export const CAPTURE = 'CAPTURE';
export const RELEASE = 'RELEASE';
export const ADD_POKEMONS = 'ADD_POKEMONS';
export const ADD_MY_POKEMONS = 'ADD_MY_POKEMONS';

const getMyPokemonsList = (myPokemonsList, releasedPokemon) =>
  myPokemonsList.filter(pokemon => pokemon !== releasedPokemon)

const releasePokemon = (releasedPokemon, state) => {
  let pokemons = [...state.pokemons, releasedPokemon]
  let myPokemonsList =  getMyPokemonsList(state.myPokemonsList, releasedPokemon)
  localStorage.setItem('myPokemonsList', JSON.stringify(myPokemonsList));
  return ({
    pokemons: pokemons,
    myPokemonsList: myPokemonsList
  })
};

const getPokemonsList = (pokemons, capturedPokemon) =>
  pokemons.filter(pokemon => pokemon !== capturedPokemon)

const capturePokemon = (pokemon, state) => {
  let pokemons = getPokemonsList(state.pokemons, pokemon)
  let myPokemonsList = [...state.myPokemonsList, pokemon]
  localStorage.setItem('myPokemonsList', JSON.stringify(myPokemonsList));
  return ({
    pokemons: pokemons,
    myPokemonsList: myPokemonsList 
  })
};

const addPokemons = (pokemons, state) => ({
  ...state,
  pokemons,
});

const addMyPokemons = (myPokemonsList, state) => ({
  ...state,
  myPokemonsList,
});

export const pokemonReducer = (state, action) => {
  switch (action.type) {
    case CAPTURE:
      return capturePokemon(action.pokemon, state);
    case RELEASE:
      return releasePokemon(action.pokemon, state);
    case ADD_POKEMONS:
      return addPokemons(action.pokemons, state);
    case ADD_MY_POKEMONS:
      return addMyPokemons(action.myPokemonsList, state);
    default:
      return state;
  }
};
