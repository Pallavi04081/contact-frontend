import {Box} from '@mui/material'
import { useState,useContext } from 'react'
import FormCom from '../../Component/FormCom/Form'
import LoginForm from '../../Component/FormCom/login'
import { Utils } from '../../CommanUtils/Context'
import "./Auth.css"

const Auth = ({auth})=>{  
  
  const {toggle} = useContext(Utils)
  

    return(
     <>
    <Box style={{backgroundColor:"white"}}>
    <Box style={{background:"url(bgimage.jpg)",height:"200px",backgroundSize:"cover",backgroundPosition:"center"}}></Box>
    {
     toggle?
      <Box className="contactcontainer">
      <FormCom />
    </Box>:
    <Box className="contactcontainer">
    <LoginForm auth={auth}/>
  </Box>
      }
     </Box>
     </>   
    )
    
    }
    
    export default Auth;