import { Button } from "react-bootstrap";

interface NavBarLoggedOutProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    textColor?: string, 
}

const NavBarLoggedOut = ({ onSignUpClicked, onLoginClicked, textColor }: NavBarLoggedOutProps) => {

    const buttonStyle = {
        backgroundColor: '#212529',
        borderColor: '#212529',
        color: textColor || 'white', 
    };
    
    return (
        <div>
            <Button style={buttonStyle} onClick={onSignUpClicked}>Sign Up</Button>
            <Button style={buttonStyle} onClick={onLoginClicked}>Log In</Button>
        </div>
    );
}

export default NavBarLoggedOut;