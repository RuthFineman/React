import { createContext, useReducer, useState } from "react";
import { User, userRaducer } from "./reducer/user";
import { Box, Container } from "@mui/material";
import Login from './Login'; 
import UserName from "./userNamrAvatar";
import Update from "./Update";
export type UserContextType = {
  user: User;
  userDispatch: React.Dispatch<any>; 
};
export const UserContext = createContext<UserContextType | null>(null);
const Homee=()=>{
    const initialUser: User = {
        firstName: "Ruti",
        lastName: "",
        mail: "",
        password: "4",
        address: "",
        phone: ""
      }
      const [user, userDispatch] = useReducer(userRaducer, initialUser)
      const [LoginSuccess, setLoginSuccess] = useState(false);
      const loginSuccessful = () => {
        setLoginSuccess(true);
      };
    
      return (<>
    <Container maxWidth="sm"></Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'white',
          }}>
          <UserContext.Provider value={{ user, userDispatch }}>
            {LoginSuccess === false && <Login onLoginSuccess={loginSuccessful}></Login>}
            {LoginSuccess ===true&& <UserName></UserName>}
            <div></div>
            {LoginSuccess && <Update></Update>}
          </UserContext.Provider>
        </Box>
      </>)
}
export default Homee