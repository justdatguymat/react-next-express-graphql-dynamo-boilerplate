import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    inputVariant: "filled" | "outlined" | "standard";
    buttonVariant: {
      primary: "contained" | "outlined" | "text";
      secondary: "contained" | "outlined" | "text";
    };
    appDrawer: {
      width: React.CSSProperties["width"];
      breakpoint: Breakpoint;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    inputVariant: "filled" | "outlined" | "standard";
    buttonVariant: {
      primary: "contained" | "outlined" | "text";
      secondary: "contained" | "outlined" | "text";
    };
    appDrawer?: {
      width?: React.CSSProperties["width"];
      breakpoint?: Breakpoint;
    };
  }
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    tertiary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions["primary"];
  }
}
