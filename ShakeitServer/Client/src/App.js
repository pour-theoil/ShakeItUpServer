import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import  ApplicationViews  from "./components/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import './Home.css'
import { FirebaseProvider } from "./components/auth/FirebaseProvider"
import { Header } from './Header'

function App() {

  return (
    <div className="app">
      <Router>
        <FirebaseProvider>
            <Header />
            <ApplicationViews />
            <NavBar />
        </FirebaseProvider>
      </Router>
    </div>
  )
}

export default App;