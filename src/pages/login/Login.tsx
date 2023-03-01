import { useState, createRef } from "react";
import { Navigate, NavLink } from "react-router-dom"
import { useAuth } from 'auth/AuthProvider';
import './Auth.css'
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
    const { signIn, currentUser }: any = useAuth()
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [captchaValue, setCaptchaValue] = useState(null);
    //const captchaRef: any = createRef();

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    const [loginErrors, setLoginErrors] = useState({
        username: '',
        password: ''
    })

    function captchaChange(data: any) {
        setCaptchaValue(data)
    }

    function handleLogIn(event: any) {
        event.preventDefault();
        setLoginAttempts(loginAttempts + 1)
        /*if (captchaRef.current != null) {
            setCaptchaValue(captchaRef.current.getValue())
        }*/
        if (loginData.username.length === 0 || loginData.password.length === 0) {
            setLoginErrors({
                ...loginErrors,
                username: (loginData.username.length === 0 ? "Mező kitöltése kötelező" : ""),
                password: (loginData.password.length === 0 ? "Mező kitöltése kötelező" : "")
            })
            return;
        }
        const { username, password } = event.target.elements;

        if (captchaValue == null && loginAttempts >= 3) {
            alert("Helytelen captcha!")
            return
        }
        signIn(username.value, password.value).then((result: any) => {
        }).catch((error: any) => {
            console.log(error.code)
        })


    }

    function handleInputChange(event: any) {
        const value = event.target.value;
        const fieldName = event.target.name;
        setLoginData({ ...loginData, [fieldName]: value })
        setLoginErrors({ ...loginErrors, [fieldName]: (value.length == 0 ? "Mező kitöltése kötelező" : "") })
    }

    if (currentUser) {
        return (
            <Navigate to="/" />
        )
    }

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleLogIn}>
                <h1 className="title">Bejelentkezés</h1>
                <div className='form-field'>
                    <div className='field-error'>{loginErrors.username}</div>
                    <input name="username" type="text" placeholder='Felhasználónév' onChange={(e) => handleInputChange(e)} />
                </div>
                <div className='form-field'>
                    <div className='field-error'>{loginErrors.password}</div>
                    <input name="password" type="password" placeholder='Jelszó' onChange={(e) => handleInputChange(e)} />
                </div>
                {
                    (loginAttempts >= 3) ? (
                        <ReCAPTCHA
                            /*ref={captchaRef}*/
                            sitekey="6LeGX64kAAAAAGn7eVUkZW7TQAIN-IWdZ6xpIh9k"
                            onChange={captchaChange}
                        />
                    ) : ""
                }
                <button className="auth-button" type='submit'>Belépés</button>
                <NavLink to={'/register'} className="loginreg-label">Regisztráció</NavLink>
            </form >
        </div >
    )
}
