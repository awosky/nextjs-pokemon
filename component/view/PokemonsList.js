import React, { useContext, useEffect } from 'react';
import { PokemonContext } from '../utils/PokemonProvider';
import Link from 'next/link'

const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

export const PokemonsList = () => {
  const { pokemons, capture, addPokemons } = useContext(PokemonContext);

  useEffect(() => {
    let isMounted = true;
    
    const fetchPokemons = async () => {
      const response = await fetch(url);
      const data = await response.json();
      if (isMounted) addPokemons(data.results);
    };    

    fetchPokemons();
    return () => { isMounted = false };
  }, [addPokemons]);

  return (
    <div className="pokemons-list">
      <h2>Pokemons List</h2>
      {pokemons.map((pokemon) =>
        <div key={pokemon.name}>
          <div>
            <span>{pokemon.name}</span>
            <Link href={"/detail?name="+pokemon.name}>
              <a> detail</a>
            </Link>
          </div>
        </div>)}
        <Link href="/pokedex">
              <a>My Pokemon</a>
        </Link>
    </div>
  );
};

export default PokemonsList;
