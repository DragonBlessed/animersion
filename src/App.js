import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import angelheadericon from './images/angelkAnime_GirlBG.webp';
import animebg from './images/animebg.webp';
import 'tailwindcss/tailwind.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import defaultsidebarimg from './images/defaultsidebar.webp';
import TV from './images/LED_24_inch.webp';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { kv } from "@vercel/kv";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FAQ from './FAQ.js'; // FAQ Page Route
import emailjs from '@emailjs/browser';

export async function Cart({ params }) {
  const cart = await kv.get(params.user);
  return (
    <div>
      {cart?.map((item) => (
        <div key={item.id}>
          {item.id} - {item.quantity}
        </div>
      ))}
    </div>
  );
}

// Header component for site navigation
function Header() {
  // State for managing the menu and hover state
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  // Toggle the menu and set scroll behavior
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setHoveredButton(null);
    if (!showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  
  // Handle mouse enter and leave events for buttons
  const handleButtonMouseEnter = (buttonId) => {
    setHoveredButton(buttonId);
  };

  const handleButtonMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
      <div className='header'>
        <div className='headerTop'>
          <div id='title'>
            <img id='headericon' src={angelheadericon} alt='Header Icon' />
            <h1 id='headertitle'>Animersion</h1>
          </div>
        <div className='toplinks'>
          {window.innerWidth < 700 ? (
            <div className={`dropdown ${showMenu ? 'active' : ''}`}>
              <button onClick={toggleMenu} className="menuButton">Menu</button>
              <div className='dropdown-content'>
                <Link to="/" className="dropdownButton">Home</Link>
                <button id="anime-genres" className="dropdownButton">Anime Genres</button>
                <button id="mal-profile" className="dropdownButton">MAL Profile</button>
                <Link to="/faq" className="dropdownButton">Faq</Link>
              </div>
            </div>
          ) : (
            <>
              <Link to="/"
                className={`normalButton ${hoveredButton === 'home' ? 'hover' : ''}`}
                onClick={() => setHoveredButton(null)}
                onMouseEnter={() => handleButtonMouseEnter('home')}
                onMouseLeave={handleButtonMouseLeave}
              >
                Home
              </Link>
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
                <Link to="/faq" className={`normalButton ${hoveredButton === 'faq' ? 'hover' : ''}`}
                onMouseEnter={() => handleButtonMouseEnter('faq')}
                onMouseLeave={handleButtonMouseLeave}>
                Faq
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Slogan component for displaying a catchy slogan
function Slogan() {
  return (
    <div className='slogan'>
      <div className="text-container">
        <h3 className="sloganheader">
          <span>Your Golden Gateway <br /> into the Anime Universe.</span>
        </h3>
      </div>
      <div className="blobs_1"></div>
      <div className="blobs_2"></div>
      <div className="blobs_3"></div>
      <div className="blobs_4"></div>
      <div className="blobs_5"></div>
      <div className="blobs_6"></div>
      <div className="blobs_7"></div>
      <div className="blobs_8"></div>
      <div className="blobs_9"></div>
      <div className="blobs_10"></div>
      <div className="blobs_11"></div>
      <div className="blobs_12"></div>
    </div>
  );
}

// FeaturedCarousel component for displaying featured anime
const FeaturedCarousel = () => {
  // State hook to store the carousel data.
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the serverless function endpoint
        const response = await axios.get('../api/mal'); 
        setCarouselData(response.data.data); 
      } catch (error) {
        console.error("Failed to fetch carousel data:", error);
        setCarouselData([]);
      }
    };
    fetchData();
  }, []);

  // Render the carousel or an error message if the data is not available
  if (!carouselData || carouselData.length === 0) {
    return (
      <div className="carousel-container mt-6 p-4 bg-gold text-center">
        <p className="text-lg">The MyAnimeList website or API appears to be having issues. Please try again later.</p>
      </div>
    );
  }

  return (
  <div className="tv-container"> 
   <img src={TV} alt="TV Frame" className="tv-frame" />
    <div className="tv-screen-background"></div>
    <div className="carousel-container bg-gold">
      {carouselData.length > 0 ? (
        <Carousel showThumbs={false} showStatus={false} showIndicators={false} autoPlay={true} centerMode={true} infiniteLoop={true} centerSlidePercentage={70}>
          {carouselData.map((item) => (
            <div key={item.node.id} className="relative">
            <a href={`https://myanimelist.net/anime/${item.node.id}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10">
              <span className="sr-only">Link to {item.node.title}</span>
            </a>
            <img 
                src={item.node.main_picture.large} 
                alt={item.node.title} 
                className="w-full h-full object-contain"
            />
            <p className="font-nunito legend text-center text-white font-bold text-lg">{item.node.title}</p>
          </div>
          ))}
        </Carousel>
      ) : (
        <p className="text-center text-lg">Loading carousel data...</p>
      )}
    </div>
  </div>
  );  
};

// Converted SVG icon in JSX format
const ArrowIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 474.34627 357.28423"
    className={`arrow-icon ${isOpen ? 'open' : ''}`}
    style={{ width: '30px', height: '30px' }}
  >
    <path
      d="m 245.4867,0.0062872 c -2.691,0.0801 -5.43464,0.92602 -7.76367,2.58399 h -0.008 L 3.0648323,175.11957 c -1.9122,1.4021 -3.08886004,3.754 -3.06446003906,6.125 0.0242999991,2.371 1.24896003906,4.6999 3.18946003906,6.0625 L 237.84998,352.49653 c 4.1817,3.2473 11.50327,6.59195 16.19727,3.66015 2.4974,-1.6471 3.82898,-4.8898 3.20898,-7.8164 l -21.28125,-101.16016 230.08985,23.93945 c 2.0789,0.21751 4.23786,-0.4842 5.79296,-1.88086 1.55511,-1.39666 2.48199,-3.46634 2.48829,-5.55664 v -157.9414 c 0.049,-10.531003 -8.87335,-11.915003 -16.03125,-11.000003 L 236.68592,117.78168 257.28553,13.621527 C 258.89711,4.5983372 252.3637,-0.1983628 245.4867,0.0062872 Z"
      fill="black"
    />
  </svg>
);

// Sidebar component for displaying anime news
function Sidebar({ isOpen, toggle }) {
  const [animeNews, setAnimeNews] = useState([]);
  
  // Fetching the news related to the most aired anime
  useEffect(() => {
    const fetchMostPopularAnimeNews = async () => {
      try {
        const response = await axios.get('../api/jikan');
        setAnimeNews(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMostPopularAnimeNews();
  }, []);

  // Render the sidebar with news details
  return (
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-toggle">
        <button onClick={toggle}>
          <ArrowIcon isOpen={isOpen} />
        </button>
      </div>
      {isOpen && (
        <div className="flex-1 p-4">
          {animeNews.length > 0 ? (
            animeNews.map((news) => (
              <div key={news.mal_id} className="mb-4">
              <a href={news.url} target="_blank" rel="noopener noreferrer" className="font-bold text-lg text-blue-900 hover:underline">{news.title}</a>
              <p>{news.date.substring(0,10)}</p>
              <p className="text-blue-600">Author: {news.author_username}</p>
              {news.images.jpg.image_url ? (
                <a href={`https://myanimelist.net/news/${news.mal_id}`} target="_blank" rel="noopener noreferrer">
                  <img 
                    src={news.images.jpg.image_url} 
                    alt={news.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src={defaultsidebarimg}; }}
                  />
                </a>
              ) : (
                <p className="text-red-500">Image Not Found on MAL</p>
              )}
            </div>
          ))
        ) : (
          <p>Loading news...</p>
        )}
      </div>
      )}
      </div>
  );
}
  

