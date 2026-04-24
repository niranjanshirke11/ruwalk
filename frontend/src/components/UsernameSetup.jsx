/**
 * UsernameSetup.jsx — Onboarding modal
 * Asks user to pick a username (≤8 chars, no spaces) and an emoji avatar.
 * Shown only when guestUser.needsSetup is true (first visit).
 */
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const EMOJI_OPTIONS = [
  "🏃", "🚀", "⚡", "🔥", "🐺", "🦅", "🎯", "💎",
  "🌟", "🦁", "🐉", "👑", "🎮", "🏆", "💪", "🌊",
  "🦊", "🐯", "🦈", "🐻", "🎸", "⛰️", "🗡️", "🛡️",
];

export default function UsernameSetup({ guestUser, onComplete }) {
  const [username, setUsername] = useState("");
  const [emoji, setEmoji] = useState("🏃");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function validate(val) {
    if (!val) return "Username is required";
    if (val.length > 8) return "Max 8 characters";
    if (/\s/.test(val)) return "No spaces allowed";
    if (!/^[a-zA-Z0-9_\-.!@#$%^&*]+$/.test(val)) return "Invalid characters";
    return "";
  }

  function handleChange(e) {
    const val = e.target.value;
    if (val.length <= 8) {
      setUsername(val);
      setError(validate(val));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate(username);
    if (err) { setError(err); return; }

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/live/update-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": String(guestUser.id) },
        body: JSON.stringify({ username, emoji }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); setSaving(false); return; }
      onComplete(data);
    } catch {
      setError("Network error. Try again.");
      setSaving(false);
    }
  }

  return (
    <div className="setup-overlay">
      <div className="setup-modal glass animate-fade-slide">
        {/* Header */}
        <div className="setup-header">
          <div className="setup-icon-ring">
            <span className="setup-big-emoji">{emoji}</span>
          </div>
          <h2 className="setup-title">Welcome to Ruwalk</h2>
          <p className="setup-subtitle">Set up your runner identity</p>
        </div>

        <form onSubmit={handleSubmit} className="setup-form">
          {/* Username input */}
          <div className="setup-field">
            <label className="setup-label">
              Username
              <span className="setup-counter">{username.length}/8</span>
            </label>
            <input
              id="username-input"
              type="text"
              className={`setup-input ${error ? "setup-input-error" : ""}`}
              placeholder="e.g. ninja42"
              value={username}
              onChange={handleChange}
              autoFocus
              maxLength={8}
              autoComplete="off"
            />
            {error && <p className="setup-error">{error}</p>}
            <p className="setup-hint">Letters, numbers, special chars. No spaces.</p>
          </div>

          {/* Emoji picker */}
          <div className="setup-field">
            <label className="setup-label">Choose your avatar</label>
            <div className="setup-emoji-grid">
              {EMOJI_OPTIONS.map(e => (
                <button
                  key={e}
                  type="button"
                  className={`setup-emoji-btn ${emoji === e ? "active" : ""}`}
                  onClick={() => setEmoji(e)}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            id="setup-submit"
            type="submit"
            className="btn btn-primary btn-lg setup-submit"
            disabled={saving || !username || !!error}
          >
            {saving ? (
              <><span className="spinner" style={{ width: 16, height: 16, borderTopColor: "white" }} /> Saving…</>
            ) : (
              <>🏃 Let's Go!</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
