import { useState,useContext, useEffect } from "react";
import { Box, Button, Typography,  Avatar,InputAdornment,OutlinedInput} from "@mui/material"
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom";
import { Utils } from "../../CommanUtils/Context";
import {validation} from "../../CommanUtils/validation"

import "./Form.css"

const LoginForm = ({auth})=>{
  

  const [input, setInput] = useState({})
  const Navigator = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const {setToggle} = useContext(Utils)
  const [error,setError] = useState("")
  const [validationResult,setValidationResult] = useState({})
   const [backendError,setbackendError] = useState("")

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const handleChange = (e) => {
    setInput((previous)=>{
      return {...previous,[e.target.name]:e.target.value}
    })
  }

  const Toggle = ()=>{
    setToggle(true)
   }


  useEffect(()=>{
    const RefreshToken = localStorage.getItem("RefreshToken")  
    console.log(RefreshToken)
    if(RefreshToken){
      auth(true)
        Navigator("/")  
    }
  },[])
  

  const handleSubmit = async()=>{
        try{
          setbackendError("")
          setValidationResult({})
   
          setValidationResult(validation(input))
            console.log("hello")
          const data = new FormData()
          data.append("email",input.email)
          data.append("password",input.password)
          const Result = await axios.post(`${process.env.REACT_APP_BACKENDURL}/Userlogin`,input)
          console.log(Result) 
          localStorage.setItem("ExpiredToken",Result?.data?.expeiredToken)
          localStorage.setItem("RefreshToken",Result?.data?.RefreshToken)
          auth(true)
          Navigator("/")
        }
        catch(error){
          const message = error.response.data.message
          setError(message)
          setTimeout(()=>{
           setError("")
          },3000)
        }
  }


  return (
    <>
      <Box class="formContainer">
        <Box style={{ display: "flex",width: "99%",justifyContent:"center",alignItem:"center" }}>
          <Typography class="formheading" style={{fontSize:"3rem",textAlign:"center"}}>Login</Typography>
        </Box>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: "98%" },
            boxSizing: "border-box"
          }}
          noValidate
          autoComplete="off"
        >   
          <Box style={{display:"flex",justifyContent:"center",alignItem:"center"}}>
           <Avatar style={{width:"80px",height:"80px"}}/>
          </Box>
          <Box>
            <Typography style={{ fontSize: "14px",textAlign:"left",marginTop:"20px" }}>Email-id <span style={{ color: "red" }}>*</span></Typography>
              <OutlinedInput
                required
                id="outlined-required"
                type="email"
                name="email"
                variant="standard"
                class="text"
                sx={{width:"100%"}}
                onChange={(e) => { handleChange(e) }}
              />
              {
              validationResult.EmailId?
              <Typography style={{ fontSize: "14px", marginTop: "5px",textAlign:"left",color:"red" }}>{validationResult.EmailId}</Typography>
              :
              ""
             }
          </Box>
          <Box>
          <Typography style={{ fontSize: "14px", marginTop: "20px",textAlign:"left" }}>Password <span style={{ color: "red" }}>*</span></Typography>
            <OutlinedInput
            id="outlined-required"
            variant="standard"
            class="text"
            name="password"
            onChange={(e)=>{handleChange(e) }}
            sx={{border:"none",width:"100%"}}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
           {
              validationResult.password?
              <Typography style={{ fontSize: "14px", marginTop: "5px",textAlign:"left",color:"red" }}>{validationResult.password}</Typography>
              :
              ""
             }
          </Box>
          <Box style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Button variant="contained" class="btnCom" onClick={handleSubmit}>
              Submit Now
            </Button>
          </Box>
          <Box>
           <Typography 
           style={{ fontSize: "14px", marginTop: "20px",textAlign:"center",color:"rgb(70, 156, 128)",fontWeight:"bold" }}
           onClick={Toggle}
           >
              Not yet Register??? No Worry just Click to register yourself.
            </Typography>
           </Box>
          {
            error?<Box>
            <Typography 
            style={{ fontSize: "14px", marginTop: "20px",textAlign:"center",color:"red",fontWeight:"bold" }}
            >
             {error}
             </Typography>
            </Box>:
            ""
          }
          {
            backendError?
            <Box>
            <Typography style={{ fontSize: "18px", marginTop: "20px",textAlign:"center",color:"red" }}>
              {backendError}
            </Typography>
            </Box>:
            ""
         }
        </Box>
      </Box>
    </>
  )

}

export default LoginForm