// ContestsPage.js
import React from 'react';
import Card from '../src/Components/Card/card';
import Header from '../src/Components/Header/Header'; // Assuming you already have a Header component
import Footer from '../src/Components/Footer/Footer'; // Assuming you already have a Footer component
import 'bootstrap/dist/css/bootstrap.min.css';

  const contestCategories = [
    {
      level: 'Bronze',
      points: '100pts',
      contests: [
        {
          title: 'Opinions',
          content: 'Join the Conversation.',
          icon: 'src/icons/opinions-icon.svg',
          link: 'contest-page.html?contest=opinions'
        },
        {
          title: 'Tech and Gadgets',
          content: 'Explore the latest in technology and gadgets.',
          icon: 'src/icons/tech-and-gadgets-icon.svg',
          link: 'contest-page.html?contest=tech'
        },
        {
          title: 'Cooking and Baking',
          content: 'Show off your culinary skills.',
          icon: 'src/icons/cooking-icon.svg',
          link: 'contest-page.html?contest=cooking'
        },
      ]
    },
    {
      level: 'Silver',
      points: '200pts',
      contests: [
        {
          title: 'DIY Projects',
          content: 'Create and share your DIY projects.',
          icon: 'src/icons/diy-icon.svg',
          link: 'contest-page.html?contest=diy'
        },
        {
          title: 'Fashion and Style',
          content: 'Showcase your fashion sense and style.',
          icon: 'src/icons/fashion-icon.svg',
          link: 'contest-page.html?contest=fashion'
        },
        {
          title: 'Music and Dance',
          content: 'Perform and share your musical talents.',
          icon: 'src/icons/music-icon.svg',
          link: 'contest-page.html?contest=music'
        },
      ]
    },
    {
      level: 'Gold',
      points: '500pts',
      contests: [
        {
          title: 'Art and Illustration',
          content: 'Display your artistic skills and illustrations.',
          icon: 'src/icons/art-icon.svg',
          link: 'contest-page.html?contest=art'
        },
        {
          title: 'Photography',
          content: 'Capture and share stunning photographs.',
          icon: 'src/icons/photography-icon.svg',
          link: 'contest-page.html?contest=photography'
        },
        {
          title: 'Books and Media',
          content: 'Discuss and review your favorite books.',
          icon: 'src/icons/books-and-media-icon.svg',
          link: 'contest-page.html?contest=books'
        },
      ]
    },
    {
      level: 'Platinum',
      points: '1000pts',
      contests: [
        {
          title: 'Science and Innovation',
          content: 'Explore scientific discoveries and innovations.',
          icon: 'src/icons/science-icon.svg',
          link: 'contest-page.html?contest=science'
        },
        {
          title: 'Travel',
          content: 'Share your travel stories and tips.',
          icon: 'src/icons/travel-icon.svg',
          link: 'contest-page.html?contest=travel'
        },
      ]
    },
    // Add more categories if needed
  ];
  

const ContestsPage = () => {
  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="main-container">
          <section className="top-options">
            {/* Top Options Content */}
          </section>
          <div className="main-content">
            <h2 className="page-title">Contests</h2>
            <div className="contests-content">
              {contestCategories.map(category => (
                <section className={`${category.level.toLowerCase()}-content contest-content`} key={category.level}>
                  <h3 className="section-title">{category.level} ({category.points})</h3>
                  <div className="card-row">
                    {category.contests.map(contest => (
                      <Card key={contest.title} {...contest} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Contests;

