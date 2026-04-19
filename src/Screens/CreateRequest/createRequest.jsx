import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createRequest.css";

// ── Simple AI suggestion logic (no API, purely deterministic) ──
const getAISuggestions = (title, description) => {
    const text = (title + " " + description).toLowerCase();

    let category = "Community";
    if (text.includes("html") || text.includes("css") || text.includes("react") || text.includes("javascript") || text.includes("js") || text.includes("web") || text.includes("portfolio") || text.includes("responsive")) {
        category = "Web Development";
    } else if (text.includes("figma") || text.includes("design") || text.includes("ui") || text.includes("ux") || text.includes("poster") || text.includes("color") || text.includes("layout")) {
        category = "Design";
    } else if (text.includes("interview") || text.includes("career") || text.includes("job") || text.includes("resume") || text.includes("cover letter") || text.includes("internship")) {
        category = "Career";
    }

    let urgency = "Low";
    if (text.includes("urgent") || text.includes("asap") || text.includes("demo day") || text.includes("deadline") || text.includes("tonight") || text.includes("tomorrow") || text.includes("today")) {
        urgency = "High";
    } else if (text.includes("soon") || text.includes("week") || text.includes("few days")) {
        urgency = "Medium";
    }

    let tags = "Add more detail for smarter tags";
    if (text.length > 30) {
        const suggestedTags = [];
        if (text.includes("html") || text.includes("css")) suggestedTags.push("HTML/CSS");
        if (text.includes("react")) suggestedTags.push("React");
        if (text.includes("javascript") || text.includes("js")) suggestedTags.push("JavaScript");
        if (text.includes("figma")) suggestedTags.push("Figma");
        if (text.includes("responsive")) suggestedTags.push("Responsive");
        if (text.includes("portfolio")) suggestedTags.push("Portfolio");
        if (text.includes("interview")) suggestedTags.push("Interview Prep");
        if (text.includes("design")) suggestedTags.push("Design");
        if (suggestedTags.length > 0) tags = suggestedTags.join(", ");
    }

    let rewrite = "Start describing the challenge to generate a stronger version.";
    if (description.length > 20) {
        rewrite = `${category} request with ${urgency.toLowerCase()} urgency. Best suited for members with relevant expertise in ${category.toLowerCase()}.`;
    }

    return { category, urgency, tags, rewrite };
};

