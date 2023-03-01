import { useAuth } from 'auth/AuthProvider';
import { NavLink } from 'react-router-dom';
import './Main.css'


export default function Main({ children }: any) {
    const { currentUser, signOut }: any = useAuth()

    return (
        <div className='main-container'>
            <div className='header'>
                <div className='links'>
                    <NavLink className='link' to={'/'}>Kezdőlap</NavLink>
                    <NavLink className='link' to={'/invoices'}>Számlák</NavLink>
                    <NavLink className='link' to={'/create-invoice'}>Számla létrehozása</NavLink>
                </div>
                <div className='user-info'>
                    <div>{currentUser.fullName} <span className='login-date'>(Belépve: {currentUser.loginDate.toLocaleString()})</span></div>
                    <button className='logout-button' onClick={() => signOut()}><i className="fa-solid fa-right-from-bracket"></i></button>
                </div>
            </div>
            <div className='main-content'>
                {children}
            </div>
        </div>
    )
}
