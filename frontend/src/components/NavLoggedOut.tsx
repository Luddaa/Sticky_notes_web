import { Button } from "react-bootstrap";

interface NavBarLoggedOutProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    textColor?: string, 
}

const NavBarLoggedOut = ({ onSignUpClicked, onLoginClicked, textColor }: NavBarLoggedOutProps) => {

    const buttonStyle = {
        backgroundColor: '#454746',
        border: '1px solid lightgray',
        color: textColor || 'white', 
        margin: '6px',

    };
    
    return (
        <div>
            <Button style={buttonStyle} onClick={onSignUpClicked}>Sign Up</Button>
            <Button style={buttonStyle} onClick={onLoginClicked}>Log In</Button>
        </div>
    );
}

export default NavBarLoggedOut;