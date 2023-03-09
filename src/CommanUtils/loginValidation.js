import { async } from "@firebase/util"
import axios from "axios"

const loginValidation = async()=>{
   try{
    const ExpiredToken = localStorage.getItem("ExpiredToken")
    if(ExpiredToken){
            const Result = await axios.post('http://localhost:5000/AcessToken',{},{headers:{
                authorization:ExpiredToken
            }})
    }
   }
   catch(error){
    console.log(error)
   }

    
}

export default loginValidation;