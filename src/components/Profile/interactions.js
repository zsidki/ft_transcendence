import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Socket } from "socket.io-client";
import UserSocketContext from "../../context/userSocket";   
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Card } from "@mui/material";
import Select from '@mui/material/Select';
import chatSocketContext from "../../context/chatSocket";
import GameSocketContext from "../../context/gameSocket";
import {fetchAccountService} from "../../utils/fetchAccountService";

// i cant
function ProfileInteraction(props){
    const chat = useContext(chatSocketContext);
    const socket = useContext(UserSocketContext);
    const gamesocket = useContext(GameSocketContext);
    const [isfollowed, setFollowed] = useState(false);
    const [isblocked, setBlocked] = useState(false);
    const [ischallenged, setChallenged] = useState(false);
    const [isblocking, setBlocking] = useState(false);
    const [myusername, setUser] = useState("");
    const [open, setOpen] = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [mode, setMode] = useState(1); 
    let a = props.username;
    const HTTP = axios.create({
        withCredentials: true
      })
    function handlechallenge(username){
        console.log("haaaad lqlawi",username);
        socket.emit("interact", {username: props.username, type: "challenge", mode: mode, from : myusername});
        setChallenged(true);
        setBackdrop(false);
    }
    function handleblock (username){
        console.log("haaaad lqlawi",username);
        fetchAccountService(`users/block/${props.username}`,'POST')
    .then((res) => {
            console.log(res.data);
            setBlocked(true);
        }).catch((err) => {})
        
        socket.emit("interact", {username: props.username, type: "block"}); 
    }
    function handleunblo (username){
        console.log("haaaad lqlawi",username);
        fetchAccountService(`users/unblock/${props.username}`,'POST')
            .then((res) => {
            console.log(res);
            setBlocked(false);
        }).catch((err) => {})
        socket.emit("interact", {username: props.username, type: "unblock"});
    }
    function handlefollow (username){

        fetchAccountService(`users/follow/${props.username}`,'POST').then((res) => {
            console.log(res);
            setFollowed(true);
        }).catch((err) => {})
        socket.emit("interact", {username: props.username, type: "follow"});
    }
    function handleunfollow (username){
        console.log("haaaad lqlawi",username);
        fetchAccountService(`users/unfollow/${props.username}`, 'POST').then((res) => {
            console.log(res.data);
            setFollowed(false);
        }).catch((err) => {})
        socket.emit("interact", {username: props.username, type: "unfollow"});
    }
    useEffect(() => {
        fetchAccountService('users/myrelations')
            .then((res) => {

         setUser(res.username);
           setFollowed(res.followers.map((followed) => followed.followed.username).includes(props.username));
           setBlocked(res.blocker.map((user) => user.blocked.username).includes(props.username));
           setBlocking(res.blocked.map((user) => user.blocker.username).includes(props.username));

        }).catch((err) => {console.table(err);})
        
    },[props],);
    useEffect(() => {
    socket.off('interact').on('interact', (res) => {
        console.log('drunk',a)
    if(res.from ===a){
        if(res.type === "block"){
            setBlocking(true);
            setFollowed(false);
            console.log('l9wada',"block");
        }
        if(res.type === "unblock"){
            setBlocking(false);
            console.log('l9wada',"unbllock");
        }
       
        if(res.type === "dissmissed")
        {
            setChallenged(false);

        }
    }});
},[a],);
            
  function hello (){
    alert("hello");}

function chattest (){

    //chat.emit("createRoom",{name: "test4", status: 1, pass: "123"} );
   // chat.emit("leaveToServer",{room_id: "7a006ebd-6e4e-4dae-86bd-12b6850ea4d8", user_name:"amaaia"} );
   gamesocket.emit('livenow');
gamesocket.on('newgame', (res) => {
    console.log("new game",res);
})
gamesocket.on('update', (res) => {
    console.log("update",res);
})
gamesocket.on('delete', (res) => {
    console.log("update",res);
})


}

    return(
        <Stack spacing={2} direction="row">
            <Button color="error" onClick={chattest} variant="contained" size="xs-small"> chat test</Button>
            {(!isblocked && !isblocking && isfollowed) && <Button color="success" onClick={handleunfollow} variant="contained" size="xs-small" >unfollow</Button>}
            {(!isblocked && !isblocking && !isfollowed) &&<Button color="success" onClick={handlefollow}  variant="contained" size="xs-small" >follow</Button>}
        
        {isblocked && <Button color="error" onClick={handleunblo} variant="contained" size="xs-small" >unblock</Button>}
        {!isblocked && <Button color="error" onClick={handleblock} variant="contained" size="xs-small" >block</Button>}
        {(props.status !== 'offline' && !isblocked && !isblocking && !ischallenged) && (
        <Button variant="contained" onClick={(e) => setBackdrop(true)}>challenge</Button>)}
        
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}open={backdrop}>
        
            <Card sx={{ minWidth: 275, minHeight:300 }}>
                <Stack direction="column">
                  select a mode
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={mode}
                    label="Age"
                    onChange={(e) => setMode(e.target.value)}
                    >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                </Select>
                <Button onClick={(e) => setBackdrop(false)} size="small">CANCEL</Button>
                <Button  size="small" onClick ={handlechallenge}>submit</Button>
            </Stack>
            </Card>
        
        </Backdrop>
        
        
      </Stack>)
}

export default ProfileInteraction;