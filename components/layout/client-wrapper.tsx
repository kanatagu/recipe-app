'use client';

import React, { useState, useEffect } from 'react';

type ClientOnlyProps = {
  children: React.ReactNode;
};

export const ClientWrapper: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
};
