"use client";

import { useState } from "react";
import { Message } from "./types";
import { TEXT_CONFIGS } from "./constants";
import GreetingCard from "./GreetingCard";

interface Props {
  initial: Message;
  imageUrl?: string;
  label: string;
  onSave: (msg: Message) => void;
  onClose: () => void;
}

export default function EditModal({ initial, imageUrl, label, onSave, onClose }: Props) {
  const [draft, setDraft] = useState<Message>({
    ...initial,
    slogans: [...initial.slogans],
  });
  const [newSlogan, setNewSlogan] = useState("");
  const [previewSloganIdx, setPreviewSloganIdx] = useState(0);

  const clampedIdx = Math.min(previewSloganIdx, Math.max(0, draft.slogans.length - 1));
  const previewMessage = {
    ...draft,
    slogans: draft.slogans.length > 0 ? [draft.slogans[clampedIdx]] : [],
  };

  function addSlogan() {
    if (!newSlogan.trim()) return;
    setDraft((d) => ({ ...d, slogans: [...d.slogans, newSlogan.trim()] }));
    setNewSlogan("");
  }

  function removeSlogan(i: number) {
    if (previewSloganIdx >= i && previewSloganIdx > 0) setPreviewSloganIdx((p) => p - 1);
    setDraft((d) => ({ ...d, slogans: d.slogans.filter((_, idx) => idx !== i) }));
  }

  return (
    <>
      <style>{`
        .em-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 24px; backdrop-filter: blur(2px); }
        .em-modal { background: #16162a; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; width: 100%; max-width: 1100px; max-height: 92vh; overflow-y: auto; display: flex; flex-direction: column; }
        .em-header { display: flex; align-items: center; justify-content: space-between; padding: 24px 32px 20px; border-bottom: 1px solid rgba(255,255,255,0.07); gap: 16px; }
        .em-header-title { font-size: 15px; font-weight: 700; color: #fff; margin: 0 0 3px; }
        .em-header-label { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.3); letter-spacing: 0.08em; text-transform: uppercase; }
        .em-close { cursor: pointer; display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 6px; background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.6); font-size: 18px; line-height: 1; user-select: none; transition: background 0.15s, color 0.15s; flex-shrink: 0; }
        .em-close:hover { background: rgba(255,255,255,0.14); color: #fff; }
        .em-body { display: grid; grid-template-columns: 300px 1fr; gap: 36px; padding: 32px; }
        .em-field-label { display: block; font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.35); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }
        .em-preview-col { display: flex; flex-direction: column; }
        .em-slogan-picks { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
        .em-slogan-pick { cursor: pointer; font-size: 11px; color: rgba(255,255,255,0.45); background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; padding: 3px 8px; user-select: none; transition: all 0.15s; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .em-slogan-pick:hover { color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.3); }
        .em-slogan-pick.active { color: #fff; background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.5); }
        .em-form-col { display: flex; flex-direction: column; gap: 20px; }
        .em-textarea { width: 100%; box-sizing: border-box; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: rgba(255,255,255,0.9); font-size: 13px; line-height: 1.6; padding: 10px 12px; resize: vertical; min-height: 120px; font-family: inherit; transition: border-color 0.15s; }
        .em-textarea:focus { outline: none; border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.06); }
        .em-slogans { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; min-height: 28px; }
        .em-slogan-tag { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 6px; padding: 4px 10px; font-size: 12px; color: rgba(255,255,255,0.8); }
        .em-slogan-remove { cursor: pointer; display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 3px; background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); font-size: 12px; line-height: 1; user-select: none; transition: background 0.15s, color 0.15s; flex-shrink: 0; }
        .em-slogan-remove:hover { background: rgba(231,76,60,0.3); color: #e74c3c; }
        .em-empty { font-size: 12px; color: rgba(255,255,255,0.2); line-height: 28px; }
        .em-input { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: rgba(255,255,255,0.9); font-size: 12px; padding: 7px 11px; font-family: inherit; transition: border-color 0.15s; }
        .em-input:focus { outline: none; border-color: rgba(255,255,255,0.3); }
        .em-slogan-inline-input { flex: 1; min-width: 140px; }
        .em-footer { display: flex; justify-content: flex-end; gap: 10px; padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.07); }
      `}</style>

      <div className="em-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="em-modal">

          <div className="em-header">
            <div>
              <p className="em-header-title">Edit message</p>
              <span className="em-header-label">{label}</span>
            </div>
            <span className="em-close" onClick={onClose}>×</span>
          </div>

          <div className="em-body">
            <div className="em-preview-col">
              <span className="em-field-label">Preview</span>
              <GreetingCard message={previewMessage} imageUrl={imageUrl} onClick={() => {}} />
              {draft.slogans.length > 1 && (
                <div className="em-slogan-picks">
                  {draft.slogans.map((sl, i) => (
                    <span
                      key={i}
                      className={`em-slogan-pick${clampedIdx === i ? " active" : ""}`}
                      onClick={() => setPreviewSloganIdx(i)}
                    >
                      {sl}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="em-form-col">
              <div>
                <span className="em-field-label">Message text</span>
                <textarea
                  className="em-textarea"
                  value={draft.text}
                  onChange={(e) => setDraft((d) => ({ ...d, text: e.target.value }))}
                />
              </div>

              <div>
                <span className="em-field-label">Text config ID</span>
                <input
                  type="number"
                  className="em-input"
                  style={{ width: 80 }}
                  min={1}
                  max={Object.keys(TEXT_CONFIGS).length}
                  value={draft.textConfigId}
                  onChange={(e) => setDraft((d) => ({ ...d, textConfigId: Number(e.target.value) }))}
                />
              </div>

              <div>
                <span className="em-field-label">Slogans ({draft.slogans.length})</span>
                <div className="em-slogans">
                  {draft.slogans.length === 0 && <span className="em-empty">No slogans yet</span>}
                  {draft.slogans.map((sl, i) => (
                    <span key={i} className="em-slogan-tag">
                      {sl}
                      <span className="em-slogan-remove" onClick={() => removeSlogan(i)}>×</span>
                    </span>
                  ))}
                  <input
                    className="em-input em-slogan-inline-input"
                    placeholder="Add slogan…"
                    value={newSlogan}
                    onChange={(e) => setNewSlogan(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSlogan())}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="em-footer">
            <button className="button small" onClick={onClose}>Cancel</button>
            <button className="button primary small" onClick={() => onSave(draft)}>Save</button>
          </div>

        </div>
      </div>
    </>
  );
}
