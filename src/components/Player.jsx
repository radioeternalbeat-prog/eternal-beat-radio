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
    background: 'rgba(10, 10, 15, 0.95)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(168, 85, 247, 0.15)',
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
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
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
    color: '#a1a1aa',
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
    color: '#a1a1aa',
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
    background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
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
    background: '#1a1a2e',
    outline: 'none',
    cursor: 'pointer',
    border: 'none',
    padding: 0,
  },
  liveBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '20px',
    background: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid rgba(239, 68, 68, 0.4)',
    fontSize: '11px',
    fontWeight: 600,
    color: '#ef4444',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  liveDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#ef4444',
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
    background: 'linear-gradient(to top, #a855f7, #06b6d4)',
    borderRadius: '2px',
    animation: 'equalizer 0.8s ease-in-out infinite',
  },
  noTrack: {
    fontSize: '13px',
    color: '#a1a1aa',
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
          <Volume2 size={16} color="#a1a1aa" />
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
