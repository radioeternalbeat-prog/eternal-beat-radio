import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Radio, Disc3, Calendar, MessageCircle, Upload, Menu, X } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Inicio', icon: Home },
  { path: '/live', label: 'En Vivo', icon: Radio },
  { path: '/on-demand', label: 'On Demand', icon: Disc3 },
  { path: '/schedule', label: 'Programas', icon: Calendar },
  { path: '/chat', label: 'Chat', icon: MessageCircle },
  { path: '/import', label: 'Importar', icon: Upload },
];

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 'var(--nav-height)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    zIndex: 1000,
    background: 'rgba(10, 10, 15, 0.9)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(168, 85, 247, 0.1)',
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0px',
  },
  logoTitle: {
    fontSize: '20px',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: 1.2,
  },
  logoSubtitle: {
    fontSize: '10px',
    color: '#a1a1aa',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontFamily: 'var(--font-mono)',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#a1a1aa',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  linkActive: {
    color: '#ffffff',
    background: 'rgba(168, 85, 247, 0.2)',
    boxShadow: '0 0 15px rgba(168, 85, 247, 0.15)',
  },
  hamburger: {
    display: 'none',
    background: 'transparent',
    border: 'none',
    color: '#ffffff',
    padding: '8px',
    cursor: 'pointer',
  },
  mobileMenu: {
    position: 'fixed',
    top: 'var(--nav-height)',
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(10, 10, 15, 0.98)',
    backdropFilter: 'blur(20px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    zIndex: 999,
  },
  mobileLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 32px',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: 500,
    color: '#a1a1aa',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    width: '240px',
  },
};

function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav style={styles.nav}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={styles.logo}>
            <span style={styles.logoTitle}>Eternal Beat</span>
            <span style={styles.logoSubtitle}>Radio Chile</span>
          </div>
        </Link>

        <div style={{ ...styles.links, ...(window.innerWidth <= 768 ? { display: 'none' } : {}) }}>
          {navLinks.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              style={{
                ...styles.link,
                ...(location.pathname === path ? styles.linkActive : {}),
              }}
            >
              <Icon size={16} />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        <button
          style={{ ...styles.hamburger, display: window.innerWidth <= 768 ? 'block' : 'none' }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              style={{
                ...styles.mobileLink,
                ...(location.pathname === path ? styles.linkActive : {}),
              }}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default Navbar;
