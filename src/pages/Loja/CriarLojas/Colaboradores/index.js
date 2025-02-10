import loader from "./../../../../assets/loadinfo.gif";
import { useEffect, useState } from "react";
import axios from '../../../../config/api/api';
import { Link } from "react-router-dom";

function Colaboradores(props) {
    
    const [values, setValues] = useState({loader:true})
    const host = process.env.REACT_APP_URL;

    useEffect(() =>{
        setValues({loader:true})
        axios.get(`/loja/lojas/usuario/${props.idLoja}?page=${0}&size=${10}`).then(res => setValues({colaboradores:res.data, loader:false}))
    }, [props.idLoja]);

    return( 
        <dialog onClick={event=>document.getElementById("modal").close()} id="modal" style={{borderRadius:"0.5%", borderStyle:"none", width:"70%", height:'70%', textAlign:'center'}}>
            <div style={{width:'98%', height:'100%', padding:'1%'}} onClick={event=>event.stopPropagation()}>
                
                {values.loader&&<img style={{height:"5em", top:"50%"}} src={loader} alt="loading..."/>}
                
                <button style={{width:'100%', cursor:'pointer'}} onClick={event=>setValues({...values, colabEmail:values.colabEmail===undefined?"":undefined})}>+ Adicionar colaborador</button>
                
                {values.colabEmail!==undefined&&<fieldset style={{margin:'0', border:'solid 1px', marginBottom:'3%'}}>
                    <div style={{textAlign:'left'}}>
                        <form onSubmit={async event=>{event.preventDefault();setValues({...values, colaborador:(await axios.get('/loja/lojas/usuario?email='+values.colabEmail+'&idLoja='+props.idLoja)).data})}}>
                            <input type="email" required placeholder="email do novo colaborador" value={values.colabEmail} onChange={event=>setValues({...values, colabEmail:event.target.value})} style={{width:'90%'}}/><input value='🔍' type="submit" style={{width:'5%', cursor:'pointer'}}/>
                        </form>
                    </div>

                    {values.colaborador&&<div>
                        <div style={{textAlign:'left', width:'100%'}}>
                            <img alt="Imagem perfil user" src={values.colaborador.usuarioDTO.imagemPath?host+values.colaborador.usuarioDTO.imagemPath:"https://freesvg.org/img/abstract-user-flat-3.png"} style={{display:'inline', borderRadius: "50%", width:"1.8em", height:"1.8em"}}/>                                     
                            <div style={{display:'inline-block', width:'40%', verticalAlign:'top'}}>
                                {values.colaborador.usuarioDTO.nome&&<p style={{whiteSpace: "nowrap", fontSize:"8pt", fontWeight:"bolder", textOverflow: "ellipsis", overflow:"hidden", marginBottom:"0"}}>{values.colaborador.usuarioDTO.nome}</p>}
                                {values.colaborador.usuarioDTO.email&&<p style={{whiteSpace: "nowrap", fontSize:"8pt", fontWeight:"bolder", textOverflow: "ellipsis", overflow:"hidden", marginBottom:"0"}}>{values.colaborador.usuarioDTO.email}</p>}
                            </div>    
                            <button style={{width:'40%'}} disabled={values.colaborador.conviteAceito!==null}>{values.colaborador.conviteAceito===null?'convidar':values.colaborador.conviteAceito?'colaborador':'aguardando'}</button>                                
                            <hr></hr>
                        </div>
                    </div>}
                </fieldset>}

                {values.colaboradores&&values.colaboradores.map(userLoja=>
                    <div style={{textAlign:'left'}}>
                        <Link style={{display:'inline', verticalAlign:'top'}} to={"/perfil/"+userLoja.usuarioDTO.id}><img alt="Imagem perfil user" src={userLoja.usuarioDTO.imagemPath?host+userLoja.usuarioDTO.imagemPath:"https://freesvg.org/img/abstract-user-flat-3.png"} style={{borderRadius: "50%", width:"2.7em", height:"2.7em"}}/></Link>                                      
                        <div style={{display:'inline-block', width:'80%'}}>
                            <Link to={"/perfil/"+userLoja.usuarioDTO.id}>
                                {userLoja.usuarioDTO.nome&&<p style={{whiteSpace: "nowrap", fontSize:"8pt", fontWeight:"bolder", textOverflow: "ellipsis", overflow:"hidden", marginBottom:"0"}}>{userLoja.usuarioDTO.nome}</p>}
                                {userLoja.usuarioDTO.email&&<p style={{whiteSpace: "nowrap", fontSize:"8pt", fontWeight:"bolder", textOverflow: "ellipsis", overflow:"hidden", marginBottom:"0"}}>{userLoja.usuarioDTO.email}</p>}
                            </Link>
                            <p style={{whiteSpace:'break-spaces', lineHeight:'normal'}}></p>
                            <button style={{display:'inline-block', width:'47%'}} disabled>{userLoja.conviteAceito?'colaborador':'aguardando'}</button>
                            <button style={{display:'inline-block', color:'white', backgroundColor:'rgba(255, 0, 0, 0.70)', width:'47%'}}>{userLoja.conviteAceito?'excluir':'cancelar'}</button>
                            {/* <span style={{fontSize:'8pt', float:'right'}}>12/06/2025 22:42</span> */}
                        </div>            
                        <hr></hr>
                    </div>
                )}
            </div>
        </dialog>)

}export default Colaboradores;