import {createContext,useState} from 'react'
export const Utils = createContext();

const Context = ({children})=>{

  const [toggle,setToggle] = useState(false)
  const [RegisterdUser,setRegisterduser] = useState([])   
  const [DeleteUSerID,setDeleteUserID] = useState("")
  const [delemultiple,setDeletemultiple] = useState([])
  const [reRenderUser,setRerenderUser] = useState(0)
  const [open, setOpen] = useState(false);


     return(
       <>
      <Utils.Provider  value={{
      toggle,
      setToggle,
      RegisterdUser,
      setRegisterduser,
      DeleteUSerID,
      setDeleteUserID,
      delemultiple,
      setDeletemultiple,
      reRenderUser,
      setRerenderUser,
      open, 
      setOpen
        }}>
         {children}
      </Utils.Provider>
       </>
     )
}


export default  Context;