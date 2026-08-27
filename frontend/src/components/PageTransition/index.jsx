import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionClass, setTransitionClass] = useState('page-transition-enter-active');
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Only animate if path actually changed
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;

      // Start exit
      setTransitionClass('page-transition-exit');

      const exitTimer = setTimeout(() => {
        // Swap content and start enter
        setDisplayChildren(children);
        setTransitionClass('page-transition-enter');

        // Trigger reflow then apply enter-active
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTransitionClass('page-transition-enter-active');
          });
        });
      }, 150); // Exit duration

      return () => clearTimeout(exitTimer);
    } else {
      // Same path (initial mount or re-render), just update children
      setDisplayChildren(children);
    }
  }, [location.pathname, children]);

  return (
    <div className={`page-transition ${transitionClass}`}>
      {displayChildren}
    </div>
  );
}
