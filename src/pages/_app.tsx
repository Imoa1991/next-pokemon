import "@/styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.webp" />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
