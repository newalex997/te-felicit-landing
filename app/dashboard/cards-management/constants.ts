export enum TextPosition {
  TOP_LEFT = "top-left",
  TOP_CENTER = "top-center",
  TOP_RIGHT = "top-right",
  CENTER_LEFT = "center-left",
  CENTER = "center",
  CENTER_RIGHT = "center-right",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_CENTER = "bottom-center",
  BOTTOM_RIGHT = "bottom-right",
}

export enum TextEffect {
  NONE = "none",
  SHADOW = "shadow",
  OUTLINE = "outline",
  BORDER = "border",
}

export const TEXT_CONFIGS = {
  // White message top, gold slogan center
  1: {
    message: {
      color: "#FFFFFF",
      fontSize: 31,
      position: TextPosition.TOP_CENTER,
    },
    slogan: { color: "#FFD700E6", fontSize: 54, position: TextPosition.CENTER },
  },
  // Warm message top with border, gold slogan center with border
  2: {
    message: {
      color: "#FFE8D0",
      fontSize: 31,
      textEffect: TextEffect.BORDER,
      position: TextPosition.TOP_CENTER,
    },
    slogan: {
      color: "#FFD700E6",
      fontSize: 54,
      position: TextPosition.CENTER,
      textEffect: TextEffect.BORDER,
    },
  },
  // Cool message center, gold slogan center
  3: {
    message: { color: "#CCDEFF", fontSize: 31, position: TextPosition.CENTER },
    slogan: { color: "#FFD700E6", fontSize: 54, position: TextPosition.CENTER },
  },
  // White message bottom, gold slogan top (inverted)
  4: {
    message: {
      color: "#FFFFFF",
      fontSize: 29,
      position: TextPosition.BOTTOM_CENTER,
    },
    slogan: {
      color: "#FFD700E6",
      fontSize: 54,
      position: TextPosition.TOP_CENTER,
    },
  },
  // White message center, white slogan top (monochrome)
  5: {
    message: {
      color: "#FFFFFF",
      fontSize: 31,
      position: TextPosition.CENTER,
    },
    slogan: {
      color: "#FFFFFFCC",
      fontSize: 48,
      position: TextPosition.TOP_CENTER,
    },
  },
  // White message bottom, large gold slogan center with border
  6: {
    message: {
      color: "#FFFFFF",
      fontSize: 26,
      position: TextPosition.BOTTOM_CENTER,
    },
    slogan: {
      color: "#FFD700",
      fontSize: 64,
      position: TextPosition.CENTER,
      textEffect: TextEffect.BORDER,
    },
  },
  // White message center (large), gold slogan bottom
  7: {
    message: {
      color: "#FFFFFF",
      fontSize: 35,
      position: TextPosition.CENTER,
    },
    slogan: {
      color: "#FFD700E6",
      fontSize: 50,
      position: TextPosition.BOTTOM_CENTER,
    },
  },
  // Warm message top with border, gold slogan center with border (smaller)
  8: {
    message: {
      color: "#FFE8D0",
      fontSize: 27,
      position: TextPosition.TOP_CENTER,
      textEffect: TextEffect.BORDER,
    },
    slogan: {
      color: "#FFD700E6",
      fontSize: 52,
      position: TextPosition.CENTER,
      textEffect: TextEffect.BORDER,
    },
  },
  // Cool message bottom, gold slogan top (inverted cool)
  9: {
    message: {
      color: "#CCDEFF",
      fontSize: 27,
      position: TextPosition.BOTTOM_CENTER,
    },
    slogan: {
      color: "#FFD700E6",
      fontSize: 52,
      position: TextPosition.TOP_CENTER,
    },
  },
  // White message center with border, gold slogan top with border
  10: {
    message: {
      color: "#FFFFFF",
      fontSize: 34,
      position: TextPosition.CENTER,
      textEffect: TextEffect.BORDER,
    },
    slogan: {
      color: "#FFD700",
      fontSize: 60,
      position: TextPosition.TOP_CENTER,
      textEffect: TextEffect.BORDER,
    },
  },
};
