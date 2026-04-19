import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import {
  dummyRequests,
  dummyAIInsights,
  dummyNotifications,
} from "../../Data/dummyData";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifs] = useState([]);
  const [aiInsights, setAiInsights] = useState(dummyAIInsights);

  useEffect(() => {
    // ── USER: localStorage first, fallback dummy ──
    const loggedEmail = localStorage.getItem("loggedEmail");
    const lsUsers = JSON.parse(localStorage.getItem("users")) || [];
    const found = lsUsers.find((u) => u.email === loggedEmail);
    setUser(found || { fullName: "Ayesha Khan", trustScore: 92, role: "Both" });

    // ── REQUESTS: localStorage first, fallback dummyRequests ──
    const lsReqs = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(lsReqs.length > 0 ? lsReqs : dummyRequests);

    // ── NOTIFICATIONS: localStorage first, fallback dummyNotifications ──
    const lsNotifs = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifs(lsNotifs.length > 0 ? lsNotifs : dummyNotifications);

    // ── AI INSIGHTS: localStorage first, fallback dummyAIInsights ──
    const lsInsights = JSON.parse(localStorage.getItem("aiInsights"));
    if (lsInsights) setAiInsights(lsInsights);
  }, []);

  // ── DERIVED STATS ──
  const openCount = requests.filter((r) => r.status === "Open").length;
  const helpingCount = requests.filter((r) => r.author === user?.fullName).length;
  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayReqs = requests.slice(0, 3);
  const notifPreview = notifications.slice(0, 3);

  // ── BADGE HELPERS ──
  const catClass = (c) =>
    c === "Web Development" ? "b-dev" : c === "Design" ? "b-design" : "b-career";
  const priClass = (p) =>
    p === "High" ? "b-high" : p === "Medium" ? "b-med" : "b-low";
  const stClass = (s) => (s === "Solved" ? "b-solved" : "b-open");

  // ── LOGOUT ──
  const handleLogout = () => {
    localStorage.setItem("isLogin", "false");
    localStorage.removeItem("loggedEmail");
    navigate("/");
  };

  return (
    <div className="db-page">

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <nav className="db-nav">
        <div className="db-nav-l">
          <div className="db-logo">H</div>
          <span className="db-brand">HelpHub AI</span>
          <div className="db-nav-links">
            <span className="db-nl active" onClick={() => navigate("/dashboard")}>Dashboard</span>
            <span className="db-nl" onClick={() => navigate("/explore")}>Explore</span>
            <span className="db-nl" onClick={() => navigate("/create-request")}>Create Request</span>
            <span className="db-nl" onClick={() => navigate("/messages")}>Messages</span>
            <span className="db-nl" onClick={() => navigate("/profile")}>Profile</span>
          </div>
        </div>
        <div className="db-nav-r">
          <span className="db-notif-link" onClick={() => navigate("/notifications")}>
            Notifications
            {unreadCount > 0 && <span className="db-notif-pip">{unreadCount}</span>}
          </span>
          <button className="db-ai-btn" onClick={() => navigate("/ai-center")}>
            Open AI Center
          </button>
          <button className="db-logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* content wrapper with padding */}
      <div className="db-content">

        {/* ══════════════════════════════════════
            WELCOME BANNER
        ══════════════════════════════════════ */}
        <div className="db-banner">
          <p className="db-banner-label">DASHBOARD</p>
          <h1 className="db-banner-h1">
            Welcome back, {user?.fullName || "Ayesha Khan"}.
          </h1>
          <p className="db-banner-sub">
            Your command center for requests, AI insights, helper momentum, and live community activity.
          </p>
        </div>

        {/* ══════════════════════════════════════
            4 STAT CARDS
        ══════════════════════════════════════ */}
        <div className="db-stats-row">
          <div className="db-stat-card">
            <p className="db-stat-lbl">TRUST SCORE</p>
            <h2 className="db-stat-num">{user?.trustScore || 92}%</h2>
            <p className="db-stat-desc">Driven by solved requests and consistent support.</p>
          </div>
          <div className="db-stat-card">
            <p className="db-stat-lbl">HELPING</p>
            <h2 className="db-stat-num">{helpingCount || 2}</h2>
            <p className="db-stat-desc">Requests where you are currently listed as a helper.</p>
          </div>
          <div className="db-stat-card">
            <p className="db-stat-lbl">OPEN REQUESTS</p>
            <h2 className="db-stat-num">{openCount || 2}</h2>
            <p className="db-stat-desc">Community requests currently active across the feed.</p>
          </div>
          <div className="db-stat-card">
            <p className="db-stat-lbl">AI PULSE</p>
            <h2 className="db-stat-num">{aiInsights.trends} trends</h2>
            <p className="db-stat-desc">Trend count detected in the latest request activity.</p>
          </div>
        </div>

        {/* ══════════════════════════════════════
            MAIN 2-COLUMN LAYOUT
        ══════════════════════════════════════ */}
        <div className="db-main">

          {/* ── LEFT: RECENT REQUESTS ── */}
          <div className="db-left">

            <div className="db-left-hdr">
              <div>
                <p className="db-eyebrow">RECENT REQUESTS</p>
                <h2 className="db-left-title">
                  What the community<br />needs right now
                </h2>
              </div>
              <button className="db-go-btn" onClick={() => navigate("/explore")}>
                Go to<br />feed
              </button>
            </div>

            {/* REQUEST CARDS — vertical list */}
            <div className="db-req-list">
              {displayReqs.map((req) => (
                <div key={req.id} className="db-req-card">

                  {/* badges */}
                  <div className="db-badges">
                    <span className={`db-badge ${catClass(req.category)}`}>{req.category}</span>
                    <span className={`db-badge ${priClass(req.priority)}`}>{req.priority}</span>
                    <span className={`db-badge ${stClass(req.status)}`}>{req.status}</span>
                  </div>

                  {/* title */}
                  <h4 className="db-req-title">{req.title}</h4>

                  {/* description */}
                  <p className="db-req-desc">{req.description}</p>

                  {/* tag pills */}
                  <div className="db-req-tags">
                    {req.tags?.map((t, i) => (
                      <span key={i} className="db-req-tag">{t}</span>
                    ))}
                  </div>

                  {/* footer: author · helpers + Open details */}
                  <div className="db-req-footer">
                    <span className="db-req-meta">
                      {req.author} · {req.helpers} helpers interested
                    </span>
                    <button
                      className="db-open-btn"
                      onClick={() => navigate("/details", { state: { request: req } })}
                    >
                      Open details
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: AI INSIGHTS + NOTIF PREVIEW ── */}
          <div className="db-right">

            {/* AI INSIGHTS */}
            <div className="db-ai-panel">
              <p className="db-eyebrow">AI INSIGHTS</p>
              <h3 className="db-ai-title">Suggested actions for you</h3>

              <div className="db-ai-row">
                <span className="db-ai-lbl">Most requested category</span>
                <span className="db-ai-val">{aiInsights.mostRequestedCategory}</span>
              </div>
              <div className="db-ai-row">
                <span className="db-ai-lbl">Your strongest trust driver</span>
                <span className="db-ai-val">{aiInsights.strongestTrustDriver}</span>
              </div>
              <div className="db-ai-row">
                <span className="db-ai-lbl">AI says you can mentor in</span>
                <span className="db-ai-val">{aiInsights.mentorSkills}</span>
              </div>
              <div className="db-ai-row db-ai-row-last">
                <span className="db-ai-lbl">Your active requests</span>
                <span className="db-ai-val">{aiInsights.activeRequests}</span>
              </div>
            </div>

            {/* NOTIFICATIONS PREVIEW */}
            <div className="db-notif-panel">
              {notifPreview.map((n) => (
                <div key={n.id} className="db-notif-item">
                  <p className="db-notif-text">{n.title}</p>
                  <span className="db-notif-time">{n.time}</span>
                  <button
                    className={`db-notif-badge ${n.read ? "read" : "unread"}`}
                    onClick={() => navigate("/notifications")}
                  >
                    {n.read ? "Read" : "Unread"}
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;