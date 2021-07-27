import React, { createContext, useEffect, useState } from 'react'
import firebase from 'firebase'
import { Spinner } from 'react-bootstrap';
import 'firebase/auth'


// Use context can be used to capture a context object, this will be the log in object
// Must be the exact object
export const FirebaseContext = createContext()

// Data for the log in and log out
export const FirebaseProvider = (props) => {
    const userProfile = sessionStorage.getItem('userProfile');
    const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
    
    // spinner based on state... not used yet
    const [isFirebaseReady, setIsFirebaseReady] = useState(false)

    // based on documentation from firebase
    const provider = new firebase.auth.GoogleAuthProvider();

    // Set the spinner
    useEffect(() => {
        firebase.auth().onAuthStateChanged(()=> {
            setIsFirebaseReady(true)
        })
    }, [])

    
    // Log in based on doc
    const login = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userProfile) => {
            sessionStorage.setItem('userProfile', JSON.stringify(userProfile.user))
            setIsLoggedIn(true)
        })
    }
    
    // call firebase to sign out, set the local storage to false
    const logout = () => {
        return firebase.auth().signOut()
            .then(() => {
                sessionStorage.clear()
                setIsLoggedIn(false)
            })
    }

    const register = (userProfile, password) => {
        return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
        .then(savedUserProfile => {
            sessionStorage.setItem('userProfile', JSON.stringify(savedUserProfile))
            setIsLoggedIn(true)
        })
    }

    const signInWithGoogle = () => {
        return firebase.auth().signInWithPopup(provider)
        .then(savedUserProfile => {
            sessionStorage.setItem('userProfile', JSON.stringify(savedUserProfile.user))
            checkUser(savedUserProfile.user.uid)
            setIsLoggedIn(true)
        })
    }

    const checkUser = (userId) => {
        console.log("checkUser", userId)
        fetch(`${firebase.auth()}/users.json/?orderby="uid"&equalTo="${firebase.auth().currentUser.uid}"`)
        .then(result => result.json())
        .then(parsedResponse => {
            let resultArray = Object.keys(parsedResponse)
            if (resultArray.length > 0) {
                console.log("its a user!!")
            } else {
                console.log("false yo")
            }
        })
    }

    return (
        <FirebaseContext.Provider value={{ isLoggedIn, login, logout, register, signInWithGoogle }}>
            {isFirebaseReady ? props.children : <Spinner className="app-spinner dark" />}
        </FirebaseContext.Provider>
    
        )
}   