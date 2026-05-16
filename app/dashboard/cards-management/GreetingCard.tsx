import { Message } from "./types";
import { TextEffect } from "./constants";

type TextBlockConfig = {
  color: string;
  fontSize: number;
  position: string;
  textEffect?: string;
};

type TextConfig = { message: TextBlockConfig; slogan: TextBlockConfig };

interface Props {
  message: Message;
  imageUrl?: string;
  config?: TextConfig;
  onClick: () => void;
}

// Matches POSITION_STYLES in CardFont/index.tsx
const POSITION_STYLES: Record<
  string,
  { justifyContent: string; alignItems: string }
> = {
  "top-left": { justifyContent: "flex-start", alignItems: "flex-start" },
  "top-center": { justifyContent: "flex-start", alignItems: "center" },
  "top-right": { justifyContent: "flex-start", alignItems: "flex-end" },
  "center-left": { justifyContent: "center", alignItems: "flex-start" },
  center: { justifyContent: "center", alignItems: "center" },
  "center-right": { justifyContent: "center", alignItems: "flex-end" },
  "bottom-left": { justifyContent: "flex-end", alignItems: "flex-start" },
  "bottom-center": { justifyContent: "flex-end", alignItems: "center" },
  "bottom-right": { justifyContent: "flex-end", alignItems: "flex-end" },
};

// Matches getContrastColor in useTextBlockState.ts
function contrastColor(hex: string): string {
  const h = hex.replace("#", "").slice(0, 6);
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 0.45 ? "#000000" : "#FFFFFF";
}

// Matches computeTextEffectStyle + StrokeText offsets in useTextBlockState.ts / StrokeText.tsx
function textShadow(effect: string | undefined, color: string): string {
  const c = contrastColor(color.slice(0, 7));
  if (effect === TextEffect.BORDER) {
    // Replicates STROKE_OFFSETS at ±1.5px from StrokeText.tsx
    return [
      [-1.5, -1.5],
      [-1.5, 0],
      [-1.5, 1.5],
      [0, -1.5],
      [0, 1.5],
      [1.5, -1.5],
      [1.5, 0],
      [1.5, 1.5],
    ]
      .map(([dx, dy]) => `${dx}px ${dy}px 0 ${c}`)
      .join(", ");
  }
  if (effect === TextEffect.SHADOW) return `2px 3px 4px ${c}`;
  if (effect === TextEffect.OUTLINE) return `0 0 8px ${c}`;
  return `0 1px 3px ${c}`; // TextEffect.NONE
}

export default function GreetingCard({
  message,
  imageUrl,
  config,
  onClick,
}: Props) {
  const cfg = config;
  // Font sizes are designed for 850px card width — scale via cqw
  const cqw = (px: number) => `${((px / 850) * 100).toFixed(2)}cqw`;

  // Group message and slogans by position (mirrors positionGroups in CardFont)
  type Block = {
    text: string;
    color: string;
    fontSize: number;
    effect?: string;
  };
  const groups = new Map<string, Block[]>();
  if (cfg) {
    const msgBlock: Block = {
      text: message.text,
      color: cfg.message.color,
      fontSize: cfg.message.fontSize,
      effect: "textEffect" in cfg.message ? cfg.message.textEffect : undefined,
    };
    const pos = cfg.message.position as string;
    groups.set(pos, [...(groups.get(pos) ?? []), msgBlock]);

    if (message.slogans.length > 0) {
      // Show first slogan only — matches single-text-block in mobile card view
      const sloganBlock: Block = {
        text: message.slogans[0],
        color: cfg.slogan.color,
        fontSize: cfg.slogan.fontSize,
        effect: "textEffect" in cfg.slogan ? cfg.slogan.textEffect : undefined,
      };
      const spos = cfg.slogan.position as string;
      groups.set(spos, [...(groups.get(spos) ?? []), sloganBlock]);
    }
  }

  return (
    <div onClick={onClick} style={s.wrap}>
      <div style={s.card}>
        {imageUrl ? (
          <img src={imageUrl} alt="" style={s.image} />
        ) : (
          <div style={s.placeholder} />
        )}

        {cfg ? (
          Array.from(groups.entries()).map(([pos, blocks]) => {
            const flex = POSITION_STYLES[pos] ?? POSITION_STYLES["center"];
            return (
              <div
                key={pos}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: flex.justifyContent,
                  alignItems: flex.alignItems,
                  padding: "5%",
                  boxSizing: "border-box",
                }}
              >
                {blocks.map((b, i) => (
                  <p
                    key={i}
                    style={{
                      margin: 0,
                      padding: "6px",
                      width: "85%",
                      textAlign:
                        flex.alignItems === "flex-start"
                          ? "left"
                          : flex.alignItems === "flex-end"
                            ? "right"
                            : "center",
                      color: b.color,
                      fontSize: cqw(b.fontSize),
                      lineHeight: 1.4,
                      fontWeight: 600,
                      textShadow: textShadow(b.effect, b.color),
                    }}
                  >
                    {b.text}
                  </p>
                ))}
              </div>
            );
          })
        ) : (
          <div style={s.fallback}>
            <p style={s.fallbackText}>{message.text}</p>
          </div>
        )}

        <div style={s.editHint}>Edit</div>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  wrap: { cursor: "pointer" },
  card: {
    position: "relative",
    width: "100%",
    aspectRatio: "850 / 1280",
    borderRadius: 8,
    overflow: "hidden",
    background: "#1a1a2e",
    containerType: "inline-size",
  } as React.CSSProperties,
  image: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  placeholder: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(160deg, #1a1a2e 0%, #0f3460 100%)",
  },
  fallback: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "20px 14px 14px",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
  },
  fallbackText: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 1.45,
    fontWeight: 500,
    textShadow: "0 1px 3px rgba(0,0,0,0.6)",
    margin: 0,
  },
  editHint: {
    position: "absolute",
    top: 8,
    right: 8,
    background: "rgba(0,0,0,0.55)",
    color: "#fff",
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 8px",
    borderRadius: 4,
    opacity: 0,
    transition: "opacity 0.15s",
  },
};
