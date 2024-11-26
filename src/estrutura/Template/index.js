import Header from "../Header"
import Menu from "../Menu"
import "./template.css"

function Template(props){
    
    return (
        <>            
            <Header/>            
            <Menu/>            
            <div id="conteudo" onClick={event=>{document.getElementById("check-menu").checked=false;document.getElementById("user-menu").style.display="none"}}>                                
                {props.children}                    
            </div>                        
        </>
    )
}

export default Template