import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, Disc3, Calendar, MessageCircle } from 'lucide-react';
import { useRadio } from '../App';

const styles = {
  container: {
    minHeight: '100%',
    padding: '40px 24px',
  },
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '60px',
    flexWrap: 'wrap',
  },
  heroLeft: {
    flex: 1,
    minWidth: '300px',
  },
  heroTitle: {
    fontSize: 'clamp(36px, 5vw, 56px)',
    fontWeight: 700,
    lineHeight: 1.1,
    marginBottom: '16px',
    background: 'linear-gradient(135deg, #ff8000 0%, #ffaa44 50%, #ffcc88 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 0 30px rgba(255, 128, 0, 0.3))',
  },
  heroSubtitle: {
    fontSize: '18px',
    color: '#b3b3b3',
    lineHeight: 1.6,
    marginBottom: '32px',
    maxWidth: '500px',
  },
  stats: {
    display: 'flex',
    gap: '32px',
    marginBottom: '32px',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#ff8000',
    textShadow: '0 0 15px rgba(255, 128, 0, 0.4)',
  },
  statLabel: {
    fontSize: '12px',
    color: '#b3b3b3',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  ctas: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  ctaPrimary: {
    padding: '14px 28px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #ff8000, #ffaa44)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 0 30px rgba(255, 128, 0, 0.4), 0 0 60px rgba(255, 128, 0, 0.15)',
    transition: 'all 0.3s ease',
  },
  ctaSecondary: {
    padding: '14px 28px',
    borderRadius: '12px',
    background: 'transparent',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    border: '1px solid rgba(255, 128, 0, 0.35)',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    boxShadow: 'inset 0 0 20px rgba(255, 128, 0, 0.05)',
  },
  heroRight: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '280px',
  },
  visualizer: {
    position: 'relative',
    width: '300px',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: (size, delay) => ({
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    border: `1.5px solid rgba(255, 128, 0, ${0.15 + delay * 0.08})`,
    boxShadow: `0 0 15px rgba(255, 128, 0, ${0.05 + delay * 0.03}), inset 0 0 15px rgba(255, 128, 0, ${0.02 + delay * 0.02})`,
    animation: `spin-slow ${8 + delay * 2}s linear infinite`,
  }),
  centerDot: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ff8000, #ffaa44)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 40px rgba(255, 128, 0, 0.5), 0 0 80px rgba(255, 128, 0, 0.2)',
    animation: 'pulse-glow 3s infinite',
    zIndex: 2,
    border: '2px solid rgba(255, 200, 136, 0.3)',
  },
  features: {
    maxWidth: '1200px',
    margin: '80px auto 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  featureCard: {
    background: 'rgba(26, 26, 26, 0.7)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 128, 0, 0.1)',
    borderRadius: '16px',
    padding: '28px',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'block',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.03)',
  },
  featureIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    border: '1px solid rgba(255, 128, 0, 0.2)',
  },
  featureTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '8px',
  },
  featureDesc: {
    fontSize: '13px',
    color: '#b3b3b3',
    lineHeight: 1.5,
  },
};

const features = [
  {
    icon: Radio,
    title: 'Stream 24/7',
    desc: 'Transmision continua de Progressive House en alta calidad',
    color: '#ff8000',
    path: '/live',
  },
  {
    icon: Disc3,
    title: 'On Demand',
    desc: 'Explora nuestra biblioteca de tracks y playlists curadas',
    color: '#ffaa44',
    path: '/on-demand',
  },
  {
    icon: Calendar,
    title: 'Programacion',
    desc: 'Calendario de shows en vivo y sesiones de DJ',
    color: '#ff9933',
    path: '/schedule',
  },
  {
    icon: MessageCircle,
    title: 'Chat en Vivo',
    desc: 'Conecta con la comunidad mientras escuchas',
    color: '#ffcc88',
    path: '/chat',
  },
];

function Home() {
  const { goLive } = useRadio();

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroLeft}>
          <h1 style={styles.heroTitle}>Eternal Beat Radio Chile</h1>
          <p style={styles.heroSubtitle}>
            Tu estacion de Progressive House, Melodic Techno y Minimal las 24 horas del dia, los 7 dias de la semana. Desde Chile para el mundo.
          </p>
          <div style={styles.stats}>
            <div style={styles.stat}>
              <span style={styles.statValue}>24/7</span>
              <span style={styles.statLabel}>Streaming</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statValue}>HiFi</span>
              <span style={styles.statLabel}>320kbps</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statValue}>Live</span>
              <span style={styles.statLabel}>DJ Sets</span>
            </div>
          </div>
          <div style={styles.ctas}>
            <Link to="/live" style={styles.ctaPrimary} onClick={goLive}>
              <Radio size={18} />
              Escuchar en Vivo
            </Link>
            <Link to="/on-demand" style={styles.ctaSecondary}>
              <Disc3 size={18} />
              On Demand
            </Link>
          </div>
        </div>
        <div style={styles.heroRight}>
          <div style={styles.visualizer}>
            {[280, 230, 180, 130].map((size, i) => (
              <div key={i} style={styles.circle(size, i)} />
            ))}
            <div style={styles.centerDot}>
              <Radio size={32} color="#fff" />
            </div>
          </div>
        </div>
      </div>

      <div style={styles.features}>
        {features.map((f) => (
          <Link key={f.path} to={f.path} style={styles.featureCard}>
            <div style={{ ...styles.featureIcon, background: `rgba(255, 128, 0, 0.1)` }}>
              <f.icon size={24} color={f.color} />
            </div>
            <h3 style={styles.featureTitle}>{f.title}</h3>
            <p style={styles.featureDesc}>{f.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
