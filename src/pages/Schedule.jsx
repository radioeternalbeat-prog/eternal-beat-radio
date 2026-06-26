import React, { useState } from 'react';
import { User, Bot } from 'lucide-react';

const styles = {
  container: {
    minHeight: '100%',
    padding: '40px 24px',
    maxWidth: '1000px',
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
  daySelector: {
    display: 'flex',
    gap: '8px',
    marginBottom: '32px',
    overflowX: 'auto',
    paddingBottom: '8px',
  },
  dayBtn: (active) => ({
    padding: '10px 18px',
    borderRadius: '10px',
    background: active ? 'linear-gradient(135deg, #a855f7, #06b6d4)' : '#1a1a2e',
    color: active ? '#ffffff' : '#a1a1aa',
    fontSize: '13px',
    fontWeight: 600,
    border: active ? 'none' : '1px solid rgba(168, 85, 247, 0.1)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.3s ease',
  }),
  legend: {
    display: 'flex',
    gap: '20px',
    marginBottom: '24px',
    padding: '12px 16px',
    background: '#12121a',
    borderRadius: '10px',
    border: '1px solid rgba(168, 85, 247, 0.1)',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#a1a1aa',
  },
  legendDot: (color) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: color,
  }),
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  slot: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr auto',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 20px',
    background: '#12121a',
    borderRadius: '12px',
    border: '1px solid rgba(168, 85, 247, 0.05)',
    transition: 'all 0.3s ease',
  },
  time: {
    fontSize: '13px',
    fontFamily: "'JetBrains Mono', monospace",
    color: '#a1a1aa',
  },
  showInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  showName: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
  },
  showGenre: {
    fontSize: '12px',
    color: '#a1a1aa',
  },
  badge: (type) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: 600,
    background: type === 'dj' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(6, 182, 212, 0.15)',
    color: type === 'dj' ? '#a855f7' : '#06b6d4',
    border: `1px solid ${type === 'dj' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(6, 182, 212, 0.3)'}`,
  }),
};

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const scheduleData = {
  Lunes: [
    { time: '00:00', name: 'Deep Night Flow', genre: 'Progressive House', type: 'auto' },
    { time: '06:00', name: 'Morning Grooves', genre: 'Minimal House', type: 'auto' },
    { time: '10:00', name: 'Midday Progressive', genre: 'Progressive House', type: 'auto' },
    { time: '14:00', name: 'Afternoon Melodics', genre: 'Melodic Techno', type: 'auto' },
    { time: '18:00', name: 'Sunset Session', genre: 'Progressive House', type: 'dj' },
    { time: '20:00', name: 'Prime Time Mix', genre: 'Progressive House', type: 'dj' },
    { time: '22:00', name: 'Late Night Vibes', genre: 'Minimal / Deep', type: 'auto' },
  ],
  Martes: [
    { time: '00:00', name: 'Ambient Journey', genre: 'Ambient / Progressive', type: 'auto' },
    { time: '06:00', name: 'Morning Minimal', genre: 'Minimal House', type: 'auto' },
    { time: '10:00', name: 'Studio Sessions', genre: 'Progressive House', type: 'auto' },
    { time: '14:00', name: 'Deep Focus', genre: 'Deep House', type: 'auto' },
    { time: '18:00', name: 'Eternal Mix', genre: 'Progressive House', type: 'dj' },
    { time: '20:00', name: 'Guest DJ Set', genre: 'Varies', type: 'dj' },
    { time: '22:00', name: 'Techno Underground', genre: 'Techno', type: 'auto' },
  ],
  Miércoles: [
    { time: '00:00', name: 'Night Textures', genre: 'Ambient / Progressive', type: 'auto' },
    { time: '06:00', name: 'Wake Up Beats', genre: 'Minimal House', type: 'auto' },
    { time: '10:00', name: 'Progre Clásicos', genre: 'Progressive House', type: 'auto' },
    { time: '14:00', name: 'Afternoon Drive', genre: 'Melodic Techno', type: 'auto' },
    { time: '18:00', name: 'Warm Up Wednesday', genre: 'Progressive Warmup', type: 'dj' },
    { time: '20:00', name: 'Peak Time', genre: 'Progressive House', type: 'dj' },
    { time: '22:00', name: 'After Hours', genre: 'Deep / Minimal', type: 'auto' },
  ],
  Jueves: [
    { time: '00:00', name: 'Deep Space', genre: 'Ambient / Deep', type: 'auto' },
    { time: '06:00', name: 'Minimal Mornings', genre: 'Minimal House', type: 'auto' },
    { time: '10:00', name: 'Progressive Selections', genre: 'Progressive House', type: 'auto' },
    { time: '14:00', name: 'Melodic Afternoons', genre: 'Melodic Techno', type: 'auto' },
    { time: '18:00', name: 'Jueves Progresivo', genre: 'Progressive House', type: 'dj' },
    { time: '20:00', name: 'Live From Studio', genre: 'Progressive House', type: 'dj' },
    { time: '22:00', name: 'Nocturnal', genre: 'Minimal / Techno', type: 'auto' },
  ],
  Viernes: [
    { time: '00:00', name: 'Midnight Express', genre: 'Progressive House', type: 'auto' },
    { time: '06:00', name: 'Friday Feels', genre: 'Deep House', type: 'auto' },
    { time: '10:00', name: 'Viernes Clásico', genre: 'Progressive House', type: 'auto' },
    { time: '14:00', name: 'Pre-Weekend', genre: 'Melodic Techno', type: 'auto' },
    { time: '18:00', name: 'Friday Night Live', genre: 'Progressive House', type: 'dj' },
    { time: '20:00', name: 'Weekend Opener', genre: 'Progressive / Techno', type: 'dj' },
    { time: '22:00', name: 'Late Night Club', genre: 'Techno', type: 'dj' },
  ],
  Sábado: [
    { time: '00:00', name: 'After Party', genre: 'Minimal / Techno', type: 'auto' },
    { time: '06:00', name: 'Chill Saturday', genre: 'Ambient / Deep', type: 'auto' },
    { time: '10:00', name: 'Weekend Grooves', genre: 'Deep House', type: 'auto' },
    { time: '14:00', name: 'Sunset Prep', genre: 'Progressive House', type: 'auto' },
    { time: '16:00', name: 'Sábado Sessions', genre: 'Progressive House', type: 'dj' },
    { time: '18:00', name: 'Golden Hour', genre: 'Melodic Techno', type: 'dj' },
    { time: '20:00', name: 'Saturday Night Live', genre: 'Progressive House', type: 'dj' },
    { time: '22:00', name: 'Main Event', genre: 'Progressive / Techno', type: 'dj' },
  ],
  Domingo: [
    { time: '00:00', name: 'Sunday Sunrise', genre: 'Ambient / Progressive', type: 'auto' },
    { time: '06:00', name: 'Domingo Chill', genre: 'Deep House', type: 'auto' },
    { time: '10:00', name: 'Brunch Beats', genre: 'Minimal House', type: 'auto' },
    { time: '14:00', name: 'Sunday Selection', genre: 'Progressive House', type: 'auto' },
    { time: '18:00', name: 'Closing Set', genre: 'Progressive / Melodic', type: 'dj' },
    { time: '20:00', name: 'Week Recap', genre: 'Best of the Week', type: 'auto' },
    { time: '22:00', name: 'Sleep Mode', genre: 'Ambient / Downtempo', type: 'auto' },
  ],
};

function Schedule() {
  const [selectedDay, setSelectedDay] = useState('Lunes');

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Programación</h1>
        <p style={styles.subtitle}>Horario de shows y sesiones en vivo (Hora Chile, GMT-3)</p>
      </div>

      <div style={styles.daySelector}>
        {days.map((day) => (
          <button
            key={day}
            style={styles.dayBtn(selectedDay === day)}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={styles.legendDot('#a855f7')} />
          <span>DJ Live</span>
        </div>
        <div style={styles.legendItem}>
          <div style={styles.legendDot('#06b6d4')} />
          <span>Auto Mix</span>
        </div>
      </div>

      <div style={styles.timeline}>
        {scheduleData[selectedDay]?.map((slot, i) => (
          <div key={i} style={styles.slot}>
            <span style={styles.time}>{slot.time}</span>
            <div style={styles.showInfo}>
              <span style={styles.showName}>{slot.name}</span>
              <span style={styles.showGenre}>{slot.genre}</span>
            </div>
            <div style={styles.badge(slot.type)}>
              {slot.type === 'dj' ? <User size={12} /> : <Bot size={12} />}
              <span>{slot.type === 'dj' ? 'DJ Live' : 'AutoDJ'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;
