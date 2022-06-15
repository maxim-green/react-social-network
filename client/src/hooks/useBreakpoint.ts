import { useEffect, useState } from 'react';
import breakpoints from '../assets/styles/breakpoints.module.scss';

export const useBreakpoint = () => {
  const [width, setWidth] = useState<number>(0);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.addEventListener('resize', updateDimensions);
  }, []);

  const breakpointsObject: { [key: string]: boolean } = {};
  Object.entries(breakpoints).forEach(([key, value]) => {
    breakpointsObject[key] = width < Number.parseInt(value, 10);
  });

  return breakpointsObject;
};
