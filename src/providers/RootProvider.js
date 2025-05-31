"use client";
import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Poppins } from "next/font/google";
import QueryProvider from "./QueryProvider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const theme = createTheme({
  cursorType: "pointer",
  colors: {
    brand: [
      '#f0fdf4', // lightest
    '#dcfce7',
    '#bbf7d0',
    '#86efac',
    '#4ade80', // base green
    '#22c55e',
    '#16a34a',
    '#15803d',
    '#166534',
    '#14532d',
    ],
  },
  primaryColor: "brand",
  headings: {
    fontFamily: `${poppins.style.fontFamily}, sans-serif`,
  },
  defaultRadius: "md",
});

function RootProvider({ children }) {

  

  return (
    <MantineProvider
      theme={theme}
      withGlobalStyles
      withNormalizeCSS
      className={poppins.className}
      styles={{
        global: {
          "html, body, #__next": {
            fontFamily: `${poppins.style.fontFamily}, sans-serif`,
            height: "100%",
            margin: 0,
            padding: 0,
          },
        },
      }}
    >
      <QueryProvider>
        <ColorSchemeScript
          nonce="8IBTHwOdqNKAWeKl7plt8g=="
          defaultColorScheme="light"
        />
        <Notifications position="bottom-left" />
        
        {children}
        </QueryProvider>
    </MantineProvider>
  );
}

export default RootProvider;
