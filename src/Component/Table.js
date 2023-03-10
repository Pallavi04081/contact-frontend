import * as React from 'react';
import { useContext,useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Button, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { Utils } from '../CommanUtils/Context';
import AlertDialog from './POPUP';



export default function DataTable() {
  const { RegisterdUser,setDeleteUserID,setDeletemultiple,delemultiple} = useContext(Utils)
  const [open, setOpen] = useState(false);
  const [userID,setUserID] = useState("")
 

 const editUser = (e)=>{
  console.log(e.target.id)
    setOpen(true)
     setUserID(e.target.id)
 }


 const selectMultiple = (e)=>{
  if(e.target.checked==true){
    setDeletemultiple((previous)=>{
      return[...previous,e.target.id]
     })
  }
  else{
    const Result = delemultiple.filter((ele)=>{
       return (ele!==e.target.id)
    })
    setDeletemultiple(Result)
  }
    
 }

  const columns = [
    {
      field: 'Checkbox',
      headerName: 'Select',
      width: 70,
      editable: true,
      renderCell: (params) => <Checkbox id={params.formattedValue} onClick={selectMultiple}/>},
    { field: 'id', headerName: 'ID', width:70 },
    { field: '_id', headerName: 'ID', width:125 },
    {
    field: 'image',
    headerName: 'Profile Image',
    width: 130,
    editable: true,
    renderCell: (params) => <Avatar src={params.formattedValue}/>},
    { field: 'FirstName', headerName: 'First name', width: 125 },
    { field: 'MiddleName', headerName: 'Middle name', width: 125 },
    { field: 'LastName', headerName: 'Last name', width: 125 },
    { field: 'Email', headerName: 'Email', width: 125 },
    { field: 'Gender', headerName: 'Gender', width: 125 },
    { field: 'DateOFBirth', headerName: 'DOB', width: 125 },
    { field: 'Edit', headerName: 'Edit', width: 125,
         renderCell:(params)=>
      <div onClick={editUser}>
        <Button id={params.formattedValue}  sx={{color:"green"}}>Update</Button>
         </div>
       ,
       },
       { field: 'Delete', headerName: 'Delete', width: 125,
       renderCell:(params)=>
       <div onClick={(e)=>{setDeleteUserID(e.target.id)}}>
         <Button id={params.formattedValue}  sx={{color:"red"}}>Delete</Button>
       </div>,
     },
  ];
  
 
  const rows = []

  if(RegisterdUser){
       RegisterdUser.map((ele,index)=>{
        rows.push({id:index+1,image:ele.ProfileImage,Edit:ele._id,Delete:ele._id,
                   Checkbox:ele._id,...ele})
       })
  }

 

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      <AlertDialog open={open} userId={userID} setOpen={setOpen}/>
    </div>
  );
}