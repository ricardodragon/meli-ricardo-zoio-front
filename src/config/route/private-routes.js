import { Route } from "react-router-dom"
import Template from "../../estrutura/Template"
import Login from "../../pages/Login";
import { useEffect, useState } from "react";
import axios from "../api/api";

function PrivateRoutes({component: Component, ...rest}){    
    const [values, setValues] = useState({isAuthenticated:true})    

    useEffect(()=>
        axios.get("/auth/usuarios").then(
            response=>{                
                localStorage.setItem("usuario", JSON.stringify(response.data))
                setValues({isAuthenticated:true})
            }
        ).catch(error=>
            setValues({isAuthenticated:false})
        )
    ,[])

    return values.isAuthenticated?
        <Route { ...rest } render = {props =>{return <Template load={rest.load}><Component {...props} /></Template>}}/>
        :<Login/>
}

export default PrivateRoutes