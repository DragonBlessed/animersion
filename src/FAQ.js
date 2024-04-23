import React, { useEffect, useState } from 'react';
import './FAQ.css';
import angelheadericon from './images/angelkAnime_GirlBG.webp';
import footeranimebg from './images/footeranimebg.webp';
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './App.js'; // HomePage Page Route
import Select from 'react-select';
import emailjs from '@emailjs/browser';


// Header component for site navigation
function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [selectedOption, setSelectedOption] = useState(null);

  // Listener for window resize to toggle mobile view
  useEffect(() => {
      const handleResize = () => {
          setIsMobile(window.innerWidth < 700);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  const options = [
      { value: '/', label: 'Home' },
      { value: '/anime-genres', label: 'Anime Genres' },
      { value: '/mal-profile', label: 'MAL Profile' },
      { value: '/faq', label: 'FAQ' }
  ];

  const handleChange = (option) => {
      setSelectedOption(option);
      window.location.pathname = option.value; // Navigate on select
  };

  return (
      <div className='header'>
          <div className='headerTop'>
              <div id='title'>
                  <img id='headericon' src={angelheadericon} alt='Header Icon' />
                  <h1 id='headertitle'>Animersion</h1>
              </div>
              <div className='toplinks'>
                  {isMobile ? (
                      <Select
                          className="dropdown-select"
                          value={selectedOption}
                          onChange={handleChange}
                          options={options}
                          placeholder="Menu"
                          isSearchable={false}
                          menuPosition='fixed'
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              backgroundColor: 'navy',
                              color: 'white',
                              borderRadius: 10,
                              border: state.isFocused ? '1px solid #FFD700' : 'none',
                              boxShadow: state.isFocused ? '0 0 0 1px #FFD700' : 'none',
                              width: '100%',
                              cursor: 'pointer',
                              bordercolor: 'white'
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isSelected ? '#FFD700' : 'navy',
                              color: state.isSelected ? 'white' : 'white',
                              cursor: 'pointer',
                              ':hover': {
                                  ...provided[':hover'],
                                  backgroundColor: '#FFD700',
                                  color: 'white',
                              }
                            }),
                            menu: (provided) => ({
                                ...provided,
                                backgroundColor: 'navy',
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                color: 'white',
                            }),
                            placeholder: (provided) => ({
                              ...provided,
                              color: 'white',  // Placeholder text to white
                          })
                        }}          
                      />
                  ) : (
                      <>
                          <Link to="/" className="normalButton">Home</Link>
                          <Link to="/anime-genres" className="normalButton">Anime Genres</Link>
                          <Link to="/mal-profile" className="normalButton">MAL Profile</Link>
                          <Link to="/faq" className="normalButton">FAQ</Link>
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
    <div className='bg-goldfooter'>
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

