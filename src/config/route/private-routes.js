import { Route } from "react-router-dom"
import Template from "../../estrutura/Template"
import Login from "../../pages/Login";

function PrivateRoutes({component: Component, ...rest}){    

    return rest.isAuthenticated?
        <Route { ...rest } render = {props =>{return <Template load={rest.load}><Component {...props} /></Template>}}/>
        :<Login/>
}

export default PrivateRoutes