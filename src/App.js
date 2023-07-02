import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

function fetchAiringRankings(page) {
  return axios
    .get('https://api.jikan.moe/v4/top/anime', {
      params: {
        type: 'tv',
        filter: 'airing',
        limit: 10,
        page: page,
      },
    })
    .then((res) => res.data.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

function fetchPopularRankings(page) {
  return axios
    .get('https://api.jikan.moe/v4/top/anime', {
      params: {
        type: 'tv',
        filter: 'bypopularity',
        limit: 10,
        page: page,
      },
    })
    .then((res) => res.data.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

const AnimeList = ({ airingList, popularList, fetchMoreAiring, fetchMorePopular }) => {
  const [airingPage, setAiringPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);

  const handleAiringNextPage = () => {
    const nextPage = airingPage + 1;
    fetchMoreAiring(nextPage);
    setAiringPage(nextPage);
  };

  const handlePopularNextPage = () => {
    const nextPage = popularPage + 1;
    fetchMorePopular(nextPage);
    setPopularPage(nextPage);
  };

  return (
    <div>
      <h2>Airing List</h2>
      {airingList ? (
        <ul>
          {airingList.map((anime) => (
            <li key={anime.mal_id}>{anime.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading airing list...</p>
      )}
      <button onClick={handleAiringNextPage}>Load More</button>

      <h2>Popular List</h2>
      {popularList ? (
        <ul>
          {popularList.map((anime) => (
            <li key={anime.mal_id}>{anime.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading popular list...</p>
      )}
      <button onClick={handlePopularNextPage}>Load More</button>
    </div>
  );
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airingList: [],
      popularList: [],
    };
  }

 componentDidMount() {
    fetchAiringRankings()
      .then(airingList => {
        this.setState({ airingList });
      })
      .catch(error => {
        console.log(error);
      });

    fetchPopularRankings()
      .then(popularList => {
        this.setState({ popularList });
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchMoreAiring(page) {
    fetchAiringRankings(page)
      .then((newAiringList) => {
        const { airingList } = this.state;
        this.setState({ airingList: [...airingList, ...newAiringList] });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchMorePopular(page) {
    fetchPopularRankings(page)
      .then((newPopularList) => {
        const { popularList } = this.state;
        this.setState({ popularList: [...popularList, ...newPopularList] });
      })
      .catch((error) => {
        console.log(error);
      });
  }


render() {
  const { airingList, popularList } = this.state; 
    return (
      <div className="App">
        <Header />
        <Slogan />
        <StartQuiz />
        <AnimeList
          airingList={airingList}
          popularList={popularList}
          fetchMoreAiring={(page) => this.fetchMoreAiring(page)}
          fetchMorePopular={(page) => this.fetchMorePopular(page)}
        />
      </div>
      );
    }
  }

export default App;
