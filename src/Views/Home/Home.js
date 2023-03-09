import { useEffect,useState,useContext } from "react"
import { Card,Box } from "@mui/material"
import DataTable from "../../Component/Table"
import ResponsiveAppBar from "../../Component/Header"
import { Utils } from "../../CommanUtils/Context"
import axios from "axios"
import ControlledTooltips from "../../Component/Tooltip"
import { useNavigate } from "react-router-dom"
import loginValidation from "../../CommanUtils/loginValidation"
import useDecode from "../../CommanUtils/jwtdecode"

const Home = ()=>{
useDecode()
const { setRegisterduser,DeleteUSerID,reRenderUser, setRerenderUser} = useContext(Utils)
const [logout,setLogOut] = useState(false)
const Navigator = useNavigate()
 console.log(reRenderUser)

useEffect(()=>{
    if(reRenderUser){
    const getRegisterUser = async()=>{
           try{
            const Result  = await axios.get(`${process.env.REACT_APP_BACKENDURL}/getRegisterUser`,
            {headers:{
                authorization:localStorage.getItem("RefreshToken")
            }}
            )
            setRegisterduser(Result.data.Result)
           }
           catch(error){
            if(error.response.status==403){
                Navigator("/login")
            }
           }
    }
    getRegisterUser()
    setRerenderUser("")
}
},[reRenderUser])

useEffect(()=>{
    
    const getRegisterUser = async()=>{
           try{
            const Result  = await axios.get(`${process.env.REACT_APP_BACKENDURL}/getRegisterUser`,
            {headers:{
                authorization:localStorage.getItem("RefreshToken")
            }}
            )
            setRegisterduser(Result.data.Result)
           }
           catch(error){
            if(error.response.status==403){
                Navigator("/login")
            }
           }
    }
    getRegisterUser()
   

},[])


 

useEffect(()=>{
    if(DeleteUSerID){
   const deleteUser = async()=>{
        try{
       const Result = axios.delete(`${process.env.REACT_APP_BACKENDURL}/deleteUser?id=${DeleteUSerID}`,
       {headers:{
        authorization:localStorage.getItem("RefreshToken")
        }}
       )
       setRerenderUser(2)
        }
        catch(error){
            if(error.response.status==403){
                Navigator("/login")
            }
        }
   }
  deleteUser()
}
},[DeleteUSerID])

useEffect(()=>{
    if(logout){
            localStorage.clear()
            setLogOut(false)
            Navigator("/login")
    }  
},[logout])


// setInterval(()=>{
//  loginValidation()
// },2000)

    return(
        <>
        <Box>
        <Box>
            <ResponsiveAppBar setLogOut={setLogOut}/>
        </Box>
        <Box>
          
        <Card sx={{width:"90%",margin:"auto",height:"100%",marginTop:"30px"}}>
        <Box sx={{height:"80px"}}>
        <ControlledTooltips/>
        </Box>
        <Box>
         <DataTable/>
         </Box>
         </Card>
         </Box>
         </Box>
        </>
    )

}

export default Home