import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useRadio } from '../App';

const styles = {
  container: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 'var(--player-height)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    background: 'rgba(13, 13, 13, 0.92)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderTop: '1px solid rgba(255, 128, 0, 0.12)',
    boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.4), 0 -1px 0 rgba(255, 128, 0, 0.08)',
    zIndex: 1000,
    gap: '20px',
  },
  trackInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    minWidth: 0,
  },
  artwork: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #ff8000, #ffaa44)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 0 20px rgba(255, 128, 0, 0.3)',
    border: '1px solid rgba(255, 128, 0, 0.3)',
  },
  trackText: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  trackTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  trackArtist: {
    fontSize: '12px',
    color: '#b3b3b3',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  skipBtn: {
    background: 'transparent',
    border: 'none',
    color: '#b3b3b3',
    padding: '8px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  skipBtnDisabled: {
    opacity: 0.3,
    cursor: 'not-allowed',
  },
  playBtn: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ff8000, #ffaa44)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 0 25px rgba(255, 128, 0, 0.5), 0 0 50px rgba(255, 128, 0, 0.2)',
    transition: 'all 0.3s ease',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flex: 1,
    justifyContent: 'flex-end',
  },
  volumeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  volumeSlider: {
    WebkitAppearance: 'none',
    appearance: 'none',
    width: '80px',
    height: '4px',
    borderRadius: '2px',
    background: '#2a2a2a',
    outline: 'none',
    cursor: 'pointer',
    border: 'none',
    padding: 0,
    accentColor: '#ff8000',
  },
  liveBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '20px',
    background: 'rgba(255, 128, 0, 0.12)',
    border: '1px solid rgba(255, 128, 0, 0.35)',
    fontSize: '11px',
    fontWeight: 600,
    color: '#ff8000',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 0 15px rgba(255, 128, 0, 0.15)',
  },
  liveDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#ff8000',
    boxShadow: '0 0 8px rgba(255, 128, 0, 0.8)',
    animation: 'pulse-glow 1.5s infinite',
  },
  equalizer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '2px',
    height: '20px',
  },
  eqBar: {
    width: '3px',
    background: 'linear-gradient(to top, #ff8000, #ffcc88)',
    borderRadius: '2px',
    animation: 'equalizer 0.8s ease-in-out infinite',
  },
  noTrack: {
    fontSize: '13px',
    color: '#666666',
    fontStyle: 'italic',
  },
};

function Player() {
  const { currentTrack, isPlaying, isLive, togglePlay, nextTrack, prevTrack, volume, setVolume } = useRadio();

  return (
    <div style={styles.container}>
      <div style={styles.trackInfo}>
        <div style={styles.artwork}>
          {isPlaying && (
            <div style={styles.equalizer}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    ...styles.eqBar,
                    height: '4px',
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          )}
          {!isPlaying && (
            <span style={{ fontSize: '18px', color: '#fff', fontWeight: 700 }}>EB</span>
          )}
        </div>
        {currentTrack ? (
          <div style={styles.trackText}>
            <span style={styles.trackTitle}>{currentTrack.title}</span>
            <span style={styles.trackArtist}>{currentTrack.artist}</span>
          </div>
        ) : (
          <span style={styles.noTrack}>Selecciona un track o conecta en vivo</span>
        )}
      </div>

      <div style={styles.controls}>
        <button
          style={{ ...styles.skipBtn, ...(isLive ? styles.skipBtnDisabled : {}) }}
          onClick={prevTrack}
          disabled={isLive}
        >
          <SkipBack size={18} />
        </button>
        <button style={styles.playBtn} onClick={togglePlay}>
          {isPlaying ? <Pause size={20} color="#fff" /> : <Play size={20} color="#fff" style={{ marginLeft: '2px' }} />}
        </button>
        <button
          style={{ ...styles.skipBtn, ...(isLive ? styles.skipBtnDisabled : {}) }}
          onClick={nextTrack}
          disabled={isLive}
        >
          <SkipForward size={18} />
        </button>
      </div>

      <div style={styles.rightSection}>
        {isLive && (
          <div style={styles.liveBadge}>
            <div style={styles.liveDot} />
            <span>LIVE</span>
          </div>
        )}
        <div style={styles.volumeContainer}>
          <Volume2 size={16} color="#b3b3b3" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={styles.volumeSlider}
          />
        </div>
      </div>
    </div>
  );
}

export default Player;
