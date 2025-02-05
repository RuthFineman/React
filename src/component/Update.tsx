import { useContext, useRef, useState } from "react";
import { UserContext } from "./Homee";
import axios from "axios";
import { Button, TextField, Box } from "@mui/material";
import { grey, pink } from "@mui/material/colors";
const Update = () => {
    const [updateClick, setUpdateClick] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const context = useContext(UserContext);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const res = await axios.put('http://localhost:3000/api/user/', {
                firstName: firstNameRef.current?.value,
                lastName: lastNameRef.current?.value,
                email: emailRef.current?.value,
                address: addressRef.current?.value,
                phone: phoneRef.current?.value,
                password: context?.user.password,
            }, { headers: { 'user-id': context?.user.id }, });

            if (context?.user) {
                setUpdateClick(false);
                context.userDispatch({ type: 'UPDATE', data: res.data.user });
                alert('השינויים נשמרו בהצלחה!');
            }
        } catch (e: any) {
            if (e.status === 401) alert('משתמש לא קיים');
        } finally {
            setIsUpdating(false);
        }
    };
    return (
        <>
            {!updateClick && (
                <Button
                    sx={{
                        position: 'absolute', top: '19px', left: '90px', bgcolor: grey[100], color: 'black', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer',
                        '&:hover': {
                            bgcolor: pink[200],
                        }
                    }}
                    onClick={() => setUpdateClick(true)}
                >
                    לעדכון פרטים
                </Button>
            )}
            {updateClick &&
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex', flexDirection: 'column', width: '300px', marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: grey[100],
                    }}>
                    <TextField label="שם משפחה" variant="outlined" margin="normal" inputRef={lastNameRef} fullWidth required />
                    <TextField label="שם פרטי" variant="outlined" margin="normal" inputRef={firstNameRef} fullWidth required />
                    <TextField label="מייל" variant="outlined" margin="normal" inputRef={emailRef} fullWidth required />
                    <TextField label="כתובת" variant="outlined" margin="normal" inputRef={addressRef} fullWidth required />
                    <TextField label="טלפון" variant="outlined" margin="normal" inputRef={phoneRef} fullWidth required />
                    <Button type="submit" variant="contained"
                        sx={{
                            bgcolor: pink[200], color: 'white', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer',
                            '&:hover': {
                                bgcolor: pink[300],
                            }
                        }}
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'ממתין...' : 'שמור שינויים'}
                    </Button>
                </Box>
            }
        </>
    );
};
export default Update;