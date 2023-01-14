
    import React from "react";
    import InputUnstyled from '@mui/base/InputUnstyled';
    import TextField from '@mui/material/TextField';
    import Button from '@mui/material/Button';
    import {Stack} from '@mui/material';
    import { useContext, useEffect, useState } from "react";
    // import axios from "axios";
    import {fetchAccountService} from "../../utils/fetchAccountService";


    type Updateusername= {
        username: string;
    }
    function Updateusername(): JSX.Element{
        const [username, setname] = useState<string>('');
        const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('new username');

        const handleClick = () => {
            if(username === '')
            {
                setError(true);
                setErrorMessage('cannot be empty');
                return;
            }
            
            fetchAccountService(`users/username` ,'PATCH',true ,
                { username: username })
                .then((res) => {
        console.log(res);
        window.location.reload();
        }).catch((err) => {
            if (err.response.status === 409) {
                setError(true);
                setErrorMessage('Username already taken');
            }
            if (err.response.status === 400) {
                setError(true);
                setErrorMessage('username too long');
            }
        })
        };
        return (<>
            <Stack direction='row' spacing={2}>
            <TextField id="user_input_custom"  variant="filled" error={error}
            value={username}
                                onInput={ e =>{setErrorMessage('new username');setError(false);
                                const target = e.target as HTMLTextAreaElement;
                                ;setname(target.value)}}
            className='max-w-xs' sx={{ input: { color: 'white' } }} label={errorMessage}  color="primary" />
            <Button onClick={handleClick} id="submit-btn" className="submit-button" size="small">submit</Button>
            </Stack>
            </>)
    }

    export default Updateusername