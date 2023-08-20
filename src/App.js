import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import angelheadericon from './images/animeangel.png';
import animebg from './images/animebg.webp';
import 'tailwindcss/tailwind.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import defaultsidebarimg from './images/defaultsidebar.jpeg';

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
  // State for storing carousel data
  const [carouselData, setCarouselData] = useState([]);

  // Fetch carousel data from the MAL API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/mal');
        const data = response.data.data;
        setCarouselData(data);
      } catch (error) {
        console.log(error);
        setCarouselData(undefined);
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
    <div className="carousel-container mt-6 p-4 bg-gold">
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
                className="w-full h-48 object-cover md:h-96"
            />
            <p className="font-nunito legend text-center text-white font-bold text-lg">{item.node.title}</p>
          </div>
          ))}
        </Carousel>
      ) : (
        <p className="text-center text-lg">Loading carousel data...</p>
      )}
    </div>
  );  
};

// Sidebar component for displaying anime news
function Sidebar({ isOpen, toggle }) {
  const [animeNews, setAnimeNews] = useState([]);
  
  // Fetching the news related to the most aired anime
  useEffect(() => {
    const fetchMostPopularAnimeNews = async () => {
      try {
        const response = await axios.get('/api/jikan');
        setAnimeNews(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMostPopularAnimeNews();
  }, []);

  // Render the sidebar with news details
  return (
    <div className={`fixed right-0 w-full md:w-64 h-full bg-white transform transition-transform duration-300 ease-in-out overflow-y-auto z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <button className="absolute top-4 right-4 text-xl" onClick={toggle}>X</button>
      <div className="p-4">
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

  const handleMALLogin = () => {
    const clientId = process.env.MAL_CLIENT_ID;
    const redirectUrl = process.env.MAL_REDIRECT_URL;
  
    const malAuthUrl = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}`;
    window.location.href = malAuthUrl;
  };

const questions = [
  {
    question: "Welcome to the Anime Recommendation Quiz! Would you like to take the quiz to find the perfect Anime for you?",
    options: ["Yes, let's begin!", "No, thanks.", "なに?"]
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
    options: ["Studio Ghibli", "Madhouse", "Sunrise", "Bones", "No Preference"]
  }
];

  // Handlers for various quiz interactions
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

  const handleResetClick = () => {
    setQuizStep(0);
    setQuizAnswers([]);
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
        <div className='questionContainer'>
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
            {quizStep > 0 && (
              <button
                className="font-nunito bg-red-500 text-sm text-white rounded-md font-bold cursor-pointer px-5 py-3"
                onClick={handleResetClick}
              >
                Reset Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// AnimeList component for displaying top airing and popular anime in a list
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
    const nextPage = airingPage + 1;
    setAiringPage(nextPage);
  };

  const handleAiringPreviousPage = () => {
    const previousPage = airingPage - 1;
    setAiringPage(previousPage);
  };

  const handlePopularNextPage = () => {
    const nextPage = popularPage + 1;
    setPopularPage(nextPage);
  };

  const handlePopularPreviousPage = () => {
    const previousPage = popularPage - 1;
    setPopularPage(previousPage);
  };

  // Render the top airing and popular anime lists with pagination using JikanAPI
  return (
    <div className="animerankings">
      <div className="airinglist">
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
      <div className="popularlist">
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
          <form>
            <input type="text" placeholder="Name" className="mb-2 p-2 w-full"/>
            <input type="email" placeholder="Email" className="mb-2 p-2 w-full"/>
            <textarea placeholder="Message" className="mb-2 p-2 w-full"></textarea>
            <button className="font-poppins bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all">
              Send
            </button>
          </form>
        </div>
      </div>
      <div className="font-poppins text-center mt-8">
        <p>Copyright @ DragonBlessed 2023</p>
      </div>
    </div>
  )
}

function App() {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

   // Render the main application
  return (
    <div className="App">
      <Header />
      <Slogan />
      <FeaturedCarousel />
      <button onClick={toggleSidebar} className="fixed right-4 top-4 px-4 py-2 bg-blue-950 text-white rounded z-50">X</button>
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} animeId={1234} />
      <StartQuiz />
      <AnimeList />
      <Footer />
    </div>
  );
}

export default App;