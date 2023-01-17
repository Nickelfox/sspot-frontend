// default app theme and colors
export const defaultTheme = {
  palette: {
    primary: {
      main: "#c5001a"
    },
    secondary: {
      main: "#FD2B88"
    },
    error: {
      main: "#FF0040"
    },
    background: {
      default: "#FFFFFF"
    },
    text: {
      main: "#111111",
      white: "#EEEEEE"
    }
  },
  typography: {
    fontFamily: "Roboto",
    h1: {
      fontSize: 54,
      lineHeight: 74 / 34,
      fontWeight: 600
    },
    h2: {
      fontSize: 46,
      lineHeight: 68 / 30,
      fontWeight: 600
    },
    h3: {
      fontSize: 32,
      lineHeight: 48 / 26,
      fontWeight: 600
    },
    h4: {
      fontSize: 28,
      lineHeight: 40 / 24,
      fontWeight: 500
    },
    h5: {
      fontSize: 18,
      lineHeight: 24 / 20,
      fontWeight: 500
    },
    h6: {
      fontSize: 14,
      lineHeight: 24 / 18,
      fontWeight: 500
    },
    p1: {
      fontSize: 16,
      lineHeight: 24 / 15,
      fontWeight: 500
    },
    p2: {
      fontSize: 16,
      lineHeight: 22 / 14,
      fontWeight: 400
    },
    button: {
      fontSize: 14,
      lineHeight: 18 / 13,
      letterSpacing: 0.2,
      fontWeight: 700,
      textTransform: "unset"
    },
    c1: {
      fontSize: 13,
      lineHeight: 20 / 13,
      fontWeight: 500
    },
    c2: {
      fontSize: 12,
      lineHeight: 17 / 12,
      fontWeight: 600
    },
    label: {
      fontSize: 11,
      lineHeight: 15 / 11,
      fontWeight: 600
    }
  },
  shadows: ["1", "2", "3", "4", "none"],
  overrides: {}
}
