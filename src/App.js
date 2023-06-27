import React, { useEffect, useState } from 'react';
import './App.css';
import angelheadericon from './images/animeangel.png';
import animebg from './images/animebg.webp';



function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setHoveredButton(null);
    if (!showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleButtonMouseEnter = (buttonId) => {
    setHoveredButton(buttonId);
  };

  const handleButtonMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <div className='header'>
      <div id='title'>
        <img id='headericon' src={angelheadericon} alt='Header Icon' />
        <h1 id='headertitle'>Animersion</h1>
        <div className='toplinks'>
          {window.innerWidth < 700 ? (
            <div className={`dropdown ${showMenu ? 'active' : ''}`}>
              <button onClick={toggleMenu} className="menuButton">Menu</button>
              <div className='dropdown-content'>
                <button id="home" className="dropdownButton">Home</button>
                <button id="anime-genres" className="dropdownButton">Anime Genres</button>
                <button id="mal-profile" className="dropdownButton">MAL Profile</button>
                <button id="faq" className="dropdownButton">Faq</button>
              </div>
            </div>
          ) : (
            <>
              <button
                id="home"
                className={`normalButton ${hoveredButton === 'home' ? 'hover' : ''}`}
                onClick={() => setHoveredButton(null)}
                onMouseEnter={() => setHoveredButton('home')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Home
              </button>
              <button
                id="anime-genres"
                className={`normalButton ${hoveredButton === 'anime-genres' ? 'hover' : ''}`}
                onClick={() => setHoveredButton(null)}
                onMouseEnter={() => setHoveredButton('anime-genres')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Anime Genres
              </button>
              <button
                id="mal-profile"
                className={`normalButton ${hoveredButton === 'mal-profile' ? 'hover' : ''}`}
                onClick={() => setHoveredButton(null)}
                onMouseEnter={() => setHoveredButton('mal-profile')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                MAL Profile
              </button>
              <button
                id="faq"
                className={`normalButton ${hoveredButton === 'faq' ? 'hover' : ''}`}
                onClick={() => setHoveredButton(null)}
                onMouseEnter={() => setHoveredButton('faq')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Faq
              </button>
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
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    setHovered(false);
  };

  return (
    <div className='quizContainer'>
      <div className='bg'>
        <img id='animebg' src={animebg} alt='Anime BG' />
        <div className={`textOverlay ${hovered ? 'hover' : ''}`}>
          <h1 id='question'>Which Anime should you watch next?</h1>
          <button
            id='quizButton'
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

function AnimeList() {
  return (
    <div className="section">
      <div className="column">
        <h2 className='topAnime'>Top Anime Rankings</h2>
        <div className="row">Row 1, Column 1</div>
        <div className="row">Row 2, Column 1</div>
        <div className="row">Row 3, Column 1</div>
        <div className="row">Row 4, Column 1</div>
        <div className="row">Row 5, Column 1</div>
        <div className="row">Row 6, Column 1</div>
        <div className="row">Row 7, Column 1</div>
        <div className="row">Row 8, Column 1</div>
        <div className="row">Row 9, Column 1</div>
        <div className="row">Row 10, Column 1</div>
      </div>
      <div className="column">
        <h2 className='popularAnime'>Popular Anime Rankings</h2>
        <div className="row">Row 1, Column 2</div>
        <div className="row">Row 2, Column 2</div>
        <div className="row">Row 3, Column 2</div>
        <div className="row">Row 4, Column 2</div>
        <div className="row">Row 5, Column 2</div>
        <div className="row">Row 6, Column 2</div>
        <div className="row">Row 7, Column 2</div>
        <div className="row">Row 8, Column 2</div>
        <div className="row">Row 9, Column 2</div>
        <div className="row">Row 10, Column 2</div>
      </div>
    </div>
  );
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }

  render() {
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <Header />
          <Slogan />
          <StartQuiz />
          <AnimeList />
          <ul>
            {this.state.items.map(item => (
              <li key={item.id}>
                Name: {item.name} | Email: {item.email}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
