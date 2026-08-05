import React, { useState, useEffect, useRef } from "react";

/* ================================================================== */
/*  Styles — same maroon/black academic identity, more motion + fluid   */
/*  responsiveness baked in throughout.                                */
/* ================================================================== */

const STYLES = `
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap");

:root {
  --black: #0b0a0a;
  --near-black: #1a1414;
  --maroon: #5c0f1a;
  --maroon-deep: #3a0a11;
  --maroon-bright: #8b1e3f;
  --gold: #c9a24b;
  --white: #ffffff;
  --off-white: #f4f0ee;

  --font-display: "Playfair Display", Georgia, serif;
  --font-body: "Inter", -apple-system, sans-serif;
  --font-mono: "IBM Plex Mono", monospace;

  --radius: 14px;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}

* { box-sizing: border-box; }

html, body, #root, .tracer-root {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
}

.tracer-root, .tracer-root * { margin: 0; padding: 0; }

.tracer-root {
  font-family: var(--font-body);
  color: var(--black);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

.tracer-root button, .tracer-root input, .tracer-root select, .tracer-root textarea {
  font-family: inherit;
}

.tracer-root a { color: inherit; }

@media (prefers-reduced-motion: reduce) {
  .tracer-root *, .tracer-root *::before, .tracer-root *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

/* ---------------------------------------------------------------- */
/*  Auth shell                                                        */
/* ---------------------------------------------------------------- */

.auth-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(20px, 4vw, 34px);
  padding: clamp(28px, 6vw, 48px) clamp(14px, 4vw, 20px) clamp(40px, 8vw, 64px);
  overflow: hidden;
  background:
    radial-gradient(circle at 15% 10%, rgba(139, 30, 63, 0.55), transparent 55%),
    radial-gradient(circle at 85% 90%, rgba(139, 30, 63, 0.4), transparent 50%),
    linear-gradient(160deg, var(--maroon) 0%, var(--maroon-deep) 55%, var(--black) 100%);
  background-size: 220% 220%;
  animation: bgShift 18s ease-in-out infinite;
}

@keyframes bgShift {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 60% 40%; }
}

.auth-bg { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }

.orb { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.35; animation: drift 16s ease-in-out infinite; }
.orb-a { width: 360px; height: 360px; background: var(--maroon-bright); top: -80px; left: -100px; }
.orb-b { width: 300px; height: 300px; background: var(--black); bottom: -100px; right: -80px; animation-delay: -8s; }
.orb-c { width: 220px; height: 220px; background: var(--gold); top: 30%; right: 6%; opacity: 0.12; animation-delay: -4s; animation-duration: 22s; }

@keyframes drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(40px, 30px) scale(1.08); }
}

.auth-tracer { position: absolute; bottom: 6%; left: 0; width: 100%; height: 90px; opacity: 0.5; }

.auth-brand {
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 620px;
  width: 100%;
  text-align: left;
  animation: fadeUp 0.7s var(--ease) both;
}

.crest {
  flex-shrink: 0;
  width: 56px; height: 56px;
  border-radius: 50%;
  background: var(--white);
  color: var(--maroon-deep);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-weight: 800; font-size: 0.95rem; letter-spacing: 0.03em;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.18);
  overflow: hidden; padding: 0;
  animation: crestPulse 3.4s ease-in-out infinite;
}

@keyframes crestPulse {
  0%, 100% { box-shadow: 0 0 0 4px rgba(255,255,255,0.18); }
  50% { box-shadow: 0 0 0 8px rgba(255,255,255,0.08); }
}

.crest-logo { width: 100%; height: 100%; object-fit: cover; display: block; }

.brand-text h1 {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 4vw, 1.9rem);
  color: var(--white);
  margin: 4px 0 6px;
  line-height: 1.18;
}

.eyebrow {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.75);
}

.brand-sub { color: rgba(255, 255, 255, 0.65); font-size: clamp(0.8rem, 2vw, 0.9rem); }

.auth-card-wrap { position: relative; width: 100%; display: flex; justify-content: center; }

.auth-card {
  position: relative;
  width: 100%;
  max-width: 420px;
  background: var(--white);
  color: var(--black);
  border-radius: var(--radius);
  padding: clamp(22px, 5vw, 36px) clamp(18px, 5vw, 34px) 30px;
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(139, 30, 63, 0.15);
  animation: cardIn 0.6s var(--ease) both;
  animation-delay: 0.1s;
}

@keyframes cardIn { from { opacity: 0; transform: translateY(24px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes popIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }

.auth-card h2 { font-family: var(--font-display); font-size: clamp(1.3rem, 4vw, 1.6rem); margin: 6px 0 2px; }
.card-sub { color: #5a5a5a; font-size: 0.88rem; margin: 0 0 22px; }

.role-toggle { display: flex; background: var(--off-white); border-radius: 999px; padding: 4px; gap: 4px; margin-bottom: 22px; }
.role-tab {
  flex: 1; border: none; background: transparent; padding: 9px 10px; border-radius: 999px;
  font-weight: 600; font-size: 0.83rem; color: #6b6b6b; cursor: pointer;
  transition: background 0.3s var(--ease), color 0.3s var(--ease), transform 0.2s var(--ease);
}
.role-tab.active { background: var(--maroon); color: var(--white); box-shadow: 0 6px 14px -6px rgba(92, 15, 26, 0.6); }
.role-tab:not(.active):hover { color: var(--maroon); transform: translateY(-1px); }

.auth-form { display: flex; flex-direction: column; gap: 16px; }
.field { display: flex; flex-direction: column; gap: 6px; font-size: 0.82rem; font-weight: 600; color: var(--black); }
.field-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.field input, .field select, .field textarea {
  border: 1.5px solid #e2dede; border-radius: 9px; padding: 11px 13px; font-size: 0.92rem;
  color: var(--black); background: var(--off-white);
  transition: border-color 0.25s var(--ease), box-shadow 0.25s var(--ease), background 0.25s var(--ease);
  width: 100%;
}
.field select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%235c0f1a'%3E%3Cpath d='M5.5 7.5 10 12l4.5-4.5'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; background-size: 14px; padding-right: 32px; cursor: pointer; }
.field input:focus, .field select:focus, .field textarea:focus {
  outline: none; border-color: var(--maroon); background: var(--white);
  box-shadow: 0 0 0 4px rgba(92, 15, 26, 0.12);
}

.pw-wrap { position: relative; display: flex; }
.pw-wrap input { flex: 1; padding-right: 40px; }
.pw-toggle {
  position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
  border: none; background: transparent; color: #8a8a8a; cursor: pointer; padding: 4px; border-radius: 6px;
  transition: color 0.2s var(--ease);
}
.pw-toggle:hover { color: var(--maroon); }

.field-row { display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; flex-wrap: wrap; gap: 8px; }
.checkbox { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: #4a4a4a; font-weight: 500; cursor: pointer; }
.checkbox input { accent-color: var(--maroon); width: 16px; height: 16px; }

.text-link { border: none; background: none; color: var(--maroon); font-weight: 600; cursor: pointer; padding: 0; position: relative; }
.text-link::after {
  content: ""; position: absolute; left: 0; bottom: -2px; width: 0; height: 1.5px; background: var(--maroon);
  transition: width 0.25s var(--ease);
}
.text-link:hover::after { width: 100%; }

.btn-primary {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  border: none; border-radius: 10px; padding: 12px 20px;
  background: linear-gradient(135deg, var(--maroon-bright), var(--maroon-deep));
  background-size: 200% 200%;
  color: var(--white); font-weight: 700; font-size: 0.9rem; letter-spacing: 0.01em; cursor: pointer;
  position: relative; overflow: hidden;
  transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease), background-position 0.5s var(--ease);
  box-shadow: 0 10px 20px -10px rgba(92, 15, 26, 0.7);
}
.btn-primary svg { transition: transform 0.25s var(--ease); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 28px -12px rgba(92, 15, 26, 0.75); background-position: 100% 50%; }
.btn-primary:hover svg { transform: translateX(3px); }
.btn-primary:active { transform: translateY(0) scale(0.98); }
.btn-primary:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
.btn-block { width: 100%; margin-top: 4px; }

.btn-ghost {
  display: inline-flex; align-items: center; gap: 6px; border: 1.5px solid rgba(92,15,26,0.25);
  background: transparent; color: var(--maroon-deep); font-weight: 600; font-size: 0.8rem;
  padding: 8px 14px; border-radius: 9px; cursor: pointer; transition: all 0.2s var(--ease);
}
.btn-ghost:hover { background: rgba(92,15,26,0.06); border-color: var(--maroon); transform: translateY(-1px); }

.btn-danger {
  border: none; background: transparent; color: #a33; cursor: pointer; padding: 6px 8px; border-radius: 7px;
  transition: background 0.2s var(--ease), transform 0.2s var(--ease);
  display: inline-flex; align-items: center; justify-content: center;
}
.btn-danger:hover { background: rgba(163,51,51,0.1); transform: scale(1.08); }

.switch-line { text-align: center; font-size: 0.86rem; color: #5a5a5a; margin: 20px 0 0; }

/* ---------------------------------------------------------------- */
/*  Tracer signature element                                          */
/* ---------------------------------------------------------------- */

.tracer-svg { width: 100%; height: 100%; display: block; }
.tracer-path {
  stroke: var(--white); stroke-width: 2; stroke-linecap: round;
  stroke-dasharray: 900; stroke-dashoffset: 900;
  animation: draw 3.2s var(--ease) forwards, glow 2.4s ease-in-out infinite 3.2s;
}
.dash-tracer .tracer-path { stroke: var(--maroon); stroke-width: 2.5; }
.tracer-node { fill: var(--white); opacity: 0; animation: nodeIn 0.4s var(--ease) forwards; }
.dash-tracer .tracer-node { fill: var(--maroon-bright); }
.tracer-node.n1 { animation-delay: 0.6s; }
.tracer-node.n2 { animation-delay: 1.8s; }
.tracer-node.n3 { animation-delay: 3s; }

@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes glow { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
@keyframes nodeIn { from { opacity: 0; transform: scale(0); } to { opacity: 1; transform: scale(1); } }

/* ---------------------------------------------------------------- */
/*  Toasts                                                             */
/* ---------------------------------------------------------------- */

.toast-stack {
  position: fixed; top: 16px; right: 16px; left: 16px;
  display: flex; flex-direction: column; align-items: flex-end; gap: 10px;
  z-index: 999; pointer-events: none;
}
.toast {
  pointer-events: auto;
  max-width: 340px;
  width: 100%;
  background: var(--black);
  color: var(--white);
  border-left: 4px solid var(--gold);
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 0.83rem;
  box-shadow: 0 14px 30px -14px rgba(0,0,0,0.6);
  animation: toastIn 0.4s var(--ease) both, toastOut 0.4s var(--ease) 2.4s both;
  display: flex; align-items: center; gap: 8px;
}
@keyframes toastIn { from { opacity: 0; transform: translateX(24px) scale(0.96); } to { opacity: 1; transform: translateX(0) scale(1); } }
@keyframes toastOut { to { opacity: 0; transform: translateX(24px) scale(0.96); } }
@media (max-width: 520px) {
  .toast-stack { left: 10px; right: 10px; align-items: stretch; }
  .toast { max-width: none; }
}

/* ---------------------------------------------------------------- */
/*  Dashboard layout                                                  */
/* ---------------------------------------------------------------- */

.dash {
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(200px, 260px) 1fr;
  background: var(--off-white);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
}
.dash.in { opacity: 1; transform: translateY(0); }

.dash-sidebar {
  background: linear-gradient(190deg, var(--maroon) 0%, var(--maroon-deep) 65%, var(--black) 130%);
  background-size: 160% 160%;
  animation: bgShift 20s ease-in-out infinite;
  color: var(--white);
  padding: 22px 10px 22px 0;
  display: flex; flex-direction: column; gap: 22px;
  position: sticky; top: 0; height: 100vh;
}

.dash-crest { display: flex; align-items: center; gap: 12px; padding: 0 6px; }
.crest.small { width: 40px; height: 40px; font-size: 0.75rem; animation: none; }
.dash-brand { font-family: var(--font-display); font-weight: 700; font-size: 1rem; }
.dash-role { font-family: var(--font-mono); font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.65); margin-top: 2px; }

.dash-nav { display: flex; flex-direction: column; gap: 4px; flex: 1; overflow-y: auto; }
.dash-nav-item {
  display: flex; align-items: center; gap: 12px; padding: 10px 12px; border: none; background: transparent;
  color: rgba(255, 255, 255, 0.78); border-radius: 9px; font-size: 0.84rem; font-weight: 500; cursor: pointer;
  text-align: left; position: relative;
  transition: background 0.25s var(--ease), color 0.25s var(--ease), padding-left 0.25s var(--ease);
  animation: slideIn 0.4s var(--ease) both; animation-delay: calc(var(--i) * 0.04s);
}
@keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
.dash-nav-item:hover { background: rgba(255, 255, 255, 0.08); color: var(--white); padding-left: 16px; }
.dash-nav-item.active { background: var(--white); color: var(--maroon-deep); font-weight: 700; box-shadow: 0 8px 18px -8px rgba(0, 0, 0, 0.5); }
.dash-nav-item:disabled { opacity: 0.32; cursor: not-allowed; }
.dash-nav-item:disabled:hover { background: transparent; padding-left: 12px; color: rgba(255,255,255,0.78); }
.nav-label { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nav-badge {
  font-family: var(--font-mono); font-size: 0.62rem; font-weight: 700; padding: 2px 7px; border-radius: 999px;
  background: var(--gold); color: var(--maroon-deep); flex-shrink: 0;
  animation: badgePop 0.4s var(--ease) both;
}
.dash-nav-item.active .nav-badge { background: var(--maroon); color: var(--white); }
@keyframes badgePop { from { transform: scale(0); } to { transform: scale(1); } }

.dash-logout {
  display: flex; align-items: center; gap: 10px; border: 1px solid rgba(255, 255, 255, 0.25); background: transparent;
  color: var(--white); padding: 10px 12px; border-radius: 9px; font-size: 0.85rem; font-weight: 600; cursor: pointer;
  transition: background 0.25s var(--ease), border-color 0.25s var(--ease);
}
.dash-logout:hover { background: rgba(255, 255, 255, 0.12); border-color: rgba(255, 255, 255, 0.5); }

.dash-main { padding: clamp(18px, 4vw, 32px) clamp(16px, 5vw, 40px) 60px clamp(10px, 2vw, 20px); max-width: 1180px; }

.dash-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; animation: fadeUp 0.6s var(--ease) both; }
.dash-header h1 { font-family: var(--font-display); font-size: clamp(1.15rem, 3.4vw, 1.75rem); color: var(--black); margin-top: 4px; }
.dash-header .eyebrow { color: var(--maroon); }
.dash-header-actions { display: flex; align-items: center; gap: 12px; }

.dash-profile-action {
  display: flex; align-items: center; gap: 8px; border: 1px solid rgba(92, 15, 26, 0.12); background: var(--white);
  color: var(--maroon-deep); padding: 8px 12px; border-radius: 999px; font-size: 0.82rem; font-weight: 600; cursor: pointer;
  box-shadow: 0 8px 24px -16px rgba(0, 0, 0, 0.3); position: relative; transition: transform 0.2s var(--ease);
}
.dash-profile-action:hover { transform: translateY(-2px); }
.dash-profile-action.active { background: var(--maroon); color: var(--white); border-color: transparent; }
.dash-profile-action:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
.ping-dot {
  position: absolute; top: -3px; right: -3px; width: 10px; height: 10px; border-radius: 50%;
  background: var(--gold); box-shadow: 0 0 0 0 rgba(201,162,75,0.7);
  animation: ping 1.8s ease-out infinite;
}
@keyframes ping { 0% { box-shadow: 0 0 0 0 rgba(201,162,75,0.6); } 70% { box-shadow: 0 0 0 8px rgba(201,162,75,0); } 100% { box-shadow: 0 0 0 0 rgba(201,162,75,0); } }

.dash-avatar {
  width: 42px; height: 42px; border-radius: 50%; background: var(--maroon); color: var(--white);
  display: flex; align-items: center; justify-content: center; font-weight: 700; font-family: var(--font-display);
  flex-shrink: 0; overflow: hidden; transition: transform 0.3s var(--ease);
}
.dash-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.dash-avatar:hover { transform: rotate(-8deg) scale(1.06); }

.dash-tracer { height: 56px; margin: 16px 0 8px; opacity: 0.9; }

/* Lock banner */
.lock-banner {
  display: flex; align-items: center; gap: 10px;
  background: rgba(92, 15, 26, 0.08); border: 1px solid rgba(92, 15, 26, 0.25); color: var(--maroon-deep);
  padding: 12px 16px; border-radius: 10px; font-size: 0.85rem; margin-bottom: 18px;
  animation: fadeUp 0.4s var(--ease) both;
}
.lock-banner svg { flex-shrink: 0; }

/* Avatar upload in profile panel */
.avatar-upload { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; flex-wrap: wrap; }
.avatar-preview {
  width: 64px; height: 64px; border-radius: 50%; background: rgba(255,255,255,0.12); color: var(--white);
  display: flex; align-items: center; justify-content: center; font-weight: 700; font-family: var(--font-display);
  font-size: 1.3rem; overflow: hidden; flex-shrink: 0; border: 1px solid rgba(255,255,255,0.2);
}
.avatar-preview img { width: 100%; height: 100%; object-fit: cover; display: block; }
.avatar-upload-actions { display: flex; flex-direction: column; gap: 6px; align-items: flex-start; }
.avatar-hint { font-size: 0.72rem; color: rgba(255,255,255,0.5); }

/* Stats */
.stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 30px; }
.stat-card {
  background: var(--white); border-radius: var(--radius); padding: 18px; border: 1px solid rgba(92, 15, 26, 0.1);
  box-shadow: 0 10px 24px -18px rgba(0, 0, 0, 0.4);
  animation: cardIn 0.5s var(--ease) both; animation-delay: calc(var(--i) * 0.07s);
  transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease);
}
.stat-card:hover { transform: translateY(-4px); box-shadow: 0 16px 30px -16px rgba(92, 15, 26, 0.35); }
.stat-value { font-family: var(--font-mono); font-size: clamp(1.25rem, 3vw, 1.7rem); font-weight: 500; color: var(--maroon-deep); }
.stat-label { font-size: 0.78rem; color: #6b6b6b; margin-top: 4px; }

/* Feature grid (cards linking every module together) */
.feature-section { margin-bottom: 8px; }
.feature-section-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 6px; }
.feature-section h2 { font-family: var(--font-display); font-size: clamp(1.05rem, 2.6vw, 1.2rem); color: var(--black); }
.feature-section-hint { font-size: 0.78rem; color: #7a7a7a; }

.feature-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 230px), 1fr)); gap: 14px; margin-bottom: 30px; }

.feature-card {
  text-align: left; background: var(--white); border: 1px solid rgba(0, 0, 0, 0.06); border-radius: var(--radius);
  padding: 18px; cursor: pointer; position: relative; overflow: hidden;
  animation: cardIn 0.5s var(--ease) both; animation-delay: calc(var(--i) * 0.05s);
  transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease), border-color 0.3s var(--ease);
}
.feature-card::before {
  content: ""; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(92, 15, 26, 0.06), transparent 60%);
  opacity: 0; transition: opacity 0.3s var(--ease);
}
.feature-card:hover, .feature-card.active { transform: translateY(-5px); box-shadow: 0 20px 34px -20px rgba(92, 15, 26, 0.45); border-color: rgba(92, 15, 26, 0.35); }
.feature-card:hover::before, .feature-card.active::before { opacity: 1; }
.feature-card.active { outline: 2px solid var(--maroon); outline-offset: -2px; }

.feature-icon-row { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }
.feature-icon {
  width: 40px; height: 40px; border-radius: 10px; background: var(--maroon-deep); color: var(--white);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.3s var(--ease), background 0.3s var(--ease);
}
.feature-card:hover .feature-icon { transform: rotate(-6deg) scale(1.08); background: var(--maroon-bright); }

.feature-badge {
  font-family: var(--font-mono); font-size: 0.66rem; font-weight: 700; padding: 3px 8px; border-radius: 999px;
  background: rgba(201,162,75,0.18); color: #8a6d1f; border: 1px solid rgba(201,162,75,0.5);
  animation: badgePop 0.4s var(--ease) both;
}

.feature-card h3 { font-size: 0.95rem; margin-bottom: 6px; color: var(--black); }
.feature-card p { font-size: 0.8rem; color: #666; line-height: 1.45; }

/* Detail panel */
.detail-panel {
  margin-top: 22px; background: linear-gradient(165deg, var(--maroon) 0%, var(--maroon-deep) 100%);
  color: var(--white); border-radius: var(--radius);
  padding: clamp(18px, 4vw, 28px); display: flex; gap: 16px; align-items: flex-start; flex-wrap: wrap;
  animation: fadeUp 0.4s var(--ease) both;
}
.detail-icon {
  width: 46px; height: 46px; border-radius: 12px; background: var(--black); display: flex; align-items: center;
  justify-content: center; flex-shrink: 0;
}
.detail-body { flex: 1; min-width: 220px; }
.detail-panel h3 { font-family: var(--font-display); margin-bottom: 6px; font-size: clamp(1rem, 3vw, 1.1rem); }
.detail-panel > .detail-body > p:first-of-type { margin: 0 0 16px; color: rgba(255, 255, 255, 0.75); font-size: 0.88rem; line-height: 1.5; }

/* Generic panel widgets used inside detail panels */
.panel-block { animation: fadeIn 0.35s var(--ease) both; }
.panel-form { display: flex; flex-direction: column; gap: 12px; margin-bottom: 18px; }
.panel-form .row { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; }
.panel-form label { display: flex; flex-direction: column; gap: 5px; font-size: 0.76rem; font-weight: 600; color: rgba(255,255,255,0.85); }
.panel-form input, .panel-form select, .panel-form textarea {
  border: 1.5px solid rgba(255,255,255,0.18); border-radius: 8px; padding: 9px 11px; font-size: 0.86rem;
  background: rgba(255,255,255,0.06); color: var(--white); transition: border-color 0.2s var(--ease), background 0.2s var(--ease);
}
.panel-form input::placeholder, .panel-form textarea::placeholder { color: rgba(255,255,255,0.35); }
.panel-form input:focus, .panel-form select:focus, .panel-form textarea:focus {
  outline: none; border-color: var(--gold); background: rgba(255,255,255,0.1);
}
.panel-form select option { color: black; }

.table-wrap { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 10px; }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; min-width: 420px; }
.data-table th { text-align: left; font-family: var(--font-mono); font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.5); padding: 8px 10px; border-bottom: 1px solid rgba(255,255,255,0.12); }
.data-table td { padding: 10px 10px; border-bottom: 1px solid rgba(255,255,255,0.08); vertical-align: middle; }
.data-table tr { transition: background 0.2s var(--ease); animation: fadeIn 0.3s var(--ease) both; }
.data-table tbody tr:hover { background: rgba(255,255,255,0.04); }

.pill { display: inline-flex; align-items: center; gap: 4px; font-size: 0.7rem; font-weight: 600; padding: 3px 9px; border-radius: 999px; }
.pill.ok { background: rgba(120,200,140,0.18); color: #8fe0a6; }
.pill.pending { background: rgba(230,180,80,0.18); color: var(--gold); }
.pill.muted { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.65); }

.chip-row { display: flex; flex-wrap: wrap; gap: 6px; }
.chip {
  display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14);
  color: var(--white); font-size: 0.74rem; padding: 4px 10px; border-radius: 999px;
  animation: popIn 0.25s var(--ease) both;
}
.chip.match { background: rgba(201,162,75,0.22); border-color: rgba(201,162,75,0.5); color: var(--gold); }
.chip button { background: none; border: none; color: inherit; cursor: pointer; display: flex; padding: 0; opacity: 0.7; }
.chip button:hover { opacity: 1; }

.list-block { display: flex; flex-direction: column; gap: 10px; }
.list-item {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 14px;
  display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  animation: fadeUp 0.3s var(--ease) both; transition: transform 0.2s var(--ease), border-color 0.2s var(--ease);
}
.list-item:hover { transform: translateX(2px); border-color: rgba(201,162,75,0.4); }
.list-item-main { min-width: 0; flex: 1; }
.list-item-title { font-weight: 700; font-size: 0.88rem; overflow-wrap: anywhere; }
.list-item-sub { font-size: 0.76rem; color: rgba(255,255,255,0.55); margin-top: 2px; overflow-wrap: anywhere; }
.list-item-actions { display: flex; gap: 8px; align-items: center; flex-shrink: 0; }

.bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.bar-label { width: 120px; flex-shrink: 0; font-size: 0.78rem; color: rgba(255,255,255,0.75); }
.bar-track { flex: 1; height: 9px; border-radius: 999px; background: rgba(255,255,255,0.1); overflow: hidden; }
.bar-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--maroon-bright), var(--gold)); transition: width 0.8s var(--ease); }
.bar-value { width: 34px; text-align: right; font-family: var(--font-mono); font-size: 0.74rem; color: rgba(255,255,255,0.7); }

.btn-rsvp {
  border: 1.5px solid rgba(255,255,255,0.25); background: transparent; color: var(--white); font-weight: 600; font-size: 0.78rem;
  padding: 7px 13px; border-radius: 999px; cursor: pointer; transition: all 0.2s var(--ease); display: inline-flex; gap: 6px; align-items: center;
}
.btn-rsvp:hover { border-color: var(--gold); }
.btn-rsvp.going { background: var(--gold); border-color: var(--gold); color: var(--maroon-deep); }

.empty-state { text-align: center; padding: 24px 10px; color: rgba(255,255,255,0.5); font-size: 0.84rem; }

.progress-ring-wrap { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
.confirm-badge {
  display: inline-flex; align-items: center; gap: 6px; font-size: 0.78rem; font-weight: 700; color: #8fe0a6;
  background: rgba(120,200,140,0.14); padding: 6px 12px; border-radius: 999px; animation: popIn 0.3s var(--ease) both;
}

/* ---------------------------------------------------------------- */
/*  Responsive                                                        */
/* ---------------------------------------------------------------- */

@media (max-width: 980px) {
  .stat-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 860px) {
  .dash { grid-template-columns: 1fr; }
  .dash-sidebar { position: sticky; top: 0; z-index: 50; height: auto; flex-direction: row; flex-wrap: wrap; align-items: center; gap: 12px; padding: 14px 16px; }
  .dash-nav { flex-direction: row; flex-wrap: wrap; overflow-y: visible; overflow-x: auto; flex: 1; }
  .dash-nav-item span.nav-label { display: none; }
  .dash-nav-item { padding: 10px; min-width: 42px; justify-content: center; }
  .dash-nav-item:hover { padding-left: 10px; }
  .dash-logout span { display: inline; }
  .dash-main { padding: 20px 16px 50px; }
  .nav-badge { position: absolute; top: 2px; right: 2px; }
}

@media (max-width: 640px) {
  .auth-brand { flex-direction: column; text-align: center; gap: 10px; }
  .field-pair { grid-template-columns: 1fr; }
  .auth-card { padding: 26px 20px 22px; }
  .stat-grid { grid-template-columns: 1fr 1fr; }
  .feature-grid { grid-template-columns: 1fr 1fr; }
  .dash-header { flex-direction: column; align-items: flex-start; }
  .dash-header-actions { width: 100%; justify-content: space-between; }
  .list-item { flex-direction: column; align-items: flex-start; }
  .bar-label { width: 90px; font-size: 0.72rem; }
}

@media (max-width: 480px) {
  .panel-form .row { grid-template-columns: 1fr; }
  .panel-form { gap: 14px; }
  .panel-form input, .panel-form select, .panel-form textarea { padding: 11px 12px; font-size: 0.9rem; }
  .btn-ghost, .btn-danger, .btn-rsvp { min-height: 38px; }
  .dash-nav-item { min-height: 40px; }
  .detail-panel { flex-direction: column; }
  .detail-icon { width: 40px; height: 40px; }
  .avatar-preview { width: 56px; height: 56px; font-size: 1.1rem; }
  .list-item { padding: 11px 12px; }
  .bar-label { width: 76px; font-size: 0.68rem; }
  .lock-banner { font-size: 0.8rem; align-items: flex-start; }
  .table-wrap { margin: 0 -2px; }
}

@media (max-width: 420px) {
  .stat-grid { grid-template-columns: 1fr; }
  .feature-grid { grid-template-columns: 1fr; }
  .dash-crest { flex: 1 1 100%; }
  .auth-page { padding: 24px 14px 40px; }
  .role-toggle { flex-wrap: wrap; }
  .field-row { flex-direction: column; align-items: flex-start; gap: 10px; }
}

@media (max-width: 340px) {
  .dash-nav-item { padding: 8px; }
  .dash-logout span { display: none; }
  .dash-header h1 { font-size: 1.1rem; }
}
`;

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

