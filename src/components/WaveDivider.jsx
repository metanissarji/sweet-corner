/**
 * מפריד גלי בין מקטעים. color = צבע הגל (המקטע שמתחת).
 */
export default function WaveDivider({ color = '#ffffff', flip = false }) {
  return (
    <div
      aria-hidden="true"
      style={{
        lineHeight: 0,
        transform: flip ? 'scaleY(-1)' : 'none',
        marginBottom: '-1px',
      }}
    >
      <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '90px', display: 'block' }} preserveAspectRatio="none">
        <path
          d="M0,45 C120,90 240,10 360,40 C480,70 600,15 720,45 C840,75 960,20 1080,45 C1200,70 1320,25 1440,50 L1440,90 L0,90 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
