import React, { useContext, useEffect } from 'react';
import { PokemonContext } from '../utils/PokemonProvider';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
      <div className="row shadow-sm rounded-pill bg-white my-5 p-2">
          <div className="col-4 m-auto text-center">
            <img src="/logo.png" className="img-fluid logoPokemon" alt="Logo Pokemon"/>
          </div>
      </div>
      <div className="row">
        {myPokemonsList.map((pokemon) =>
          <div key={pokemon.name} className="col-lg-3 col-sm-4 col-6 mx-auto my-2">
            <div className="my-poke-card text-center shadow-sm rounded bg-white pb-3">
              <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} className="img-fluid w-50 p-2 my-poke-img" alt={pokemon.name} />
              <div className="my-2">
                <img src="/pokemon-release.png" className="img-fluid releaseBtn" onClick={release(pokemon)} alt="Release Pokemon" title="Release the pokemon"/>
              </div>
              <h5 className="givenName text-capitalize">{pokemon.givenName} - {pokemon.name}</h5>
              <div>
                {pokemon.types 
                ? pokemon.types.map((type,i) => {
                  return <span key={i} className={`typeText rounded-pill px-2 pb-1 m-1 text-center text-capitalize bg-${type.type.name}`}> {type.type.name} </span>
                })
                :<></>}
              </div>
            </div>
          </div>)}
      </div>
      <div className="text-center mt-5">
        <Link href="/">
          <button className="btn btn-outline-secondary rounded-pill"><FontAwesomeIcon icon={faArrowLeft} width="15" height="15"/> Back</button>
        </Link>
      </div>
      <style jsx>{`

      .pokedex .logoPokemon {
        heigth: 30%;
        width: 30%; 
      }

      .my-poke-card {
        position:relative;
        margin-top: 100px;
        padding-top: 50px;
      }

      .my-poke-card .my-poke-img{
        position: absolute;
        top: -100px;
        left: 50%;
        margin-left: -75px;
        width: 150px !important;
        height: 150px;
      }
      
      .my-poke-card:hover .my-poke-img{
        transform: scale(1.1);
        transition: transform .5s linear;
      }

      .my-poke-card .releaseBtn {
        cursor:pointer;
        height: 30px
      }

      @media (max-width: 600px) {
        .pokedex .logoPokemon {
          heigth: 100%;
          width: 100%; 
        }

        .my-poke-card {
          margin-top: 60px;
          padding-top: 60px;
        }
  
        .my-poke-card .my-poke-img{
          position: absolute;
          top: -50px;
          left: 50%;
          margin-left: -50px;
          width: 100px !important;
          height: 100px;
        }

        .pokedex .givenName {
          font-size: medium
        }

        .pokedex .typeText {
          font-size:small
        }
      }
    `}</style>
    </div>
  )
};

export default MyPokemonsList;