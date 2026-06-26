import React, { useState, useMemo } from 'react';
import { Search, Play, Clock } from 'lucide-react';
import { useRadio } from '../App';

const styles = {
  container: {
    minHeight: '100%',
    padding: '40px 24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '32px',
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
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#1a1a2e',
    borderRadius: '12px',
    padding: '12px 16px',
    marginBottom: '32px',
    border: '1px solid rgba(168, 85, 247, 0.15)',
  },
  searchInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  playlistGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '16px',
    marginBottom: '40px',
  },
  playlistCard: (color, active) => ({
    background: active ? `${color}15` : '#12121a',
    border: `1px solid ${active ? color : 'rgba(168, 85, 247, 0.1)'}`,
    borderRadius: '14px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  }),
  playlistName: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '4px',
    letterSpacing: '0.5px',
  },
  playlistDesc: {
    fontSize: '12px',
    color: '#a1a1aa',
    marginBottom: '8px',
  },
  playlistCount: (color) => ({
    fontSize: '11px',
    color: color,
    fontFamily: "'JetBrains Mono', monospace",
  }),
  playlistAccent: (color) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: color,
    borderRadius: '14px 14px 0 0',
  }),
  tableContainer: {
    background: '#12121a',
    borderRadius: '16px',
    border: '1px solid rgba(168, 85, 247, 0.1)',
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '50px 1fr 1fr 80px',
    padding: '12px 20px',
    borderBottom: '1px solid rgba(168, 85, 247, 0.1)',
    fontSize: '11px',
    color: '#a1a1aa',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 600,
  },
  tableRow: (isActive) => ({
    display: 'grid',
    gridTemplateColumns: '50px 1fr 1fr 80px',
    padding: '12px 20px',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    background: isActive ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
  }),
  rowNum: {
    fontSize: '13px',
    color: '#a1a1aa',
  },
  rowTitle: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#ffffff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: '12px',
  },
  rowArtist: {
    fontSize: '13px',
    color: '#a1a1aa',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: '12px',
  },
  rowDuration: {
    fontSize: '12px',
    color: '#a1a1aa',
    fontFamily: "'JetBrains Mono', monospace",
  },
  playIcon: {
    opacity: 0.7,
  },
  noResults: {
    textAlign: 'center',
    padding: '40px',
    color: '#a1a1aa',
    fontSize: '14px',
  },
};

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function OnDemand() {
  const { playlists, tracks, playTrack, currentTrack } = useRadio();
  const [search, setSearch] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const filteredTracks = useMemo(() => {
    let list = tracks;
    if (selectedPlaylist) {
      const pl = playlists.find(p => p.id === selectedPlaylist);
      if (pl) {
        list = tracks.filter(t => pl.trackIds.includes(t.id));
      }
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        t => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q)
      );
    }
    return list;
  }, [tracks, playlists, selectedPlaylist, search]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>On Demand</h1>
        <p style={styles.subtitle}>Explora la biblioteca completa de Eternal Beat Radio</p>
      </div>

      <div style={styles.searchBar}>
        <Search size={18} color="#a1a1aa" />
        <input
          style={styles.searchInput}
          placeholder="Buscar tracks, artistas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={styles.playlistGrid}>
        {playlists.map((pl) => (
          <div
            key={pl.id}
            style={styles.playlistCard(pl.color, selectedPlaylist === pl.id)}
            onClick={() => setSelectedPlaylist(selectedPlaylist === pl.id ? null : pl.id)}
          >
            <div style={styles.playlistAccent(pl.color)} />
            <div style={styles.playlistName}>{pl.name}</div>
            <div style={styles.playlistDesc}>{pl.description}</div>
            <div style={styles.playlistCount(pl.color)}>{pl.trackCount} tracks</div>
          </div>
        ))}
      </div>

      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>
          <span>#</span>
          <span>Título</span>
          <span>Artista</span>
          <span>Duración</span>
        </div>
        {filteredTracks.length > 0 ? (
          filteredTracks.map((track, idx) => (
            <div
              key={track.id}
              style={styles.tableRow(currentTrack?.id === track.id)}
              onClick={() => playTrack(track)}
            >
              <span style={styles.rowNum}>
                {currentTrack?.id === track.id ? (
                  <Play size={14} color="#a855f7" style={styles.playIcon} />
                ) : (
                  idx + 1
                )}
              </span>
              <span style={styles.rowTitle}>{track.title}</span>
              <span style={styles.rowArtist}>{track.artist}</span>
              <span style={styles.rowDuration}>{formatDuration(track.duration)}</span>
            </div>
          ))
        ) : (
          <div style={styles.noResults}>No se encontraron tracks</div>
        )}
      </div>
    </div>
  );
}

export default OnDemand;
