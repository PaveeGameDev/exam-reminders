import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  daisyui: {
    themes: [
      {
        myYellowTheme: {
          primary: "#fde047", // Bright yellow
          "primary-focus": "#facc15", // A slightly deeper yellow for focus states
          "primary-content": "#1f2937", // Dark gray for text on primary background
          secondary: "#fdba74", // Soft orange as a complementary color
          "secondary-focus": "#fb923c", // A deeper shade of the complementary color
          "secondary-content": "#1f2937", // Dark gray for text on secondary background
          accent: "#94a3b8", // Muted blue as an accent color
          "accent-focus": "#64748b", // A deeper shade of the accent color
          "accent-content": "#ffffff", // White for text on accent backgrounds
          neutral: "#f3f4f6", // Light gray for neutral elements
          "neutral-focus": "#e5e7eb", // A slightly darker shade of neutral
          "neutral-content": "#1f2937", // Dark gray for text on neutral backgrounds
          "base-100": "#ffffff", // White background
          "base-200": "#f9fafb", // Lighter gray for secondary backgrounds
          "base-300": "#d1d5db", // Medium gray for borders or divider elements
          info: "#3b82f6", // Blue for informational messages
          success: "#10b981", // Green for success states
          warning: "#f59e0b", // Orange for warnings
          error: "#ef4444", // Red for errors
        },
      },
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
};

export default config;
