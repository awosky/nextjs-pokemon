import React, { createContext, useState, useReducer } from 'react';
import {CAPTURE,RELEASE,ADD_POKEMONS,ADD_MY_POKEMONS,pokemonReducer} from '../utils/PokemonReducer'
import {swallOnCatch, swallOnCatchError, swallOnCapture, swallOnCaptureSuccess, swallOnCaptureError} from '../utils/sweetAlert'
import PokemonsList from '../view/PokemonsList';
export const PokemonContext = createContext();
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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
      let isCaptured = Math.random() < 0.5;
      let timerInterval
      swallOnCatch(timerInterval)
      .then((result) => {
        if (isCaptured) {
          swallOnCapture(pokemon)
          .then((result) => {
            let name = result.value
            var array = myPokemonsList.filter(function (el) {
              return el.name === pokemon.name &&
                     el.givenName === name ;
            });
            if (array.length >> 0) {
              swallOnCaptureError()
            } else {
              pokemon.givenName = name;
              dispatch({ type: CAPTURE, pokemon });
              swallOnCaptureSuccess(pokemon, name)
            }
          })
        } else {
          swallOnCatchError()
        }
      })    
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