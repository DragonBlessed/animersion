import React, { useEffect, useState } from 'react';
import './FAQ.css';
import angelheadericon from './images/angelkAnime_GirlBG.webp';
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './App.js'; // HomePage Page Route

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



const FAQ = () => {
  const faqs = [
    {
      question: "What is Animersion?",
      answer: "Animersion is your golden gateway into the Anime Universe. We offer a wide range of features including anime recommendations, integration with MyAnimeList (MAL) for personalized suggestions, latest anime news, and more."
    },
    {
      question: "How do I navigate through the website?",
      answer: "Our website features an intuitive navigation bar accessible across all pages. For mobile users, a dropdown menu is available to access various sections including Home, Anime Genres, MAL Profile, and FAQ."
    },
    {
      question: "How can I get personalized anime recommendations?",
      answer: "By starting our Anime Recommendation Quiz, you can get personalized suggestions based on your preferences. For a more tailored experience, you can link your MyAnimeList profile."
    },
    {
      question: "How do I link my MyAnimeList profile?",
      answer: "To link your MyAnimeList profile, click on the start the quiz and eventually you will be prompted to link your MAL profile. You will be redirected to the MAL website to authorize the connection. Once you have authorized the connection, you will be redirected back to our website."
    },
    {
      question: "What should I do if I encounter a problem with the MyAnimeList API or any external data sources?",
      answer: "If there's an issue with external data sources such as the MyAnimeList API, please try again later or contact us for support. We strive to ensure a seamless experience but some issues may be beyond our control."
    },
    {
      question: "How can I contact the developers or get support?",
      answer: "For support or inquiries, use the contact form in the Footer section of our website. You can also reach out to us via our GitHub page linked in the Social Media section. Alas, I am the only developer, so there is only so much I can do. I will try my best to help you out."
    },
    {
      question: "How can I contribute to the project?",
      answer: "We welcome contributions to our project. You can contribute by submitting a pull request on our GitHub repository. We are open to new ideas, bug fixes, and feature requests. You can also help by reporting any issues you encounter."
    },
    {
      question: "Are there any plans for new features?",
      answer: "We continuously work on improving Animersion and adding new features. Keep an eye on our updates through our website/repo."
    }
  ];

  return (
    <div className="faq-container p-4">
      <h1 className="text-xl font-bold mb-4">FAQ</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-semibold">{faq.question}</h2>
          <p>{faq.answer}</p>
        </div>
      ))}
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
        <p>Copyright @ DragonBlessed 2024</p>
      </div>
    </div>
  )
}


const EntireFAQPage = () => {

  return (
    <>
      <Header />
      <Slogan />
      <FAQ />
      <Footer />
    </>
  );
};

export default EntireFAQPage;

