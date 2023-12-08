import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

type StarsProps = {
  rating: number;
};
export const Stars = ({ rating }: StarsProps) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStars;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`${i}-full`} />);
  }
  for (let i = 0; i < halfStars; i++) {
    stars.push(<FaStarHalfAlt key={`${i}-half`} />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`${i}-empty`} />);
  }

  return <div className='flex items-center text-primary gap-1'>{stars}</div>;
};
