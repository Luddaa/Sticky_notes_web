import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../net/notes_api";

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {
    const logout = async () => {
        try {
            await NotesApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    const textStyle = { color: '#f9d775' };
    const buttonStyle = { backgroundColor: '#454746', border: '1px solid lightgray' };

    return (
        <>
            <Navbar.Text className="me-2" style={textStyle}>
                Signed in as: {user.username}
            </Navbar.Text>
            <Button onClick={logout} variant="danger" style={buttonStyle}>
                Log out
            </Button>
        </>
    );
}

export default NavBarLoggedInView;
