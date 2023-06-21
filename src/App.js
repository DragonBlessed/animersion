import { useState } from 'react';
import "./App.css"
import angelheadericon from './images/animeangel.png';
import animebg from './images/animebg.webp';

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    if (!showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <div className='header'>
      <div id='title'>
        <img id='headericon' src={angelheadericon} alt='Header Icon' />
        <h1 id='headertitle'>Animersion</h1>
        <div className='toplinks'>
          {window.innerWidth < 700 ? (
            <div className={`dropdown ${showMenu ? 'active' : ''}`}>
              <button onClick={toggleMenu}>Menu</button>
              <div className='dropdown-content'>
                <button id="home">Home</button>
                <button id="anime-genres">Anime Genres</button>
                <button id="mal-profile">MAL Profile</button>
                <button id="faq">Faq</button>
              </div>
            </div>
          ) : (
            <>
              <button id="home">Home</button>
              <button id="anime-genres">Anime Genres</button>
              <button id="mal-profile">MAL Profile</button>
              <button id="faq">Faq</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Slogan() {
  return (
    <div className='slogan'>
      <h3>Your Golden Gateway into the Anime Universe.</h3>
    </div>
  );
}

function StartQuiz() {
  return (
    <div className='quizContainer'>
      <div className='bg'>
        <img id='animebg' src={animebg} alt='Anime BG'></img>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Header />
      <Slogan />
      <StartQuiz />
    </div>
  );
}

export default App;