const CreateRequest = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        tags: "",
        category: "Web Development",
        urgency: "High",
    });

    const [aiSuggestions, setAiSuggestions] = useState({
        category: "Community",
        urgency: "Low",
        tags: "Add more detail for smarter tags",
        rewrite: "Start describing the challenge to generate a stronger version.",
    });

    const [published, setPublished] = useState(false);

    const handleChange = (e) => {
        const updated = { ...form, [e.target.name]: e.target.value };
        setForm(updated);
    };

    const applyAISuggestions = () => {
        const suggestions = getAISuggestions(form.title, form.description);
        setAiSuggestions(suggestions);
        setForm((prev) => ({
            ...prev,
            category: suggestions.category !== "Community" ? suggestions.category : prev.category,
            urgency: suggestions.urgency,
            tags: suggestions.tags !== "Add more detail for smarter tags" ? suggestions.tags : prev.tags,
        }));
    };

    const handlePublish = () => {
        if (!form.title.trim() || !form.description.trim()) {
            alert("Please fill in at least the title and description.");
            return;
        }

        // ── Save to localStorage ──
        const loggedEmail = localStorage.getItem("loggedEmail");
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.email === loggedEmail);
        const authorName = user?.fullName || "Ayesha Khan";

        const newRequest = {
            id: Date.now(),
            title: form.title,
            description: form.description,
            tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
            category: form.category,
            priority: form.urgency,
            status: "Open",
            author: authorName,
            location: user?.location || "Remote",
            helpers: 0,
            time: "Just now",
        };

        const existing = JSON.parse(localStorage.getItem("requests")) || [];
        localStorage.setItem("requests", JSON.stringify([newRequest, ...existing]));

        setPublished(true);
    };

    if (published) {
        return (
            <div className="cr-container">
                <nav className="cr-nav">
                    <div className="cr-nav-left">
                        <div className="cr-logo">H</div>
                        <span className="cr-brand">HelpHub AI</span>
                    </div>
                    <div className="cr-nav-right">
                        <span className="cr-nav-link" onClick={() => navigate("/dashboard")}>Dashboard</span>
                        <span className="cr-nav-link" onClick={() => navigate("/explore")}>Explore</span>
                        <span className="cr-nav-link active">Create Request</span>
                    </div>
                </nav>

                {/* ── SUCCESS STATE (Image 3 feel) ── */}
                <div className="cr-success-banner">
                    <p className="cr-banner-label">REQUEST DETAIL</p>
                    <div className="cr-success-badges">
                        <span className="cr-sbadge cr-sbadge-open">Open</span>
                        <span className="cr-sbadge cr-sbadge-priority">{form.urgency}</span>
                    </div>
                    <h1 className="cr-success-title">{form.title}</h1>
                    <p className="cr-success-sub">{form.description}</p>
                </div>

                <div className="cr-success-body">
                    <div className="cr-success-left">
                        <div className="cr-success-card">
                            <p className="cr-success-card-label">AI SUMMARY</p>
                            <h3>What this request needs</h3>
                            <p>{aiSuggestions.rewrite}</p>
                        </div>
                    </div>
                    <div className="cr-success-right">
                        <div className="cr-success-card">
                            <p className="cr-success-card-label">REQUESTER</p>
                            <div className="cr-requester-row">
                                <div className="cr-requester-avatar">
                                    {(localStorage.getItem("loggedEmail")?.[0] || "A").toUpperCase()}
                                </div>
                                <div>
                                    <p className="cr-requester-name">
                                        {JSON.parse(localStorage.getItem("users") || "[]").find(u => u.email === localStorage.getItem("loggedEmail"))?.fullName || "Ayesha Khan"}
                                    </p>
                                    <p className="cr-requester-meta">Remote · Trust 92%</p>
                                </div>
                            </div>
                        </div>
                        <div className="cr-success-actions">
                            <button className="cr-btn-explore" onClick={() => navigate("/explore")}>View in Feed</button>
                            <button className="cr-btn-new" onClick={() => { setPublished(false); setForm({ title: "", description: "", tags: "", category: "Web Development", urgency: "High" }); }}>Create Another</button>
                            <button className="cr-btn-dashboard" onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ── Live AI suggestions update ──
    const liveSuggestions = getAISuggestions(form.title, form.description);

    return (
        <div className="cr-container">

            {/* ── NAVBAR ── */}
            <nav className="cr-nav">
                <div className="cr-nav-left">
                    <div className="cr-logo">H</div>
                    <span className="cr-brand">HelpHub AI</span>
                </div>
                <div className="cr-nav-right">
                    <span className="cr-nav-link" onClick={() => navigate("/dashboard")}>Dashboard</span>
                    <span className="cr-nav-link" onClick={() => navigate("/explore")}>Explore</span>
                    <span className="cr-nav-link active">Create Request</span>
                </div>
            </nav>

            {/* ── HERO BANNER ── */}
            <div className="cr-banner">
                <p className="cr-banner-label">CREATE REQUEST</p>
                <h1 className="cr-banner-title">
                    Turn a rough problem into a<br />clear help request.
                </h1>
                <p className="cr-banner-sub">
                    Use built-in AI suggestions for category, urgency, tags, and a stronger description rewrite.
                </p>
            </div>

            <div className="cr-body">
                <div className="cr-layout">

                    {/* ── LEFT: FORM ── */}
                    <div className="cr-form-card">

                        <div className="cr-field">
                            <label className="cr-label">Title</label>
                            <input
                                className="cr-input"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Need review on my JavaScript quiz app before submission"
                            />
                        </div>

                        <div className="cr-field">
                            <label className="cr-label">Description</label>
                            <textarea
                                className="cr-textarea"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Explain the challenge, your current progress, deadline, and what kind of help would be useful."
                                rows={5}
                            />
                        </div>

                        <div className="cr-row">
                            <div className="cr-field cr-field-half">
                                <label className="cr-label">Tags</label>
                                <input
                                    className="cr-input"
                                    name="tags"
                                    value={form.tags}
                                    onChange={handleChange}
                                    placeholder="JavaScript, Debugging, Review"
                                />
                            </div>
                            <div className="cr-field cr-field-half">
                                <label className="cr-label">Category</label>
                                <select className="cr-select" name="category" value={form.category} onChange={handleChange}>
                                    <option>Web Development</option>
                                    <option>Design</option>
                                    <option>Career</option>
                                    <option>Community</option>
                                </select>
                            </div>
                        </div>

                        <div className="cr-field">
                            <label className="cr-label">Urgency</label>
                            <select className="cr-select" name="urgency" value={form.urgency} onChange={handleChange}>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                        </div>

                        <div className="cr-form-actions">
                            <button className="cr-btn-ai" onClick={applyAISuggestions}>
                                Apply AI suggestions
                            </button>
                            <button className="cr-btn-publish" onClick={handlePublish}>
                                Publish request
                            </button>
                        </div>

                    </div>

                    {/* ── RIGHT: AI ASSISTANT ── */}
                    <div className="cr-ai-card">
                        <p className="cr-ai-label">AI ASSISTANT</p>
                        <h2 className="cr-ai-title">Smart request<br />guidance</h2>

                        <div className="cr-ai-row">
                            <span className="cr-ai-key">Suggested category</span>
                            <span className="cr-ai-val cr-ai-val-bold">{liveSuggestions.category}</span>
                        </div>
                        <div className="cr-ai-row">
                            <span className="cr-ai-key">Detected urgency</span>
                            <span className="cr-ai-val cr-ai-val-bold">{liveSuggestions.urgency}</span>
                        </div>
                        <div className="cr-ai-row">
                            <span className="cr-ai-key">Suggested tags</span>
                            <span className="cr-ai-val">{liveSuggestions.tags}</span>
                        </div>
                        <div className="cr-ai-row cr-ai-row-last">
                            <span className="cr-ai-key">Rewrite suggestion</span>
                            <span className="cr-ai-val cr-ai-rewrite">{liveSuggestions.rewrite}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreateRequest;