import React, { useState, useEffect } from "react";
import "./App.css";

/* ------------------------------------------------------------------ */
/*  Feature data — pulled from the system's role definitions           */
/* ------------------------------------------------------------------ */

const ADMIN_FEATURES = [
  {
    icon: "key",
    title: "Login & Authentication",
    text: "Sign in through a protected login module that checks every credential against the account database before granting access.",
  },
  {
    icon: "users",
    title: "Manage User Accounts",
    text: "Create, update, view, and remove staff and alumni accounts, keeping access and security controls enforced system-wide.",
  },
  {
    icon: "id",
    title: "View Alumni Information",
    text: "Browse alumni records — student details, employment history, and self-reported skills — in one monitored view.",
  },
  {
    icon: "chart",
    title: "View Survey Results",
    text: "Review alumni responses to issued surveys to track outcomes, response patterns, and emerging work trends.",
  },
  {
    icon: "bell",
    title: "Manage Notifications",
    text: "Send announcements, reminders, and alerts to alumni to keep engagement and response rates high.",
  },
  {
    icon: "spark",
    title: "View AI Analytics",
    text: "See AI-generated career-tracking analytics showing which skills and coursework shape alumni outcomes, informing curriculum decisions.",
  },
  {
    icon: "brief",
    title: "Career Tools & Job Postings",
    text: "Maintain job recommendations and postings shared by partner schools, published for alumni through the Career Tools module.",
  },
  {
    icon: "calendar",
    title: "Manage Event Posting",
    text: "Set up and announce alumni events, then track attendee responses through the Events Response System.",
  },
];

const ALUMNI_FEATURES = [
  {
    icon: "key",
    title: "Register & Login",
    text: "Create an account and sign in securely from any device once your details are verified against your stored record.",
  },
  {
    icon: "id",
    title: "Manage Alumni Profile",
    text: "Upload and edit the personal details on your profile whenever your information changes.",
  },
  {
    icon: "doc",
    title: "Complete the Alumni Survey",
    text: "Share your academic, employment, and career milestones — the core data behind every tracer report.",
  },
  {
    icon: "spark",
    title: "Submit Employment & Skills",
    text: "Log your current employment and skill set so it can be matched against the job bank and your field of study.",
  },
  {
    icon: "brief",
    title: "Access Career Tools",
    text: "Get AI-generated matches between your skills, profile, and open career opportunities.",
  },
  {
    icon: "bell",
    title: "Notifications",
    text: "Receive announcements, survey reminders, and updates from the Alumni Affairs Office.",
  },
  {
    icon: "calendar",
    title: "Events & Activities",
    text: "Browse upcoming alumni events and respond — RSVP, decline, or leave feedback — through the Event Response System.",
  },
];

/* ------------------------------------------------------------------ */
/*  Icons — plain inline SVG, no external icon library required        */
/* ------------------------------------------------------------------ */

const ICONS = {
  key: "M14 7a4 4 0 1 0-3.9 4H5v3H3v3h6v-3h1.1A4 4 0 0 0 14 7Zm-4 2a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z",
  users:
    "M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 18c0-3 3-5 6-5s6 2 6 5v1H2v-1Zm12-4.7c2.2.5 4 2.2 4 4.7v1h-3v-1c0-1.7-.4-3-1-4.7Z",
  id: "M2 4h16v12H2V4Zm3 3v2h2V7H5Zm0 4v1h6v-1H5Zm7-4.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
  chart: "M3 17V9h3v8H3Zm5.5 0V4h3v13h-3ZM14 17v-6h3v6h-3Z",
  bell: "M10 2a1.2 1.2 0 0 0-1.2 1.2v.6C6 4.4 5 6.6 5 9v3l-1.5 2.5v1H16.5v-1L15 12V9c0-2.4-1-4.6-3.8-5.2v-.6A1.2 1.2 0 0 0 10 2Zm0 15.5A1.7 1.7 0 0 0 11.7 16h-3.4A1.7 1.7 0 0 0 10 17.5Z",
  spark:
    "M10 1c.6 3 2.4 4.8 5.4 5.4C12.4 7 10.6 8.8 10 11.8 9.4 8.8 7.6 7 4.6 6.4 7.6 5.8 9.4 4 10 1Zm5.6 10.2c.4 1.7 1.4 2.7 3.1 3.1-1.7.4-2.7 1.4-3.1 3.1-.4-1.7-1.4-2.7-3.1-3.1 1.7-.4 2.7-1.4 3.1-3.1Z",
  brief:
    "M7 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h4v3H3V4h4Zm-1 0h8V3H6v1ZM3 8h16v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8Z",
  calendar:
    "M4 3h2v2h8V3h2v2h2v13H2V5h2V3Zm-1 6v9h16V9H3Zm2 2h3v3H5v-3Z",
  doc: "M5 2h7l4 4v12H5V2Zm7 1.5V6h2.5L12 3.5ZM7 10h6v1.4H7V10Zm0 3h6v1.4H7V13Z",
  eye: "M10 4C5 4 1.7 8 1 10c.7 2 4 6 9 6s8.3-4 9-6c-.7-2-4-6-9-6Zm0 9.5A3.5 3.5 0 1 1 10 6.5a3.5 3.5 0 0 1 0 7Z",
  arrow: "M4 10h11m0 0-4-4m4 4-4 4",
  logout: "M9 3H4v14h5v-2H6V5h3V3Zm7 7-4-4v3H8v2h4v3l4-4Z",
};

