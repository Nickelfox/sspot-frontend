// default app theme and colors
export const defaultTheme = {
  palette: {
    primary: {
      main: "#1F59AF"
    },
    secondary: {
      main: "#F3F8FE"
    },
    error: {
      main: "#FF0040"
    },
    background: {
      default: "#FFFFFF",
      main: "#E5E5E5",
      gray: "#444444",
      green: "#94DD60",
      green2: "#E7FAF0",
      green3: "#C1ECD4",
      green4: "#C9E9B2",
      green5: "#8DDCC9",
      pink1: "#FFF7EA",
      pink2: "#FFE5E7",
      pink3: "#F5E3C2",
      gold: "#efcb8a",
      platinum: "#b29fcb",
      silver: "#8692a4",
      yellow: "#fffcde",
      yellow2: "#FDC55F",
      yellow3: "#FEEBCA"
    },
    text: {
      main: "#181A1E",
      white: "#FFF",
      gray: "#8692A4",
      gray2: "#666666",
      gray3: "#B3BBC7",
      red1: "#FF4049",
      red2: "#FF8086",
      red3: "#FF000D",
      red4: "#FF1925",
      green: "#5CA91D",
      green2: "#5ca91D",
      gold2: "#FFB020"
    },
    switch: {
      green: "#33cf4d",
      gray: "#39393D"
    },
    disable: {
      main: "#8692A4"
    }
  },
  typography: {
    fontFamily: "'Metropolis', sans-serif",
    h1: {
      fontSize: "9.6rem",
      lineHeight: "11.6rem",
      fontWeight: 700
    },
    h2: {
      fontSize: "6.4rem",
      lineHeight: "9.2rem",
      fontWeight: 700
    },
    h3: {
      fontSize: "4.8rem",
      lineHeight: "7.2rem",
      fontWeight: 700
    },
    h4: {
      fontSize: "4rem",
      lineHeight: "6rem",
      fontWeight: 700
    },
    h5: {
      fontSize: "3.2rem",
      lineHeight: "4.8rem",
      fontWeight: 600
    },
    h6: {
      fontSize: "2.4rem",
      lineHeight: "3.2rem",
      fontWeight: 600
    },
    h7: {
      fontSize: "2rem",
      lineHeight: "2.4rem",
      fontWeight: 600
    },
    s1: {
      fontSize: "1.8rem",
      lineHeight: "2.4rem",
      fontWeight: 600
    },
    p1: {
      fontSize: "1.6rem",
      lineHeight: "2rem",
      fontWeight: 600
    },
    p2: {
      fontSize: "1.4rem",
      lineHeight: "2rem",
      fontWeight: 600
    },
    p3: {
      fontSize: "1.2rem",
      lineHeight: "1.6rem",
      fontWeight: 600
    },
    p4: {
      fontSize: "1.4rem",
      lineHeight: "2rem",
      fontWeight: 500
    },
    p5: {
      fontSize: "1.2rem",
      lineHeight: "1.6rem",
      fontWeight: 500
    },
    button: {
      fontSize: "1.4rem",
      lineHeight: 18 / 13,
      letterSpacing: 0.2,
      fontWeight: 700,
      textTransform: "unset"
    },
    c1: {
      fontSize: "1.3rem",
      lineHeight: 20 / 13,
      fontWeight: 500
    },
    c2: {
      fontSize: "1.2rem",
      lineHeight: 17 / 12,
      fontWeight: 600
    },
    label: {
      fontSize: "1.1rem",
      lineHeight: 15 / 11,
      fontWeight: 600
    }
  },
  breakpoints: {
    values: {
      xs: 0, // Extra small devices (portrait phones)
      sm: 600, // Small devices (landscape phones)
      md: 960, // Medium devices (tablets)
      lg: 1280, // Large devices (desktops)
      xl: 1920 // Extra large devices (large desktops)
    }
  },
  shadows: Array(25).fill("none"),
  overrides: {}
};

/**
 * ****** List Of z-indices Used in the app ******
 * Loader :  5000 ( Should be highest )
 * Popup Modal : 2500 ( Should be lower than loader but higher than Date Select)
 * Date Select : 2300 ( Should be lower than popup modal but higher than filter drawer)
 * Filter Drawer : 2200 ( Should be lower than date select but higher then common footer)
 * Common Footer : 2000 ( Should be low from popup)
 * Table First Freezed Column : 10 ( Should be low from Common Footer )
 *  */
