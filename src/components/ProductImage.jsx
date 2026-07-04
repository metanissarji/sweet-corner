import { useState } from 'react';
import './ProductImage.css';

/**
 * מציג תמונת מוצר מ-public/images. אם הקובץ עדיין לא קיים,
 * מוצג placeholder מעוצב עם שם הקובץ הצפוי — פשוט שימו את
 * התמונה האמיתית בתיקייה והיא תופיע אוטומטית.
 */
export default function ProductImage({ src, alt, emoji = '🍦', className = '' }) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div className={`product-placeholder ${className}`} role="img" aria-label={alt}>
        <span className="placeholder-emoji" aria-hidden="true">{emoji}</span>
        <span className="placeholder-name">{alt}</span>
        <span className="placeholder-file">{src.replace('/images/', '')}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setMissing(true)}
      loading="lazy"
    />
  );
}
