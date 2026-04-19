import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./explore.css";
import { dummyRequests } from "../../Data/dummyData";

const categories = ["All", "Web Development", "Design", "Career"];
const priorities = ["All", "High", "Medium", "Low"];
const statuses = ["All", "Open", "Solved"];

const Explore = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [filters, setFilters] = useState({
        category: "All",
        priority: "All",
        status: "All",
        search: "",
    });

    useEffect(() => {
        // ── REQUESTS: localStorage first, fallback to dummyRequests ──
        const stored = JSON.parse(localStorage.getItem("requests")) || [];
        setRequests(stored.length > 0 ? stored : dummyRequests);
    }, []);

    // ── APPLY FILTERS ──
    const filtered = requests.filter((req) => {
        const matchCat = filters.category === "All" || req.category === filters.category;
        const matchPri = filters.priority === "All" || req.priority === filters.priority;
        const matchStat = filters.status === "All" || req.status === filters.status;
        const matchSearch =
            !filters.search ||
            req.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            req.description.toLowerCase().includes(filters.search.toLowerCase());
        return matchCat && matchPri && matchStat && matchSearch;
    });

    const setFilter = (key, val) => setFilters((prev) => ({ ...prev, [key]: val }));
    const resetFilters = () =>
        setFilters({ category: "All", priority: "All", status: "All", search: "" });

    const getPriorityClass = (p) =>
        p === "High" ? "badge-high" : p === "Medium" ? "badge-medium" : "badge-low";

    const getStatusClass = (s) => (s === "Solved" ? "badge-solved" : "badge-open");

    const getCategoryClass = (c) =>
        c === "Web Development" ? "badge-dev" : c === "Design" ? "badge-design" : "badge-career";

    return (
        <div className="exp-container">

            {/* ── NAVBAR ── */}
            <nav className="exp-nav">
                <div className="exp-nav-left">
                    <div className="exp-logo">H</div>
                    <span className="exp-brand">HelpHub AI</span>
                    <div className="exp-links">
                        <span className="exp-link" onClick={() => navigate("/dashboard")}>Dashboard</span>
                        <span className="exp-link active">Explore</span>
                        <span className="exp-link" onClick={() => navigate("/leaderboard")}>Leaderboard</span>
                        <span className="exp-link" onClick={() => navigate("/notifications")}>Notifications</span>
                    </div>
                </div>
                <div className="exp-nav-right">
                    <button className="exp-ai-btn" onClick={() => navigate("/ai-center")}>Open AI Center</button>
                </div>
            </nav>

            <div className="exp-body">
                <div className="exp-layout">

                    {/* ── LEFT: FILTERS ── */}
                    <div className="exp-left">
                        <h3 className="exp-filter-title">Filters</h3>

                        <input
                            type="text"
                            placeholder="Search requests..."
                            value={filters.search}
                            onChange={(e) => setFilter("search", e.target.value)}
                            className="exp-search-input"
                        />

                        <div className="exp-filter-group">
                            <p className="exp-filter-label">Category</p>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`exp-filter-btn ${filters.category === cat ? "active" : ""}`}
                                    onClick={() => setFilter("category", cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="exp-filter-group">
                            <p className="exp-filter-label">Priority</p>
                            {priorities.map((pri) => (
                                <button
                                    key={pri}
                                    className={`exp-filter-btn ${filters.priority === pri ? "active" : ""}`}
                                    onClick={() => setFilter("priority", pri)}
                                >
                                    {pri}
                                </button>
                            ))}
                        </div>

                        <div className="exp-filter-group">
                            <p className="exp-filter-label">Status</p>
                            {statuses.map((st) => (
                                <button
                                    key={st}
                                    className={`exp-filter-btn ${filters.status === st ? "active" : ""}`}
                                    onClick={() => setFilter("status", st)}
                                >
                                    {st}
                                </button>
                            ))}
                        </div>

                        <button className="exp-reset-btn" onClick={resetFilters}>
                            Reset Filters
                        </button>
                    </div>

                    {/* ── RIGHT: CARDS ── */}
                    <div className="exp-right">
                        <div className="exp-header">
                            <div>
                                <p className="exp-label">EXPLORE</p>
                                <h2 className="exp-title">Community requests</h2>
                            </div>
                            <span className="exp-count">{filtered.length} results</span>
                        </div>

                        <div className="exp-cards">
                            {filtered.length === 0 ? (
                                <div className="exp-empty">No requests found. Try adjusting filters.</div>
                            ) : (
                                filtered.map((req) => (
                                    <div key={req.id} className="exp-card">
                                        <div className="exp-badges">
                                            <span className={`exp-badge ${getCategoryClass(req.category)}`}>{req.category}</span>
                                            <span className={`exp-badge ${getPriorityClass(req.priority)}`}>{req.priority}</span>
                                            <span className={`exp-badge ${getStatusClass(req.status)}`}>{req.status}</span>
                                        </div>
                                        <h4 className="exp-card-title">{req.title}</h4>
                                        <p className="exp-card-desc">{req.description}</p>
                                        <div className="exp-card-tags">
                                            {req.tags?.map((tag, i) => (
                                                <span key={i} className="exp-tag">{tag}</span>
                                            ))}
                                        </div>
                                        <div className="exp-card-footer">
                                            <span>
                                                {req.author} · {req.location} · {req.helpers} helpers
                                            </span>
                                            <button
                                                className="exp-details-btn"
                                                onClick={() => navigate("/details", { state: { request: req } })}
                                            >
                                                Open details
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Explore;