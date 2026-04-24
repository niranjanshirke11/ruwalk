/**
 * BottomNav.jsx — Fixed bottom navigation bar
 * Three tabs: Capture, Leaderboard, Profile
 */
export default function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: "capture",     icon: "📍", label: "Capture" },
    { id: "leaderboard", icon: "🏆", label: "Rankings" },
    { id: "profile",     icon: "👤", label: "Profile" },
  ];

  return (
    <nav className="bottom-nav" id="bottom-nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          id={`nav-${tab.id}`}
          className={`bottom-nav-item ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="bottom-nav-icon">{tab.icon}</span>
          <span className="bottom-nav-label">{tab.label}</span>
          {activeTab === tab.id && <span className="bottom-nav-indicator" />}
        </button>
      ))}
    </nav>
  );
}
