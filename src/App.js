import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import angelheadericon from './images/animeangel.png';
import animebg from './images/animebg.webp';
import 'tailwindcss/tailwind.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

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
                onMouseEnter={() => handleButtonMouseEnter('home')}
                onMouseLeave={handleButtonMouseLeave}
              >
                Home
              </button>
              <button
                id="anime-genres"
                className={`normalButton ${hoveredButton === 'anime-genres' ? 'hover' : ''}`}
                onClick={() => setHoveredButton(null)}
                onMouseEnter={() => handleButtonMouseEnter('anime-genres')}
                onMouseLeave={handleButtonMouseLeave}
              >
                Anime Genres
              </button>
              <button
                id="mal-profile"
                className={`normalButton ${hoveredButton === 'mal-profile' ? 'hover' : ''}`}
                onClick={() => setHoveredButton(null)}
                onMouseEnter={() => handleButtonMouseEnter('mal-profile')}
                onMouseLeave={handleButtonMouseLeave}
              >
                MAL Profile
              </button>
              <button
                id="faq"
                className={`normalButton ${hoveredButton === 'faq' ? 'hover' : ''}`}
                onClick={() => setHoveredButton(null)}
                onMouseEnter={() => handleButtonMouseEnter('faq')}
                onMouseLeave={handleButtonMouseLeave}
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

const FeaturedCarousel = () => {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cors-anywhere.herokuapp.com/https://api.myanimelist.net/v2/anime/ranking', {
          params: {
            ranking_type: 'favorite',
            limit: 5,
          },
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-MAL-CLIENT-ID': process.env.REACT_APP_MAL_CLIENT_ID,
          },
        });
        const data = response.data.data;
        setCarouselData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {carouselData.length > 0 ? (
        <Carousel showThumbs={false} showStatus={false} showIndicators={false} autoPlay={true} centerMode={true} infiniteLoop={true}>
          {carouselData.map((item) => (
            <div key={item.node.id}>
              <img src={item.node.main_picture.medium} alt={item.node.title} style={{ width: '30%', height: 'auto' }} />
              <p className="legend">{item.node.title}</p>
            </div>
          ))}
        </Carousel>
      ) : (
        <p>Loading carousel data...</p>
      )}
    </div>
  );
};

function StartQuiz() {
  const [hovered, setHovered] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);

  const questions = [
    {
      question: "Are you looking for a popular Anime or lesser known Anime?",
      options: ["Yes", "No", "Undecided"]
    },
    {
      question: "Any Anime that includes NSFW themes?",
      options: ["Yes", "No"]
    },
    {
      question: "Are you looking for a specific type of Anime?",
      options: ["Shounen", "Seinen", "Shoujo", "Josei", "Kids"]
    },
    {
      question: "Sci-Fi, Slice of Life, or Fantasy?",
      options: ["Sci-Fi", "Slice of Life", "Fantasy"]
    },
    {
      question: "Do you want an Anime generally considered to be heavy and hard to follow e.g. Serial Experiments Lain, Neon Genesis Evangelion, Ergo Proxy?",
      options: ["Yes", "No"]
    }
  ];

  const handleAnswerClick = (answer) => {
    setQuizAnswers(prevAnswers => [...prevAnswers, answer]);
    if (quizStep < questions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {

    }
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const handleClick = () => {
    setHovered(false);
    setQuizStarted(true);
  };

  if (!quizStarted) {
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
  } else {
    return (
      <div className='quizContainer'>
        <h2>{questions[quizStep].question}</h2>
        <div>
          {questions[quizStep].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswerClick(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }
}


const AnimeList = () => {
  const [airingPage, setAiringPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);
  const [airingListData, setAiringListData] = useState([]);
  const [popularListData, setPopularListData] = useState([]);

useEffect(() => {
  const fetchAiringRankings = async () => {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/anime', {
        params: {
          filter: 'airing',
          limit: 10,
          page: airingPage,
        },
      });
      const data = response.data.data;
      setAiringListData((prevList) => [...prevList, ...data]);
    } catch (error) {
      console.log(error);
    }
  };
  fetchAiringRankings();
}, [airingPage]);

useEffect(() => {
  const fetchPopularRankings = async () => {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/anime', {
        params: {
          filter: 'bypopularity',
          limit: 10,
          page: popularPage,
        },
      });
      const data = response.data.data;
      setPopularListData((prevList) => [...prevList, ...data]);
    } catch (error) {
      console.log(error);
    }
  };
  fetchPopularRankings();
}, [popularPage]);

  const handleAiringNextPage = () => {
    const nextPage = airingPage + 1;
    setAiringPage(nextPage);
  };

  const handlePopularNextPage = () => {
    const nextPage = popularPage + 1;
    setPopularPage(nextPage);
  };

  return (
    <div className="animerankings">
      <div className="airinglist">
        <h2>Top Airing List</h2>
        {airingListData && airingListData.length > 0 ? (
          <ul>
            {airingListData.map((anime) => (
              <li key={anime.mal_id}>{anime.title}</li>
            ))}
          </ul>
        ) : (
          <p>Loading top airing list...</p>
        )}
        <button onClick={handleAiringNextPage}>Load More</button>
      </div>
      <div className="popularlist">
        <h2>Popular List</h2>
        {popularListData && popularListData.length > 0 ? (
          <ul>
            {popularListData.map((anime) => (
              <li key={anime.mal_id}>{anime.title}</li>
            ))}
          </ul>
        ) : (
          <p>Loading popular list...</p>
        )}
        <button onClick={handlePopularNextPage}>Load More</button>
      </div>
    </div>
  );
};

function Footer() {
  return (
    <div className='footer'>
      <p>Copyright @ DragonBlessed 2023</p>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Header />
      <Slogan />
      <FeaturedCarousel />
      <StartQuiz />
      <AnimeList />
      <Footer />
    </div>
  );
}

export default App;
