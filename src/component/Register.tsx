import { useContext, useRef, useState } from "react";
import { Button, Modal, Box, Grid, TextField } from "@mui/material";
import { UserContext } from "./Homee";
import axios from "axios";
import { pink, grey } from '@mui/material/colors';
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: grey[100],
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const buttonStyle = {
    backgroundColor: pink[200],
    transition: '0.3s',
    '&:hover': {
        backgroundColor: grey[500],
    },
};
const Register = ({ onLoginSuccess }: { onLoginSuccess: Function }) => {
    const [openSignUP, setopenRegister] = useState(false);
    const context = useContext(UserContext);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nameRef.current?.value || !passwordRef.current?.value) {
            alert("נא למלא את שם המשתמש והסיסמה");
            return;
        }
        try {
            const res = await axios.post('http://localhost:3000/api/user/register', {
                name: nameRef.current?.value,
                password: passwordRef.current?.value
            });
            onLoginSuccess();
            if (context) {
                setopenRegister(false);
                context.userDispatch({
                    type: 'CREATE',
                    data: { id: res.data.userId, firstName: nameRef.current?.value || '', password: passwordRef.current?.value || '' }
                });
            }
        } catch (e: any) {
            if (e.response?.status === 400) {
                 setopenRegister(false);
                alert('שם או סיסמא לא תקינים');
            }
        }
    };
    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '16px',
                position: 'absolute',
                top: '16px',
                left: '100px'
            }}>
                <Button variant="contained" onClick={() => setopenRegister(true)} sx={buttonStyle}>
                    Register
                </Button>
            </div>
            <Modal open={openSignUP} aria-labelledby="sign-up-modal">
                <Box sx={modalStyle}>
                    <form>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <TextField inputRef={nameRef} label="שם משתמש" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item>
                                <TextField inputRef={passwordRef} label="סיסמא" type="password" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" fullWidth onClick={handleSubmit} sx={buttonStyle}>Register</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </>
    );
};
export default Register;
