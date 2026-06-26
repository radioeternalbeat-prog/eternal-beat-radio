import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Music, List } from 'lucide-react';
import { useRadio } from '../App';

const styles = {
  container: {
    minHeight: '100%',
    padding: '40px 24px',
    maxWidth: '900px',
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
  dropZone: (isDragging) => ({
    border: `2px dashed ${isDragging ? '#a855f7' : 'rgba(168, 85, 247, 0.3)'}`,
    borderRadius: '16px',
    padding: '60px 40px',
    textAlign: 'center',
    background: isDragging ? 'rgba(168, 85, 247, 0.05)' : '#12121a',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    marginBottom: '32px',
  }),
  dropIcon: {
    marginBottom: '16px',
  },
  dropTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '8px',
  },
  dropSubtitle: {
    fontSize: '13px',
    color: '#a1a1aa',
    marginBottom: '16px',
  },
  browseBtn: {
    padding: '10px 24px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  instructions: {
    background: '#12121a',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid rgba(168, 85, 247, 0.1)',
    marginBottom: '32px',
  },
  instructionsTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  step: {
    display: 'flex',
    gap: '12px',
    padding: '10px 0',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
  },
  stepNum: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: 'rgba(168, 85, 247, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 700,
    color: '#a855f7',
    flexShrink: 0,
  },
  stepText: {
    fontSize: '13px',
    color: '#a1a1aa',
    lineHeight: 1.5,
  },
  results: {
    background: '#12121a',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid rgba(16, 185, 129, 0.2)',
  },
  resultsTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#10b981',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
    marginBottom: '16px',
  },
  statCard: {
    padding: '16px',
    borderRadius: '10px',
    background: 'rgba(16, 185, 129, 0.05)',
    border: '1px solid rgba(16, 185, 129, 0.1)',
    textAlign: 'center',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#10b981',
    marginBottom: '4px',
  },
  statLabel: {
    fontSize: '11px',
    color: '#a1a1aa',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  errorBox: {
    background: '#12121a',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid rgba(239, 68, 68, 0.2)',
  },
  errorTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#ef4444',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  errorText: {
    fontSize: '13px',
    color: '#a1a1aa',
  },
  hiddenInput: {
    display: 'none',
  },
};

function parseITunesXML(xmlText) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

  const tracks = [];
  const playlists = [];

  // Parse tracks from the main dict
  const dicts = xmlDoc.querySelectorAll('dict > dict > dict');
  dicts.forEach((dict) => {
    const keys = dict.querySelectorAll(':scope > key');
    const track = {};
    keys.forEach((key) => {
      const nextEl = key.nextElementSibling;
      if (!nextEl) return;
      const k = key.textContent;
      const v = nextEl.textContent;
      if (k === 'Track ID') track.id = v;
      if (k === 'Name') track.title = v;
      if (k === 'Artist') track.artist = v;
      if (k === 'Genre') track.genre = v;
      if (k === 'Total Time') track.duration = Math.round(parseInt(v) / 1000);
    });
    if (track.title && track.artist) {
      tracks.push(track);
    }
  });

  // Parse playlists from the array
  const arrays = xmlDoc.querySelectorAll('array > dict');
  arrays.forEach((dict) => {
    const keys = dict.querySelectorAll(':scope > key');
    const playlist = { trackIds: [] };
    keys.forEach((key) => {
      const nextEl = key.nextElementSibling;
      if (!nextEl) return;
      const k = key.textContent;
      if (k === 'Name') playlist.name = nextEl.textContent;
      if (k === 'Playlist ID') playlist.id = `imported-${nextEl.textContent}`;
      if (k === 'Playlist Items') {
        const items = nextEl.querySelectorAll('dict');
        items.forEach(item => {
          const intEl = item.querySelector('integer');
          if (intEl) playlist.trackIds.push(intEl.textContent);
        });
      }
    });
    if (playlist.name && !playlist.name.startsWith('####') && playlist.name !== 'Library') {
      playlists.push(playlist);
    }
  });

  return { tracks, playlists };
}

