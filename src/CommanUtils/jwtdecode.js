import { useContext, useEffect,useState } from "react"
import jwtDecoder from 'jwt-decode'
import axios from "axios"
import { connectStorageEmulator } from "firebase/storage"

const useDecode  = ()=>{
//  const token = localStorage.getItem("RefreshToken")
//  const decodeData = jwtDecoder(token)
//  let userData;
//  if(decodeData?._id){
//     const getRegisterUser = async()=>{
//         try{
//          const Result  = await axios.get(`${process.env.REACT_APP_BACKENDURL}/getRegisterUser`,
//          {headers:{
//              authorization:localStorage.getItem("RefreshToken")
//          }}
//          )
//          userData(Result.data.Result)
//         }
//         catch(error){
        
//         }
//     }
//  getRegisterUser()
//  }
}


export default useDecode;