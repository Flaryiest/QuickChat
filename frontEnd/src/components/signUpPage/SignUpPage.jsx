import { useState } from "react"
import NavBar from "../NavBar"
import Footer from "../Footer"
import ScrollToTop from "../ScrollToTop"
import { useForm } from "react-hook-form"
import "/src/styles/signUpPage.css"

function SignUpPage() {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [isSubmitted, changeIsSubmitted] = useState(false)
    async function sendForm(data) {
        await fetch("http://localhost:3000/api/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: data.userName, password: data.password})
        })
        changeIsSubmitted(true)
    }

    const onSubmit = (data) => {
        sendForm(data)
    }
    if (!isSubmitted) {
        return <div className="signUpForm">
            <ScrollToTop/>
            <NavBar/>
            <div className="signUpFormContent">
                <h2 className="signUpHeader">Sign Up</h2>
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
                        <button className="button">Sign Up</button>
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
                <h2 className="signUpFormSubmittedHeader">Signed Up</h2>
            </div>
            <Footer/>
        </div>
    }
}

export default SignUpPage