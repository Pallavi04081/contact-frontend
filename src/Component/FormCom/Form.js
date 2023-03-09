import { useState,useEffect,useContext } from "react";
import { Box, Button, Typography, FormControlLabel,Radio,RadioGroup, Avatar,InputAdornment,OutlinedInput} from "@mui/material"
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {storage} from "../../firebase/index"
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
import { Utils } from "../../CommanUtils/Context";
import axios from "axios";
import { async } from "@firebase/util";
import {validation} from "../../CommanUtils/validation"

console.log(validation)

const FormCom = ({userId})=>{

  const [input, setInput] = useState([])
  const [inputImage,setInputImage] = useState("")
  const [uploadedImage,setUploadedImage] = useState("")
  const [verificationMessage,setVerificationMessage] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const {setToggle} = useContext(Utils)
  const [userData,setUserData] = useState([])
  const [validationResult,setValidationResult] = useState({})
  const [backendError,setbackendError] = useState("")
  const handleClickShowPassword = () => setShowPassword((show) => !show);


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(()=>{
    if(inputImage){
    const imageRef = ref(storage,`image/${inputImage.name}`);
    uploadBytes(imageRef,inputImage).then(()=>{
      getDownloadURL(imageRef).then((url)=>{
           setUploadedImage(url)
      })
    })
    }
},[inputImage])


  const handleChange = (e) => {
    setInput((previous)=>{
      return {...previous,[e.target.name]:e.target.value}
    })
  }

  const handleSubmit = async()=>{
    try{
      setbackendError("")
      setValidationResult({})
      setInput((previous)=>{
        return{...previous,profileimage:uploadedImage}
      })
  
      setValidationResult(validation(input))

      if(Object.keys(validationResult).length===0){
      const Result = await axios.post("https://contact-backend-ukxi.onrender.com/UserRegister",input)
      if(Result){
        setVerificationMessage(true) 
      }
    }
    }
    catch(error){
      setbackendError("Someting went wrong")
    }
}

 const Toggle = ()=>{
  setToggle(false)
 }

  return (
    <>
      <Box class="formContainer">
        <Box style={{ display: "flex",width: "99%",justifyContent:"center",alignItem:"center" }}>
          {
            userId?
            <Typography class="formheading" style={{fontSize:"3rem",textAlign:"center",color:"black"}}>Update User</Typography>
            :
            <Typography class="formheading" style={{fontSize:"3rem",textAlign:"center"}}>Register</Typography>
          }
          
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
           <Avatar 
           src={uploadedImage}
           style={{width:"80px",height:"80px"}}/>
          </Box>
         <Box>
            <Typography style={{ fontSize: "14px", marginTop: "50px",textAlign:"left" }}>Profile Image <span style={{ color: "red" }}>*</span></Typography>
            <OutlinedInput
              required
              id="outlined-required"
              variant="standard"
              name="profileimage"
              class="text"
              type="file"
              sx={{width:"100%"}}
              onChange={(e) => { setInputImage(e.target.files[0]) }}
            />
          </Box>
        <Box>
            <Typography style={{ fontSize: "14px", marginTop: "20px",textAlign:"left" }}>First Name <span style={{ color: "red" }}>*</span></Typography>
            <OutlinedInput
              required
              id="outlined-required"
              variant="standard"
              name="firstname"
              defaultValue={userData.FirstName}
              class="text"
              sx={{width:"100%"}}
              onChange={(e) => { handleChange(e) }}
            />
             {
              validationResult.firstname?
              <Typography style={{ fontSize: "14px", marginTop: "5px",textAlign:"left",color:"red" }}>{validationResult.firstname}</Typography>
              :
              ""
             }
  
          </Box>
          <Box>
            <Typography style={{ fontSize: "14px", marginTop: "20px",textAlign:"left" }}>Middle Name <span style={{ color: "red" }}>*</span></Typography>
            <OutlinedInput
              required
              id="outlined-required"
              variant="standard"
              name="middlename"
              defaultValue={userData.MiddleName}
              sx={{width:"100%"}}
              class="text"
              onChange={(e) => { handleChange(e) }}
            />
            {
              validationResult.middlename?
              <Typography style={{ fontSize: "14px", marginTop: "5px",textAlign:"left",color:"red" }}>{validationResult.middlename}</Typography>
              :
              ""
             }
          </Box>
          <Box>
            <Typography style={{ fontSize: "14px", marginTop: "20px",textAlign:"left" }}>Last Name <span style={{ color: "red" }}>*</span></Typography>
            <OutlinedInput
              required
              id="outlined-required"
              variant="standard"
              name="lastname"
              class="text"
              sx={{width:"100%"}}
              onChange={(e) => { handleChange(e) }}
            />
            {
              validationResult.lastname?
              <Typography style={{ fontSize: "14px", marginTop: "5px",textAlign:"left",color:"red" }}>{validationResult.lastname}</Typography>
              :
              ""
             }
          </Box>
          <Box class="emailPhoneContainer">
            <Box class="phonefiled">
              <Typography style={{ fontSize: "14px",textAlign:"left",marginTop:"20px" }}>Phone <span style={{ color: "red" }}>*</span></Typography>
              <OutlinedInput
                required
                id="outlined-required"
                type="number"
                name="phone"
                variant="standard"
                class="text"
                sx={{width:"100%"}}
                onChange={(e) => { handleChange(e) }}

              />
            </Box>
            <Box class="emailfield">
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
          </Box>
          <Box sx={{ marginTop: "20px" }}>
          <Typography style={{ fontSize: "14px",textAlign:"left",marginTop:"20px" }}>Gender <span style={{ color: "red" }}>*</span></Typography>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="gender"
        onChange={(e) => { handleChange(e) }}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
          </Box>
          <Box>
            <Typography style={{ fontSize: "14px", marginTop: "20px",textAlign:"left" }}>DOB <span style={{ color: "red" }}>*</span></Typography>
            <OutlinedInput
              required
              id="outlined-required"
              variant="standard"
              name="DOB"
              type="date"
              class="text"
              sx={{width:"100%"}}
              onChange={(e) => { handleChange(e) }}
            />
          </Box>
          <Box>
            <Typography style={{ fontSize: "14px", marginTop: "20px",textAlign:"left" }}>Password <span style={{ color: "red" }}>*</span></Typography>
            <OutlinedInput
            id="outlined-required"
            variant="standard"
            class="text"
            name="password"
            onChange={(e) => { handleChange(e) }}
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
            <Button 
            variant="contained" class="btnCom"
            onClick={handleSubmit}
            >
              Submit Now
            </Button>
            </Box>

           <Box>
           <Typography 
           style={{ fontSize: "18px", marginTop: "20px",textAlign:"center",color:"rgb(70, 156, 128)",fontWeight:"bold" }}
           onClick={Toggle}
           >
              Login
            </Typography>
           </Box>
           {
            verificationMessage?
            <Box>
            <Typography style={{ fontSize: "16px", marginTop: "20px",textAlign:"center",color:'rgb(70, 156, 128)' }}>
              Please Check Your Email to Verification
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

export default FormCom