import React, { createContext, useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Player from './components/Player';
import Home from './pages/Home';
import Live from './pages/Live';
import OnDemand from './pages/OnDemand';
import Schedule from './pages/Schedule';
import Chat from './pages/Chat';
import Import from './pages/Import';
import { libraryTracks, libraryPlaylists } from './data/library';

export const RadioContext = createContext(null);

export function useRadio() {
  const context = useContext(RadioContext);
  if (!context) throw new Error('useRadio must be used within RadioContext');
  return context;
}

function App() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [playlists, setPlaylists] = useState(libraryPlaylists);
  const [tracks, setTracks] = useState(libraryTracks);
  const [djLive, setDjLive] = useState(false);
  const [volume, setVolume] = useState(75);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setIsLive(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const goLive = () => {
    setIsLive(true);
    setIsPlaying(true);
    setCurrentTrack({ title: 'En Vivo', artist: 'Eternal Beat Radio' });
  };

  const nextTrack = () => {
    if (isLive) return;
    const idx = tracks.findIndex(t => t?.id === currentTrack?.id);
    if (idx >= 0 && idx < tracks.length - 1) {
      setCurrentTrack(tracks[idx + 1]);
    }
  };

  const prevTrack = () => {
    if (isLive) return;
    const idx = tracks.findIndex(t => t?.id === currentTrack?.id);
    if (idx > 0) {
      setCurrentTrack(tracks[idx - 1]);
    }
  };

  const value = {
    currentTrack, setCurrentTrack,
    isPlaying, setIsPlaying,
    isLive, setIsLive,
    playlists, setPlaylists,
    tracks, setTracks,
    djLive, setDjLive,
    volume, setVolume,
    playTrack, togglePlay, goLive,
    nextTrack, prevTrack
  };

  return (
    <RadioContext.Provider value={value}>
      <Navbar />
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live" element={<Live />} />
          <Route path="/on-demand" element={<OnDemand />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/import" element={<Import />} />
        </Routes>
      </div>
      <Player />
    </RadioContext.Provider>
  );
}

export default App;
