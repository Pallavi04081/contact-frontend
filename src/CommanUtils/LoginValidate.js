import { async } from "@firebase/util"
import axios from "axios"

const useLoginValidate = ()=>{
    
    const ExpiredToken = localStorage.getItem("ExpiredToken")
    if(ExpiredToken){
        getExpiredToeknValidation = async()=>{
             try{
            const Result = axios.post('http://localhost:5000/AcessToken',headers:{
                authorizatin
            })
             }
             catch(error){
                console.log(error)
             }
        }
    }
    

}