const ICONS = {
  key: "M14 7a4 4 0 1 0-3.9 4H5v3H3v3h6v-3h1.1A4 4 0 0 0 14 7Zm-4 2a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z",
  users: "M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 18c0-3 3-5 6-5s6 2 6 5v1H2v-1Zm12-4.7c2.2.5 4 2.2 4 4.7v1h-3v-1c0-1.7-.4-3-1-4.7Z",
  id: "M2 4h16v12H2V4Zm3 3v2h2V7H5Zm0 4v1h6v-1H5Zm7-4.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
  chart: "M3 17V9h3v8H3Zm5.5 0V4h3v13h-3ZM14 17v-6h3v6h-3Z",
  bell: "M10 2a1.2 1.2 0 0 0-1.2 1.2v.6C6 4.4 5 6.6 5 9v3l-1.5 2.5v1H16.5v-1L15 12V9c0-2.4-1-4.6-3.8-5.2v-.6A1.2 1.2 0 0 0 10 2Zm0 15.5A1.7 1.7 0 0 0 11.7 16h-3.4A1.7 1.7 0 0 0 10 17.5Z",
  spark: "M10 1c.6 3 2.4 4.8 5.4 5.4C12.4 7 10.6 8.8 10 11.8 9.4 8.8 7.6 7 4.6 6.4 7.6 5.8 9.4 4 10 1Zm5.6 10.2c.4 1.7 1.4 2.7 3.1 3.1-1.7.4-2.7 1.4-3.1 3.1-.4-1.7-1.4-2.7-3.1-3.1 1.7-.4 2.7-1.4 3.1-3.1Z",
  brief: "M7 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h4v3H3V4h4Zm-1 0h8V3H6v1ZM3 8h16v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8Z",
  calendar: "M4 3h2v2h8V3h2v2h2v13H2V5h2V3Zm-1 6v9h16V9H3Zm2 2h3v3H5v-3Z",
  doc: "M5 2h7l4 4v12H5V2Zm7 1.5V6h2.5L12 3.5ZM7 10h6v1.4H7V10Zm0 3h6v1.4H7V13Z",
  eye: "M10 4C5 4 1.7 8 1 10c.7 2 4 6 9 6s8.3-4 9-6c-.7-2-4-6-9-6Zm0 9.5A3.5 3.5 0 1 1 10 6.5a3.5 3.5 0 0 1 0 7Z",
  arrow: "M4 10h11m0 0-4-4m4 4-4 4",
  logout: "M9 3H4v14h5v-2H6V5h3V3Zm7 7-4-4v3H8v2h4v3l4-4Z",
  plus: "M9 3h2v6h6v2h-6v6H9v-6H3V9h6V3Z",
  trash: "M7 2h6v2h4v2H3V4h4V2Zm-2 5h10l-1 11H6L5 7Zm3 2v7h1V9H8Zm3 0v7h1V9h-1Z",
  check: "M4 10.5 8 14.5 16 5.5",
  x: "M5 5l10 10M15 5 5 15",
  camera: "M6 4l1-1.5h6L14 4h3v11H3V4h3Zm4 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z",
};

