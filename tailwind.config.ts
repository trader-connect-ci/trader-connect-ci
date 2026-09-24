import type { Config } from "tailwindcss";

// Palette validée pour l'identité de Trader Connect CI (voir maquettes accueil/formation/événement)
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "tc-bg": "#0B0906",
        "tc-bg2": "#170D08",
        "tc-copper": "#D98A46",
        "tc-copper-dark": "#8C4E22",
        "tc-copper-light": "#F0AE72",
        "tc-cream": "#F4ECE1",
        "tc-stone": "#B9A997",
      },
    },
  },
  plugins: [],
} satisfies Config;