// Quiz component for starting the anime recommendation quiz
function StartQuiz() {
  // State variables for managing the quiz
  const [hovered, setHovered] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [animationStage, setAnimationStage] = useState('enter')
  const [contentKey, setContentKey] = useState(0);
  
function generateCodeVerifier() {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  const codeVerifier = Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
  localStorage.setItem('codeVerifier', codeVerifier); // Store it for later use
  return codeVerifier;
  }
  
const codeVerifier = generateCodeVerifier();
const codeChallenge = codeVerifier;

function generateState() {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}
const state = generateState();
const handleMALLogin = () => {
  const clientId = process.env.REACT_APP_MAL_CLIENT_ID || 'default_client_id';
  const redirectUrl = process.env.REACT_APP_MAL_REDIRECT_URL || 'http://localhost:3000/callback';
  const state = generateState(); // Generate a unique state value for CSRF protection
  localStorage.setItem('quizState', JSON.stringify({
    quizStep,
    quizAnswers,
  }));

  window.location.href = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_url=${redirectUrl}&code_challenge=${codeChallenge}&code_challenge_method=plain`;
};

const handleMALCallback = async (code) => {
  // Retrieve the codeVerifier from localStorage
  const codeVerifier = localStorage.getItem('codeVerifier');
  if (!codeVerifier) {
    console.error('Code Verifier not found');
    return;
  }

  const clientId = process.env.REACT_APP_MAL_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_MAL_REDIRECT_URL;

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('code', code);
  params.append('code_verifier', codeVerifier);
  params.append('grant_type', 'authorization_code');
  params.append('redirect_uri', redirectUri);

  try {
    const response = await fetch('https://myanimelist.net/v1/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!response.ok) {
      console.error(`Token exchange failed with status: ${response.status}`, await response.text());
      return;
    }

    const data = await response.json();
    console.log('Access Token:', data.access_token);
  } catch (error) {
    console.error('Token exchange error:', error);
  }
};

useEffect(() => {
  const restoreQuizState = () => {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      const { quizStep, quizAnswers } = JSON.parse(savedState);
      quizAnswers.concat("Yes, I'll link it.")
      setQuizStep(quizStep + 1);
      setQuizAnswers(quizAnswers);
      localStorage.removeItem('quizState');
    }
  };

  restoreQuizState();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');


  if (code) {
    handleMALCallback(code);
  }
}, []);

const questions = [
  {
    question: "Welcome to the Anime Recommendation Quiz! Would you like to take the quiz to find the perfect Anime for you?",
    options: ["Yes, let's begin!", "なに?"]
  },
  {
    question: "Would you like to link your MyAnimeList profile for a more precise recommendation?",
    options: [{ text: "Yes, I'll link it.", action: handleMALLogin }, "No, proceed without linking."]
  },
  {
    question: "Are you interested in popular mainstream Anime or lesser-known hidden gems?",
    options: ["Popular Anime", "Lesser Known Anime", "Both", "Undecided"]
  },
  {
    question: "Do you have preferences for Anime content, such as avoiding NSFW themes?",
    options: ["Include NSFW Themes", "Avoid NSFW Themes", "No Preference"]
  },
  {
    question: "Are you looking for a specific type of Anime? Choose the one that interests you the most.",
    options: ["Shounen", "Seinen", "Shoujo", "Josei", "Kids", "No Preference"]
  },
  {
    question: "Which genre are you most interested in? You can select more than one.",
    options: ["Sci-Fi", "Slice of Life", "Fantasy", "Action", "Romance", "Horror", "Comedy"]
  },
  {
    question: "Do you prefer Anime that is considered heavy and hard to follow, like Serial Experiments Lain?",
    options: ["Yes", "No", "Sometimes"]
  },
  {
    question: "What's your preference for episode length? Are you looking for a short or long series?",
    options: ["Short (1-13 episodes)", "Medium (14-26 episodes)", "Long (27+ episodes)", "No Preference"]
  },
  {
    question: "Do you have a preference for watching Anime in subbed (original language) or dubbed (localized language) version?",
    options: ["Subbed", "Dubbed", "Either is fine"]
  },
  {
    question: "Do you have a favorite Anime studio?",
    options: ["Studio Ghibli", "Madhouse", "Sunrise", "Bones", "Mappa", "No Preference"]
  }
];

  // Handlers for various quiz interactions
  const handleAnswerClick = (answer) => {
    setAnimationStage('exit');
    setTimeout(() => {
      setQuizAnswers(prevAnswers => [...prevAnswers, answer]);
      if (quizStep < questions.length - 1) {
        setQuizStep(quizStep + 1);
      } else {
      }
      setAnimationStage('enter');
    }, 500);
  };

  const setAttributes = (quizAnswers) => {
    let attributes = {
      hasMALAccount: false,
      likesPopular: false,
      likesHiddenGems: false,
      nsfw: false,
      targetDemographic: null,
      genreInterests: [],
      wantsHeavy: false,
      episodeLength: null,
      subOrDub: null,
      favStudio: null,
      deep: false,
    };
  
    // Mapping for single-value attributes
    const singleValueMap = {
      "Popular Anime": 'likesPopular',
      "Lesser Known Anime": 'likesHiddenGems',
      "Include NSFW Themes": 'nsfw',
      "Short (1-13 episodes)": 'episodeLength',
      "Medium (14-26 episodes)": 'episodeLength',
      "Long (27+ episodes)": 'episodeLength',
      "Subbed": 'subOrDub',
      "Dubbed": 'subOrDub',
    };
  
    // Array for multiple-value attributes
    const multiValueArray = [
      { answer: "Sci-Fi", attribute: 'genreInterests' },
      { answer: "Slice of Life", attribute: 'genreInterests' },
      { answer: "Fantasy", attribute: 'genreInterests' },
      { answer: "Action", attribute: 'genreInterests' },
      { answer: "Romance", attribute: 'genreInterests' },
      { answer: "Horror", attribute: 'genreInterests' },
      { answer: "Comedy", attribute: 'genreInterests' },
    ];
  
    // Setting single-value attributes
    for (const answer of quizAnswers) {
      if (singleValueMap[answer]) {
        attributes[singleValueMap[answer]] = answer;
      }
    }
  
    // Setting multiple-value attributes
    for (const { answer, attribute } of multiValueArray) {
      if (quizAnswers.includes(answer)) {
        attributes[attribute].push(answer);
      }
    }
  
    // Special Cases
    if (quizAnswers.includes("Seinen") && quizAnswers[6] === "Yes") {
      attributes.deep = true;
    }
  
    return attributes;
  };


  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const handleClick = () => {
    setHovered(false);
    setQuizStarted(true);
    console.log(quizStep)
    console.log(questions.length)
  };
  
  const handleNextQuestion = () => {
    if (quizStep < questions.length - 1) {
      setContentKey(prevKey => prevKey + 1);
      setQuizStep(quizStep + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (quizStep > 0) {
      setContentKey(prevKey => prevKey + 1);
      setQuizStep(quizStep - 1);
    }
  };

  const handleQuizSubmit = () => {
    const attributes = setAttributes(quizAnswers);
    saveQuizAnswers('clientId', quizAnswers);
  };

  const saveQuizAnswers = async (clientId, quizAnswers) => {
    try {
      await axios.post('/api/saveQuizAnswers', {
        clientId,
        quizAnswers
      });
      console.log('Answers saved successfully');
    } catch (error) {
      console.error('Failed to save answers:', error);
    }
  };
  
  const getUsersAnimeList = async (accessToken) => {
    const response = await fetch('https://api.myanimelist.net/v2/users/@me/animelist?fields=list_status', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    console.log(data);
  };


  // Render the quiz or the start screen depending on the state
  if (!quizStarted) {
    return (
      // Start screen
      <div className='quizContainer'>
        <div className='bg'>
          <img id='animebg' src={animebg} alt='Anime BG' />
          <div className={"font-poppins p-4 bg-yellow-500 rounded-full inline-block textOverlay ${hovered ? 'hover' : ''}"}>
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
    // Quiz questions
    return (
        <div className='quizContainer'>
          <div className='bg'>
            <img id='animebg' src={animebg} alt='Anime BG' />
          </div>
          {quizStep < questions.length && (
          <div key={contentKey} className={`questionContainer ${animationStage === 'enter' ? 'fadeEnter' : 'fadeExit'}`}> 
            <div className="font-nunito p-4 bg-yellow-500 rounded-full inline-block">
              <h2 className="flex flex-col items-center justify-center space-y-4">{questions[quizStep].question}</h2>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4">
              {questions[quizStep].options.map((option, index) => {
                const buttonText = typeof option === "string" ? option : option.text;
                const handleClick = typeof option === "string" ? () => handleAnswerClick(option) : option.action;
                return (
                  <button
                    className="font-nunito bg-blue-900 text-sm text-white rounded-md font-bold cursor-pointer px-5 py-3"
                    key={index}
                    onClick={handleClick}
                  >
                    {buttonText}
                  </button>
                );
              })}
              
              <div className="arrowButtonsContainer">
                {quizStep > 0 && (
                  <button
                    className="navigationButton prev"
                    onClick={handlePrevQuestion}
                  >
                  </button>
                )}

                {(quizStep < questions.length - 1 && quizStep !== 0) && (
                  <button
                    className="navigationButton next"
                    onClick={handleNextQuestion}
                  >
                  </button>
                )}
              </div>
            </div>
          </div>
          )}
              {Number(quizStep) === Number(questions.length) && (
                <div className='submitContainer'>
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <button
                      className="font-nunito bg-green-500 text-xl text-white rounded-md font-bold cursor-pointer px-8 py-4"
                      onClick={handleQuizSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
        </div>
      
    )
  }
}

// AnimeList component for displaying top airing and popular anime in a list
const AnimeList = () => { 
  const [airingPage, setAiringPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);
  const [airingListData, setAiringListData] = useState([]);
  const [popularListData, setPopularListData] = useState([]);
  const [listAnimationStage, setListAnimationStage] = useState('enter');

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
      setAiringListData(data);
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
      setPopularListData(data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchPopularRankings();
}, [popularPage]);

  const handleAiringNextPage = () => {
    setListAnimationStage('exit');
    setTimeout(() => {
      const nextPage = airingPage + 1;
      setAiringPage(nextPage);
      setListAnimationStage('enter');
    }, 500);
  };

  const handleAiringPreviousPage = () => {
    setListAnimationStage('exit');
    setTimeout(() => {
    const previousPage = airingPage - 1;
    setAiringPage(previousPage);
    setListAnimationStage('enter');
    }, 500);
  };

  const handlePopularNextPage = () => {
    setListAnimationStage('exit');
    setTimeout(() => {
    const nextPage = popularPage + 1;
    setPopularPage(nextPage);
    setListAnimationStage('enter');
    }, 500);
  };

  const handlePopularPreviousPage = () => {
    setListAnimationStage('exit');
    setTimeout(() => {
    const previousPage = popularPage - 1;
    setPopularPage(previousPage);
    setListAnimationStage('enter');
    }, 500);
  };

  // Render the top airing and popular anime lists with pagination using JikanAPI
  return (
    <div className="animerankings">
      <div className={`airinglist ${listAnimationStage === 'enter' ? 'fadeEnter' : 'fadeExit'}`}>
        <h2>Top Airing Anime</h2>
        {airingListData && airingListData.length > 0 ? (
          <ul>
            {airingListData.map((anime) => (
              <li key={anime.mal_id}>
                <a href={anime.url} target="_blank" rel="noopener noreferrer">{anime.title} </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading top airing list...</p>
        )}
        <div className="flex justify-between"> 
          {airingPage > 1 && (
            <button
              className="font-nunito bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
              onClick={handleAiringPreviousPage}
            >
              Previous Page 
            </button>
          )}
          <button onClick={handleAiringNextPage} className="font-nunito bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all">
            Next Page
          </button>
        </div>
      </div>
      <div className={`popularlist ${listAnimationStage === 'enter' ? 'fadeEnter' : 'fadeExit'}`}>
        <h2>Popular Anime</h2>
        {popularListData && popularListData.length > 0 ? (
          <ul>
            {popularListData.map((anime) => (
              <li key={anime.mal_id}>
                <a href={anime.url} target="_blank" rel="noopener noreferrer">{anime.title}</a>
                </li>
            ))}
          </ul>
        ) : (
          <p>Loading popular list...</p>
        )}
        <div className="flex justify-between">
          {popularPage > 1 && (
            <button
              className="font-nunito bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
              onClick={handlePopularPreviousPage}
            >
              Previous Page 
            </button>
          )}
          <button onClick={handlePopularNextPage} className="font-nunito bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all">
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

// Footer component for the application
function Footer() { 
  // Render the footer with quick links, social media, and contact form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);
  const [formErrors, setFormErrors] = useState({
  user_name: '',
  user_email: '',
  message: '',
});

  const sendEmail = (e) => {
    e.persist();
    e.preventDefault();
    const { user_name, user_email, message } = e.target.elements;
    let errors = { ...formErrors };
        // Validate the form fields
    errors.user_name = !user_name.value.trim() ? 'Name is required' : '';
      if (!user_email.value.trim()) {
        errors.user_email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user_email.value)) {
        errors.user_email = 'Invalid email address';
    } else {
        errors.user_email = ''; // Clears the error if the email is now valid.
    }
    errors.message = !message.value.trim() ? 'Message is required' : '';

    // Check if there are any errors remaining
    if (Object.values(errors).some(error => error !== '')) {
        setFormErrors(errors);
        return; // Stop submission if there's any error
    }

    setIsSubmitting(true);
    emailjs.sendForm(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID,
      e.target,
      process.env.REACT_APP_PUBLIC_KEY
    ).then(
      (result) => {
        setStateMessage('Message sent!');
        setIsSubmitting(false);
        setTimeout(() => {
          setStateMessage(null);
        }, 5000); // hide message after 5 seconds
      },
      (error) => {
        setStateMessage('Something went wrong, please try again later.');
        setIsSubmitting(false);
        setTimeout(() => {
          setStateMessage(null);
        }, 5000); // hide message after 5 seconds
      }
    );
    // Clears the form after sending the email
    e.target.reset();
  };


  return (
    <div className='bg-gold'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div>
          <h3 className='font-poppins text-lg font-bold mb-4'>Quick Links</h3>
          <ul>
            <li><a href="/" className="font-nunito hover:underline">Home</a></li>
            <li><a href="/faq" className="font-nunito hover:underline">Faq</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-poppins text-lg font-bold mb-4">Social Media</h3>
          <a href='https://github.com/DragonBlessed' target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
        <div>
          <h3 className="font-poppins text-lg font-bold mb-4">Contact Us</h3>
          <form onSubmit={sendEmail}>
            <input type="text" name="user_name" placeholder="Name" className="mb-2 p-2 w-full" />
            {formErrors.user_name && <p className="text-red-500">{formErrors.user_name}</p>}

            <input type="email" name="user_email" placeholder="Email" className="mb-2 p-2 w-full" />
            {formErrors.user_email && <p className="text-red-500">{formErrors.user_email}</p>}

            <textarea name="message" placeholder="Message" className="mb-2 p-2 w-full"></textarea>
            {formErrors.message && <p className="text-red-500">{formErrors.message}</p>}

            <button type="submit" className="font-poppins bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </form>
          {stateMessage && <p className="text-white py-4">{stateMessage}</p>}
        </div>
      </div>
      <div className="font-poppins text-center mt-8">
        <p>Copyright @ DragonBlessed 2024</p>
      </div>
    </div>
  )
}

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <SpeedInsights />
      <Header />
      <Slogan />
      <FeaturedCarousel />
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} animeId={1234} />
      <StartQuiz />
      <AnimeList />
      <Footer />
    </>
  );
};

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code && !accessToken) {
      exchangeCodeForToken(code);
    }
  }, [accessToken]);

  const exchangeCodeForToken = async (code) => {
    const codeVerifier = localStorage.getItem('codeVerifier');
    if (!codeVerifier) {
      console.error('Code Verifier not found');
      return;
    }
    try {
      const response = await axios.post('../api/mal', {
      code: code,
      codeVerifier: codeVerifier,
    });
      const { access_token } = response.data;
      localStorage.setItem('accessToken', access_token); // Store token in local storage
      setAccessToken(access_token);
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    }
  };

  const fetchDataUsingToken = async () => {
    if (!accessToken) {
      console.log('No access token available.');
      return;
    }

    try {
      const response = await axios.get('MYANIMELIST_DATA_ENDPOINT', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

   // Render the main application
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FAQ />} />
          {/* Routes to be filled here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

