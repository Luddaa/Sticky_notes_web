import { useForm } from "react-hook-form";
import { LoginBody } from "../net/notes_api";
import * as NotesApi from "../net/notes_api";
import TextInputField from "./form/Textinputfield";
import { Button, Form, Modal } from "react-bootstrap";
import styleUtils from "../styles/utils.module.css";
import { User } from "../models/user";


interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void,
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginBody>();

    async function onSubmit(body: NotesApi.LoginBody) {
        try {
            const user = await NotesApi.login(body);
            onLoginSuccessful(user);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Log In
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                        name="username"
                        label="username"
                        type="username"
                        placeholder="username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}>
                        Log In
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default LoginModal;