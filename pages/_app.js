import Header from "../layout/header"
import Footer from "../layout/Footer"
import '../styles/globals.css'
function MyApp({Component}) {
  return(
    <>
    <Header/>
    <Component/>
    <Footer/>
    </>
    )
}

export default MyApp
