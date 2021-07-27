import React, { useContext } from "react"
import { NavLink } from 'react-router-dom'
import './NavBar.css'
import menuicon from './MenuIcon.svg'
import cocktailicon from './CocktailsIcon.svg'
import logouticon from './Logout.svg'
import ingredients from './Ingredients.svg'
import shakertin from './Shakertin.svg'
import { FirebaseContext } from '../auth/FirebaseProvider'

// import ingredients from './BottleGroup.svg'

export const NavBar = () => {
   
    const { logout } = useContext(FirebaseContext)
    
    const handleLogOut = () => {
        logout()
    }
    
    return (
        <nav className="bottom">
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <NavLink to="/home"><img src={shakertin} alt="shakertin" /></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/cocktails"><img src={cocktailicon} alt="cocktails" /></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/menus"><img src={menuicon} alt="menu" /></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/ingredients" ><img src={ingredients} alt="ingredients" />
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink onClick={() => handleLogOut()} to="/login"><img src={logouticon} alt="cocktails" />
                    </NavLink>
                </li>
            </ul>
        </nav>
    )

}

/* <nav className="bottom">
<ul className="nav nav-pills nav-fill">
    <li className="nav-item">
        <NavLink to="/home"><img src={shakertin} alt="shakertin" /></NavLink>
    </li>
    <li className="nav-item">
        <NavLink to="/cocktails"><img src={cocktailicon} alt="cocktails" /></NavLink>
    </li>
    <li className="nav-item">
        <NavLink to="/menus"><img src={menuicon} alt="menu" /></NavLink>
    </li>
    <li className="nav-item">
        <NavLink to="/ingredients" ><img src={ingredients} alt="ingredients" />
        </NavLink>
    </li>
    <li className="nav-item">
        <NavLink onClick={() => handleLogOut()} to="/login"><img src={logout} alt="cocktails"/>
        </NavLink>
    </li>
</ul>
</nav> */

/* <Nav fill variant="tabs" activeKey={`${history.location.pathname}`} className="bottom">
<Nav.Item>
    <Nav.Link as={Link} href="/"><img src={shakertin} alt="shakertin" width="20" height="40"/></Nav.Link>
</Nav.Item>
<Nav.Item>
    <Nav.Link href="/cocktails"><img src={cocktailicon} alt="cocktails" width="20" height="40"/></Nav.Link>
</Nav.Item>
<Nav.Item>
    <Nav.Link href="/menus"><img src={menuicon} alt="menu" width="20" height="40"/></Nav.Link>
</Nav.Item>
<Nav.Item>
    <Nav.Link href="/ingredients" ><img src={ingredients} alt="ingredients" width="20" height="40"/>
    </Nav.Link>
</Nav.Item>
<Nav.Item>
    <Nav.Link onClick={()=>handleLogOut()} href="/login"><img src={logout} alt="cocktails" width="20" height="40"/>
    </Nav.Link>
</Nav.Item>
</Nav> */





// return (
//     <Navbar fixed="bottom" bg="dark" variant="tabs" className="justify-content-between">
//          <Nav>
//             <Nav.Item><RRNavLink href="/">Shake It UP</Nav.Item>
//             <Nav.Item> href="/cocktails">Cocktails</Nav.Item>
//             <Nav.Item> href="/menus">Menus</Nav.Item>
//             <Nav.Item> href="/ingredients">Ingredients</Nav.Item>
//             
//             <Nav.Item onSelect={()=>handleLogOut()} href="/login"><Button>Log Out</Button></NavDropdown.Item>
//         </Nav>
//         <img
//             src={image}
//             width="100"
//             height="auto"
//             className="d-inline-block align-top"
//             alt="React"
//         />
//     </Navbar>
// )