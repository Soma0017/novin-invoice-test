import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from 'auth/AuthProvider'

export default function PrivateRoute({ children, redirectTo }: any) {
    const { currentUser }: any = useContext(AuthContext)
    return (
        currentUser ? (
            children
        ) : (
            <Navigate to={redirectTo} />
        )

    )
}
