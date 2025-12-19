/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";
export default module = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#4F46E5",
        secondary: "#1E293B",
        mainGray: "#475569",
      },
      fontFamily: {
        tajawal: ["var(--font-tajawal)"],
      },
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [daisyui, typography],
  corePlugins: {
    preflight: false,
  },
  // important: true,
};
