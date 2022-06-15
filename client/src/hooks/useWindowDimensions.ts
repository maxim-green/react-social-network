import { useEffect, useState } from 'react';

const getWindowDimensions = (): [number, number] => ([window.innerWidth, window.innerHeight]);
export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<[number, number]>(getWindowDimensions());
  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
