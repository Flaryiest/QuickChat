import "/src/styles/homepage.css"
import NavBar from "../NavBar"
import Footer from "../Footer"
function Homepage() {


  return <div className="homepage">
    <NavBar/>
    <div className="HomepageContent">
      <h1>Quickchat</h1>
    </div>
    <Footer/>
  </div>
  
}

export default Homepage
