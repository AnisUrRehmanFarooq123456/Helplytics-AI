// dummyData.js
// Place this file in: src/Data/dummyData.js

export const dummyRequests = [
    {
        id: 1,
        category: "Web Development",
        priority: "High",
        status: "Open",
        title: "Need help making my portfolio responsive before demo day",
        description:
            "My HTML/CSS portfolio breaks on tablets and need layout guidance before tomorrow evening. Looking for someone who can review my media queries and suggest fixes.",
        tags: ["HTML/CSS", "Responsive", "Portfolio"],
        author: "Ayesha Khan",
        location: "Remote",
        helpers: 4,
        time: "12 min ago",
    },
    {
        id: 2,
        category: "Design",
        priority: "Medium",
        status: "Open",
        title: "Looking for Figma feedback on a volunteer event poster",
        description:
            "I have a draft poster for a campus community event and want sharpest hierarchy, spacing, and CTA copy reviewed by a designer.",
        tags: ["Figma", "Poster", "Design Review"],
        author: "Ayesha Khan",
        location: "Lahore",
        helpers: 4,
        time: "1h ago",
    },
    {
        id: 3,
        category: "Career",
        priority: "Low",
        status: "Solved",
        title: "Need mock interview support for internship applications",
        description:
            "Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.",
        tags: ["Interview Prep", "Career", "Frontend"],
        author: "Sara Noor",
        location: "Remote",
        helpers: 2,
        time: "3h ago",
    },
    {
        id: 4,
        category: "Web Development",
        priority: "Medium",
        status: "Open",
        title: "React hooks confusion — need senior help",
        description:
            "Struggling with useEffect dependencies and stale closures in my project. Need someone to walk me through the concept.",
        tags: ["React", "Hooks", "JavaScript"],
        author: "Ali Hassan",
        location: "Karachi",
        helpers: 3,
        time: "2h ago",
    },
    {
        id: 5,
        category: "Design",
        priority: "High",
        status: "Open",
        title: "UI review for mobile app prototype",
        description:
            "Need design feedback on my mobile app's onboarding flow and color system before I hand it off to developers.",
        tags: ["UI/UX", "Mobile", "Figma"],
        author: "Zainab Ali",
        location: "Remote",
        helpers: 1,
        time: "5h ago",
    },
    {
        id: 6,
        category: "Career",
        priority: "Medium",
        status: "Solved",
        title: "Help writing a strong cover letter for tech roles",
        description:
            "Looking for someone with experience in tech hiring to review my cover letter draft and suggest improvements.",
        tags: ["Cover Letter", "Career", "Tech"],
        author: "Bilal Khan",
        location: "Islamabad",
        helpers: 5,
        time: "Yesterday",
    },
];

export const dummyUsers = [
    {
        fullName: "Ayesha Khan",
        email: "ayesha@helphub.com",
        password: "ayesha123",
        role: "Both",
        trustScore: 92,
        location: "Lahore",
    },
    {
        fullName: "Sara Noor",
        email: "sara@helphub.com",
        password: "sara123",
        role: "Can Help",
        trustScore: 98,
        location: "Lahore",
    },
    {
        fullName: "Ali Hassan",
        email: "ali@helphub.com",
        password: "ali123",
        role: "Both",
        trustScore: 95,
        location: "Karachi",
    },
    {
        fullName: "Zainab Ali",
        email: "zainab@helphub.com",
        password: "zainab123",
        role: "Can Help",
        trustScore: 92,
        location: "Islamabad",
    },
    {
        fullName: "Bilal Khan",
        email: "bilal@helphub.com",
        password: "bilal123",
        role: "Can Help",
        trustScore: 88,
        location: "Islamabad",
    },
    {
        fullName: "Hira Ahmed",
        email: "hira@helphub.com",
        password: "hira123",
        role: "Both",
        trustScore: 84,
        location: "Remote",
    },
];

export const dummyLeaders = [
    { rank: 1, name: "Sara Noor", role: "Can Help", trustScore: 98, solved: 24, badges: ["Top Helper", "Design Ally"], location: "Lahore" },
    { rank: 2, name: "Ali Hassan", role: "Both", trustScore: 95, solved: 19, badges: ["Mentor", "Consistent"], location: "Karachi" },
    { rank: 3, name: "Zainab Ali", role: "Can Help", trustScore: 92, solved: 16, badges: ["Rising Star"], location: "Islamabad" },
    { rank: 4, name: "Ayesha Khan", role: "Both", trustScore: 92, solved: 14, badges: ["Design Ally"], location: "Lahore" },
    { rank: 5, name: "Bilal Khan", role: "Can Help", trustScore: 88, solved: 12, badges: ["Career Guide"], location: "Islamabad" },
    { rank: 6, name: "Hira Ahmed", role: "Both", trustScore: 84, solved: 10, badges: ["Active Member"], location: "Remote" },
    { rank: 7, name: "Usman Tariq", role: "Need Help", trustScore: 78, solved: 6, badges: [], location: "Karachi" },
];

export const dummyNotifications = [
    { id: 1, type: "match", title: "New helper matched to your request", body: "Sara Noor offered help on your responsive portfolio request.", time: "12 min ago", read: false },
    { id: 2, type: "trust", title: "Your trust score increased", body: "Your trust score went up after a solved request was verified by the community.", time: "1h ago", read: false },
    { id: 3, type: "ai", title: "AI Center: Rising demand detected", body: "AI Center detected rising demand for interview prep — your skills match this trend.", time: "Today", read: false },
    { id: 4, type: "comment", title: "New comment on your request", body: "Ali Hassan commented on your portfolio responsive request.", time: "2h ago", read: true },
    { id: 5, type: "solved", title: "Request marked as solved", body: "Your mock interview request has been marked solved by Sara Noor.", time: "Yesterday", read: true },
    { id: 6, type: "badge", title: "New badge earned: Design Ally", body: "You've been recognized as a Design Ally for consistent help in the design category.", time: "2 days ago", read: true },
];

export const dummyAIInsights = {
    mostRequestedCategory: "Web Development",
    strongestTrustDriver: "Design Ally",
    mentorSkills: "HTML/CSS, UI/UX, Career Guidance, Figma",
    activeRequests: 1,
    trends: 1,
};

export const dummyComments = [
    { id: 1, requestId: 1, author: "Sara Noor", text: "I can help with the responsive design part. DM me!", time: "5 min ago" },
    { id: 2, requestId: 1, author: "Ali Hassan", text: "Check your media query breakpoints, usually the tablet issue is at 768px.", time: "20 min ago" },
];

export const dummyMessages = [
    {
        id: 1,
        from: "Ayesha Khan",
        to: "Sara Noor",
        text: "I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.",
        time: "11:30 AM",
    },
    {
        id: 2,
        from: "Hassan Ali",
        to: "Ayesha Khan",
        text: "Your event poster concept is solid. I would tighten the CTA and reduce the background texture.",
        time: "11:10 AM",
    },
    {
        id: 3,
        from: "Sara Noor",
        to: "Ayesha Khan",
        text: "Sure, I can review your Figma file tonight. Send me the link!",
        time: "10:55 AM",
    },
];