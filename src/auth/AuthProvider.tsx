import React, { useEffect, useState, useContext } from 'react'
import { db } from "../firebase.config"
import { addDoc, collection, query, where, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import User from '../classes/User';

export const AuthContext = React.createContext({});

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }: any) {
    const [currentUser, setCurrentUser] = useState<User | null>();
    const [loading, setLoading] = useState(true);

    function signUp(username: string, fullName: string, password: string) {
        const userQuery = query(collection(db, "users"), where("username", "==", username));
        return getDocs(userQuery).then((snapshot) => {
            if (!snapshot.empty) {
                alert("Felhasználónév már foglalt")
            } else {
                return addDoc(collection(db, "users"), {
                    username,
                    fullName,
                    password,
                    loginDate: new Date()
                });
            }
        });
    }

    function signIn(username: string, password: string) {
        const loginQuery = query(collection(db, "users"), where("username", "==", username));
        return getDocs(loginQuery).then((snapshot) => {
            if (snapshot.empty) {
                alert("Nincs ilyen felhasználó!")
                return
            }
            snapshot.forEach((user) => {
                if (user.data().password != password) {
                    alert("Hibás jelszó!")
                    return
                };
                const userObj: User = user.data() as User;
                userObj.loginDate = new Date();
                localStorage.setItem('loggedInUser', user.id);
                updateDoc(doc(db, "users", user.id), { ...userObj });
                setCurrentUser(userObj)
            })
        })
    }

    function signOut() {
        localStorage.removeItem('loggedInUser');
        setCurrentUser(null)
    }

    useEffect(() => {
        const loggedInUserId = localStorage.getItem('loggedInUser')
        if (loggedInUserId) {
            getDoc(doc(db, 'users', loggedInUserId)).then((user) => {
                const loggedInUser: User = user.data() as User;
                loggedInUser.loginDate = loggedInUser.loginDate.toDate()
                setCurrentUser(loggedInUser)
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            currentUser,
            signUp, signIn, signOut
        }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
