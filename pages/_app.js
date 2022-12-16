import { Provider } from "react-redux";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import { store } from "../utils/reducers";
import { useStore } from "../utils/store";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config.js";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
