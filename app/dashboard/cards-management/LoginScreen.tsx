"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
  onSuccess: () => void;
}

export default function LoginScreen({ onSuccess }: Props) {
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(false);

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passkey }),
    });

    setLoading(false);

    if (res.ok) {
      onSuccess();
    } else {
      setPasskey("");
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-5px); }
          80%      { transform: translateX(5px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .passkey-shake { animation: shake 0.45s ease; }
        .btn-spinner {
          width: 1em; height: 1em;
          border: 2px solid rgba(49,36,80,0.3);
          border-top-color: #312450;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        .login-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-inner {
          width: 100%;
          max-width: 420px;
          padding: 0 2em;
        }
        .login-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 1.25em;
        }
        .login-title {
          text-align: center;
          color: #ffffff;
          font-size: 1.4em;
          font-weight: bold;
          margin-bottom: 1.75em;
          letter-spacing: 0.05em;
        }
        .login-error {
          color: #e74c3c;
          font-size: 0.75em;
          text-align: center;
          margin: -0.75em 0 1em;
          min-height: 1.2em;
        }
      `}</style>

      <div className="login-wrap">
        <div className="login-inner">
          <div className="login-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <p className="login-title">Cards Management</p>

          <form onSubmit={handleSubmit}>
            <div className="fields">
              <div className="field">
                <label htmlFor="passkey">Passkey</label>
                <input
                  ref={inputRef}
                  id="passkey"
                  type="password"
                  value={passkey}
                  autoComplete="off"
                  onChange={(e) => {
                    setPasskey(e.target.value);
                    if (error) setError(false);
                  }}
                  className={shake ? "passkey-shake" : ""}
                />
              </div>
            </div>

            <p className="login-error">
              {error ? "Incorrect passkey — try again" : ""}
            </p>

            <ul className="actions special">
              <li>
                <button
                  type="submit"
                  className="button primary"
                  disabled={loading || passkey.length === 0}
                >
                  {loading ? <span className="btn-spinner" /> : "Unlock"}
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </>
  );
}
