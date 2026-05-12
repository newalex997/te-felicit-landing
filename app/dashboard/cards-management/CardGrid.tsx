"use client";

import { useState } from "react";
import { GreetingJson, Message } from "./types";
import GreetingCard from "./GreetingCard";
import EditModal from "./EditModal";

interface Props {
  data: GreetingJson;
  onChange: (data: GreetingJson) => void;
  fileName: string;
}

type EditTarget = {
  timeKey: string;
  moodKey: string;
  msgIndex: number;
};

export default function CardGrid({ data, onChange, fileName }: Props) {
  const timeKeys = Object.keys(data);
  const [activeTime, setActiveTime] = useState(timeKeys[0]);
  const [activeMood, setActiveMood] = useState(
    () => Object.keys(data[timeKeys[0]].moods)[0]
  );
  const [editing, setEditing] = useState<EditTarget | null>(null);

  const currentTimeData = data[activeTime];
  const moodKeys = Object.keys(currentTimeData.moods);
  const currentMoodData = currentTimeData.moods[activeMood];
  const messages = currentMoodData?.messages ?? [];
  const imageUrls = currentMoodData?.imageUrls ?? [];

  function handleTimeChange(key: string) {
    setActiveTime(key);
    setActiveMood(Object.keys(data[key].moods)[0]);
  }

  function handleSave(msg: Message) {
    if (!editing) return;
    const next = structuredClone(data);
    next[editing.timeKey].moods[editing.moodKey].messages[editing.msgIndex] = msg;
    onChange(next);
    setEditing(null);
  }

  function handleDownload() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  const editMoodData = editing
    ? data[editing.timeKey].moods[editing.moodKey]
    : null;
  const editImageUrls = editMoodData?.imageUrls ?? [];
  const editImageUrl = editing
    ? editImageUrls[editing.msgIndex % (editImageUrls.length || 1)]
    : undefined;

  return (
    <>
      <style>{`
        .card-wrap:hover .edit-hint { opacity: 1 !important; }
        .card-wrap:hover { transform: translateY(-2px); transition: transform 0.15s; }
        .tab-btn { cursor: pointer; padding: 10px 16px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.35); border-bottom: 2px solid transparent; margin-bottom: -1px; transition: color 0.15s, border-color 0.15s; user-select: none; }
        .tab-btn:hover { color: rgba(255,255,255,0.7); }
        .tab-btn.active { color: #fff; border-bottom-color: #fff; }
        .mood-btn { cursor: pointer; padding: 4px 12px; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: capitalize; color: rgba(255,255,255,0.45); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; transition: all 0.15s; user-select: none; }
        .mood-btn:hover { color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.35); }
        .mood-btn.active { color: #fff; border-color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.1); }
        .stats-bar { font-size: 11px; color: rgba(255,255,255,0.3); padding: 0 32px 12px; }
        .dash-btn { cursor: pointer; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 6px 14px; user-select: none; transition: color 0.15s, border-color 0.15s; }
        .dash-btn:hover { color: #fff; border-color: rgba(255,255,255,0.6); }
      `}</style>

      {/* Time-of-day tabs */}
      <div style={s.timeTabs}>
        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          {timeKeys.map((key) => (
            <span
              key={key}
              className={`tab-btn${activeTime === key ? " active" : ""}`}
              onClick={() => handleTimeChange(key)}
            >
              {key}
            </span>
          ))}
        </div>
        <span className="dash-btn" onClick={handleDownload}>
          Download JSON
        </span>
      </div>

      {/* Mood pills */}
      <div style={s.moodRow}>
        {moodKeys.map((key) => (
          <span
            key={key}
            className={`mood-btn${activeMood === key ? " active" : ""}`}
            onClick={() => setActiveMood(key)}
          >
            {key}
          </span>
        ))}
      </div>

      {/* Stats */}
      <p className="stats-bar">
        {messages.length} messages · {imageUrls.length} images
      </p>

      {/* Card grid */}
      <div style={s.grid}>
        {messages.map((msg, i) => (
          <div key={i} className="card-wrap" style={{ position: "relative" }}>
            <GreetingCard
              message={msg}
              imageUrl={imageUrls[i % imageUrls.length]}
              onClick={() => setEditing({ timeKey: activeTime, moodKey: activeMood, msgIndex: i })}
            />
            <div
              className="edit-hint"
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 4,
                opacity: 0,
                pointerEvents: "none",
                letterSpacing: "0.05em",
              }}
            >
              EDIT
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, gridColumn: "span 4" }}>
            No messages in this mood.
          </p>
        )}
      </div>

      {/* Edit modal */}
      {editing && (
        <EditModal
          initial={data[editing.timeKey].moods[editing.moodKey].messages[editing.msgIndex]}
          imageUrl={editImageUrl}
          label={`${editing.timeKey} / ${editing.moodKey} / #${editing.msgIndex + 1}`}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}

const s: Record<string, React.CSSProperties> = {
  timeTabs: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  moodRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    padding: "16px 32px 8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    padding: "8px 32px 32px",
  },
};
