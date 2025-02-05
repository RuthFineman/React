import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { pink } from '@mui/material/colors';
import { UserContext } from './Homee';

const UserName = () => {
  const context = React.useContext(UserContext)
  const first = context?.user.firstName[0]
  return (
    <Avatar sx={{
      bgcolor: pink[200],
      position: 'absolute',
      top: '20px',
      left: '20px',
    }}
    >{first}</Avatar>
  );
}
export default UserName