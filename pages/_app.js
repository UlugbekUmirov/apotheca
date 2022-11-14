import { Provider } from "react-redux";
import createStore from "../utils/store";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import "../styles/globals.css";
function MyApp({ Component }) {
  const store = createStore();
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
