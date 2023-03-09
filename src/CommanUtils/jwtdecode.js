import { useContext, useEffect,useState } from "react"
import jwtDecoder from 'jwt-decode'
import {userData} from './Context'

const useDecode  = ()=>{
 const {token} = useContext(userData)
 const decodeData = jwtDecoder(token)
 if(decodeData) return decodeData.userdata[0];
}


export default useDecode;