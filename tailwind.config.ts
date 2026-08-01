import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 900: "#02040a", 800: "#04060f", 700: "#070b18", 600: "#0b1224", 500: "#101a33" },
        ink: { DEFAULT: "#e8eefc", dim: "#93a2c4", faint: "#5a6a8f" },
        horizon: { DEFAULT: "#ff7a1a", soft: "#ffb066", hot: "#ffd9a8" },
        hud: { DEFAULT: "#4da3ff", soft: "#8fc9ff" },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: { cine: "cubic-bezier(.16,1,.3,1)" },
    },
  },
  plugins: [],
};
export default config;
