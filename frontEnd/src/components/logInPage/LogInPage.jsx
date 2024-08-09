import "/src/styles/logInPage.css"
import NavBar from "../NavBar"
import Footer from "../Footer"
import ScrollToTop from "../ScrollToTop"
import { useForm } from "react-hook-form"
import { useState } from "react" 
import { Link } from "react-router-dom"
import Cookies from "universal-cookie"
const cookies = new Cookies()

function LogInPage() {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [isSubmitted, changeIsSubmitted] = useState(false)
    async function sendForm(data) {
        console.log(data)
        changeIsSubmitted(true)
        createCookie()
    }

    const onSubmit = (data) => {
        sendForm(data)
    }
    
    function createCookie() {
        cookies.set("JWT", "Spicy", {sameSite:'strict', path: "/", expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), httpOnly: true})
    }

    if (!isSubmitted) {
        return <div className="signUpForm">
            <ScrollToTop/>
            <NavBar/>
            <div className="signUpFormContent">
                <h2 className="signUpHeader">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card">
                        <div>
                            <label className="input">
                                <input className="input__field" type="text" name="userName" placeholder=" " {...register("userName", { required: true })}/>
                                <span className="input__label">Username</span>
                            </label>
                            <div className="divider"></div>
                            <label className="input">
                                <input className="input__field" type="password" name="password" placeholder=" " {...register("password", { required: true })}/>
                                <span className="input__label">Password</span>
                            </label>
                        </div>
                    </div>
                    <div className="button-group">
                        <button className="button">Login</button>
                        <Link className="redirect" to="/signup">Don't have an account? <span className="aqua">Sign Up</span></Link>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    }
    if (isSubmitted) {
        return <div className="signUpForm">
            <ScrollToTop/>
            <NavBar/>
            <div className="signUpFormContent">
                <h2 className="signUpFormSubmittedHeader">Logged In</h2>
            </div>
            <Footer/>
        </div>
    }
}

export default LogInPage