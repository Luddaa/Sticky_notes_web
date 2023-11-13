import { User } from "../models/user";
import { Container, Navbar } from "react-bootstrap";
import NavLoggedOut from "./NavLoggedOut";
import NavLoggedIn from "./NavLoggedIn";
import Nav from 'react-bootstrap/Nav';

interface NavBarProps {
    loggedInUser: User | null,
    onLogoutSuccessful: () => void,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBar = ({ loggedInUser, onLogoutSuccessful, onSignUpClicked, onLoginClicked }: NavBarProps)=> {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
            <Navbar.Brand>
                Sticky Note 🌐
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        { loggedInUser
                        ? <NavLoggedIn user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
                        : <NavLoggedOut onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar