import React, { useState, useRef, useEffect } from 'react';
import { Send, Users, Music } from 'lucide-react';
import { useRadio } from '../App';

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '24px',
  },
  header: {
    marginBottom: '16px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '4px',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    background: '#12121a',
    borderRadius: '12px',
    border: '1px solid rgba(168, 85, 247, 0.1)',
    marginBottom: '16px',
  },
  nowPlaying: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#a1a1aa',
  },
  nowPlayingTrack: {
    color: '#a855f7',
    fontWeight: 500,
  },
  onlineCount: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#10b981',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px',
    background: '#12121a',
    borderRadius: '16px',
    border: '1px solid rgba(168, 85, 247, 0.1)',
    marginBottom: '16px',
  },
  message: {
    display: 'flex',
    gap: '10px',
    padding: '10px 14px',
    borderRadius: '10px',
    background: 'rgba(26, 26, 46, 0.6)',
    animation: 'slide-up 0.3s ease',
  },
  avatar: (color) => ({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 700,
    color: '#fff',
    flexShrink: 0,
  }),
  msgContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  msgUser: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#a855f7',
  },
  msgText: {
    fontSize: '13px',
    color: '#ffffff',
    lineHeight: 1.4,
  },
  msgTime: {
    fontSize: '10px',
    color: '#a1a1aa',
    marginTop: '2px',
  },
  inputBar: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  usernameInput: {
    width: '120px',
    padding: '12px 14px',
    borderRadius: '10px',
    background: '#1a1a2e',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    color: '#ffffff',
    fontSize: '13px',
    outline: 'none',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  messageInput: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '10px',
    background: '#1a1a2e',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    color: '#ffffff',
    fontSize: '13px',
    outline: 'none',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  sendBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

const avatarColors = ['#a855f7', '#06b6d4', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];

const initialMessages = [
  { id: 1, user: 'DJ_Eternal', text: 'Bienvenidos al chat de Eternal Beat! 🎶', time: '20:00', color: '#a855f7' },
  { id: 2, user: 'ProgreChile', text: 'Ese set de Guy J estuvo increíble!', time: '20:02', color: '#06b6d4' },
  { id: 3, user: 'MinimalVibes', text: 'Alguien sabe el tracklist del set anterior?', time: '20:05', color: '#ec4899' },
  { id: 4, user: 'DeepHouseKid', text: 'Este Hernan Cattaneo remix es fuego 🔥', time: '20:08', color: '#10b981' },
  { id: 5, user: 'TechnoTony', text: 'Me encanta esta estación, la escucho todos los días', time: '20:12', color: '#f59e0b' },
  { id: 6, user: 'DJ_Eternal', text: 'Gracias! Nuevo set en vivo este viernes a las 20:00 🙌', time: '20:15', color: '#a855f7' },
];

function Chat() {
  const { currentTrack } = useRadio();
  const [messages, setMessages] = useState(initialMessages);
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;
    const name = username.trim() || 'Anónimo';
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const color = avatarColors[Math.floor(Math.random() * avatarColors.length)];
    setMessages([...messages, { id: Date.now(), user: name, text: text.trim(), time, color }]);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Chat en Vivo</h1>
      </div>

      <div style={styles.topBar}>
        <div style={styles.nowPlaying}>
          <Music size={14} />
          <span>Sonando: </span>
          <span style={styles.nowPlayingTrack}>
            {currentTrack ? `${currentTrack.title} — ${currentTrack.artist}` : 'Nada seleccionado'}
          </span>
        </div>
        <div style={styles.onlineCount}>
          <Users size={14} />
          <span>18 en línea</span>
        </div>
      </div>

      <div style={styles.messages} ref={messagesRef}>
        {messages.map((msg) => (
          <div key={msg.id} style={styles.message}>
            <div style={styles.avatar(msg.color)}>
              {msg.user.charAt(0).toUpperCase()}
            </div>
            <div style={styles.msgContent}>
              <span style={styles.msgUser}>{msg.user}</span>
              <span style={styles.msgText}>{msg.text}</span>
              <span style={styles.msgTime}>{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.inputBar}>
        <input
          style={styles.usernameInput}
          placeholder="Nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={styles.messageInput}
          placeholder="Escribe un mensaje..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button style={styles.sendBtn} onClick={sendMessage}>
          <Send size={18} color="#fff" />
        </button>
      </div>
    </div>
  );
}

export default Chat;
