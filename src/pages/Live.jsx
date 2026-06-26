import React, { useState } from 'react';
import { Play, Pause, Heart, Share2, Users, Radio } from 'lucide-react';
import { useRadio } from '../App';

const styles = {
  container: {
    minHeight: '100%',
    padding: '40px 24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#a1a1aa',
    fontSize: '14px',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: '24px',
    alignItems: 'start',
  },
  visualizerSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '32px',
  },
  visualizer: {
    position: 'relative',
    width: '320px',
    height: '320px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: (size, color, duration) => ({
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    border: `2px solid ${color}`,
    opacity: 0.4,
    animation: `spin-slow ${duration}s linear infinite`,
  }),
  playBtnLarge: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 0 60px rgba(168, 85, 247, 0.5)',
    animation: 'pulse-glow 3s infinite',
    zIndex: 2,
    transition: 'all 0.3s ease',
  },
  infoPanel: {
    background: '#12121a',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid rgba(168, 85, 247, 0.1)',
    width: '100%',
    maxWidth: '500px',
  },
  showInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  showName: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#fff',
  },
  showDetail: {
    fontSize: '13px',
    color: '#a1a1aa',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    marginTop: '16px',
  },
  actionBtn: {
    padding: '10px 16px',
    borderRadius: '10px',
    background: 'rgba(168, 85, 247, 0.1)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    color: '#a1a1aa',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  listenersBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    borderRadius: '10px',
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    fontSize: '13px',
    color: '#10b981',
  },
  djToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    background: '#1a1a2e',
    marginTop: '16px',
  },
  toggleSwitch: (active) => ({
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    background: active ? '#a855f7' : '#333',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
    padding: 0,
  }),
  toggleDot: (active) => ({
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: '#fff',
    position: 'absolute',
    top: '3px',
    left: active ? '23px' : '3px',
    transition: 'all 0.3s ease',
  }),
  sidebar: {
    background: '#12121a',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid rgba(168, 85, 247, 0.1)',
  },
  sidebarTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  historyItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  historyNum: {
    fontSize: '11px',
    color: '#a1a1aa',
    width: '20px',
  },
  historyInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  historyTitle: {
    fontSize: '13px',
    color: '#fff',
    fontWeight: 500,
  },
  historyArtist: {
    fontSize: '11px',
    color: '#a1a1aa',
  },
};

const recentHistory = [
  { title: 'Eternal Sunrise', artist: 'Brian Cid' },
  { title: 'Turquoise (Guy J Remix)', artist: 'Guy J' },
  { title: 'Core Heat', artist: 'Hernan Cattaneo & Marcelo Vasami' },
  { title: 'Inner Light', artist: 'Simos Tagias & Roger Martinez' },
  { title: 'Ouverture (Khen Remix)', artist: 'Khen' },
  { title: 'Carolina', artist: 'Khen' },
  { title: 'Milestone', artist: 'Guy J' },
];

function Live() {
  const { isPlaying, isLive, goLive, togglePlay, djLive, setDjLive } = useRadio();
  const [liked, setLiked] = useState(false);

  const handlePlay = () => {
    if (!isLive) {
      goLive();
    } else {
      togglePlay();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>En Vivo</h1>
        <p style={styles.subtitle}>Transmisión en directo desde Eternal Beat Radio Chile</p>
      </div>

      <div style={styles.mainGrid}>
        <div style={styles.visualizerSection}>
          <div style={styles.visualizer}>
            {[300, 250, 200, 150, 100].map((size, i) => (
              <div
                key={i}
                style={styles.ring(
                  size,
                  i % 2 === 0 ? 'rgba(168,85,247,0.4)' : 'rgba(6,182,212,0.3)',
                  6 + i * 2
                )}
              />
            ))}
            <button style={styles.playBtnLarge} onClick={handlePlay}>
              {isPlaying && isLive ? <Pause size={40} color="#fff" /> : <Play size={40} color="#fff" style={{ marginLeft: '4px' }} />}
            </button>
          </div>

          <div style={styles.infoPanel}>
            <div style={styles.showInfo}>
              <span style={styles.showName}>
                {djLive ? 'DJ Live Session' : 'AutoDJ — Progressive House Mix'}
              </span>
              <span style={styles.showDetail}>
                {djLive ? 'Transmisión en vivo desde el estudio' : 'Selección automática de tracks curados'}
              </span>
            </div>

            <div style={styles.actions}>
              <button style={styles.actionBtn} onClick={() => setLiked(!liked)}>
                <Heart size={14} fill={liked ? '#ec4899' : 'none'} color={liked ? '#ec4899' : '#a1a1aa'} />
                {liked ? 'Te gusta' : 'Me gusta'}
              </button>
              <button style={styles.actionBtn}>
                <Share2 size={14} />
                Compartir
              </button>
              <div style={styles.listenersBar}>
                <Users size={14} />
                <span>42 escuchando</span>
              </div>
            </div>

            <div style={styles.djToggle}>
              <Radio size={16} color={djLive ? '#a855f7' : '#a1a1aa'} />
              <span style={{ fontSize: '13px', color: djLive ? '#fff' : '#a1a1aa', flex: 1 }}>
                DJ Live Mode
              </span>
              <button style={styles.toggleSwitch(djLive)} onClick={() => setDjLive(!djLive)}>
                <div style={styles.toggleDot(djLive)} />
              </button>
            </div>
          </div>
        </div>

        <div style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Historial Reciente</h3>
          {recentHistory.map((track, i) => (
            <div key={i} style={styles.historyItem}>
              <span style={styles.historyNum}>{i + 1}</span>
              <div style={styles.historyInfo}>
                <span style={styles.historyTitle}>{track.title}</span>
                <span style={styles.historyArtist}>{track.artist}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Live;
