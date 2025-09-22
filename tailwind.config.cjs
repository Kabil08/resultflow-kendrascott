/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#E2DCD5",
        input: "#E2DCD5",
        ring: "#FFB800",
        background: "#FFFFFF",
        foreground: "#1C1C1C",
        primary: {
          DEFAULT: "#FFB800", // Kendra Scott Gold
          foreground: "#1C1C1C", // Dark text on gold
        },
        secondary: {
          DEFAULT: "#F5EFE0", // Beige background
          foreground: "#1C1C1C",
        },
        destructive: {
          DEFAULT: "#FF4444",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F5EFE0", // Light Beige
          foreground: "#666666",
        },
        accent: {
          DEFAULT: "#1C1C1C", // Dark accent
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#1C1C1C",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1C1C1C",
        },
        ks: {
          gold: "#FFB800",
          beige: "#F5EFE0",
          dark: "#1C1C1C",
          cream: "#FFF9F2",
          border: "#E2DCD5",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
