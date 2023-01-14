import axios from 'axios';


import { createContext} from 'react';

let User = ({Userid:'',username: '', email: '', avatar: '',userconfig:{is2FA : false}});

    axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {
        withCredentials: true,
    }).then((res) => {
      User.Userid = res.data.Userid;
        User.username = res.data.username;
        User.email = res.data.email;
        User.avatar = res.data.avatar;
        User.userconfig = res.data.userconfig;
      
    }).catch((err) => {console.table(err);})
    
    const UserContext = createContext(User);
    export default UserContext;