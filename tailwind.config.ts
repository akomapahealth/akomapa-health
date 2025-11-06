import type { Config } from "tailwindcss";

// Define fontFamily constant 
const fontFamily = {
    sans: [
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      '"Noto Sans"',
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ],
    serif: [
      "ui-serif", 
      "Georgia", 
      "Cambria", 
      '"Times New Roman"', 
      "Times", 
      "serif"
    ],
    mono: [
      "ui-monospace",
      "SFMono-Regular",
      "Menlo",
      "Monaco",
      "Consolas",
      '"Liberation Mono"',
      '"Courier New"',
      "monospace",
    ],
}

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        floralwhite: "#FCFAEF",
        lapis: "#005A9C",
        skobeloff: "#007A73",
        amber: {
          DEFAULT: "#C37B1E",
          100: "#FAF0E0",
          200: "#F2DDB9",
          300: "#E9C891",
          400: "#D99F57",
          500: "#C37B1E",
          600: "#A36419",
          700: "#824D14",
          800: "#62380E",
          900: "#422409",
        },
        onyx: {
          DEFAULT: "#2F3332",
          100: "#E6E7E7",
          200: "#C1C3C3",
          300: "#9B9E9E",
          400: "#757A79",
          500: "#4F5554",
          600: "#2F3332",
          700: "#252828",
          800: "#1C1F1E",
          900: "#121514",
        },
        border: "rgb(var(--border))",
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))",
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        primary: {
          DEFAULT: "rgb(var(--primary))",
          foreground: "rgb(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
          foreground: "rgb(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive))",
          foreground: "rgb(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          foreground: "rgb(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "rgb(var(--popover))",
          foreground: "rgb(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-source-sans-3)", "var(--font-inter)", ...fontFamily.sans],
        heading: ["var(--font-poppins)", "var(--font-inter)", ...fontFamily.sans],
        subheading: ["var(--font-inter)", "var(--font-poppins)", ...fontFamily.sans],
        accent: ["var(--font-poppins)", ...fontFamily.sans],
        body: ["var(--font-source-sans-3)", "var(--font-inter)", ...fontFamily.sans],
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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--tw-prose-body)',
            a: {
              color: 'var(--tw-prose-links)',
              '&:hover': {
                color: 'var(--tw-prose-links-hover)',
              },
            },
            h1: {
              fontFamily: 'var(--font-poppins), var(--font-inter)',
              fontWeight: '700',
            },
            h2: {
              fontFamily: 'var(--font-poppins), var(--font-inter)',
              fontWeight: '700',
            },
            h3: {
              fontFamily: 'var(--font-poppins), var(--font-inter)',
              fontWeight: '700',
            },
            h4: {
              fontFamily: 'var(--font-poppins), var(--font-inter)',
              fontWeight: '700',
            },
            h5: {
              fontFamily: 'var(--font-inter), var(--font-poppins)',
              fontWeight: '600',
            },
            h6: {
              fontFamily: 'var(--font-inter), var(--font-poppins)',
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
} satisfies Config

export default config
