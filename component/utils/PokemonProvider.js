import React, { createContext, useState, useReducer } from 'react';
import {CAPTURE,RELEASE,ADD_POKEMONS,ADD_MY_POKEMONS,pokemonReducer} from '../utils/PokemonReducer'


export const PokemonContext = createContext();

export const PokemonProvider = (props) => {
    const defaultState = {
        pokemons: [
          { id: 1, name: 'Bulbasaur' },
          { id: 2, name: 'Charmander' },
          { id: 3, name: 'Squirtle' }
        ],
        myPokemonsList: []
    };
    
    const [state, dispatch] = useReducer(pokemonReducer, defaultState);
    
    const capture = (pokemon) => () => {
        dispatch({ type: CAPTURE, pokemon });
    };
    
    const release = (pokemon) => () => {
        dispatch({ type: RELEASE, pokemon });
    };

    const addPokemons = (pokemons) => {
      dispatch({ type: ADD_POKEMONS, pokemons });
    };

    const addMyPokemons = (myPokemonsList) => {
      dispatch({ type: ADD_MY_POKEMONS, myPokemonsList });
    };

    const { pokemons, myPokemonsList } = state;

    const providerValue = {
      pokemons,
      myPokemonsList,
      release,
      capture,
      addPokemons,
      addMyPokemons
    };
    
  return (
    <PokemonContext.Provider value={providerValue}>
      {props.children}
    </PokemonContext.Provider>
  )
};