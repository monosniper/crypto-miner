import { createThemes } from "tw-colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        375: "350px",
      },
    },
  },
  plugins: [
    createThemes({
      light: {
        "base-100": "#F6F8F9",
        "base-200": "#fff",
        "base-300": "#E5E9EB",

        "base-content-100": "#000",
        "base-content-200": "#241F21",
        "base-content-300": "#58667E",

        "base-border-100": "#E5E9EB",

        "purple-1": "#443274",
        "purple-2": "#D0C0FC",
        "blue-1": "#0B1C3F",
        "gray-1": "#A1A1AA",

        primary: "#C1AAFF",
        success: "#34C759",
      },
      dark: {
        "base-100": "#16191B",
        "base-200": "#1E1F25",
        "base-300": "#444E54",

        "base-content-100": "#fff",
        "base-content-200": "#DFDBDD",
        "base-content-300": "#B6BFCF",

        "base-border-100": "#444E54",

        "purple-1": "#443274",
        "purple-2": "#D0C0FC",
        "blue-1": "#0B1C3F",
        "gray-1": "#A1A1AA",

        primary: "#31108C",
        success: "#47BC64",
      },
    }),
  ],
};
