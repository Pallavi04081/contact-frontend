import './App.css';
import { useState } from 'react';
import ContactUs from './Views/Auth/Auth';
import Home from './Views/Home/Home';
import Auth from './Views/Auth/Auth';
import Context from './CommanUtils/Context';
import {BrowserRouter,Routes,Route,Outlet,Navigate} from "react-router-dom"
import EditFormCom from './Component/Edit';
import "./Component/FormCom/Form.css"

function App() {
  const PrivateRoute = ({auth, ...props})=>{
    return auth?
    <>
    <Outlet/>
    </> :
    <>
    <Navigate replace to="/login"/>
    </>
    }

    const [auth,setAuth] = useState('')
  return (
    <div className="App">
    <Context>
   <BrowserRouter>
   <Routes>
    <Route path="/login" element={<Auth auth={setAuth}/>}/>
    <Route path="/" element={<PrivateRoute auth={auth}/>}>
    <Route path='/' element={<Home/>}/>
    </Route> 
   </Routes>
   </BrowserRouter>
   </Context>
    </div>
  );
}

export default App;