function Icon({ name, size = 20 }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d={ICONS[name] || ICONS.spark} />
    </svg>
  );
}

function BrandLogo() {
  return <img src="/logo.png" alt="SPC logo" className="crest-logo" onError={(e) => { e.target.style.display = "none"; }} />;
}

function TracerLine({ className = "" }) {
  return (
    <svg className={`tracer-svg ${className}`} viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true">
      <path
        className="tracer-path"
        d="M0,90 C90,90 90,20 180,20 C260,20 260,95 340,95 C420,95 420,35 500,35 C550,35 560,60 600,60"
        fill="none"
      />
      <circle className="tracer-node n1" cx="20" cy="88" r="4" />
      <circle className="tracer-node n2" cx="300" cy="55" r="4" />
      <circle className="tracer-node n3" cx="580" cy="58" r="4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature registry — text only; the actual functionality lives in    */
/*  renderPanel() below, which reads/writes the shared domain state    */
/*  so every feature can affect every other feature.                   */
/* ------------------------------------------------------------------ */

const ADMIN_FEATURES = [
  { icon: "key", title: "Login & Authentication", text: "Sign in through a protected login module that checks every credential against the account database before granting access." },
  { icon: "users", title: "Manage User Accounts", text: "Create, update, view, and remove staff and alumni accounts, keeping access and security controls enforced system-wide." },
  { icon: "id", title: "View Alumni Information", text: "Browse alumni records — student details, employment history, and self-reported skills — in one monitored view." },
  { icon: "chart", title: "View Survey Results", text: "Review alumni responses to issued surveys to track outcomes, response patterns, and emerging work trends." },
  { icon: "bell", title: "Manage Notifications", text: "Send announcements, reminders, and alerts to alumni to keep engagement and response rates high." },
  { icon: "spark", title: "View AI Analytics", text: "See AI-generated career-tracking analytics showing which skills and coursework shape alumni outcomes, informing curriculum decisions." },
  { icon: "brief", title: "Career Tools & Job Postings", text: "Maintain job recommendations and postings shared by partner schools, published for alumni through the Career Tools module." },
  { icon: "calendar", title: "Manage Event Posting", text: "Set up and announce alumni events, then track attendee responses through the Events Response System." },
];

// Both career features are always available to every alumnus — Job
// Alignment shows fit against their current role, Career Tools surfaces
// openings worth pursuing. Which one an alumnus lands on first after the
// survey is decided by their employment status, not by hiding the other.
function getAlumniFeatures() {
  return [
    { icon: "key", title: "Register & Login", text: "Create an account and sign in securely from any device once your details are verified against your stored record." },
    { icon: "id", title: "Manage Alumni Profile", text: "Upload a profile photo and edit the personal details on your profile whenever your information changes." },
    { icon: "doc", title: "Complete the Alumni Survey", text: "Share your employment status and current skill set so it can be matched against the job bank and your field of study." },
    { icon: "chart", title: "Job Alignment", text: "See how closely your current skills line up with what employers are hiring for right now." },
    { icon: "brief", title: "Career Tools", text: "Get AI-generated matches between your skills, profile, and open career opportunities." },
    { icon: "bell", title: "Notifications", text: "Receive announcements, survey reminders, and updates from the Alumni Affairs Office." },
    { icon: "calendar", title: "Events & Activities", text: "Browse upcoming alumni events and respond — RSVP, decline, or leave feedback — through the Event Response System." },
  ];
}

const PROGRAM_OPTIONS = [
  "BS Computer Science",
  "BS Information Technology",
  "BS Information Systems",
  "BS Computer Engineering",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: CURRENT_YEAR - 1990 + 1 }, (_, i) => String(CURRENT_YEAR - i));

const EMPLOYMENT_OPTIONS = ["Employed", "Unemployed"];

// Rough keyword check used to flag whether a reported job title looks
// related to an IT/CS-family course. Not a hiring judgment — just a quick
// signal surfaced back to the alumnus and the AAO.
const COURSE_KEYWORDS = [
  "developer", "programmer", "software", "web", "app", "application", "system", "systems",
  "network", "networking", "information technology", "database", "data", "cyber", "security",
  "cloud", "qa", "quality assurance", "tester", "engineer", "engineering", "support", "helpdesk",
  "help desk", "administrator", "admin", "analyst", "ui", "ux", "designer", "devops", "technician",
  "coder", "programming", "infrastructure", "technical",
];

function isJobRelatedToCourse(jobTitle) {
  if (!jobTitle || !jobTitle.trim()) return null;
  const t = jobTitle.toLowerCase();
  return COURSE_KEYWORDS.some((k) => t.includes(k));
}

// Skills requested across open postings that the alumnus hasn't reported
// having, ranked by how many postings ask for them — used to recommend
// what to learn next in both Job Alignment and Career Tools.
function getSkillGaps(me, jobs) {
  const demand = {};
  jobs.forEach((j) => j.skills.forEach((s) => {
    const has = me.skills.some((ms) => ms.toLowerCase() === s.toLowerCase());
    if (!has) demand[s] = (demand[s] || 0) + 1;
  }));
  return Object.keys(demand)
    .sort((a, b) => demand[b] - demand[a])
    .map((s) => ({ skill: s, demand: demand[s] }));
}

function SkillRecommendations({ me, jobs }) {
  const gaps = getSkillGaps(me, jobs);
  return (
    <div style={{ marginTop: 18 }}>
      <div className="list-item-sub" style={{ marginBottom: 10 }}>Recommended skills to learn</div>
      {gaps.length === 0 ? (
        <div className="empty-state">You already cover every skill currently requested across open postings — nice work.</div>
      ) : (
        <div className="chip-row">
          {gaps.slice(0, 6).map((g) => (
            <span className="chip match" key={g.skill}>
              {g.skill} <span style={{ opacity: 0.65 }}>· {g.demand} posting{g.demand === 1 ? "" : "s"}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small reusable bits                                                */
/* ------------------------------------------------------------------ */

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function AnimatedNumber({ value }) {
  const match = String(value).match(/^([^\d]*)(\d[\d,]*)(.*)$/);
  const [display, setDisplay] = useState(value);
  const raf = useRef(null);

  useEffect(() => {
    if (!match) { setDisplay(value); return; }
    const prefix = match[1];
    const target = parseInt(match[2].replace(/,/g, ""), 10);
    const suffix = match[3];
    const start = performance.now();
    const duration = 700;
    function tick(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(target * eased);
      setDisplay(prefix + current.toLocaleString() + suffix);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{display}</>;
}

function ToastStack({ toasts }) {
  return (
    <div className="toast-stack">
      {toasts.map((t) => (
        <div className="toast" key={t.id}>
          <Icon name="check" size={16} />
          <span>{t.text}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Auth shell + pages                                                  */
/* ------------------------------------------------------------------ */

function AuthShell({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-bg">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
        <TracerLine className="auth-tracer" />
      </div>

      <div className="auth-brand">
        <div className="crest">
          <BrandLogo />
        </div>
        <div className="brand-text">
          <p className="eyebrow">St. Peter&rsquo;s College &mdash; IT / CS Programs</p>
          <h1>Alumni Tracer &amp; Job&ndash;Course Alignment Analytics</h1>
          <p className="brand-sub">Following every graduate from the tassel-turn to the job title.</p>
        </div>
      </div>

      <div className="auth-card-wrap">{children}</div>
    </div>
  );
}

function LoginPage({ role, setRole, onSubmit, goSignup }) {
  const [showPw, setShowPw] = useState(false);
  return (
    <AuthShell>
      <div className="auth-card">
        <div className="role-toggle" role="tablist" aria-label="Sign in as">
          {["alumni", "admin"].map((r) => (
            <button key={r} type="button" role="tab" aria-selected={role === r} className={`role-tab ${role === r ? "active" : ""}`} onClick={() => setRole(r)}>
              {r === "alumni" ? "Alumnus" : "Administrator"}
            </button>
          ))}
        </div>

        <h2>Welcome back</h2>
        <p className="card-sub">Sign in to continue as {role === "alumni" ? "an alumnus" : "an AAO administrator"}.</p>

        <form onSubmit={onSubmit} className="auth-form">
          <label className="field">
            <span>Email address</span>
            <input type="email" placeholder="you@spc.edu.ph" required />
          </label>
          <label className="field">
            <span>Password</span>
            <div className="pw-wrap">
              <input type={showPw ? "text" : "password"} placeholder="••••••••" required />
              <button type="button" className="pw-toggle" onClick={() => setShowPw((s) => !s)} aria-label="Toggle password visibility">
                <Icon name="eye" size={18} />
              </button>
            </div>
          </label>
          <div className="field-row">
            <label className="checkbox"><input type="checkbox" /> <span>Remember me</span></label>
            <a href="#" className="text-link" onClick={(e) => e.preventDefault()}>Forgot password?</a>
          </div>
          <button type="submit" className="btn-primary btn-block">Sign in <Icon name="arrow" size={16} /></button>
        </form>

        <p className="switch-line">New here? <button className="text-link" onClick={goSignup}>Create an account</button></p>
      </div>
    </AuthShell>
  );
}

function SignupPage({ role, setRole, onSubmit, goLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [program, setProgram] = useState(PROGRAM_OPTIONS[0]);
  const [gradYear, setGradYear] = useState(YEAR_OPTIONS[0]);

  function submit(e) {
    e.preventDefault();
    onSubmit({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      program,
      gradYear,
    });
  }

  return (
    <AuthShell>
      <div className="auth-card">
        <div className="role-toggle" role="tablist" aria-label="Register as">
          {["alumni", "admin"].map((r) => (
            <button key={r} type="button" role="tab" aria-selected={role === r} className={`role-tab ${role === r ? "active" : ""}`} onClick={() => setRole(r)}>
              {r === "alumni" ? "Alumnus" : "Administrator"}
            </button>
          ))}
        </div>

        <h2>Create your account</h2>
        <p className="card-sub">Register as {role === "alumni" ? "a graduate of the IT / CS program" : "Alumni Affairs Office staff"}.</p>

        <form onSubmit={submit} className="auth-form">
          <div className="field-pair">
            <label className="field"><span>First name</span><input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Juan" required /></label>
            <label className="field"><span>Last name</span><input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Dela Cruz" required /></label>
          </div>

          {role === "alumni" && (
            <div className="field-pair">
              <label className="field">
                <span>Program</span>
                <select value={program} onChange={(e) => setProgram(e.target.value)} required>
                  {PROGRAM_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
              <label className="field">
                <span>Year graduated</span>
                <select value={gradYear} onChange={(e) => setGradYear(e.target.value)} required>
                  {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </label>
            </div>
          )}

          <label className="field"><span>Email address</span><input type="email" placeholder="you@spc.edu.ph" required /></label>

          <div className="field-pair">
            <label className="field"><span>Password</span><input type="password" placeholder="••••••••" required /></label>
            <label className="field"><span>Confirm password</span><input type="password" placeholder="••••••••" required /></label>
          </div>

          <label className="checkbox"><input type="checkbox" required /><span>I agree to the data privacy terms of the Alumni Affairs Office</span></label>

          <button type="submit" className="btn-primary btn-block">Create account <Icon name="arrow" size={16} /></button>
        </form>

        <p className="switch-line">Already registered? <button className="text-link" onClick={goLogin}>Sign in</button></p>
      </div>
    </AuthShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Panel content — this is where every feature reads/writes the same  */
/*  shared state, so admin actions show up for alumni and vice versa.  */
/* ------------------------------------------------------------------ */

function StatusPill({ status }) {
  if (status === true) return <span className="pill ok"><Icon name="check" size={11} /> Surveyed</span>;
  if (status === false) return <span className="pill pending">Pending</span>;
  if (status === "Employed") return <span className="pill ok"><Icon name="check" size={11} /> Employed</span>;
  if (status === "Unemployed") return <span className="pill pending">Unemployed</span>;
  return <span className="pill muted">{status}</span>;
}

function ManageUsersPanel({ alumni, onAdd, onRemove }) {
  const [name, setName] = useState("");
  const [program, setProgram] = useState(PROGRAM_OPTIONS[0]);
  const [year, setYear] = useState(YEAR_OPTIONS[0]);

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), program, gradYear: year });
    setName("");
  }

  return (
    <div className="panel-block">
      <form className="panel-form" onSubmit={submit}>
        <div className="row">
          <label>Full name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Juan Dela Cruz" /></label>
          <label>Program
            <select value={program} onChange={(e) => setProgram(e.target.value)}>
              {PROGRAM_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <label>Year graduated
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </label>
        </div>
        <button type="submit" className="btn-ghost" style={{ alignSelf: "flex-start" }}><Icon name="plus" size={14} /> Add alumnus</button>
      </form>

      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Program</th><th>Year</th><th>Survey</th><th></th></tr></thead>
          <tbody>
            {alumni.map((a) => (
              <tr key={a.id}>
                <td>{a.name}{a.isSelf ? " (You)" : ""}</td>
                <td>{a.program}</td>
                <td>{a.gradYear}</td>
                <td><StatusPill status={a.surveyCompleted} /></td>
                <td>
                  {!a.isSelf && (
                    <button className="btn-danger" onClick={() => onRemove(a.id)} aria-label={`Remove ${a.name}`}><Icon name="trash" size={15} /></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AlumniInfoPanel({ alumni }) {
  const [openId, setOpenId] = useState(null);
  return (
    <div className="panel-block list-block">
      {alumni.map((a) => (
        <div className="list-item" key={a.id} onClick={() => setOpenId(openId === a.id ? null : a.id)} style={{ cursor: "pointer", flexDirection: "column", alignItems: "stretch" }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 10 }}>
            <div className="list-item-main">
              <div className="list-item-title">{a.name}{a.isSelf ? " (You)" : ""}</div>
              <div className="list-item-sub">{a.program} · Class of {a.gradYear}</div>
            </div>
            <StatusPill status={a.employed} />
          </div>
          {openId === a.id && (
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {a.jobTitle && <div className="list-item-sub" style={{ marginBottom: 8 }}>Current role: {a.jobTitle}</div>}
              <div className="list-item-sub" style={{ marginBottom: 6 }}>Self-reported skills</div>
              <div className="chip-row">
                {a.skills.length ? a.skills.map((s) => <span className="chip" key={s}>{s}</span>) : <span className="list-item-sub">No skills submitted yet.</span>}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SurveyResultsPanel({ alumni }) {
  const total = alumni.length;
  const completed = alumni.filter((a) => a.surveyCompleted).length;
  const employed = alumni.filter((a) => a.employed === "Employed").length;
  const pct = total ? Math.round((completed / total) * 100) : 0;
  const empPct = total ? Math.round((employed / total) * 100) : 0;

  return (
    <div className="panel-block">
      <div className="bar-row">
        <div className="bar-label">Survey completion</div>
        <div className="bar-track"><div className="bar-fill" style={{ width: `${pct}%` }} /></div>
        <div className="bar-value">{pct}%</div>
      </div>
      <div className="bar-row">
        <div className="bar-label">Employed alumni</div>
        <div className="bar-track"><div className="bar-fill" style={{ width: `${empPct}%` }} /></div>
        <div className="bar-value">{empPct}%</div>
      </div>
      <div className="list-block" style={{ marginTop: 18 }}>
        {alumni.filter((a) => a.surveyCompleted).length === 0 && <div className="empty-state">No survey responses yet. They'll appear here as alumni submit theirs.</div>}
        {alumni.filter((a) => a.surveyCompleted).map((a) => (
          <div className="list-item" key={a.id}>
            <div className="list-item-main">
              <div className="list-item-title">{a.name}{a.isSelf ? " (You)" : ""}</div>
              <div className="list-item-sub">{a.program} · {a.employed}</div>
            </div>
            <div className="chip-row">{a.skills.slice(0, 3).map((s) => <span className="chip" key={s}>{s}</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotifyComposerPanel({ notifications, onSend }) {
  const [text, setText] = useState("");
  function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  }
  return (
    <div className="panel-block">
      <form className="panel-form" onSubmit={submit}>
        <label>Message to all alumni
          <textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="Reminder: survey deadline is this Friday…" />
        </label>
        <button type="submit" className="btn-ghost" style={{ alignSelf: "flex-start" }}><Icon name="bell" size={14} /> Send notification</button>
      </form>
      <div className="list-block">
        {notifications.map((n) => (
          <div className="list-item" key={n.id}>
            <div className="list-item-main"><div className="list-item-title" style={{ fontWeight: 500 }}>{n.text}</div><div className="list-item-sub">{n.date}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsPanel({ alumni, jobs }) {
  const freq = {};
  alumni.forEach((a) => a.skills.forEach((s) => { freq[s] = (freq[s] || 0) + 1; }));
  const demand = {};
  jobs.forEach((j) => j.skills.forEach((s) => { demand[s] = (demand[s] || 0) + 1; }));
  const skillList = Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 6);
  const maxFreq = Math.max(1, ...skillList.map((s) => freq[s]));
  const employedCount = alumni.filter((a) => a.employed === "Employed").length;
  const unemployedCount = alumni.filter((a) => a.employed === "Unemployed").length;

  return (
    <div className="panel-block">
      <div className="bar-row">
        <div className="bar-label">Employed</div>
        <div className="bar-track"><div className="bar-fill" style={{ width: `${alumni.length ? (employedCount / alumni.length) * 100 : 0}%` }} /></div>
        <div className="bar-value">{employedCount}</div>
      </div>
      <div className="bar-row">
        <div className="bar-label">Unemployed</div>
        <div className="bar-track"><div className="bar-fill" style={{ width: `${alumni.length ? (unemployedCount / alumni.length) * 100 : 0}%` }} /></div>
        <div className="bar-value">{unemployedCount}</div>
      </div>
      <div className="list-item-sub" style={{ margin: "16px 0 10px" }}>Most common alumni skills vs. employer demand</div>
      {skillList.length === 0 && <div className="empty-state">Analytics will populate once alumni submit skills.</div>}
      {skillList.map((s) => (
        <div className="bar-row" key={s}>
          <div className="bar-label">{s}</div>
          <div className="bar-track"><div className="bar-fill" style={{ width: `${(freq[s] / maxFreq) * 100}%` }} /></div>
          <div className="bar-value">{freq[s]}</div>
          {demand[s] ? <span className="chip match" style={{ marginLeft: 6 }}>in demand</span> : null}
        </div>
      ))}
    </div>
  );
}

function JobsAdminPanel({ jobs, onAdd, onRemove }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title.trim() || !company.trim()) return;
    onAdd({ title: title.trim(), company: company.trim(), skills: skills.split(",").map((s) => s.trim()).filter(Boolean) });
    setTitle(""); setCompany(""); setSkills("");
  }

  return (
    <div className="panel-block">
      <form className="panel-form" onSubmit={submit}>
        <div className="row">
          <label>Job title<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Frontend Developer" /></label>
          <label>Company<input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Iligan Digital Solutions" /></label>
        </div>
        <label>Skills needed (comma separated)<input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, JavaScript" /></label>
        <button type="submit" className="btn-ghost" style={{ alignSelf: "flex-start" }}><Icon name="plus" size={14} /> Publish posting</button>
      </form>

      <div className="list-block">
        {jobs.map((j) => (
          <div className="list-item" key={j.id}>
            <div className="list-item-main">
              <div className="list-item-title">{j.title}</div>
              <div className="list-item-sub">{j.company}</div>
              <div className="chip-row" style={{ marginTop: 6 }}>{j.skills.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
            </div>
            <div className="list-item-actions">
              <button className="btn-danger" onClick={() => onRemove(j.id)}><Icon name="trash" size={15} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsAdminPanel({ events, onAdd, onRemove }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title.trim() || !date) return;
    onAdd({ title: title.trim(), date });
    setTitle(""); setDate("");
  }

  return (
    <div className="panel-block">
      <form className="panel-form" onSubmit={submit}>
        <div className="row">
          <label>Event title<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Homecoming & Career Fair" /></label>
          <label>Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
        </div>
        <button type="submit" className="btn-ghost" style={{ alignSelf: "flex-start" }}><Icon name="plus" size={14} /> Post event</button>
      </form>

      <div className="list-block">
        {events.map((ev) => (
          <div className="list-item" key={ev.id}>
            <div className="list-item-main">
              <div className="list-item-title">{ev.title}</div>
              <div className="list-item-sub">{ev.date} · {ev.rsvps.length} RSVP{ev.rsvps.length === 1 ? "" : "s"}</div>
            </div>
            <div className="list-item-actions">
              <button className="btn-danger" onClick={() => onRemove(ev.id)}><Icon name="trash" size={15} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfilePanel({ me, onSave }) {
  const [name, setName] = useState(me.name);
  const [program, setProgram] = useState(me.program);
  const [gradYear, setGradYear] = useState(me.gradYear);
  const [avatar, setAvatar] = useState(me.avatar || null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  }

  function submit(e) {
    e.preventDefault();
    onSave({ name: name.trim() || me.name, program: program.trim() || me.program, gradYear, avatar });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="panel-block">
      <div className="avatar-upload">
        <div className="avatar-preview">
          {avatar ? <img src={avatar} alt="Profile" /> : (name || "U").slice(0, 1).toUpperCase()}
        </div>
        <div className="avatar-upload-actions">
          <button type="button" className="btn-ghost" onClick={() => fileRef.current && fileRef.current.click()}>
            <Icon name="camera" size={14} /> {avatar ? "Change photo" : "Upload photo"}
          </button>
          {avatar && <button type="button" className="text-link" style={{ color: "var(--gold)", fontSize: "0.76rem" }} onClick={() => setAvatar(null)}>Remove photo</button>}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
        </div>
      </div>
      <form className="panel-form" onSubmit={submit}>
        <div className="row">
          <label>Full name<input value={name} onChange={(e) => setName(e.target.value)} /></label>
          <label>Program<input value={program} onChange={(e) => setProgram(e.target.value)} /></label>
          <label>Year graduated<input value={gradYear} onChange={(e) => setGradYear(e.target.value)} /></label>
        </div>
        <button type="submit" className="btn-ghost" style={{ alignSelf: "flex-start" }}>Save profile</button>
        {saved && <span className="confirm-badge"><Icon name="check" size={13} /> Profile updated</span>}
      </form>
    </div>
  );
}

function SurveyFormPanel({ me, onSubmit }) {
  const [employed, setEmployed] = useState(EMPLOYMENT_OPTIONS.includes(me.employed) ? me.employed : "Unemployed");
  const [jobTitle, setJobTitle] = useState(me.jobTitle || "");
  const [skillsText, setSkillsText] = useState(me.skills.join(", "));
  const [done, setDone] = useState(me.surveyCompleted);

  function submit(e) {
    e.preventDefault();
    const skills = skillsText.split(",").map((s) => s.trim()).filter(Boolean);
    onSubmit({
      employed,
      jobTitle: employed === "Employed" ? jobTitle.trim() : "",
      skills,
    });
    setDone(true);
  }

  return (
    <div className="panel-block">
      <form className="panel-form" onSubmit={submit}>
        <label>Current employment status
          <select value={employed} onChange={(e) => setEmployed(e.target.value)}>
            {EMPLOYMENT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
        {employed === "Employed" && (
          <label>Current job title
            <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g. Junior Web Developer" required />
          </label>
        )}
        <label>Skills gained since graduating (comma separated)
          <input value={skillsText} onChange={(e) => setSkillsText(e.target.value)} placeholder="React, SQL, Project Management" />
        </label>
        <button type="submit" className="btn-ghost" style={{ alignSelf: "flex-start" }}>Submit survey</button>
        {done && <span className="confirm-badge"><Icon name="check" size={13} /> Survey on file — this feeds AAO's analytics</span>}
      </form>
    </div>
  );
}

// Employed alumni: shows how well their existing skills line up with what's
// currently being asked for across every posting (a fit score), rather than
// a list to apply to.
function JobAlignmentPanel({ me, jobs }) {
  const scored = jobs.map((j) => ({
    ...j,
    overlap: j.skills.filter((s) => me.skills.some((ms) => ms.toLowerCase() === s.toLowerCase())),
  }));
  const totalSkillSlots = jobs.reduce((sum, j) => sum + j.skills.length, 0);
  const matchedSlots = scored.reduce((sum, j) => sum + j.overlap.length, 0);
  const pct = totalSkillSlots ? Math.round((matchedSlots / totalSkillSlots) * 100) : 0;
  const overlapping = scored.filter((j) => j.overlap.length > 0).sort((a, b) => b.overlap.length - a.overlap.length);
  const related = isJobRelatedToCourse(me.jobTitle);

  return (
    <div className="panel-block">
      {me.jobTitle && (
        <div className="list-item" style={{ marginBottom: 16 }}>
          <div className="list-item-main">
            <div className="list-item-title">{me.jobTitle}</div>
            <div className="list-item-sub">Reported role · {me.program}</div>
          </div>
          {related === true && <span className="pill ok"><Icon name="check" size={11} /> Related to your course</span>}
          {related === false && <span className="pill muted">Outside your course field</span>}
        </div>
      )}
      <div className="bar-row">
        <div className="bar-label">Market alignment</div>
        <div className="bar-track"><div className="bar-fill" style={{ width: `${pct}%` }} /></div>
        <div className="bar-value">{pct}%</div>
      </div>
      <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", margin: "10px 0 16px", lineHeight: 1.5 }}>
        How closely your reported skills match the skills currently requested across open partner-employer postings.
      </p>
      <div className="list-block">
        {overlapping.length === 0 && <div className="empty-state">No overlapping postings right now — your skill set is ahead of current listings.</div>}
        {overlapping.map((j) => (
          <div className="list-item" key={j.id}>
            <div className="list-item-main">
              <div className="list-item-title">{j.title}</div>
              <div className="list-item-sub">{j.company}</div>
              <div className="chip-row" style={{ marginTop: 6 }}>
                {j.skills.map((s) => <span className={`chip ${j.overlap.includes(s) ? "match" : ""}`} key={s}>{s}</span>)}
              </div>
            </div>
            <span className="pill ok">{j.overlap.length} skill match{j.overlap.length === 1 ? "" : "es"}</span>
          </div>
        ))}
      </div>
      <SkillRecommendations me={me} jobs={jobs} />
    </div>
  );
}
function CareerToolsPanel({ me, jobs }) {
  const scored = jobs
    .map((j) => ({ ...j, overlap: j.skills.filter((s) => me.skills.some((ms) => ms.toLowerCase() === s.toLowerCase())) }))
    .sort((a, b) => b.overlap.length - a.overlap.length);

  return (
    <div className="panel-block">
      <div className="list-block">
        {scored.length === 0 && <div className="empty-state">No postings yet — check back once the AAO publishes openings.</div>}
        {scored.map((j) => (
          <div className="list-item" key={j.id}>
            <div className="list-item-main">
              <div className="list-item-title">{j.title}</div>
              <div className="list-item-sub">{j.company}</div>
              <div className="chip-row" style={{ marginTop: 6 }}>
                {j.skills.map((s) => (
                  <span className={`chip ${j.overlap.includes(s) ? "match" : ""}`} key={s}>{s}</span>
                ))}
              </div>
            </div>
            {j.overlap.length > 0 && <span className="pill ok">{j.overlap.length} skill match{j.overlap.length === 1 ? "" : "es"}</span>}
          </div>
        ))}
      </div>
      <SkillRecommendations me={me} jobs={jobs} />
    </div>
  );
}

function NotificationsListPanel({ notifications }) {
  return (
    <div className="panel-block list-block">
      {notifications.length === 0 && <div className="empty-state">You're all caught up — nothing from the AAO yet.</div>}
      {notifications.map((n) => (
        <div className="list-item" key={n.id}>
          <div className="list-item-main"><div className="list-item-title" style={{ fontWeight: 500 }}>{n.text}</div><div className="list-item-sub">{n.date}</div></div>
        </div>
      ))}
    </div>
  );
}

function EventsAlumniPanel({ events, me, onRsvp }) {
  return (
    <div className="panel-block list-block">
      {events.length === 0 && <div className="empty-state">No events posted yet.</div>}
      {events.map((ev) => {
        const going = ev.rsvps.includes(me.name);
        return (
          <div className="list-item" key={ev.id}>
            <div className="list-item-main">
              <div className="list-item-title">{ev.title}</div>
              <div className="list-item-sub">{ev.date} · {ev.rsvps.length} attending</div>
            </div>
            <button className={`btn-rsvp ${going ? "going" : ""}`} onClick={() => onRsvp(ev.id)}>
              <Icon name={going ? "check" : "plus"} size={13} /> {going ? "Going" : "RSVP"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function StaticInfoPanel({ text }) {
  return <div className="panel-block"><p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.88rem", lineHeight: 1.6 }}>{text}</p></div>;
}

/* ------------------------------------------------------------------ */
/*  Dashboard                                                           */
/* ------------------------------------------------------------------ */

function Dashboard({ role, name, domain, onLogout }) {
  const { alumni, jobs, events, notifications, actions } = domain;
  const me = alumni.find((a) => a.isSelf) || alumni[0];
  const features = role === "admin" ? ADMIN_FEATURES : getAlumniFeatures(me.employed);

  // Alumni must complete their survey before anything else unlocks.
  const surveyLocked = role === "alumni" && !me.surveyCompleted;

  const [active, setActive] = useState(surveyLocked ? "Complete the Alumni Survey" : features[0].title);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (surveyLocked) setActive("Complete the Alumni Survey");
  }, [surveyLocked]);

  // Submitting the survey unlocks the dashboard and immediately routes the
  // alumnus to the feature that matches their new employment status.
  function handleSurveySubmit(data) {
    actions.submitSurvey(data);
    setActive(data.employed === "Employed" ? "Job Alignment" : "Career Tools");
  }

  const employedCount = alumni.filter((a) => a.employed === "Employed").length;
  const surveyedCount = alumni.filter((a) => a.surveyCompleted).length;
  const totalRsvps = events.reduce((sum, e) => sum + e.rsvps.length, 0);
  const matchedJobs = jobs.filter((j) => j.skills.some((s) => me.skills.some((ms) => ms.toLowerCase() === s.toLowerCase()))).length;

  const STATS = {
    admin: [
      { label: "Registered alumni", value: String(alumni.length) },
      { label: "Employed alumni", value: alumni.length ? `${Math.round((employedCount / alumni.length) * 100)}%` : "0%" },
      { label: "Surveys on file", value: String(surveyedCount) },
      { label: "Open job postings", value: String(jobs.length) },
    ],
    alumni: [
      { label: "Profile completeness", value: `${Math.min(100, 30 + me.skills.length * 15 + (me.surveyCompleted ? 25 : 0))}%` },
      { label: "Matched openings", value: String(matchedJobs) },
      { label: "Upcoming events", value: String(events.length) },
      { label: "Survey status", value: me.surveyCompleted ? "Done" : "Pending" },
    ],
  };

  function getBadge(title) {
    if (role === "admin") {
      if (title === "Manage User Accounts") return alumni.length;
      if (title === "View Alumni Information") return alumni.length;
      if (title === "View Survey Results") return surveyedCount;
      if (title === "Manage Notifications") return notifications.length;
      if (title === "Career Tools & Job Postings") return jobs.length;
      if (title === "Manage Event Posting") return totalRsvps;
    } else {
      if (title === "Job Alignment" || title === "Career Tools") return matchedJobs;
      if (title === "Notifications") return notifications.length;
      if (title === "Events & Activities") return events.length;
      if (title === "Complete the Alumni Survey") return me.surveyCompleted ? "Done" : "Pending";
    }
    return null;
  }

  function renderPanel(title) {
    if (role === "admin") {
      switch (title) {
        case "Login & Authentication":
          return <StaticInfoPanel text="Every sign-in is checked against the account database before an admin session is granted. This demo skips real authentication so you can explore freely." />;
        case "Manage User Accounts":
          return <ManageUsersPanel alumni={alumni} onAdd={actions.addAlumni} onRemove={actions.removeAlumni} />;
        case "View Alumni Information":
          return <AlumniInfoPanel alumni={alumni} />;
        case "View Survey Results":
          return <SurveyResultsPanel alumni={alumni} />;
        case "Manage Notifications":
          return <NotifyComposerPanel notifications={notifications} onSend={actions.sendNotification} />;
        case "View AI Analytics":
          return <AnalyticsPanel alumni={alumni} jobs={jobs} />;
        case "Career Tools & Job Postings":
          return <JobsAdminPanel jobs={jobs} onAdd={actions.addJob} onRemove={actions.removeJob} />;
        case "Manage Event Posting":
          return <EventsAdminPanel events={events} onAdd={actions.addEvent} onRemove={actions.removeEvent} />;
        default:
          return null;
      }
    }
    switch (title) {
      case "Register & Login":
        return <StaticInfoPanel text="Your account details are verified against your stored alumni record every time you sign in from a new device." />;
      case "Manage Alumni Profile":
        return <ProfilePanel me={me} onSave={actions.updateSelf} />;
      case "Complete the Alumni Survey":
        return <SurveyFormPanel me={me} onSubmit={handleSurveySubmit} />;
      case "Job Alignment":
        return <JobAlignmentPanel me={me} jobs={jobs} />;
      case "Career Tools":
        return <CareerToolsPanel me={me} jobs={jobs} />;
      case "Notifications":
        return <NotificationsListPanel notifications={notifications} />;
      case "Events & Activities":
        return <EventsAlumniPanel events={events} me={me} onRsvp={actions.rsvpEvent} />;
      default:
        return null;
    }
  }

  const activeFeature = features.find((f) => f.title === active);
  const navFeatures = features.filter((f) => !(role === "alumni" && f.title === "Notifications"));

  return (
    <div className={`dash ${entered ? "in" : ""}`}>
      <aside className="dash-sidebar">
        <div className="dash-crest">
          <div className="crest small">
            {me.avatar && role === "alumni" ? <img src={me.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <BrandLogo />}
          </div>
          <div>
            <p className="dash-brand">Alumni Tracer</p>
            <p className="dash-role">{role === "admin" ? "Administrator" : "Alumnus"}</p>
          </div>
        </div>

        <nav className="dash-nav">
          {navFeatures.map((f, i) => {
            const badge = getBadge(f.title);
            const locked = surveyLocked && f.title !== "Complete the Alumni Survey";
            return (
              <button
                key={f.title}
                className={`dash-nav-item ${active === f.title ? "active" : ""}`}
                style={{ "--i": i }}
                disabled={locked}
                onClick={() => { if (!locked) setActive(f.title); }}
              >
                <Icon name={locked ? "key" : f.icon} size={18} />
                <span className="nav-label">{f.title}</span>
                {badge !== null && badge !== undefined && badge !== 0 && <span className="nav-badge">{badge}</span>}
              </button>
            );
          })}
        </nav>

        <button className="dash-logout" onClick={onLogout}><Icon name="logout" size={18} /> <span>Sign out</span></button>
      </aside>

      <main className="dash-main">
        <header className="dash-header">
          <div>
            <p className="eyebrow">Good day, {name || me.name || (role === "admin" ? "Administrator" : "Alumnus")}</p>
            <h1>{role === "admin" ? "Alumni Affairs Office Dashboard" : "My Alumni Dashboard"}</h1>
          </div>
          <div className="dash-header-actions">
            {role === "alumni" && (
              <button
                className={`dash-profile-action ${active === "Notifications" ? "active" : ""}`}
                onClick={() => { if (!surveyLocked) setActive("Notifications"); }}
                disabled={surveyLocked}
                style={{ position: "relative" }}
              >
                <Icon name="bell" size={18} />
                <span>Notifications</span>
                {notifications.length > 0 && <span className="ping-dot" />}
              </button>
            )}
            <div className="dash-avatar">
              {role === "alumni" && me.avatar ? <img src={me.avatar} alt="" /> : (name || me.name || "U").slice(0, 1).toUpperCase()}
            </div>
          </div>
        </header>

        <TracerLine className="dash-tracer" />

        {surveyLocked && (
          <div className="lock-banner">
            <Icon name="doc" size={16} />
            <span>Complete your alumni survey to unlock your profile, career tools, notifications, and events.</span>
          </div>
        )}

        <section className="stat-grid">
          {STATS[role].map((s, i) => (
            <div className="stat-card" style={{ "--i": i }} key={s.label}>
              <p className="stat-value"><AnimatedNumber value={s.value} /></p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </section>

        {activeFeature && (
          <section className="detail-panel" key={activeFeature.title}>
            <div className="detail-icon"><Icon name={activeFeature.icon} size={24} /></div>
            <div className="detail-body">
              <h3>{activeFeature.title}</h3>
              <p>{activeFeature.text}</p>
              {renderPanel(activeFeature.title)}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Root app — owns the shared domain state that links every feature   */
/* ------------------------------------------------------------------ */

const INITIAL_ALUMNI = [
  { id: "self", name: "You", isSelf: true, program: "BS Computer Science", gradYear: String(CURRENT_YEAR), employed: "Unknown", jobTitle: "", skills: ["JavaScript", "React"], surveyCompleted: false, avatar: null },
  { id: uid(), name: "Maria Santos", program: "BS Information Technology", gradYear: "2022", employed: "Employed", jobTitle: "Data & Systems Coordinator", skills: ["SQL", "Project Management", "Python"], surveyCompleted: true, avatar: null },
  { id: uid(), name: "Jerome Villanueva", program: "BS Computer Science", gradYear: "2023", employed: "Employed", jobTitle: "Frontend Developer", skills: ["React", "Node.js", "UI/UX"], surveyCompleted: true, avatar: null },
  { id: uid(), name: "Angel Reyes", program: "BS Information Technology", gradYear: "2021", employed: "Employed", jobTitle: "Network Security Specialist", skills: ["Networking", "Cybersecurity"], surveyCompleted: true, avatar: null },
  { id: uid(), name: "Paolo Cruz", program: "BS Computer Science", gradYear: String(CURRENT_YEAR), employed: "Unemployed", jobTitle: "", skills: ["Java", "Data Analysis"], surveyCompleted: true, avatar: null },
];

const INITIAL_JOBS = [
  { id: uid(), title: "Junior Web Developer", company: "Iligan Digital Solutions", skills: ["JavaScript", "React"] },
  { id: uid(), title: "IT Support Specialist", company: "Northern Mindanao Hospital", skills: ["Networking", "Cybersecurity"] },
  { id: uid(), title: "Data Analyst", company: "CDO Analytics Hub", skills: ["Python", "Data Analysis", "SQL"] },
];

const INITIAL_EVENTS = [
  { id: uid(), title: "Homecoming & Career Fair", date: "2026-09-12", rsvps: [] },
  { id: uid(), title: "IT Alumni Tech Talk", date: "2026-10-03", rsvps: ["Maria Santos"] },
];

const INITIAL_NOTIFICATIONS = [
  { id: uid(), text: "Welcome to the Alumni Tracer System! Complete your survey to unlock job matches.", date: "2026-08-01" },
];

export default function App() {
  const [page, setPage] = useState("login");
  const [role, setRole] = useState("alumni");
  const [name, setName] = useState("");

  const [alumni, setAlumni] = useState(INITIAL_ALUMNI);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState([]);

  function addToast(text) {
    const id = uid();
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }

  const actions = {
    updateSelf(patch) {
      setAlumni((list) => list.map((a) => (a.isSelf ? { ...a, ...patch } : a)));
      addToast("Profile updated.");
    },
    submitSurvey({ employed, jobTitle, skills }) {
      setAlumni((list) => list.map((a) => (a.isSelf ? { ...a, employed, jobTitle: jobTitle || "", skills, surveyCompleted: true } : a)));
      addToast("Survey submitted — thanks for the update!");
    },
    addSkill(skill) {
      setAlumni((list) => list.map((a) => (a.isSelf && !a.skills.includes(skill) ? { ...a, skills: [...a.skills, skill] } : a)));
    },
    removeSkill(skill) {
      setAlumni((list) => list.map((a) => (a.isSelf ? { ...a, skills: a.skills.filter((s) => s !== skill) } : a)));
    },
    addAlumni({ name: n, program, gradYear }) {
      setAlumni((list) => [...list, { id: uid(), name: n, program, gradYear, employed: "Unknown", jobTitle: "", skills: [], surveyCompleted: false, avatar: null }]);
      addToast("Alumnus added to the directory.");
    },
    removeAlumni(id) {
      setAlumni((list) => list.filter((a) => a.id !== id));
    },
    addJob(job) {
      setJobs((list) => [{ id: uid(), ...job }, ...list]);
      addToast("Job posting published to alumni.");
    },
    removeJob(id) {
      setJobs((list) => list.filter((j) => j.id !== id));
    },
    addEvent(ev) {
      setEvents((list) => [{ id: uid(), rsvps: [], ...ev }, ...list]);
      addToast("Event posted to alumni.");
    },
    removeEvent(id) {
      setEvents((list) => list.filter((e) => e.id !== id));
    },
    rsvpEvent(eventId) {
      setAlumni((currentAlumni) => {
        const me = currentAlumni.find((a) => a.isSelf);
        setEvents((list) => list.map((e) => {
          if (e.id !== eventId) return e;
          const already = e.rsvps.includes(me.name);
          return { ...e, rsvps: already ? e.rsvps.filter((n) => n !== me.name) : [...e.rsvps, me.name] };
        }));
        return currentAlumni;
      });
      addToast("RSVP updated.");
    },
    sendNotification(text) {
      setNotifications((list) => [{ id: uid(), text, date: new Date().toISOString().slice(0, 10) }, ...list]);
      addToast("Notification sent to all alumni.");
    },
  };

  const domain = { alumni, jobs, events, notifications, actions };

  function handleLogin(e) {
    e.preventDefault();
    setPage("dashboard");
  }

  function handleSignup(data) {
    const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");
    if (fullName) setName(fullName);
    setAlumni((list) => list.map((a) => (a.isSelf ? {
      ...a,
      name: fullName || a.name,
      program: role === "alumni" ? data.program : a.program,
      gradYear: role === "alumni" ? data.gradYear : a.gradYear,
    } : a)));
    setPage("dashboard");
  }

  function handleLogout() {
    setPage("login");
  }

  let body;
  if (page === "dashboard") {
    body = <Dashboard role={role} name={name} domain={domain} onLogout={handleLogout} />;
  } else if (page === "signup") {
    body = <SignupPage role={role} setRole={setRole} onSubmit={handleSignup} goLogin={() => setPage("login")} />;
  } else {
    body = <LoginPage role={role} setRole={setRole} onSubmit={handleLogin} goSignup={() => setPage("signup")} />;
  }

  return (
    <div className="tracer-root">
      <style>{STYLES}</style>
      <ToastStack toasts={toasts} />
      {body}
    </div>
  );
}