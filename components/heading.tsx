import React from 'react';

type HeadingProps = {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
};

export const Heading = ({ children, as = 'h1' }: HeadingProps) => {
  if (as == 'h1') return <h1 className='text-3xl font-bold'>{children}</h1>;
  if (as == 'h2') return <h2 className='text-2xl font-bold'>{children}</h2>;
  if (as == 'h3') return <h3 className='text-xl font-bold'>{children}</h3>;
};
