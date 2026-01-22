import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        accent: "var(--color-accent)"
      },
      spacing: {
        row: "2rem"
      },
      borderRadius: {
        md: "6px"
      }
    }
  }
} satisfies Config;