function Icon({ name, size = 20 }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={ICONS[name] || ICONS.spark} />
    </svg>
  );
}

function BrandLogo() {
  return <img src="/logo.png" alt="SPC logo" className="crest-logo" />;
}

/* ------------------------------------------------------------------ */
/*  Signature element — the "tracer" line that runs across the app     */
/* ------------------------------------------------------------------ */

function TracerLine({ className = "" }) {
  return (
    <svg
      className={`tracer-svg ${className}`}
      viewBox="0 0 600 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
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
/*  Auth shell — shared chrome for the login / sign-up screens         */
/* ------------------------------------------------------------------ */

function AuthShell({ children, footer }) {
  return (
    <div className="auth-page">
      <div className="auth-bg">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <TracerLine className="auth-tracer" />
      </div>

      <div className="auth-brand">
        <div className="crest">
          <BrandLogo />
        </div>
        <div className="brand-text">
          <p className="eyebrow">St. Peter&rsquo;s College &mdash; IT / CS Programs</p>
          <h1>Alumni Tracer &amp; Job&ndash;Course Alignment Analytics</h1>
          <p className="brand-sub">
            Following every graduate from the tassel-turn to the job title.
          </p>
        </div>
      </div>

      <div className="auth-card-wrap">{children}</div>
      {footer}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Login page                                                         */
/* ------------------------------------------------------------------ */

function LoginPage({ role, setRole, onSubmit, goSignup }) {
  const [showPw, setShowPw] = useState(false);

  return (
    <AuthShell>
      <div className="auth-card">
        <div className="role-toggle" role="tablist" aria-label="Sign in as">
          {["alumni", "admin"].map((r) => (
            <button
              key={r}
              type="button"
              role="tab"
              aria-selected={role === r}
              className={`role-tab ${role === r ? "active" : ""}`}
              onClick={() => setRole(r)}
            >
              {r === "alumni" ? "Alumnus" : "Administrator"}
            </button>
          ))}
        </div>

        <h2>Welcome back</h2>
        <p className="card-sub">
          Sign in to continue as {role === "alumni" ? "an alumnus" : "an AAO administrator"}.
        </p>

        <form onSubmit={onSubmit} className="auth-form">
          <label className="field">
            <span>Email address</span>
            <input type="email" placeholder="you@spc.edu.ph" required />
          </label>

          <label className="field">
            <span>Password</span>
            <div className="pw-wrap">
              <input type={showPw ? "text" : "password"} placeholder="••••••••" required />
              <button
                type="button"
                className="pw-toggle"
                onClick={() => setShowPw((s) => !s)}
                aria-label="Toggle password visibility"
              >
                <Icon name="eye" size={18} />
              </button>
            </div>
          </label>

          <div className="field-row">
            <label className="checkbox">
              <input type="checkbox" /> <span>Remember me</span>
            </label>
            <a href="#" className="text-link">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn-primary btn-block">
            Sign in <Icon name="arrow" size={16} />
          </button>
        </form>

        <p className="switch-line">
          New here?{" "}
          <button className="text-link" onClick={goSignup}>
            Create an account
          </button>
        </p>
      </div>
    </AuthShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Sign-up page                                                       */
/* ------------------------------------------------------------------ */

function SignupPage({ role, setRole, onSubmit, goLogin }) {
  return (
    <AuthShell>
      <div className="auth-card">
        <div className="role-toggle" role="tablist" aria-label="Register as">
          {["alumni", "admin"].map((r) => (
            <button
              key={r}
              type="button"
              role="tab"
              aria-selected={role === r}
              className={`role-tab ${role === r ? "active" : ""}`}
              onClick={() => setRole(r)}
            >
              {r === "alumni" ? "Alumnus" : "Administrator"}
            </button>
          ))}
        </div>

        <h2>Create your account</h2>
        <p className="card-sub">
          Register as {role === "alumni" ? "a graduate of the IT / CS program" : "Alumni Affairs Office staff"}.
        </p>

        <form onSubmit={onSubmit} className="auth-form">
          <div className="field-pair">
            <label className="field">
              <span>First name</span>
              <input type="text" placeholder="Juan" required />
            </label>
            <label className="field">
              <span>Last name</span>
              <input type="text" placeholder="Dela Cruz" required />
            </label>
          </div>

          {role === "alumni" && (
            <div className="field-pair">
              <label className="field">
                <span>Program</span>
                <input type="text" placeholder="BS Computer Science" required />
              </label>
              <label className="field">
                <span>Year graduated</span>
                <input type="number" placeholder="2023" min="1990" max="2026" required />
              </label>
            </div>
          )}

          <label className="field">
            <span>Email address</span>
            <input type="email" placeholder="you@spc.edu.ph" required />
          </label>

          <div className="field-pair">
            <label className="field">
              <span>Password</span>
              <input type="password" placeholder="••••••••" required />
            </label>
            <label className="field">
              <span>Confirm password</span>
              <input type="password" placeholder="••••••••" required />
            </label>
          </div>

          <label className="checkbox">
            <input type="checkbox" required />
            <span>I agree to the data privacy terms of the Alumni Affairs Office</span>
          </label>

          <button type="submit" className="btn-primary btn-block">
            Create account <Icon name="arrow" size={16} />
          </button>
        </form>

        <p className="switch-line">
          Already registered?{" "}
          <button className="text-link" onClick={goLogin}>
            Sign in
          </button>
        </p>
      </div>
    </AuthShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard                                                           */
/* ------------------------------------------------------------------ */

const STATS = {
  admin: [
    { label: "Registered alumni", value: "3,214" },
    { label: "Employed within field", value: "78%" },
    { label: "Surveys this term", value: "612" },
    { label: "Open job postings", value: "46" },
  ],
  alumni: [
    { label: "Profile completeness", value: "82%" },
    { label: "Matched openings", value: "9" },
    { label: "Upcoming events", value: "2" },
    { label: "Survey status", value: "Pending" },
  ],
};

function Dashboard({ role, name, onLogout }) {
  const features = role === "admin" ? ADMIN_FEATURES : ALUMNI_FEATURES;
  const navFeatures = features.filter((feature) => feature.title !== "Notifications");
  const [active, setActive] = useState(features[0].title);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, []);

  const activeFeature = features.find((f) => f.title === active);

  return (
    <div className={`dash ${entered ? "in" : ""}`}>
      <aside className="dash-sidebar">
        <div className="dash-crest">
          <div className="crest small">
            <BrandLogo />
          </div>
          <div>
            <p className="dash-brand">Alumni Tracer</p>
            <p className="dash-role">{role === "admin" ? "Administrator" : "Alumnus"}</p>
          </div>
        </div>

        <nav className="dash-nav">
          {navFeatures.map((f, i) => (
            <button
              key={f.title}
              className={`dash-nav-item ${active === f.title ? "active" : ""}`}
              style={{ "--i": i }}
              onClick={() => setActive(f.title)}
            >
              <Icon name={f.icon} size={18} />
              <span>{f.title}</span>
            </button>
          ))}
        </nav>

        <button className="dash-logout" onClick={onLogout}>
          <Icon name="logout" size={18} /> Sign out
        </button>
      </aside>

      <main className="dash-main">
        <header className="dash-header">
          <div>
            <p className="eyebrow">Good day, {name || (role === "admin" ? "Administrator" : "Alumnus")}</p>
            <h1>{role === "admin" ? "Alumni Affairs Office Dashboard" : "My Alumni Dashboard"}</h1>
          </div>
          <div className="dash-header-actions">
            {role === "alumni" && (
              <button
                className={`dash-profile-action ${active === "Notifications" ? "active" : ""}`}
                onClick={() => setActive("Notifications")}
              >
                <Icon name="bell" size={18} />
                <span>Notifications</span>
              </button>
            )}
            <div className="dash-avatar">{(name || "U").slice(0, 1).toUpperCase()}</div>
          </div>
        </header>

        <TracerLine className="dash-tracer" />

        <section className="stat-grid">
          {STATS[role].map((s, i) => (
            <div className="stat-card" style={{ "--i": i }} key={s.label}>
              <p className="stat-value">{s.value}</p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="feature-section">
        </section>

        {activeFeature && (
          <section className="detail-panel">
            <div className="detail-icon">
              <Icon name={activeFeature.icon} size={26} />
            </div>
            <div>
              <h3>{activeFeature.title}</h3>
              <p>{activeFeature.text}</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Root app                                                            */
/* ------------------------------------------------------------------ */

export default function App() {
  const [page, setPage] = useState("login"); // login | signup | dashboard
  const [role, setRole] = useState("alumni"); // alumni | admin
  const [name, setName] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setPage("dashboard");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const first = e.target.elements[0]?.value;
    if (first) setName(first);
    setPage("dashboard");
  };

  if (page === "dashboard") {
    return (
      <Dashboard
        role={role}
        name={name}
        onLogout={() => {
          setPage("login");
          setName("");
        }}
      />
    );
  }

  if (page === "signup") {
    return (
      <SignupPage
        role={role}
        setRole={setRole}
        onSubmit={handleSignup}
        goLogin={() => setPage("login")}
      />
    );
  }

  return (
    <LoginPage
      role={role}
      setRole={setRole}
      onSubmit={handleLogin}
      goSignup={() => setPage("signup")}
    />
  );
}