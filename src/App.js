import { useState } from 'react';
import "./App.css"
import angelheadericon from './images/animeangel.png';

function Header() {
  return (
    <div className='header'>
    <div id='title'>
      <img id='headericon' src={angelheadericon} alt='Header Icon' />
      <h1>Animersion</h1>
      <div class='toplinks'>
      <button id="home">Home</button>
      <button id="anime-genres">Anime Genres</button>
      <button id="mal-profile">MAL Profile</button>
      <button id="faq">Faq</button>
      </div>
      </div>

      </div>
  );
}

function Slogan() {
  return (
  <div className='slogan'>
    <h2>Your Golden Gateway into the Anime Universe.</h2>
  </div>
  )
}



function App() {
  return (
    <div className="App">
      <Header></Header>
      <Slogan></Slogan>
      </div>
  );
}

export default App;
