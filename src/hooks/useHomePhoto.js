import { useEffect, useState } from 'react';

export const HOME_PHOTO = '/images/home-hero-mobile.png';
export const BAG_PHOTO = '/images/bag-hero.jpg';
export const BAG_CLOSED = '/images/bag-closed.jpg';

const cache = new Map(); // src -> true/false

/**
 * בודק אם תמונה קיימת ב-public. מחזיר: 'loading' | true | false
 */
export function useImageExists(src) {
  const [exists, setExists] = useState(cache.has(src) ? cache.get(src) : 'loading');

  useEffect(() => {
    if (cache.has(src)) {
      setExists(cache.get(src));
      return;
    }
    const img = new Image();
    img.onload = () => {
      cache.set(src, true);
      setExists(true);
    };
    img.onerror = () => {
      cache.set(src, false);
      setExists(false);
    };
    img.src = src;
  }, [src]);

  return exists;
}

export default function useHomePhoto() {
  return useImageExists(HOME_PHOTO);
}
