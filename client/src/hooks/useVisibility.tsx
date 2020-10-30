import { createRef, useEffect, useState } from 'react';

export default function useVisibility<Element extends HTMLElement>(
  offset = 0
): [boolean, React.RefObject<Element>] {
  const [isVisible, setIsVisible] = useState(false);
  const currentElement = createRef<Element>();

  const onScroll = () => {
    if (!currentElement.current) {
      setIsVisible(false);
      return;
    }
    const top = currentElement.current.getBoundingClientRect().top;
    const visible = top + offset >= 0 && top - offset <= window.innerHeight;
    setIsVisible(visible);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  });

  return [isVisible, currentElement];
}
