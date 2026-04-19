import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./leaderboard.css";
import { dummyLeaders } from "../../Data/dummyData";

const Leaderboard = () => {
    const navigate = useNavigate();
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        // ── USERS: get from localStorage, merge with dummyLeaders, fallback to dummy ──
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.length > 0) {
            // Build leader entries from localStorage users
            const localLeaders = users.map((u) => ({
                name: u.fullName,
                role: u.role,
                trustScore: u.trustScore || 80,
                solved: 0,
                badges: [],
                location: u.location || "Remote",
            }));

            // Merge: prioritize localStorage users, append dummies not already present
            const existingNames = localLeaders.map((l) => l.name);
            const extraDummies = dummyLeaders.filter(
                (d) => !existingNames.includes(d.name)
            );

            const merged = [...localLeaders, ...extraDummies]
                .sort((a, b) => b.trustScore - a.trustScore)
                .map((u, i) => ({ ...u, rank: i + 1 }));

            setLeaders(merged);
        } else {
            // No localStorage users — use dummyLeaders as-is
            setLeaders(dummyLeaders);
        }
    }, []);

    // Top 3 for podium
    const top3 = leaders.slice(0, 3);
    // Podium visual order: 2nd | 1st | 3rd
    const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);
    const podiumHeights = ["160px", "200px", "130px"];
    const podiumRanks = [2, 1, 3];

    return (
        <div className="lb-container">

            {/* ── NAVBAR ── */}
            <nav className="lb-nav">
                <div className="lb-nav-left">
                    <div className="lb-logo">H</div>
                    <span className="lb-brand">HelpHub AI</span>
                    <div className="lb-links">
                        <span className="lb-link" onClick={() => navigate("/dashboard")}>Dashboard</span>
                        <span className="lb-link" onClick={() => navigate("/explore")}>Explore</span>
                        <span className="lb-link active">Leaderboard</span>
                        <span className="lb-link" onClick={() => navigate("/notifications")}>Notifications</span>
                    </div>
                </div>
                <div className="lb-nav-right">
                    <button className="lb-ai-btn" onClick={() => navigate("/ai-center")}>Open AI Center</button>
                </div>
            </nav>

            <div className="lb-body">

                <div className="lb-header">
                    <p className="lb-label">LEADERBOARD</p>
                    <h2 className="lb-title">Community top contributors</h2>
                    <p className="lb-sub">Ranked by trust score, solved requests, and community contribution.</p>
                </div>

                {/* ── PODIUM ── */}
                {top3.length >= 2 && (
                    <div className="lb-podium">
                        {podiumOrder.map((user, i) => (
                            <div key={i} className="lb-podium-slot">
                                <div className="lb-podium-avatar">{user?.name?.[0]}</div>
                                <p className="lb-podium-name">{user?.name}</p>
                                <p className="lb-podium-score">{user?.trustScore}%</p>
                                <div className="lb-podium-block" style={{ height: podiumHeights[i] }}>
                                    <span className="lb-podium-rank">#{podiumRanks[i]}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── TABLE ── */}
                <div className="lb-table-card">
                    <table className="lb-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Location</th>
                                <th>Trust Score</th>
                                <th>Solved</th>
                                <th>Badges</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaders.map((user, i) => (
                                <tr key={i} className={user.rank <= 3 ? "lb-top-row" : ""}>
                                    <td>
                                        <span className={`lb-rank-badge rank-${user.rank}`}>#{user.rank}</span>
                                    </td>
                                    <td>
                                        <div className="lb-user-cell">
                                            <div className="lb-user-avatar">{user.name?.[0]}</div>
                                            <span>{user.name}</span>
                                        </div>
                                    </td>
                                    <td><span className="lb-role-tag">{user.role}</span></td>
                                    <td className="lb-location">{user.location}</td>
                                    <td>
                                        <div className="lb-score-bar">
                                            <div
                                                className="lb-score-fill"
                                                style={{ width: `${Math.min(user.trustScore, 100)}px` }}
                                            ></div>
                                            <span>{user.trustScore}%</span>
                                        </div>
                                    </td>
                                    <td className="lb-solved">{user.solved}</td>
                                    <td>
                                        <div className="lb-badges-cell">
                                            {user.badges?.map((b, j) => (
                                                <span key={j} className="lb-badge">{b}</span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default Leaderboard;