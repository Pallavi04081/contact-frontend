import { useEffect,useState,useContext } from "react"
import { Card,Box } from "@mui/material"
import DataTable from "../../Component/Table"
import ResponsiveAppBar from "../../Component/Header"
import { Utils } from "../../CommanUtils/Context"
import axios from "axios"
import ControlledTooltips from "../../Component/Tooltip"
import { useNavigate } from "react-router-dom"

const Home = ()=>{

const { setRegisterduser,DeleteUSerID,reRenderUser, setRerenderUser} = useContext(Utils)
const [logout,setLogOut] = useState(false)
const Navigator = useNavigate()
 

useEffect(()=>{
    const getRegisterUser = async()=>{
           try{
            const Result  = await axios.get("https://contact-backend-ukxi.onrender.com/getRegisterUser",)
            setRegisterduser(Result.data.Result)
           }
           catch(error){
            console.log(error)
           }
    }
    getRegisterUser()
},[reRenderUser])


 

useEffect(()=>{
    if(DeleteUSerID){
   const deleteUser = async()=>{
        try{
       const Result = axios.delete(`https://contact-backend-ukxi.onrender.com/deleteUser?id=${DeleteUSerID}`)
       setRerenderUser(2)
        }
        catch(error){
            console.log(error)
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