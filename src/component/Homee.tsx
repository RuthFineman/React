import { Box, Typography, Container } from "@mui/material";
import { createContext, useReducer, useState } from "react";
import { User, userRaducer } from "./reducer/user";
import Login from './Login';
import UserName from "./userNamrAvatar";
import Update from "./Update";
import Register from "./Register";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
export type UserContextType = {
  user: User;
  userDispatch: React.Dispatch<any>;
};
export const UserContext = createContext<UserContextType | null>({
  user: {
    id: 0,
    firstName: "",
    lastName: "",
    mail: "",
    password: "",
    address: "",
    phone: ""
  },
  userDispatch: () => {},
});
const Homee = () => {
  const initialUser: User = {
    id: 0,
    firstName: "",
    lastName: "",
    mail: "",
    password: "",
    address: "",
    phone: ""
  };
  const [user, userDispatch] = useReducer(userRaducer, initialUser);
  const [LoginSuccess, setLoginSuccess] = useState(false);
  const loginSuccessful = () => {
    setLoginSuccess(true);
  };
  return (
    <>
      <Container maxWidth="sm"></Container>
      <Box
        sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto',backgroundColor: 'white',
        }}
      >
        <UserContext value={{ user, userDispatch }}>
          <Box
          >
            <Typography variant="h2"
              sx={{ color: '#EC407A',  fontWeight: 'bold',fontFamily: 'Roboto, sans-serif', }}
            >
              אתר המתכונים שלי
            </Typography>
          </Box>
          {LoginSuccess === false && <Login onLoginSuccess={loginSuccessful} />}
          {LoginSuccess === false && <Register onLoginSuccess={loginSuccessful} />}
          {LoginSuccess === true && <UserName />}
          {LoginSuccess && <Update />}
          <NavBar />
          <Outlet />
        </UserContext>
      </Box>
    </>
  );
};
export default Homee;
