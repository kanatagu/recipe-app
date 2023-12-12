'use client';

import { useState } from 'react';
import { Rating as SimpleRating } from 'react-simple-star-rating';

type RatingProps = {
  onClick: (rate: number) => void;
};
export function Rating({ onClick }: RatingProps) {
  return (
    <SimpleRating
      onClick={onClick}
      SVGstyle={{ display: 'inline' }}
      size={24}
      // onPointerEnter={onPointerEnter}
      // onPointerLeave={onPointerLeave}
      // onPointerMove={onPointerMove}
      /* Available Props */
    />
  );
}
