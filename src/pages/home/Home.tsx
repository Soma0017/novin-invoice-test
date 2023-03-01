import React from 'react'
import { NavLink } from 'react-router-dom'
import './Home.css'

export default function Home() {
    return (
        <div className="home-container">
            <div className='title'>Számlák kezelése</div>
            <div className='description'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium mollitia optio, quisquam magnam laudantium at dolorum sit vel error assumenda sunt nihil possimus voluptate nulla placeat nemo quam. Fugiat, nam. Unde et, aliquid sit tenetur vel ipsa iure sint, quam autem maiores sed, provident recusandae. Iste nesciunt nulla eum velit!</div>
            <div className='links'>
                <NavLink className='link' to={'/invoices'}>Számlák áttekintése</NavLink>
                <NavLink className='link' to={'/create-invoice'}>Számla létrehozása</NavLink>
            </div>
        </div>
    )
}
