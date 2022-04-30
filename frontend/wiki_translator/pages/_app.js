import "bootstrap/dist/css/bootstrap.min.css";
import "../public/styles/global.css";
import MainNavbar from "../components/MainNavbar";
import Head from 'next/head';
import { CookiesProvider } from "react-cookie";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {

    useEffect(() => {
        import ('bootstrap/dist/js/bootstrap.js')
    }, [])
    
  return (
    <CookiesProvider>
      <Head>
        <meta charSet="UTF-8"></meta>
        <title>Wiki Translator</title>
      </Head>
      <body>
        <MainNavbar />
        <Component {...pageProps} />
      </body>
    </CookiesProvider>
  );
}

export default MyApp;