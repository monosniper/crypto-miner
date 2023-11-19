import { createThemes } from "tw-colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        375: "350px",
      },

      backgroundImage: {
        "gradient-primary": "linear-gradient(90deg, #5B39B8 0%, #906BF5 100%)",
        "base-gradient-100":
          "linear-gradient(180deg, rgba(153, 115, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 100%)",

        "gradient-1":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #C1AAFF 100%)",
        "gradient-1-dark":
          "linear-gradient(180deg, rgba(92, 47, 215, 0.20) 0%, rgba(30, 31, 37, 0.00) 100%), linear-gradient(180deg, rgba(30, 31, 37, 0.00) 0%, #5C2FD7 100%)",
        "gradient-2": "linear-gradient(90deg, #5B39B8 0%, #906BF5 100%)",
        "gradient-2-dark": "linear-gradient(90deg, #361C7C 0%, #5927DD 100%)",

        "gradient-3": "linear-gradient(90deg, #7054BA 0%, #906BF4 100%)",
      },

      fontFamily: {
        inter: "Inter, sans-serif",
        droid: "Droid Sans, sans-serif",
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
        "base-border-warning": "#FC0",

        "purple-1": "#443274",
        "purple-2": "#D0C0FC",
        "purple-3": "#5B39B8",
        "pink-1": "rgba(208, 192, 252, 1)",
        "blue-1": "#0B1C3F",
        "gray-1": "#A1A1AA",
        "gray-2": "#5D636D",

        primary: "#C1AAFF",
        success: "#34C759",
        warning: "rgba(255, 204, 0, 0.10)",
      },

      dark: {
        "base-100": "#16191B",
        "base-200": "#1E1F25",
        "base-300": "#444E54",

        "base-content-100": "#fff",
        "base-content-200": "#DFDBDD",
        "base-content-300": "#B6BFCF",

        "base-border-100": "#444E54",
        "base-border-warning": "#8A710F",

        "purple-1": "#443274",
        "purple-2": "#D0C0FC",
        "purple-3": "#7C55E7",
        "pink-1": "rgba(208, 192, 252, 1)",
        "blue-1": "#0B1C3F",
        "gray-1": "#A1A1AA",
        "gray-2": "#5D636D",

        primary: "#31108C",
        success: "#47BC64",
        warning: "rgba(138, 113, 15, 0.10)",
      },
    }),
  ],
};
