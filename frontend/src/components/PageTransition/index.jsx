import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionClass, setTransitionClass] = useState('page-transition-enter-active');
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;

      setTransitionClass('page-transition-exit');

      const exitTimer = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionClass('page-transition-enter');

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTransitionClass('page-transition-enter-active');
          });
        });
      }, 150);

      return () => clearTimeout(exitTimer);
    } else {
      setDisplayChildren(children);
    }
  }, [location.pathname, children]);

  return (
    <div className={`page-transition ${transitionClass}`}>
      {displayChildren}
    </div>
  );
}
