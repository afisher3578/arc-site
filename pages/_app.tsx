import Head from "next/head";
import { AppProps } from "next/app";
import { ArjsProvider } from "arjs-react";
import { ThemeProvider } from "styled-components";

import { Header } from "@/navigation/header";
import { Footer } from "@/navigation/footer";
import { View } from "@/wrappers/View";

import { DOM } from "@/config";
import { GlobalStyle } from "@/styles";
import { defaultTheme } from "@/themes";
import { language } from "@/language";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{language.companyTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={language.metaDescriptionContent} />
        <meta name="theme-color" content="#003153" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ArjsProvider connectors={{arconnect: true, arweave: true }}>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <Header />
          <div id={DOM.modal}></div>
          <View>
            <Component {...pageProps} />
          </View>
          <Footer />
        </ThemeProvider>
      </ArjsProvider>
    </>
  )
}
