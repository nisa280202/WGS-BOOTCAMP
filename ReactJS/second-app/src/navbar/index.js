import React from 'react'
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements"

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/contact" activeStyle>
                        Contact
                    </NavLink>
                    <NavLink to="/about" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/counter" activeStyle>
                        Counter
                    </NavLink>
                    <NavLink to="/form" activeStyle>
                        Form
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default Navbar