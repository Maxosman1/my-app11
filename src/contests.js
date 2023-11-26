// ContestsPage.js
import React from 'react';
import Card from '../src/Components/Card/card';
import Header from '../src/Components/Header/Header'; // Assuming you already have a Header component
import Footer from '../src/Components/Footer/Footer'; // Assuming you already have a Footer component
import OpinionsIcon from '../src/icons/opinions-icon.svg';
import TechAndGadgetsIcon from '../src/icons/TechAndGadgetsIcon.svg';
import HomeAndKitchenIcon from '../src/icons/HomeAndKitchenIcon.svg';
import BeautyAndHealthIcon from '../src/icons/BeautyAndHealthIcon.svg';
import AutoAndTravelIcon from '../src/icons/AutoIcon.svg';
import BooksAndMediaIcon from '../src/icons/BooksAndMediaIcon.svg';
import FashionIcon from '../src/icons/FashionIcon.svg';
import SportsAndOutdoorsIcon from '../src/icons/SportsAndOutdoorsIcon.svg';
import ToysAndGamesIcon from '../src/icons/ToysAndGamesIcon.svg';
import LuxuryItemsIcon from '../src/icons/luxuryItemsIcon.svg';
import HighEndTechIcon from '../src/icons/HighEndTechIcon.svg';
import FineArtIcon from '../src/icons/FineArtIcon.svg';
import '../src/contestpage.css'


const contestsData = [
  {
    id: 'bronze-category-contests',
    label: 'Bronze (50-100pts)',
    contests: [
      {
        id: 'opinions',
        label: 'Opinions',
        icon: OpinionsIcon,
        description: 'Broadcast your thoughts, engage in debate.'
      },
      {
        id: 'tech-and-gadgets',
        label: 'Tech & Gadgets',
        icon: TechAndGadgetsIcon,
        description: 'Explore, review, discuss latest technology.'
      },
      {
        id: 'home-and-kitchen',
        label: 'Home & Kitchen',
        icon: HomeAndKitchenIcon,
        description: 'Share insights on domestic essentials.'
      }
    ]
  },
  {
    id: 'silver-category-contests',
    label: 'Silver (100-200pts)',
    contests: [
      {
        id: 'beauty-and-health',
        label: 'Beauty & Health',
        icon: BeautyAndHealthIcon,
        description: 'Experience wellness with superior products.'
      },
      {
        id: 'auto-and-travel',
        label: 'Auto & Travel',
        icon: AutoAndTravelIcon,
        description: 'Navigate the world, one review at a time.'
      },
      {
        id: 'books-and-media',
        label: 'Books & Media',
        icon: BooksAndMediaIcon,
        description: 'Unveil literary gems and entertainment.'
      }
    ]
  },
  {
    id: 'gold-category-contests',
    label: 'Gold (200-500pts)',
    contests: [
      {
        id: 'fashion',
        label: 'Fashion',
        icon: FashionIcon,
        description: 'Stay trendy with stylish updates.'
      },
      {
        id: 'sports-and-outdoors',
        label: 'Sports & Outdoors',
        icon: SportsAndOutdoorsIcon,
        description: 'Join in athletic gear showdowns.'
      },
      {
        id: 'toys-and-games',
        label: 'Toys & Games',
        icon: ToysAndGamesIcon,
        description: 'Share the fun with toy and game showdowns.'
      }
    ]
  },
  {
    id: 'platinum-category-contests',
    label: 'Platinum (500-1000pts)',
    contests: [
      {
        id: 'luxury-items',
        label: 'Luxury Items',
        icon: LuxuryItemsIcon,
        description: 'Review and rate the finest luxuries.'
      },
      {
        id: 'high-end-tech',
        label: 'High-End Tech',
        icon: HighEndTechIcon,
        description: 'Experience technological innovation.'
      },
      {
        id: 'fine-art',
        label: 'Fine Art',
        icon: FineArtIcon,
        description: 'Appraise and discuss exquisite art pieces.'
      }
    ]
  },
  // Add more categories if needed
];

const ContestsPage = () => {
  return (
    <div>
      <Header />
      {contestsData.map((category) => (
        <section key={category.id} className="my-5">
          <h2 className="text-center my-3">{category.label}</h2>
          <div className="d-flex flex-wrap justify-content-center">
            {category.contests.map((contest) => (
              <Card
                key={contest.id}
                title={contest.label}
                content={contest.description}
                icon={contest.icon}
                link={`contest-page.html?contest=${contest.id}`}
              />
            ))}
          </div>
        </section>
      ))}
      <Footer />
    </div>
  );
};


export default ContestsPage;