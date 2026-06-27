import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: "#ff00ff",
          blue: "#00ffff",
          green: "#00ff00",
          yellow: "#ffff00",
          orange: "#ff8800",
        },
      },
      fontFamily: {
        pressStart: ['"Press Start 2P"', "system-ui"],
      },
      boxShadow: {
        "neon-pink": "0 0 5px #ff00ff, 0 0 20px #ff00ff",
        "neon-blue": "0 0 5px #00ffff, 0 0 20px #00ffff",
        "neon-green": "0 0 5px #00ff00, 0 0 20px #00ff00",
        "neon-yellow": "0 0 5px #ffff00, 0 0 20px #ffff00",
        "neon-orange": "0 0 5px #ff8800, 0 0 20px #ff8800",
      },
    },
  },
  plugins: [],
};
export default config;
