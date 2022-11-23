import { Provider } from "react-redux";
import createStore from "../utils/store";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import { store } from "../utils/reducers";
import { useStore } from '../utils/store'
import "../styles/globals.css";
function MyApp({ Component ,pageProps  }) {
  const store = useStore(pageProps.initialReduxState)
  return (
    <>
      <Provider store={store}>
        <Header />
        <Component />
        <Footer />
      </Provider>
    </>
  );
}

export default MyApp;
