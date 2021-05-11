import Head from 'next/head'
import MyPokemonsList from '../component/view/MyPokemonsList'
import {PokemonProvider} from '../component/utils/PokemonProvider'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Pokedex() {
  return (
    <div className="container">
      <Head>
        <title>My Pokemons</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PokemonProvider>
          <MyPokemonsList />
        </PokemonProvider>
      </main>

      <footer>
      </footer>

      <style jsx>{`
        main {
          // background : RGB(246, 248, 252)
        }


        @media (max-width: 600px) {
          .g {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background : RGB(246, 248, 252)
        }

        .bg-normal {
          background : #647d94;
          color: #ffffff
        }
  
        .bg-fire {
          background : #d9534f;
          color: #ffffff
        }
  
        .bg-grass {
          background : #5cb85c;
          color: #ffffff
        }
        
        .bg-water {
          background : #5bc0de;
          color: #ffffff
        }
  
        .bg-poison {
          background : #f0ad4e;
          color: #ffffff
        }
  
        .bg-bug {
          background : #b0cf44;
          color: #ffffff
        }
  
        .bg-flying {
          background : #c28662;
          color: #ffffff
        }
  
        .bg-ground {
          background : #8e6049;
          color: #ffffff
        }
  
        .bg-electric {
          background : #f2d91f;
          color: #ffffff
        }
  
        .bg-fairy {
          background : #89e7fd;
          color: #ffffff
        }
  
        .bg-fighting {
          background : #cccccc;
          color: #ffffff
        }
  
        .bg-rock {
          background : #8cadcd;
          color: #ffffff
        }
  
        .bg-psychic {
          background : #ff2d55;
          color: #ffffff
        }
  
        .bg-ghost {
          background : #5856d6;
          color: #ffffff
        }
  
        .bg-ice {
          background : #ecf0f1;
          color: #00000
        }
  
        .bg-steel {
          background : #a0a0a0;
          color: #ffffff
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
