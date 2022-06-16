import { useEffect, useState } from 'react';

const getWindowDimensions = (): {
  width: number
  height: number,
} => ({ width: window.innerWidth, height: window.innerHeight });

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number
    height: number,
  }>(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
