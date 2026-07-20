import { useCallback, useEffect, useState } from 'react';
import { useLang } from '../context/LanguageContext.jsx';
import './Lightbox.css';

/**
 * לייטבוקס גלובלי: לחיצה על כל תמונת מוצר פותחת אותה במסך מלא.
 * האזנה בדלגציה — עובד אוטומטית על כל תמונות המוצר בכל העמודים,
 * בלי לחווט כל עמוד בנפרד. תמונות בתוך קישור (למשל מקפיא) מדולגות —
 * שם הלחיצה מנווטת.
 */
const PHOTO_SELECTOR = '.product-photo img, .show-card-photo img, .bs-card-img img';

export default function Lightbox() {
  const { t } = useLang();
  const [photo, setPhoto] = useState(null); // { src, alt }
  const close = useCallback(() => setPhoto(null), []);

  useEffect(() => {
    function onClick(e) {
      const img = e.target.closest ? e.target.closest(PHOTO_SELECTOR) : null;
      if (!img || img.closest('a')) return;
      setPhoto({ src: img.currentSrc || img.src, alt: img.alt || '' });
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!photo) return;
    function onKey(e) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [photo, close]);

  if (!photo) return null;

  return (
    <div className="lightbox-backdrop" onClick={close} role="dialog" aria-modal="true" aria-label={photo.alt || 'תמונת מוצר מוגדלת'}>
      <button className="lightbox-close" onClick={close} aria-label={t('lightbox.close')}>✕</button>
      <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt={photo.alt} />
      </div>
      <p className="lightbox-hint">{t('lightbox.hint')}</p>
    </div>
  );
}
