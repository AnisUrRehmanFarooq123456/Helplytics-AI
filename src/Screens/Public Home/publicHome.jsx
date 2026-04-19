import React from "react";
import { useNavigate } from "react-router-dom";
import "./publicHome.css";

const PublicHome = () => {
  const navigate = useNavigate();
  const go = () => navigate("/login");

  return (
    <div className="ph-page">

      {/* ══════════════════════════════
          NAVBAR
      ══════════════════════════════ */}
      <nav className="ph-nav">
        <div className="ph-nav-l">
          <div className="ph-logo" onClick={go}>H</div>
          <span className="ph-brand" onClick={go}>HelpHub AI</span>
          <div className="ph-nav-links">
            <span className="ph-nl active" onClick={go}>Home</span>
            <span className="ph-nl" onClick={go}>Explore</span>
            <span className="ph-nl" onClick={go}>Leaderboard</span>
            <span className="ph-nl" onClick={go}>AI Center</span>
          </div>
        </div>
        <div className="ph-nav-r">
          <button className="ph-chip" onClick={go}>Live community signals</button>
          <button className="ph-join-btn" onClick={go}>Join the platform</button>
        </div>
      </nav>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="ph-hero">

        {/* LEFT */}
        <div className="ph-hero-l">
          <span className="ph-eyebrow">SMIT GRAND CODING NIGHT 2026</span>

          <h1 className="ph-h1">
            Find help faster.<br />
            Become help that<br />
            matters.
          </h1>

          <p className="ph-sub">
            HelpHub AI is a community-powered support network for students,
            mentors, creators, and builders. Ask for help, offer help, track
            impact, and let AI surface smarter matches across the platform.
          </p>

          <div className="ph-cta-row">
            <button className="ph-btn-solid" onClick={go}>Open product demo</button>
            <button className="ph-btn-outline" onClick={go}>Post a request</button>
          </div>

          {/* STAT CARDS */}
          <div className="ph-stats-row">
            <div className="ph-stat">
              <span className="ph-stat-lbl">MEMBERS</span>
              <strong className="ph-stat-num">384+</strong>
              <span className="ph-stat-desc">Students, mentors, and helpers in the loop.</span>
            </div>
            <div className="ph-stat">
              <span className="ph-stat-lbl">REQUESTS</span>
              <strong className="ph-stat-num">72+</strong>
              <span className="ph-stat-desc">Support posts shared across learning journeys.</span>
            </div>
            <div className="ph-stat">
              <span className="ph-stat-lbl">SOLVED</span>
              <strong className="ph-stat-num">69+</strong>
              <span className="ph-stat-desc">Problems resolved through fast community action.</span>
            </div>
          </div>
        </div>

        {/* RIGHT DARK PANEL */}
        <div className="ph-hero-r">
          <div className="ph-yellow-dot" />
          <span className="ph-panel-eyebrow">LIVE PRODUCT FEEL</span>
          <h2 className="ph-panel-h2">
            More than a form.<br />
            More like an<br />
            ecosystem.
          </h2>
          <p className="ph-panel-body">
            A polished multi-page experience inspired by product platforms,
            with AI summaries, trust scores, contribution signals, notifications,
            and leaderboard momentum built directly in HTML, CSS, JavaScript,
            and LocalStorage.
          </p>
          <div className="ph-panel-box">
            <strong>AI request intelligence</strong>
            <span>Auto-categorization, urgency detection, tags, rewrite suggestions, and trend snapshots.</span>
          </div>
          <div className="ph-panel-box">
            <strong>Community trust graph</strong>
            <span>Badges, helper rankings, trust score boosts, and visible contribution history.</span>
          </div>
          <div className="ph-panel-box">
            <strong>100%</strong>
            <span>Top trust score currently active across the sample mentor network.</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CORE FLOW
      ══════════════════════════════ */}
      <section className="ph-core">
        <div className="ph-section-hdr">
          <div>
            <span className="ph-section-eyebrow">CORE FLOW</span>
            <h2 className="ph-section-h2">From struggling alone to solving together</h2>
          </div>
          <button className="ph-chip-outline" onClick={go}>Try onboarding AI</button>
        </div>
        <div className="ph-core-cards">
          <div className="ph-core-card">
            <h4>Ask for help clearly</h4>
            <p>Create structured requests with category, urgency, AI suggestions, and tags that attract the right people.</p>
          </div>
          <div className="ph-core-card">
            <h4>Discover the right people</h4>
            <p>Use explore feed, helper lists, notifications, and messaging to move quickly once a match happens.</p>
          </div>
          <div className="ph-core-card">
            <h4>Track real contribution</h4>
            <p>Trust scores, badges, solved requests, and rankings help the community recognize meaningful support.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FEATURED REQUESTS
      ══════════════════════════════ */}
      <section className="ph-requests">
        <div className="ph-section-hdr">
          <div>
            <span className="ph-section-eyebrow">FEATURED REQUESTS</span>
            <h2 className="ph-section-h2">Community problems currently in motion</h2>
          </div>
          <button className="ph-chip-outline" onClick={go}>View full feed</button>
        </div>

        <div className="ph-req-grid">

          {/* Card 1 */}
          <div className="ph-req-card">
            <div className="ph-badges">
              <span className="ph-badge b-dev">Web Development</span>
              <span className="ph-badge b-high">High</span>
              <span className="ph-badge b-solved">Solved</span>
            </div>
            <h4 className="ph-req-title">Need help</h4>
            <p className="ph-req-desc">helpn needed</p>
            <div className="ph-req-footer">
              <div>
                <p className="ph-req-author">Ayesha Khan</p>
                <p className="ph-req-meta">Karachi · 1 helper interested</p>
              </div>
              <button className="ph-open-btn" onClick={go}>Open<br />details</button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="ph-req-card">
            <div className="ph-badges">
              <span className="ph-badge b-dev">Web Development</span>
              <span className="ph-badge b-high">High</span>
              <span className="ph-badge b-solved">Solved</span>
            </div>
            <h4 className="ph-req-title">Need help making my portfolio responsive before demo day</h4>
            <p className="ph-req-desc">My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.</p>
            <div className="ph-req-tags">
              <span className="ph-req-tag">HTML/CSS</span>
              <span className="ph-req-tag">Responsive</span>
              <span className="ph-req-tag">Portfolio</span>
            </div>
            <div className="ph-req-footer">
              <div>
                <p className="ph-req-author">Sara Noor</p>
                <p className="ph-req-meta">Karachi · 1 helper interested</p>
              </div>
              <button className="ph-open-btn" onClick={go}>Open<br />details</button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="ph-req-card">
            <div className="ph-badges">
              <span className="ph-badge b-design">Design</span>
              <span className="ph-badge b-med">Medium</span>
              <span className="ph-badge b-open">Open</span>
            </div>
            <h4 className="ph-req-title">Looking for Figma feedback on a volunteer event poster</h4>
            <p className="ph-req-desc">I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.</p>
            <div className="ph-req-tags">
              <span className="ph-req-tag">Figma</span>
              <span className="ph-req-tag">Poster</span>
              <span className="ph-req-tag">Design Review</span>
            </div>
            <div className="ph-req-footer">
              <div>
                <p className="ph-req-author">Ayesha Khan</p>
                <p className="ph-req-meta">Lahore · 1 helper interested</p>
              </div>
              <button className="ph-open-btn" onClick={go}>Open<br />details</button>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer className="ph-footer">
        HelpHub AI is built as a premium-feel, multi-page community support product using HTML, CSS, JavaScript, and LocalStorage.
      </footer>

    </div>
  );
};

export default PublicHome;