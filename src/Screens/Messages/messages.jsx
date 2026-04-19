import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./messages.css";
import { dummyMessages, dummyUsers } from "../../Data/dummyData";

const Messages = () => {
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [selectedRecipient, setSelectedRecipient] = useState("");
    const [messageText, setMessageText] = useState("");
    const [loggedUser, setLoggedUser] = useState("Ayesha Khan");

    useEffect(() => {
        // ── LOGGED USER ──
        const loggedEmail = localStorage.getItem("loggedEmail");
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const found = users.find((u) => u.email === loggedEmail);
        const name = found?.fullName || "Ayesha Khan";
        setLoggedUser(name);

        // ── CONVERSATIONS: localStorage first, fallback to dummyMessages ──
        const stored = JSON.parse(localStorage.getItem("messages")) || [];
        setConversations(stored.length > 0 ? stored : dummyMessages);

        // ── AVAILABLE USERS: localStorage users + dummy users, exclude self ──
        const localUsers = users.map((u) => u.fullName);
        const dummyNames = dummyUsers.map((u) => u.fullName);
        const allNames = [...new Set([...localUsers, ...dummyNames])].filter((n) => n !== name);
        setAvailableUsers(allNames);
        if (allNames.length > 0) setSelectedRecipient(allNames[0]);
    }, []);

    const handleSend = () => {
        if (!messageText.trim() || !selectedRecipient) return;

        const newMsg = {
            id: Date.now(),
            from: loggedUser,
            to: selectedRecipient,
            text: messageText.trim(),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        const updated = [newMsg, ...conversations];
        setConversations(updated);
        localStorage.setItem("messages", JSON.stringify(updated));
        setMessageText("");
    };

    return (
        <div className="msg-container">

            {/* ── NAVBAR ── */}
            <nav className="msg-nav">
                <div className="msg-nav-left">
                    <div className="msg-logo">H</div>
                    <span className="msg-brand">HelpHub AI</span>
                </div>
                <div className="msg-nav-right">
                    <span className="msg-nav-link" onClick={() => navigate("/dashboard")}>Dashboard</span>
                    <span className="msg-nav-link" onClick={() => navigate("/explore")}>Explore</span>
                    <span className="msg-nav-link active">Messages</span>
                </div>
            </nav>

            <div className="msg-body">
                <div className="msg-layout">

                    {/* ── LEFT: CONVERSATION STREAM ── */}
                    <div className="msg-left-card">
                        <p className="msg-col-label">CONVERSATION STREAM</p>
                        <h2 className="msg-col-title">Recent messages</h2>

                        <div className="msg-list">
                            {conversations.length === 0 ? (
                                <p className="msg-empty">No messages yet. Start a conversation!</p>
                            ) : (
                                conversations.map((msg) => (
                                    <div key={msg.id} className="msg-item">
                                        <div className="msg-item-header">
                                            <span className="msg-item-names">
                                                {msg.from} → {msg.to}
                                            </span>
                                            <span className="msg-item-time">{msg.time}</span>
                                        </div>
                                        <p className="msg-item-text">{msg.text}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* ── RIGHT: SEND MESSAGE ── */}
                    <div className="msg-right-card">
                        <p className="msg-col-label">SEND MESSAGE</p>
                        <h2 className="msg-col-title">Start a<br />conversation</h2>

                        <div className="msg-field">
                            <label className="msg-label">To</label>
                            <select
                                className="msg-select"
                                value={selectedRecipient}
                                onChange={(e) => setSelectedRecipient(e.target.value)}
                            >
                                {availableUsers.map((name, i) => (
                                    <option key={i} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="msg-field">
                            <label className="msg-label">Message</label>
                            <textarea
                                className="msg-textarea"
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                placeholder="Share support details, ask for files, or suggest next steps."
                                rows={5}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                            />
                        </div>

                        <button className="msg-send-btn" onClick={handleSend}>
                            Send
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Messages;