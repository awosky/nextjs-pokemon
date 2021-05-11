import React, { useState, useContext, useEffect } from 'react';
import { PokemonContext } from '../utils/PokemonProvider';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const maxMoves = 5;

export const PokemonDetail = () => {
  const {capture, addMyPokemons} = useContext(PokemonContext);
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    let isMounted = true;
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
    
    if (isMounted) {
        fetchMyPokemons();
        fetchPokemon();
    }
    return () => { isMounted = false };
  }, []);  

  return (
    <div className="pokemon-detail p-5">
        <h2 className="text-center text-capitalize pb-2">{pokemon.name}</h2>
        <div className="poke-detail-card text-center shadow rounded-pill bg-white pb-3">
          {pokemon.id  
            ?<img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} className="img-fluid w-50 p-2 poke-img" alt={pokemon.name} />
            :<></>
          }
          <div className="mb-3">
            <h5>Catch Me !</h5>
            <img src="/pokemon.png" className="img-fluid catchBtn" onClick={capture(pokemon)} alt="Catch Pokemon" title="Catch the pokemon"/>
          </div>

          <div className="my-3 px-5 text-justify">
            <div>
                <h5>Types</h5>
                {pokemon.types 
                ? pokemon.types.map((type,i) => {
                  return <span key={i} className={`spanText rounded-pill px-2 pb-1 m-1 text-center text-capitalize bg-${type.type.name}`}> {type.type.name} </span>
                })
                :<></>}
            </div>
            <div className="mt-3 px-sm-5 text-justify">
                <h5>Abilities</h5>
                {pokemon.abilities 
                ? pokemon.abilities.map((ability,i) => {
                  return <span key={i} className={`spanText border shadow-sm rounded-pill px-2 pb-1 mx-1 my-sm-3 d-inline-block text-center text-capitalize bg-${pokemon.types[Math.floor(Math.random() * (pokemon.types.length))].type.name}`}> {ability.ability.name}  </span>
                })
                :<></>}
            </div>
            <div className="px-sm-5 text-justify">
                <h5>Moves</h5>
                {pokemon.moves 
                ? pokemon.moves.slice(0, maxMoves).map((move,i) => {
                  return <span key={i} className={`spanText border shadow-sm rounded-pill px-2 pb-1 mx-1 my-sm-3 d-inline-block text-center text-capitalize bg-${pokemon.types[Math.floor(Math.random() * (pokemon.types.length))].type.name}`}> {move.move.name} </span>
                })
                :<></>}
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <Link href="/">
            <button className="btn btn-outline-secondary rounded-pill"><FontAwesomeIcon icon={faArrowLeft} width="15" height="15"/> Back</button>
          </Link>
        </div>

      <style jsx>{`
        .poke-detail-card {
          cursor:pointer;
          position:relative;
          margin-top: 300px;
          padding-top: 100px;
        }

        .poke-detail-card .poke-img{
          position: absolute;
          top: -300px;
          left: 50%;
          margin-left: -200px;
          width: 400px !important;
          height: 400px;
        }

        .catchBtn {
          height: 50px
        }
        
        @media (max-width: 600px) {
          .poke-detail-card {
            cursor:pointer;
            position:relative;
            margin-top: 150px;
            padding-top: 50px;
          }
  
          .poke-detail-card .poke-img{
            position: absolute;
            top: -150px;
            left: 50%;
            margin-left: -100px;
            width: 200px !important;
            height: 200px;
          }

          .pokemon-detail .spanText {
            font-size: small
          }

        }
      `}</style>
    </div>
  );
};

export default PokemonDetail;
