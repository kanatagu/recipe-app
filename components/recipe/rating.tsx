'use client';

import { useState } from 'react';
import { Rating as SimpleRating } from 'react-simple-star-rating';

export function Rating() {
  const [rating, setRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <SimpleRating
      onClick={handleRating}
      SVGstyle={{ display: 'inline' }}
      size={24}
      // onPointerEnter={onPointerEnter}
      // onPointerLeave={onPointerLeave}
      // onPointerMove={onPointerMove}
      /* Available Props */
    />
  );
}
