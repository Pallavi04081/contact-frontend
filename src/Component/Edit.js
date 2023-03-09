import { useState,useEffect,useContext } from "react";
import { Box, Button, Typography, FormControlLabel,Radio,RadioGroup, Avatar,InputAdornment,OutlinedInput} from "@mui/material"
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {storage} from "../firebase/index"
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
import { Utils } from "../CommanUtils/Context";
import axios from "axios";
import { async } from "@firebase/util";



const EditFormCom = ({userId})=>{
  const [userData,setUserData] = useState([])
  const [input, setInput] = useState({})
  const [inputImage,setInputImage] = useState("")
  const [uploadedImage,setUploadedImage] = useState("")
  const [verificationMessage,setVerificationMessage] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const {setToggle,setRerenderUser,setOpen} = useContext(Utils)
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
      setInput((previous)=>{
        return{...previous,profileimage:uploadedImage}
      })
      const Result = await axios.put(`https://contact-backend-ukxi.onrender.com/UpdateUser?id=${userId}`,input)
      if(Result){     
        setRerenderUser(3)
        setOpen(false)
      }
    }
    catch(error){
      console.log(error)
    }
}

useEffect(()=>{
   const getUserData = async()=>{
        try{
          console.log(userId)
        const Result = await axios.get(`https://contact-backend-ukxi.onrender.com/getRegisterUser?id=${userId}`)
        
        setUserData(Result.data.Result[0])
        setInput(Result.data.Result[0])
        }
        catch(error){
          console.log(error)
        }
   }
   getUserData()
},[userId])


 const Toggle = ()=>{
  setToggle(false)
 }

  return (
    <>
      <Box class="formContainer">
        <Box style={{ display: "flex",justifyContent:"center",alignItem:"center",}}>
            <Typography class="formheading" style={{fontSize:"3rem",textAlign:"center",color:"black"}}>Update</Typography>          
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
              name="FirstName"
              placeholder={userData?.FirstName}
              class="text"
              sx={{width:"100%"}}
              onChange={(e) => { handleChange(e) }}
            />
          </Box>
          <Box>
            <Typography style={{ fontSize: "14px", marginTop: "20px",textAlign:"left" }}>Middle Name <span style={{ color: "red" }}>*</span></Typography>
            <OutlinedInput
              required
              id="outlined-required"
              variant="standard"
              name="MiddleName"
              placeholder={userData?.MiddleName}
              sx={{width:"100%"}}
              class="text"
              onChange={(e) => { handleChange(e) }}
            />
          </Box>
          <Box>
            <Typography style={{ fontSize: "14px", marginTop: "20px",textAlign:"left" }}>Last Name <span style={{ color: "red" }}>*</span></Typography>
            <OutlinedInput
              required
              id="outlined-required"
              variant="standard"
              name="lastname"
              class="text"
              placeholder={userData?.LastName}
              sx={{width:"100%"}}
              onChange={(e) => { handleChange(e) }}
            />
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
                name="Email"
                variant="standard"
                class="text"
                placeholder={userData?.Email}
                sx={{width:"100%"}}
                onChange={(e) => { handleChange(e) }}
              />
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
              name="DateOFBirth"
              type="date"
              placeholder={userData?.DateOFBirth}
              class="text"
              sx={{width:"100%"}}
              onChange={(e) => { handleChange(e) }}
            />
          </Box>
          <Box style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Button 
            variant="contained" class="btnCom"
            onClick={handleSubmit}
            >
              Submit Now
            </Button>
            </Box>
        </Box>
      </Box>
    </>
  )

}

export default EditFormCom