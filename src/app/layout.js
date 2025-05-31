import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import '@mantine/dropzone/styles.css';
import './globals.css';
import 'regenerator-runtime';

import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { ColorSchemeScript } from "@mantine/core";
import RootProvider from "@/providers/RootProvider";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight:"400",
   subsets:["latin"]
 });
export const metadata = {
  title: "Speech to Text Converter",
  description: "A tool that converts speech to text",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-mantine-color-scheme="dark">
        <head>
        <ColorSchemeScript />
      </head>
      <body className={poppins.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
