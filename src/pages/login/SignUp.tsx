import { useState } from 'react'
import { Navigate, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from 'auth/AuthProvider';
import './Auth.css'

export default function SignUp() {
    const navigate = useNavigate();

    const { signUp, currentUser }: any = useAuth()

    const [signUpData, setSignUpData] = useState<any>({
        username: '',
        fullName: '',
        password: ''
    })

    const [signUpErrors, setSignUpErrors] = useState({
        username: '',
        fullName: '',
        password: ''
    })

    function fieldsValid() {
        let fieldsValid = true;
        let errors: any = {}
        for (let key in signUpData) {
            if (signUpData[key].length === 0) {
                errors[key] = "Mező kitöltése kötelező"
                fieldsValid = false;
            }
        }
        if (signUpData.password.length < 6) {
            errors.password = "A Jelszónak legalább 6 karakterből kell állnia."
            fieldsValid = false;
        }
        setSignUpErrors({ ...errors })
        return fieldsValid
    }

    function handleSignUp(event: any) {
        event.preventDefault()
        if (!fieldsValid()) return;
        const { username, fullName, password } = event.target.elements;
        signUp(username.value, fullName.value, password.value).then((result: any) => {
            if (result) {
                alert("Sikeres regisztráció!")
                navigate("/login")
            }
        }).catch((error: any) => {
            console.log(error)
        })
    }

    function handleInputChange(event: any) {
        const value = event.target.value;
        const fieldName = event.target.name;
        setSignUpData({ ...signUpData, [fieldName]: value })
        setSignUpErrors({ ...signUpErrors, [fieldName]: (value.length == 0 ? "Mező kitöltése kötelező" : "") })
    }

    if (currentUser) {
        return (
            <Navigate to="/" />
        )
    }

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSignUp}>
                <h1 className="title">Regisztráció</h1>

                <div className='form-field'>
                    <div className='field-error'>{signUpErrors.username}</div>
                    <input name="username" type="text" placeholder='Felhasználónév' onChange={(e) => handleInputChange(e)} />
                </div>
                <div className='form-field'>
                    <div className='field-error'>{signUpErrors.fullName}</div>
                    <input name="fullName" type="text" placeholder='Teljes név' onChange={(e) => handleInputChange(e)} />
                </div>

                <div className='form-field'>
                    <div className='field-error'>{signUpErrors.password}</div>
                    <input name="password" type="password" placeholder='Jelszó' onChange={(e) => handleInputChange(e)} />
                </div>

                <button className="auth-button" type='submit'>Regisztráció</button>
                <NavLink to={'/login'} className="loginreg-label">Vissza a bejelentkezéshez</NavLink>
            </form>
        </div >
    )
}
