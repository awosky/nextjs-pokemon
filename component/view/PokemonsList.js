import React, { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../utils/PokemonProvider';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const min = 0
const max = 100
const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset="+Math.floor(Math.random() * (max - min + 1) + min);

export const PokemonsList = () => {
  const { pokemons, addPokemons } = useContext(PokemonContext);
  const [myPokemons, setMyPokemons] = useState([]);
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    let isMounted = true;
    
    const fetchPokemons = async () => {
      const response = await fetch(url);
      const data = await response.json();
      let dataDetails = []
      for await (const e of data.results) {
        const responseDetail = await fetch(e.url);
        const dataDetail = await responseDetail.json();
        dataDetails.push(dataDetail)
      };
      
      if (isMounted){
        addPokemons(dataDetails);
        setMyPokemons(JSON.parse(localStorage.getItem('myPokemonsList')));
      } 
      
    };    

    fetchPokemons();
    return () => { isMounted = false };
  }, [addPokemons]);

  return (
    <div className="pokemons-list">
      <div className="row shadow-sm rounded-pill bg-white my-5 p-2">
        <Link href="/pokedex">
          <div className="col-4 m-auto text-left myPokemonBtn">
            <img src="/pokemon.png" className="img-fluid myPokemonImg" alt="My Pokemon"/> 
            <span>&nbsp;My Pokemons</span> ({myPokemons ? myPokemons.length : 0})
          </div>
        </Link>
          <div className="col-4 m-auto text-center">
            <img src="/logo.png" className="img-fluid logoPokemon" alt="Logo Pokemon"/>
          </div>
          <div className="col-4 m-auto text-right refreshButton">
            <button onClick={() => window.location.reload()} className="btn btn-outline-secondary rounded-pill"><FontAwesomeIcon icon={faSyncAlt} width="20" height="20"/></button>
          </div>
      </div>
      <div className="row">
        {pokemons.length >> 0
        ?pokemons.map((pokemon) =>
        <Link key={pokemon.name} href={"/detail?name="+pokemon.name}>
          <div className="col-lg-3 col-sm-4 col-6 mx-auto my-2">
            <div className="poke-card text-center shadow-sm rounded bg-white pb-3">
              <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} className="img-fluid w-50 p-2" alt={pokemon.name} />
              <h5 className="text-capitalize">{pokemon.name}</h5>
              <div>
                {pokemon.types 
                ? pokemon.types.map((type,i) => {
                  return <span key={i} className={`typeText rounded-pill px-2 pb-1 m-1 text-center text-capitalize bg-${type.type.name}`}> {type.type.name} </span>
                })
                :<></>}
              </div>
            </div>
          </div>
        </Link>)
        :<div className="text-center my-5 py-5 loadingIcon"><FontAwesomeIcon icon={faSyncAlt} width="100" height="100"/></div>}
      </div>
    <style jsx>{`
      .pokemons-list .myPokemonBtn {
        cursor:pointer;
      }

      .pokemons-list .myPokemonBtn span{
        display: inline-block
      }

      .pokemons-list .myPokemonImg {
        max-height: 30px; 
      }

      .pokemons-list .logoPokemon {
        heigth: 30%;
        width: 30%; 
      }

      .pokemons-list .refreshButton {
        text-align: right;
      }

      .poke-card {
        cursor:pointer;
        position:relative;
        margin-top: 100px;
        padding-top: 50px;
      }

      .poke-card img{
        position: absolute;
        top: -100px;
        left: 50%;
        margin-left: -75px;
        width: 150px !important;
        height: 150px;
      }
      
      .poke-card:hover img{
        transform: scale(1.1);
        transition: transform .5s linear;
      }

      @keyframes spinner {
        to { transform: rotate(360deg); }
      }
      
      .loadingIcon {
        animation: spinner 1s linear infinite;
      }

      @media (max-width: 600px) {
        .pokemons-list .myPokemonBtn span{
          display: none
        }

        .pokemons-list .logoPokemon {
          heigth: 100%;
          width: 100%; 
        }

        .poke-card {
          cursor:pointer;
          position:relative;
          margin-top: 60px;
          padding-top: 60px;
        }
  
        .poke-card img{
          position: absolute;
          top: -50px;
          left: 50%;
          margin-left: -50px;
          width: 100px !important;
          height: 100px;
        }
        
        .poke-card:hover img{
          transform: scale(1.1);
          transition: transform .5s linear;
        }

        .pokemons-list .typeText {
          font-size:small
        }
        
      }
    `}</style>
    </div>
    
  );
};

export default PokemonsList;
