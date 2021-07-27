import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import  ApplicationViews  from "./components/ApplicationViews"
import { Spinner } from "react-bootstrap"
import { NavBar } from "./components/nav/NavBar"
import './Home.css'
import { onLoginStatusChange } from './components/auth/FirebaseProvider';

import { Header } from './Header'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, [])
  // The "isLoggedIn" state variable will be null until //  the app's connection to firebase has been established.
  //  Then it will be set to true or false by the "onLoginStatusChange" function
  if (isLoggedIn === null) {
    // Until we know whether or not the user is logged in or not, just show a spinner
    return <Spinner className="app-spinner dark"/>;
  }

  return (
    <Router>
            <Header />
            <ApplicationViews isLoggedIn={isLoggedIn} />
            <NavBar />
      
      </Router>

  )
}

export default App;