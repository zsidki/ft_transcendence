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
import {account} from "../../interfaces/account.interface";
import {useAccounts} from "../hooks/useAccount";
import {useGame} from "../hooks/useGame";

// i cant
const ProfileInteraction =({user} : {user: account}) =>{
    const {me, followAccount, unfollowAccount, blockUser, unBlockUser} = useAccounts();
    const {inviteToGame} = useGame();
    const [isBlocked, setIsBlocked] = useState<boolean>(false);
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    useEffect(() => {
        if (me) {
            console.log('me changed ', me)
            setIsBlocked(me.blocker?.find((blocked) => blocked.Userid === user.Userid) != undefined);
            setIsFollowed(me.followed?.find((follower) => follower.Userid === user.Userid) != undefined);
        }
    }, [me]);

    return(
        <Stack spacing={2} direction="row">

            {isFollowed ?  (<Button color="success" onClick={() => {
                unfollowAccount(user.Userid).then(
                    (res) => {

                    }
                );
            }
            } variant="contained"  >unfollow</Button>)
            : (<Button color="success" onClick={() => {
                followAccount(user.Userid).then(
                    (res) => {

                    }
                );
            }
            }  variant="contained"  >follow</Button>)}
        {isBlocked ? ( <Button color="error" onClick={() => {
            unBlockUser(user.Userid);
            } } variant="contained" >unblock</Button>
            ): (<Button color="error" onClick={() => {
                blockUser(user.Userid);
            }} variant="contained"  >block</Button>)}

        
      </Stack>)
}

export default ProfileInteraction;