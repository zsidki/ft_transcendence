import React, {useCallback} from "react";
import InputUnstyled from '@mui/base/InputUnstyled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {Stack} from '@mui/material';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {fetchAccountService} from "../../utils/fetchAccountService";

//not yet


function UploadButton(){

    const [image, setImage] = useState<any >(undefined);
    const handleChange = useCallback( (event : any) => {
    event.preventDefault();

        if (image) {
            const formData = new FormData();
            formData.append('file', image, image.name);
            const url = `${process.env.REACT_APP_ACCOUNT_API_URL}users/avatar`;
            axios.post(url, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            }).then((res) => {
                // console.log(res);
                window.location.reload();
            }).catch((err) => {
                    console.error(err);
                });
        }
      }, [image]);
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton id="camera_button" color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" onChange={(e) => {
                if (e.target.files) {
                    console.log('file ' , e.target.files[0]);
                    setImage(e.target.files[0]);
                } else
                    setImage(undefined);
            }
            } />
              {image?.name}

            <PhotoCamera />


          </IconButton>
            <button type="button" onClick={(event) => {
                handleChange(event);
            }
            }> submit </button>
        </Stack>
      );
}

export default UploadButton