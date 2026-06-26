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
    background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: '18px',
    color: '#a1a1aa',
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
    color: '#a855f7',
  },
  statLabel: {
    fontSize: '12px',
    color: '#a1a1aa',
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
    background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)',
    transition: 'all 0.3s ease',
  },
  ctaSecondary: {
    padding: '14px 28px',
    borderRadius: '12px',
    background: 'transparent',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    border: '1px solid rgba(168, 85, 247, 0.4)',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
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
  circle: (size, delay, color) => ({
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    border: `2px solid ${color}`,
    opacity: 0.3,
    animation: `spin-slow ${8 + delay * 2}s linear infinite`,
  }),
  centerDot: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 60px rgba(168, 85, 247, 0.5)',
    animation: 'pulse-glow 3s infinite',
    zIndex: 2,
  },
  features: {
    maxWidth: '1200px',
    margin: '80px auto 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  featureCard: {
    background: '#12121a',
    border: '1px solid rgba(168, 85, 247, 0.1)',
    borderRadius: '16px',
    padding: '28px',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'block',
  },
  featureIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  featureTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '8px',
  },
  featureDesc: {
    fontSize: '13px',
    color: '#a1a1aa',
    lineHeight: 1.5,
  },
};

const features = [
  {
    icon: Radio,
    title: 'Stream 24/7',
    desc: 'Transmisión continua de Progressive House en alta calidad',
    color: '#a855f7',
    path: '/live',
  },
  {
    icon: Disc3,
    title: 'On Demand',
    desc: 'Explora nuestra biblioteca de tracks y playlists curadas',
    color: '#06b6d4',
    path: '/on-demand',
  },
  {
    icon: Calendar,
    title: 'Programación',
    desc: 'Calendario de shows en vivo y sesiones de DJ',
    color: '#ec4899',
    path: '/schedule',
  },
  {
    icon: MessageCircle,
    title: 'Chat en Vivo',
    desc: 'Conecta con la comunidad mientras escuchas',
    color: '#10b981',
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
            Tu estación de Progressive House, Melodic Techno y Minimal las 24 horas del día, los 7 días de la semana. Desde Chile para el mundo.
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
              <div
                key={i}
                style={styles.circle(size, i, i % 2 === 0 ? 'rgba(168,85,247,0.4)' : 'rgba(6,182,212,0.4)')}
              />
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
            <div style={{ ...styles.featureIcon, background: `${f.color}20` }}>
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
