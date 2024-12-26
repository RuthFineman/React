import { useContext, useRef, useState } from "react"
import { Button, Grid2 as Grid, Modal, Box, TextField } from "@mui/material";
import { UserContext } from "./Homee";
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Login = ({ onLoginSuccess }: { onLoginSuccess: Function }) => {
    const [open, setOpen] = useState(false)
    const context = useContext(UserContext);
    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const handleSubmit = () => {
        if (context) {
            setOpen(false);
            if (context !== null) {
                if (context.user.firstName === nameRef.current?.value && context.user.password === passwordRef.current?.value) {
                    context.userDispatch({ type: 'CREATE', data: { firstName: nameRef.current?.value || " ", password: passwordRef.current?.value || " " } })
                    onLoginSuccess();
                }
            }
        }
    }
    return (
        <>
            <Button color="primary" variant="contained" onClick={() => setOpen(true)}>
                Log in
            </Button>
            <Modal
                open={open}
                aria-labelledby="login-modal-title"
                aria-describedby="login-modal-description">
                <Box sx={modalStyle}>
                    <form>
                        <Grid container spacing={2} direction="column">
                            <Grid >
                                <TextField
                                    inputRef={nameRef}
                                    label="שם משתמש"
                                    variant="outlined"
                                    fullWidth
                                    required />
                            </Grid>
                            <Grid >
                                <TextField
                                    inputRef={passwordRef}
                                    label="סיסמא"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    required />
                            </Grid>
                            <Grid >
                                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ marginTop: 2, fontSize: '16px' }}>Log in</Button>
                            </Grid>  </Grid> </form>
                </Box>
            </Modal>
        </>
    );
};
export default Login
