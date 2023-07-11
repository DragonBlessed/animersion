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

const FeaturedCarousel = () => {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime', {
          params: {
            filter: 'favorite',
            limit: 10,
          },
        });
        const data = response.data.data;
        setCarouselData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const timer = setInterval(fetchData, 60 * 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      {carouselData.length > 0 ? (
        <Carousel showThumbs={false} showStatus={false} showIndicators={false}>
          {carouselData.map((item) => (
            <div key={item.mal_id}>
              <img src={item.image_url} alt={item.title} style={{ width: '100%', height: 'auto' }} />
              <p className="legend">{item.title}</p>
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
        filter: 'airing',
        limit: 10,
        page: page,
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

function fetchPopularRankings(page) {
  return axios
    .get('https://api.jikan.moe/v4/top/anime', {
      params: {
        filter: 'bypopularity',
        limit: 10,
        page: page,
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

const AnimeList = ({ airingList, popularList, fetchMoreAiring, fetchMorePopular }) => {
  const [airingPage, setAiringPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);
  const [airingListData, setAiringListData] = useState([]);
  const [popularListData, setPopularListData] = useState([]);

  useEffect(() => {
    const fetchAiringRankings = async () => {
      try {
        const data = await fetchAiringData(airingPage);
        setAiringListData((prevList) => [...prevList, ...data]);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPopularRankings = async () => {
      try {
        const data = await fetchPopularData(popularPage);
        setPopularListData((prevList) => [...prevList, ...data]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAiringRankings();
    fetchPopularRankings();

    const timer = setInterval(() => {
      fetchAiringRankings();
      fetchPopularRankings();
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, [airingPage, popularPage]);

  const fetchAiringData = async (page) => {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/anime', {
        params: {
          filter: 'airing',
          limit: 10,
          page: page,
        },
      });
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchPopularData = async (page) => {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/anime', {
        params: {
          filter: 'bypopularity',
          limit: 10,
          page: page,
        },
      });
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airingList: [],
      popularList: [],
      animeImages: [],
      airingPage: 1,
      popularPage: 1,
    };
    this.fetchAnimeImages = this.fetchAnimeImages.bind(this);
    this.fetchMoreAiring = this.fetchMoreAiring.bind(this);
    this.fetchMorePopular = this.fetchMorePopular.bind(this);
  }

  componentDidMount() {
    this.fetchAnimeImages()
      .then((animeImages) => {
        this.setState({ animeImages });
      })
      .catch((error) => {
        console.log(error);
      });

    this.fetchAiringRankings()
      .then((airingList) => {
        this.setState({ airingList });
      })
      .catch((error) => {
        console.log(error);
      });

    this.fetchPopularRankings()
      .then((popularList) => {
        this.setState({ popularList });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchAnimeImages() {
    return axios
      .get('https://api.jikan.moe/v4/top/anime', {
        params: {
          filter: 'favorite',
          limit: 3,
          page: 1,
        },
      })
      .then((res) => {
        return res.data.data;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  fetchAiringRankings(page) {
    const { airingPage } = this.state;
    return axios
      .get('https://api.jikan.moe/v4/top/anime', {
        params: {
          filter: 'airing',
          limit: 10,
          page: airingPage,
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data.data;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  fetchPopularRankings(page) {
    const { popularPage } = this.state;
    return axios
      .get('https://api.jikan.moe/v4/top/anime', {
        params: {
          filter: 'bypopularity',
          limit: 10,
          page: popularPage,
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data.data;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  fetchMoreAiring() {
    const { airingPage, airingList } = this.state;
    const nextPage = airingPage + 1;
    this.fetchAiringRankings(nextPage)
      .then((newAiringList) => {
        this.setState({
          airingList: [...airingList, ...newAiringList],
          airingPage: nextPage,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchMorePopular() {
    const { popularPage, popularList } = this.state;
    const nextPage = popularPage + 1;
    this.fetchPopularRankings(nextPage)
      .then((newPopularList) => {
        this.setState({
          popularList: [...popularList, ...newPopularList],
          popularPage: nextPage,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { airingList, popularList, animeImages } = this.state;
    return (
      <div className="App">
        <Header />
        <Slogan />
        <FeaturedCarousel animeImages={animeImages} />
        <StartQuiz />
        <AnimeList
          airingList={airingList}
          popularList={popularList}
          fetchMoreAiring={this.fetchMoreAiring}
          fetchMorePopular={this.fetchMorePopular}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
