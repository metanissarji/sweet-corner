/**
 * תגית מסתובבת בשתי שורות (ורוד + צהוב) כמו בעיצוב:
 * <LabelTag top="מועדים" bottom="שמנצחים" />
 */
export default function LabelTag({ top, bottom, flip = false, className = '' }) {
  return (
    <div className={`label-tag ${flip ? 'tag-flip' : ''} ${className}`}>
      <span className="tag-top">{top}</span>
      <span className="tag-bottom">{bottom}</span>
    </div>
  );
}
