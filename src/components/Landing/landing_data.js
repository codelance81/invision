import image1 from '../../assests/images/1.jpg'
import image2 from '../../assests/images/2.jpg'
import image3 from '../../assests/images/3.jpg'
import image4 from '../../assests/images/4.jpg';

const contentArray = [
  {
    id:1, 
    image:image1,
    title:'Investing.Now for the rest of us',
    summary:'Robinhood lets you invest in the stock market for free, directly from your phone or desktop.', 
    order: 'left'
  },
  {
    id:2, 
    image:image2, 
    title:'No manual needed.',
    summary:'We’ve designed Robinhood from the ground up for the next generation of newcomers and experts alike It’s fast, dead simple and just works.',
    order: 'right',
  },
  {
    id:3, 
    image:image3, 
    title:'Learn by doing.',
    summary:'With Robinhood, you can learn to invest in the stock market as you build out your portfolio.Discover new stocks through Collections, track your favorites with a personalized news feed, and more',
    order: 'left'
  },
  {
    id:4, 
    image:image4,
    title:'Introducing Free Options Trading',
    summary:'Find out how to trade options the Robinhood way .It’s quick, straightforward & free.',
    order: 'right'
  }  
];

export { contentArray };