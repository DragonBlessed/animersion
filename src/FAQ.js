import React from 'react';

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
      answer: "We continuously work on improving Animersion and adding new features. Keep an eye on our updates through our website."
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

export default FAQ;
