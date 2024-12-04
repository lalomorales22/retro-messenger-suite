import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        win95: {
          gray: "#C0C0C0",
          darkgray: "#808080",
          navy: "#000080",
          cyan: "#008080",
          black: "#000000",
          white: "#FFFFFF",
          blue: "#0000FF",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        win95: ["MS Sans Serif", "Microsoft Sans Serif", "sans-serif"],
      },
      boxShadow: {
        win95: "inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff",
        "win95-btn": "inset -1px -1px #000000, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
        "win95-pressed": "inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;