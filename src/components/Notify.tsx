
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import UserSocketContext from '../context/userSocket';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { me } from '../interfaces/me.interface';
import {interact} from '../interfaces/Interaction.interface';
import { redirect } from 'react-router-dom';
import {useAccounts} from "./hooks/useAccount";
type getme = {
 me : me 
}
type notification = {
  isOpen: boolean,
  messege: string,
  from: string,
  mode?: string,
}
function Notify() {
  const [challengemode, setChallengemode] = useState(0);
  const [notify, setNotify] = useState<notification>({isOpen: false, messege: '', from: ''});
  const [data, setMe] = useState<me>({Userid:'',username: '', email: '', avatar: '',userconfig:{is2FA : false}});
  const [ischallenge, setChallenge] = useState<boolean>(false);
  const [duelUrl, setDuelUrl] = useState<string>('');
  const {isAuthenticated, me} = useAccounts();

const socket = useContext(UserSocketContext);
const redirectduel= (url: string) => {
  window.location.href = "/game?duel=" + url;
}
const duelhandl = () => {
  //redirect to /game?from=?to=
  let a;
  socket.emit("interact", {username: notify.from , type: "accepted", from: data.username , mode:challengemode }, (data: any) => {
    //console.log("response",data);
    redirectduel(data.challenge);
  });
  
  
  //console.log("challenge accept", {username: notify.from , type: "accepted", from: data.username})

 
}
const handleDissmiss = () => {
  setNotify({isOpen: false, messege: '', from: ''});
  socket.emit("interact", {username: notify.from , type: "dissmissed", from: data.username});
}


useEffect(() => {
  socket.on('notif', (res) => {
    //console.log("zok",res);
    if(res.type === "challenge"){
      setNotify({isOpen: true, messege: 'you have been challenged by ' + res.from + ' to a game of pong mode : ' + res.mode, from: res.from});
      //console.log("you have been  challenged by " + res.from + " to a game of pong" )
      setChallenge(true);
    setChallengemode(res.mode);}
    if(res.type === "accepted"){
      //console.log("accepted",res);
      //setDuelUrl(res.challenge);

      
      //window.location.href = "/game?duel=" + res.challenge;// +  res.challenge;
     
    }
    });
    
  },[],);
  return (

    <div>
      <Snackbar
      open={notify.isOpen}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleDissmiss} severity="success">
        {notify.messege}
        <Button  onClick={duelhandl} size="small" >accepet</Button>
      </Alert>
      
    </Snackbar>
    </div>

  );
}
export default Notify;