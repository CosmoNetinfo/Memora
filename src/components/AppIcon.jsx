import React from 'react';

/**
 * Icone da public/new_icon (Flaticon).
 * name = nome file senza .svg (es. home, user, comments).
 * color = 'primary' | 'primaryDark' | 'accent' | 'white' | 'text' | 'textSecondary' | 'currentColor' | css value.
 * Se non passato, usa currentColor (eredita dal parent, es. TabBar active/inactive).
 */
const ICON_NAMES = [
  'add', 'badge-check', 'bell', 'bell-slash', 'calendar-lines', 'camera', 'comments',
  'envelope', 'face-expressionless', 'grin', 'home', 'lock', 'paper-plane', 'phone-call',
  'picture', 'sad', 'settings', 'shield-check', 'shield-exclamation', 'shoe-prints', 'text',
  'thumbs-up', 'trash', 'user', 'users-alt', 'microphone',
];

const MIC_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2c-1.66 0-3 1.34-3 3v5c0 1.66 1.34 3 3 3s3-1.34 3-5V5c0-1.66-1.34-3-3-3zM11 10V5c0-.55.45-1 1-1s1 .45 1 1v5c0 .55-.45 1-1 1s-1-.45-1-1zM19 10v1c0 3.53-2.61 6.43-6 6.92V21h-2v-3.08c-3.39-.49-6-3.39-6-6.92v-1h2v1c0 2.76 2.24 5 5 5s5-2.24 5-5v-1h2z'/%3E%3C/svg%3E";

const COLOR_MAP = {
  primary: 'var(--color-primary)',
  primaryDark: 'var(--color-primary-dark)',
  primarySoft: 'var(--color-primary-soft)',
  accent: 'var(--color-accent)',
  white: '#ffffff',
  text: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  success: 'var(--color-success)',
  error: 'var(--color-error)',
};

function resolveColor(color) {
  if (!color || color === 'currentColor') return 'currentColor';
  if (COLOR_MAP[color]) return COLOR_MAP[color];
  return color;
}

export default function AppIcon({ name, size = 24, color, className, style = {} }) {
  const safeName = ICON_NAMES.includes(name) ? name : 'home';
  const isMic = name === 'microphone';
  const src = isMic ? MIC_SVG : `/new_icon/${safeName}.svg`;
  const bg = resolveColor(color);
  
  const maskStyle = {
    display: 'inline-block',
    width: size,
    height: size,
    flexShrink: 0,
    backgroundColor: bg,
    mask: `url("${src}") no-repeat center / contain`,
    WebkitMask: `url("${src}") no-repeat center / contain`,
    ...style,
  };
  return <span className={className} style={maskStyle} role="img" aria-hidden />;
}

export { ICON_NAMES, COLOR_MAP };
