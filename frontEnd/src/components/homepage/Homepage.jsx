import "/src/styles/homepage.css"
import NavBar from "../NavBar"
import Footer from "../Footer"
import { Link } from "react-router-dom"
function Homepage() {


  return <div className="homepage">
    <NavBar/>
    <div className="homepageContent">
      <div className="homepageLeft">
        <h1 className="homepageHeader">Quickchat</h1>
        <div className="homepageText"><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci ea quibusdam molestias ullam veniam distinctio esse qui totam impedit quo odit rem similique, laborum facere, magnam mollitia, perspiciatis unde. Quis.</p></div>
        <Link to="/chat" className="homepageDemoButton"><span className="aqua">Demo</span></Link>
      </div>
      <div className="homepageRight">
        <img className="homepageImage" src="/images/HomepageImage.jpg"></img>
      </div>
    </div>
    <Footer/>
  </div>
  
}

export default Homepage
