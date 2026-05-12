"use client";

import { useState, useEffect, useRef } from "react";
import LoginScreen from "./LoginScreen";
import CardGrid from "./CardGrid";
import { GreetingJson } from "./types";

const STORAGE_KEY = "admin_authenticated";
const GREETING_DATA_KEY = "cards_mgmt_data";
const GREETING_FILE_KEY = "cards_mgmt_filename";

export default function CardsManagementPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [greetingData, setGreetingData] = useState<GreetingJson | null>(null);
  const [fileName, setFileName] = useState("greeting.json");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAuthenticated(localStorage.getItem(STORAGE_KEY) === "true");
    try {
      const saved = localStorage.getItem(GREETING_DATA_KEY);
      if (saved) {
        setGreetingData(JSON.parse(saved));
        setFileName(localStorage.getItem(GREETING_FILE_KEY) ?? "greeting.json");
      }
    } catch {
      localStorage.removeItem(GREETING_DATA_KEY);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (greetingData) {
      localStorage.setItem(GREETING_DATA_KEY, JSON.stringify(greetingData));
      localStorage.setItem(GREETING_FILE_KEY, fileName);
    } else {
      localStorage.removeItem(GREETING_DATA_KEY);
      localStorage.removeItem(GREETING_FILE_KEY);
    }
  }, [greetingData, fileName, mounted]);

  if (!mounted) return null;

  if (!authenticated) {
    return (
      <LoginScreen
        onSuccess={() => {
          localStorage.setItem(STORAGE_KEY, "true");
          setAuthenticated(true);
        }}
      />
    );
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEY);
    setAuthenticated(false);
  }

  function parseFile(file: File) {
    if (!file.name.endsWith(".json")) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        setGreetingData(json);
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) parseFile(file);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) parseFile(file);
  }

  return (
    <>
      <style>{`
        .drop-zone { border: 2px dashed rgba(255,255,255,0.2); border-radius: 12px; padding: 60px 40px; display: flex; flex-direction: column; align-items: center; gap: 16px; cursor: pointer; transition: border-color 0.15s, background 0.15s; }
        .drop-zone:hover, .drop-zone.drag-over { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.03); }
        .drop-zone p { color: rgba(255,255,255,0.4); font-size: 14px; margin: 0; }
        .drop-zone strong { color: rgba(255,255,255,0.7); }
        .dash-btn { cursor: pointer; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 6px 14px; user-select: none; transition: color 0.15s, border-color 0.15s; }
        .dash-btn:hover { color: #fff; border-color: rgba(255,255,255,0.6); }
      `}</style>

      <header style={s.header}>
        <span style={s.title}>Cards Management</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {greetingData && (
            <span className="dash-btn" onClick={() => setGreetingData(null)}>
              New file
            </span>
          )}
          <span className="dash-btn" onClick={handleLogout}>
            Logout
          </span>
        </div>
      </header>

      {greetingData ? (
        <CardGrid
          data={greetingData}
          onChange={setGreetingData}
          fileName={fileName}
        />
      ) : (
        <div style={s.uploadArea}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            style={{ display: "none" }}
            onChange={handleFileInput}
          />
          <div
            className={`drop-zone${dragOver ? " drag-over" : ""}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p><strong>Click to upload</strong> or drag &amp; drop a JSON file</p>
            <p>Greeting card data file (.json)</p>
          </div>
        </div>
      )}
    </>
  );
}

const s: Record<string, React.CSSProperties> = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 32px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  title: {
    color: "#ffffff",
    fontSize: "1.1em",
    fontWeight: "bold",
    letterSpacing: "0.05em",
  },
  uploadArea: {
    padding: "48px 32px",
    maxWidth: 560,
    margin: "0 auto",
  },
};
