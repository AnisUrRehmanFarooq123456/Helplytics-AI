import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./aiCenter.css";
import { dummyRequests } from "../../Data/dummyData";

// ── AI summary generator per request ──
const generateAISummary = (req) => {
    const summaries = {
        "Web Development": `Web Development request with ${req.priority.toLowerCase()} urgency. Best suited for members with relevant expertise.`,
        "Design": `A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value.`,
        "Career": `Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews.`,
    };
    return summaries[req.category] || `${req.category} request needing community attention.`;
};

const AICenter = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("requests")) || [];
        setRequests(stored.length > 0 ? stored : dummyRequests);
    }, []);

    // ── STATS ──
    const trendCategory = (() => {
        const counts = {};
        requests.forEach((r) => { counts[r.category] = (counts[r.category] || 0) + 1; });
        return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Web Development";
    })();
    const urgencyCount = requests.filter((r) => r.priority === "High").length;
    const mentorCount = 2; // demo — trusted helpers

    const getCategoryClass = (c) =>
        c === "Web Development" ? "aic-badge-dev" : c === "Design" ? "aic-badge-design" : "aic-badge-career";

    const getPriorityClass = (p) =>
        p === "High" ? "aic-badge-high" : p === "Medium" ? "aic-badge-medium" : "aic-badge-low";

    return (
        <div className="aic-container">

            {/* ── NAVBAR ── */}
            <nav className="aic-nav">
                <div className="aic-nav-left">
                    <div className="aic-logo">H</div>
                    <span className="aic-brand">HelpHub AI</span>
                </div>
                <div className="aic-nav-right">
                    <span className="aic-nav-link" onClick={() => navigate("/dashboard")}>Dashboard</span>
                    <span className="aic-nav-link" onClick={() => navigate("/create-request")}>Create Request</span>
                    <span className="aic-nav-link active">AI Center</span>
                </div>
            </nav>

            {/* ── HERO BANNER ── */}
            <div className="aic-banner">
                <p className="aic-banner-label">AI CENTER</p>
                <h1 className="aic-banner-title">
                    See what the platform<br />intelligence is noticing.
                </h1>
                <p className="aic-banner-sub">
                    AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations.
                </p>
            </div>

            <div className="aic-body">

                {/* ── STAT CARDS ── */}
                <div className="aic-stats">
                    <div className="aic-stat-card">
                        <p className="aic-stat-label">TREND PULSE</p>
                        <h2 className="aic-stat-big">{trendCategory}</h2>
                        <p className="aic-stat-desc">Most common support area based on active community requests.</p>
                    </div>
                    <div className="aic-stat-card">
                        <p className="aic-stat-label">URGENCY WATCH</p>
                        <h2 className="aic-stat-num">{urgencyCount}</h2>
                        <p className="aic-stat-desc">Requests currently flagged high priority by the urgency detector.</p>
                    </div>
                    <div className="aic-stat-card">
                        <p className="aic-stat-label">MENTOR POOL</p>
                        <h2 className="aic-stat-num">{mentorCount}</h2>
                        <p className="aic-stat-desc">Trusted helpers with strong response history and contribution signals.</p>
                    </div>
                </div>

                {/* ── AI RECOMMENDATIONS ── */}
                <div className="aic-recommendations">
                    <p className="aic-rec-label">AI RECOMMENDATIONS</p>
                    <h2 className="aic-rec-title">Requests needing attention</h2>

                    <div className="aic-rec-list">
                        {requests.map((req) => (
                            <div
                                key={req.id}
                                className="aic-rec-card"
                                onClick={() => navigate("/details", { state: { request: req } })}
                            >
                                <h4 className="aic-rec-card-title">{req.title}</h4>
                                <p className="aic-rec-card-summary">{generateAISummary(req)}</p>
                                <div className="aic-rec-card-badges">
                                    <span className={`aic-badge ${getCategoryClass(req.category)}`}>{req.category}</span>
                                    <span className={`aic-badge ${getPriorityClass(req.priority)}`}>{req.priority}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AICenter;