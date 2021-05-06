import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

const useLocationChange = (action) => {
  const location = useLocation();
  const prevLocation = usePrevious(location.pathname);

  useEffect(() => {
    action(location.pathname, prevLocation);
  }, [location]);
};

export { useLocationChange };
