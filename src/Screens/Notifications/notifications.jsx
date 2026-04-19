import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./notifications.css";
import { dummyNotifications } from "../../Data/dummyData";

const typeIcon = {
    match: "🤝",
    trust: "⭐",
    ai: "🤖",
    comment: "💬",
    solved: "✅",
    badge: "🏅",
};

const Notifications = () => {
    const navigate = useNavigate();
    const [notifs, setNotifs] = useState([]);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        // ── NOTIFICATIONS: localStorage first, fallback to dummyNotifications ──
        const stored = JSON.parse(localStorage.getItem("notifications")) || [];
        setNotifs(stored.length > 0 ? stored : dummyNotifications);
    }, []);

    const markAllRead = () => {
        const updated = notifs.map((n) => ({ ...n, read: true }));
        setNotifs(updated);
        localStorage.setItem("notifications", JSON.stringify(updated));
    };

    const markRead = (id) => {
        const updated = notifs.map((n) => (n.id === id ? { ...n, read: true } : n));
        setNotifs(updated);
        localStorage.setItem("notifications", JSON.stringify(updated));
    };

    const filtered =
        filter === "All"
            ? notifs
            : filter === "Unread"
                ? notifs.filter((n) => !n.read)
                : notifs.filter((n) => n.read);

    const unreadCount = notifs.filter((n) => !n.read).length;

    return (
        <div className="notif-container">

            {/* ── NAVBAR ── */}
            <nav className="notif-nav">
                <div className="notif-nav-left">
                    <div className="notif-logo">H</div>
                    <span className="notif-brand">HelpHub AI</span>
                    <div className="notif-links">
                        <span className="notif-link" onClick={() => navigate("/dashboard")}>Dashboard</span>
                        <span className="notif-link" onClick={() => navigate("/explore")}>Explore</span>
                        <span className="notif-link" onClick={() => navigate("/leaderboard")}>Leaderboard</span>
                        <span className="notif-link active">
                            Notifications
                            {unreadCount > 0 && (
                                <span className="notif-nav-count">{unreadCount}</span>
                            )}
                        </span>
                    </div>
                </div>
                <div className="notif-nav-right">
                    <button className="notif-ai-btn" onClick={() => navigate("/ai-center")}>Open AI Center</button>
                </div>
            </nav>

            <div className="notif-body">

                <div className="notif-header">
                    <div>
                        <p className="notif-label">NOTIFICATIONS</p>
                        <h2 className="notif-title">Your activity feed</h2>
                        <p className="notif-sub">
                            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <button className="notif-mark-all-btn" onClick={markAllRead}>
                        Mark all as read
                    </button>
                </div>

                {/* ── FILTER TABS ── */}
                <div className="notif-tabs">
                    {["All", "Unread", "Read"].map((tab) => (
                        <button
                            key={tab}
                            className={`notif-tab ${filter === tab ? "active" : ""}`}
                            onClick={() => setFilter(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* ── NOTIFICATION LIST ── */}
                <div className="notif-list">
                    {filtered.length === 0 ? (
                        <div className="notif-empty">No notifications here.</div>
                    ) : (
                        filtered.map((n) => (
                            <div
                                key={n.id}
                                className={`notif-item ${n.read ? "read" : "unread"}`}
                                onClick={() => markRead(n.id)}
                            >
                                <div className="notif-icon">{typeIcon[n.type] || "🔔"}</div>
                                <div className="notif-content">
                                    <p className="notif-item-title">{n.title}</p>
                                    <p className="notif-item-body">{n.body}</p>
                                    <span className="notif-item-time">{n.time}</span>
                                </div>
                                {!n.read && <div className="notif-dot"></div>}
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};

export default Notifications;