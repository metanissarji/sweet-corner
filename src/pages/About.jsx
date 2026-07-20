import { Link } from 'react-router-dom';
import FeatureStrip from '../components/FeatureStrip.jsx';
import WaveDivider from '../components/WaveDivider.jsx';
import { useLang } from '../context/LanguageContext.jsx';

export default function About() {
  const { t } = useLang();

  return (
    <>
      <header className="page-header">
        <h1>{t('about.title')}</h1>
        <p>{t('about.sub')}</p>
      </header>

      <section className="page-section" style={{ paddingBottom: 0 }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <p style={{ fontSize: '1.15rem', marginBottom: '1.2rem' }}>{t('about.p1')}</p>
          <p style={{ fontSize: '1.15rem', marginBottom: '1.2rem' }}>{t('about.p2')}</p>
          <p style={{ fontSize: '1.15rem', marginBottom: '2.5rem' }}>{t('about.p3')}</p>
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <Link to="/branches" className="btn btn-pink">{t('about.cta')}</Link>
          </div>
        </div>
        <WaveDivider color="#ffffff" />
      </section>

      <FeatureStrip />
    </>
  );
}
