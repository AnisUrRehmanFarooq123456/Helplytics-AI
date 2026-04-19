import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./details.css";
import { dummyRequests, dummyComments } from "../../Data/dummyData";

const Details = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    // ── REQUEST: from navigation state, localStorage, or first dummy ──
    const req =
        state?.request ||
        (() => {
            const stored = JSON.parse(localStorage.getItem("requests")) || [];
            return stored[0] || dummyRequests[0];
        })();

    // ── COMMENTS: filter by requestId from localStorage, fallback to dummyComments ──
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    const allComments = storedComments.length > 0 ? storedComments : dummyComments;
    const comments = allComments.filter((c) => c.requestId === req.id);

    // ── REQUESTER INFO: find from localStorage users, fallback to dummy ──
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const requester = users.find((u) => u.fullName === req.author) || {
        fullName: req.author,
        trustScore: 92,
        role: "Both",
    };

    const getPriorityClass = (p) =>
        p === "High" ? "badge-high" : p === "Medium" ? "badge-medium" : "badge-low";

    const getStatusClass = (s) => (s === "Solved" ? "badge-solved" : "badge-open");

    const getCategoryClass = (c) =>
        c === "Web Development" ? "badge-dev" : c === "Design" ? "badge-design" : "badge-career";

    return (
        <div className="det-container">

            {/* ── NAVBAR ── */}
            <nav className="det-nav">
                <div className="det-nav-left">
                    <div className="det-logo">H</div>
                    <span className="det-brand">HelpHub AI</span>
                    <div className="det-links">
                        <span className="det-link" onClick={() => navigate("/dashboard")}>Dashboard</span>
                        <span className="det-link" onClick={() => navigate("/explore")}>Explore</span>
                        <span className="det-link" onClick={() => navigate("/leaderboard")}>Leaderboard</span>
                        <span className="det-link" onClick={() => navigate("/notifications")}>Notifications</span>
                    </div>
                </div>
                <div className="det-nav-right">
                    <button className="det-ai-btn" onClick={() => navigate("/ai-center")}>Open AI Center</button>
                </div>
            </nav>

            <div className="det-body">
                <button className="det-back-btn" onClick={() => navigate(-1)}>← Back</button>

                <div className="det-layout">

                    {/* LEFT: REQUEST DETAILS */}
                    <div className="det-left">
                        <div className="det-card">
                            <div className="det-badges">
                                <span className={`det-badge ${getCategoryClass(req.category)}`}>{req.category}</span>
                                <span className={`det-badge ${getPriorityClass(req.priority)}`}>{req.priority}</span>
                                <span className={`det-badge ${getStatusClass(req.status)}`}>{req.status}</span>
                            </div>
                            <h1 className="det-title">{req.title}</h1>
                            <div className="det-meta">
                                <span>👤 {req.author}</span>
                                <span>📍 {req.location || "Remote"}</span>
                                <span>🕐 {req.time || "Just now"}</span>
                                <span>🙋 {req.helpers || 0} helpers interested</span>
                            </div>
                            <p className="det-desc">{req.description}</p>
                            <div className="det-tags-row">
                                {req.tags?.map((tag, i) => (
                                    <span key={i} className="det-tag">{tag}</span>
                                ))}
                            </div>
                            <div className="det-actions">
                            </div>
                        </div>

                        {/* COMMENTS */}
                        <div className="det-activity-card">
                            <h3 className="det-activity-title">
                                Community Responses ({comments.length})
                            </h3>
                            {comments.length === 0 ? (
                                <p className="det-no-comments">No responses yet. Be the first to help!</p>
                            ) : (
                                comments.map((c, i) => (
                                    <div key={i} className="det-comment">
                                        <div className="det-comment-avatar">{c.author?.[0]}</div>
                                        <div>
                                            <p className="det-comment-author">
                                                {c.author} <span>· {c.time}</span>
                                            </p>
                                            <p className="det-comment-text">{c.text}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* RIGHT: SIDEBAR */}
                    <div className="det-right">
                        <div className="det-sidebar-card">
                            <h4 className="det-sidebar-title">About the Requester</h4>
                            <div className="det-user-info">
                                <div className="det-user-avatar">{req.author?.[0]}</div>
                                <div>
                                    <p className="det-user-name">{req.author}</p>
                                    <p className="det-user-role">{requester.role || "Community Member"}</p>
                                </div>
                            </div>
                            <div className="det-info-row">
                                <span>Trust Score</span>
                                <span className="det-info-val">{requester.trustScore || 92}%</span>
                            </div>
                            <div className="det-info-row">
                                <span>Requests Posted</span>
                                <span className="det-info-val">
                                    {(() => {
                                        const stored = JSON.parse(localStorage.getItem("requests")) || dummyRequests;
                                        return stored.filter((r) => r.author === req.author).length || 3;
                                    })()}
                                </span>
                            </div>
                            <div className="det-info-row">
                                <span>Solved</span>
                                <span className="det-info-val">
                                    {(() => {
                                        const stored = JSON.parse(localStorage.getItem("requests")) || dummyRequests;
                                        return stored.filter((r) => r.author === req.author && r.status === "Solved").length || 2;
                                    })()}
                                </span>
                            </div>
                        </div>

                        <div className="det-sidebar-card">
                            <h4 className="det-sidebar-title">AI Insight</h4>
                            <p className="det-ai-text">
                                This request matches rising demand in {req.category}. Helpers with matching skills are active right now.
                            </p>
                        </div>

                        <div className="det-sidebar-card">
                            <h4 className="det-sidebar-title">Similar Requests</h4>
                            {dummyRequests
                                .filter((r) => r.category === req.category && r.id !== req.id)
                                .slice(0, 3)
                                .map((r, i) => (
                                    <p
                                        key={i}
                                        className="det-similar"
                                        onClick={() => navigate("/details", { state: { request: r } })}
                                    >
                                        {r.title}
                                    </p>
                                ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Details;