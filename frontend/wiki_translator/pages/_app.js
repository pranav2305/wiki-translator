import "bootstrap/dist/css/bootstrap.min.css";
import "../public/styles/global.css";
import MainNavbar from "../components/MainNavbar";
import Head from 'next/head';
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }) {
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