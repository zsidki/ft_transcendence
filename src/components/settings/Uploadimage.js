import React from "react";
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
    const handleChange = (event) => {
        const file = event.target.files[0];
    
        const formData = new FormData();
        formData.append('file', file);
    
       fetchAccountService(`users/avatar`, 'POST', true,
           formData, {'Content-Type': 'multipart/form-data'}).then((res) => {
        
          console.log(res);
          window.location.reload();
        }).catch((err) => {
          console.error(err);
        });
      };
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton id="camera_button" color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        </Stack>
      );
}

export default UploadButton