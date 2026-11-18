const theme = {
  colors: {
    bg: "#ffffff",
    surface: "#f6f7f9",
    border: "#e3e6ea",
    "border-input": "#868e98",
    text: "#14171c",
    "text-muted": "#5b6470",
    accent: "#2f5bea",
    "on-accent": "#ffffff",
    danger: "#c62f2f",
    success: "#1f7a4d",
  },
  fontFamily: {
    sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
    mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  },
  fontSize: {
    xs: ["12px", { lineHeight: "16px", fontWeight: "500" }],
    sm: ["14px", { lineHeight: "20px", fontWeight: "400" }],
    base: ["16px", { lineHeight: "24px", fontWeight: "400" }],
    lg: ["20px", { lineHeight: "28px", fontWeight: "600" }],
    xl: ["28px", { lineHeight: "34px", fontWeight: "700" }],
    display: ["40px", { lineHeight: "44px", fontWeight: "700" }],
  },
  borderRadius: { sm: "6px", md: "10px", lg: "16px", pill: "999px" },
  boxShadow: {
    card: "0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.10)",
    pop: "0 12px 32px rgba(16,24,40,.16)",
  },
  transitionDuration: { fast: "120ms", base: "200ms" },
  transitionTimingFunction: { ease: "cubic-bezier(.2,.8,.2,1)" },
};

module.exports = { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: theme }, plugins: [] };