function Import() {
  const { setTracks, setPlaylists, tracks, playlists } = useRadio();
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFile = useCallback((file) => {
    if (!file || !file.name.endsWith('.xml')) {
      setError('Por favor selecciona un archivo XML válido de iTunes.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const { tracks: newTracks, playlists: newPlaylists } = parseITunesXML(e.target.result);

        if (newTracks.length === 0) {
          setError('No se encontraron tracks en el archivo XML. Verifica que sea un export válido de iTunes.');
          return;
        }

        // Merge with existing
        const mergedTracks = [...tracks];
        newTracks.forEach(t => {
          if (!mergedTracks.find(et => et.id === t.id)) {
            mergedTracks.push(t);
          }
        });

        const mergedPlaylists = [...playlists];
        newPlaylists.forEach(p => {
          if (!mergedPlaylists.find(ep => ep.id === p.id)) {
            mergedPlaylists.push({
              ...p,
              color: '#a855f7',
              description: 'Importada desde iTunes',
              trackCount: p.trackIds.length,
            });
          }
        });

        setTracks(mergedTracks);
        setPlaylists(mergedPlaylists);
        setResult({ tracks: newTracks.length, playlists: newPlaylists.length });
        setError(null);
      } catch (err) {
        setError('Error al parsear el archivo XML. Verifica que sea un export válido de iTunes/Music.');
      }
    };
    reader.readAsText(file);
  }, [tracks, playlists, setTracks, setPlaylists]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e) => {
    handleFile(e.target.files[0]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Importar desde iTunes</h1>
        <p style={styles.subtitle}>Importa tu biblioteca de iTunes/Apple Music a Eternal Beat Radio</p>
      </div>

      <div
        style={styles.dropZone(isDragging)}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <div style={styles.dropIcon}>
          <Upload size={48} color="#a855f7" />
        </div>
        <div style={styles.dropTitle}>Arrastra tu archivo XML aquí</div>
        <div style={styles.dropSubtitle}>o haz click para seleccionar el archivo</div>
        <button style={styles.browseBtn}>
          <FileText size={16} />
          Seleccionar XML
        </button>
        <input
          id="fileInput"
          type="file"
          accept=".xml"
          style={styles.hiddenInput}
          onChange={handleInputChange}
        />
      </div>

      {result && (
        <div style={styles.results}>
          <div style={styles.resultsTitle}>
            <CheckCircle size={20} />
            Importación Exitosa
          </div>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{result.tracks}</div>
              <div style={styles.statLabel}>Tracks</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{result.playlists}</div>
              <div style={styles.statLabel}>Playlists</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{tracks.length}</div>
              <div style={styles.statLabel}>Total Biblioteca</div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div style={styles.errorBox}>
          <div style={styles.errorTitle}>
            <AlertCircle size={20} />
            Error de Importación
          </div>
          <p style={styles.errorText}>{error}</p>
        </div>
      )}

      <div style={styles.instructions}>
        <div style={styles.instructionsTitle}>
          <List size={18} color="#a855f7" />
          Cómo exportar desde iTunes / Apple Music
        </div>
        <div style={styles.step}>
          <div style={styles.stepNum}>1</div>
          <div style={styles.stepText}>
            Abre <strong>iTunes</strong> (Windows) o <strong>Music</strong> (macOS)
          </div>
        </div>
        <div style={styles.step}>
          <div style={styles.stepNum}>2</div>
          <div style={styles.stepText}>
            Ve al menú <strong>Archivo → Biblioteca → Exportar biblioteca...</strong>
          </div>
        </div>
        <div style={styles.step}>
          <div style={styles.stepNum}>3</div>
          <div style={styles.stepText}>
            Guarda el archivo como <strong>Library.xml</strong> en tu computador
          </div>
        </div>
        <div style={styles.step}>
          <div style={styles.stepNum}>4</div>
          <div style={styles.stepText}>
            Arrastra el archivo XML a la zona de arriba o usa el botón para seleccionarlo
          </div>
        </div>
        <div style={styles.step}>
          <div style={styles.stepNum}>5</div>
          <div style={styles.stepText}>
            Los tracks y playlists se agregarán automáticamente a tu biblioteca en On Demand
          </div>
        </div>
      </div>
    </div>
  );
}

export default Import;
