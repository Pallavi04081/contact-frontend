import * as React from 'react';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { Utils } from '../CommanUtils/Context';
import axios from 'axios';

export default function ControlledTooltips() {
 
  const {delemultiple,setRerenderUser,open, setOpen} = useContext(Utils)
    console.log(delemultiple)
   
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const DelteMultipleUser = async()=>{
            try{
           if(delemultiple){
           const Result = await axios.post("https://contact-backend-ukxi.onrender.com/deleteUser",delemultiple)
           setRerenderUser(1)
           }
            }
            catch(error){
              console.log(error)
            }
  }

  return (
    <Tooltip>
        <Box  sx={{display:"flex",justfyContent:"center",alignItem:"Center"}}>
      <Button variant="contained" 
      sx={{marginTop:"20px",marginLeft:"20px",background:"rgb(70, 156, 128)"}}
      onClick={DelteMultipleUser}
      >
        <span><DeleteIcon fontSize='small' sx={{color:"red",marginRight:"5px"}}/></span>
          Delete
        </Button>
      </Box>
    </Tooltip>
  );
}