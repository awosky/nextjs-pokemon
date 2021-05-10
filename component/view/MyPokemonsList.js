import React, { useContext, useEffect } from 'react';
import { PokemonContext } from '../utils/PokemonProvider';
import Link from 'next/link'

const MyPokemonsList = () => {
  const { myPokemonsList, release, addMyPokemons } = useContext(PokemonContext);

  useEffect(() => {
    let isMounted = true;
    const fetchMyPokemons = async () => {
      const data = await JSON.parse(localStorage.getItem('myPokemonsList'));
      addMyPokemons(data ? data : []);
    };    

    if (isMounted) fetchMyPokemons();
    return () => { isMounted = false };
  }, []);

  return (
    <div className="pokedex">
      <h2>MyPokemons List</h2>
      {myPokemonsList.map((pokemon) =>
        <div key={`${pokemon.id}-${pokemon.name}-${pokemon.givenName}`}>
          <span>{pokemon.givenName} - {pokemon.name}</span>
          <button onClick={release(pokemon)}>-</button>
        </div>)}
        <Link href="/">
              <a>Back</a>
        </Link>
    </div>
  )
};

export default MyPokemonsList;