import React, { useState, useContext, useEffect } from 'react';
import { PokemonContext } from '../utils/PokemonProvider';
import Link from 'next/link'

export const PokemonDetail = () => {
  const {capture, addMyPokemons} = useContext(PokemonContext);
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    
    const fetchPokemon = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`
        const response = await fetch(url);
        const data = await response.json();
        setPokemon(data);
    };
    
    const fetchMyPokemons = async () => {
        const data = await JSON.parse(localStorage.getItem('myPokemonsList'));
        addMyPokemons(data ? data : []);
    };
    
    fetchMyPokemons();
    fetchPokemon();
  }, []);

  return (
    <div className="pokemon-detail">
      <h2>Pokemon Detail</h2>
        <div key={pokemon.name}>
          <div>
            <span>{pokemon.name}</span>
            <button onClick={capture(pokemon)}>+</button>
          </div>
        </div>
        <Link href="/">
              <a>Back</a>
        </Link>
    </div>
  );
};

export default PokemonDetail;
