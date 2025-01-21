import { useContext, useRef, useState } from "react"
import { Button, Grid2 as Grid, Modal, Box, TextField, Typography } from "@mui/material";
import { UserContext } from "./Homee";
import axios, { AxiosError } from "axios"
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
    const [openSignUP, setopenSignUP] = useState(false)
    const context = useContext(UserContext);
    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [user, setUser] = useState({})
    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3000/api/user/register', {
                firstName: nameRef.current?.value,
                password: passwordRef.current?.value
            });
           // console.log(res);
            setUser(res.data.user)
           // console.log(res.data.userId);
           // alert(res.data.userId)
            onLoginSuccess();
            if (context) {
                setopenSignUP(false);
                context.userDispatch({ type: 'CREATE', data: { id: res.data.userId, firstName: nameRef.current?.value || '', password: passwordRef.current?.value || '' } })
            }
        } catch (e: any) {
            if (e.status === 400) {
                alert('שם או סיסמא לא תקינים')
                console.error("Error response data:", e.response?.data);
                console.log(e);
            }
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/user/login', {
                firstName: nameRef.current?.value,
                password: passwordRef.current?.value
            });
           // console.log(res);

            // עדכון המשתמש לאחר ההתחברות
            setUser(res.data.user);
           // console.log(res.data.user);
           // alert(res.data.user.id)
          //  console.log(res.data.user.id);
            // קריאה לפונקציה לאחר התחברות מוצלחת
            onLoginSuccess();

            if (context) {
                setOpen(false);
                context.userDispatch({
                    type: 'CREATE',
                    data: {
                        id: res.data.user.id,
                        firstName: nameRef.current?.value || '',
                        password: passwordRef.current?.value || ''
                    }
                });
            }
        } catch (e: any) {
            if (e.response?.status === 401) {
                alert('שם או סיסמא לא תקינים');
            }
            console.log(e);
        }
    };
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Button color="primary" variant="contained" onClick={() => setopenSignUP(true)}>
                    Sign Up
                </Button>
                <Button color="primary" variant="contained" onClick={() => setOpen(true)}>
                    Log in
                </Button>
            </div>
            <Modal
                open={openSignUP}
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
                                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit2} sx={{ marginTop: 2, fontSize: '16px' }}>Sign up</Button>
                            </Grid>  </Grid> </form>
                </Box>
            </Modal>

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
