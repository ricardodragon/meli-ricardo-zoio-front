
import { Button } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react"
import LabelInput from "../../Estrutura/LabelInput";
import "./atributosVariacoes.css"

function AtributosVariacoesForm(props){    
    const [values, setValues] = useState({atributos:[], novoAtributo:''})
    const dominio = "http://DESKTOP-DS0K2GT";

    const addAtributo = (event)=>{
        event.preventDefault();                  
        const a = values.atributos.filter(a=>a.id==values.novoAtributo)[0];        
        props.onChange(props.attribute_combinations.concat({id: a?a.id:undefined, name: a?a.name:values.novoAtributo, value_id: '', value_name: ''}))                               
    }
      
    const setAtributos = async () => setValues({
        ...values, 
        atributos:props.categoria!=undefined?(await axios.get(dominio+':8080/meli/atributos/'+props.categoria)).data.filter(value=>value.tags.allow_variations):values.atributos        
    });useEffect(() =>setAtributos(), [props.category_id]);

    return(        
        <>                   
            {props.attribute_combinations.map((atributo, index) => 
                <>
                    <LabelInput  disabled={props.disabled} size={"8"} value={atributo.name} label={""} id={atributo.name} type="text" onChange={value=>props.onChange(props.attribute_combinations.map((a, i)=> i==index?{...a, name:value}:a))}/>                                            
                    <Button color="secondary" className="botao-excluir-atributo" onClick={event=>{event.preventDefault();props.onChange(props.attribute_combinations.filter((a, i)=>i!=index))}}>Excluir</Button>
                </>
            )}  
            <LabelInput size={"8"}  disabled={props.disabled} label="Atributo : " id="nome_atributo" list="atributos-variacao" type="text" onChange={(novoAtributo)=>setValues({...values,novoAtributo})}/>                                                                 
            <datalist id="atributos-variacao">
                {values.atributos.map((value, index) => 
                    <option key={index} value={value.id}>{value.name}</option>)}
            </datalist>      

            <Button color="primary" className="botao-add-atributo" onClick={addAtributo}>Adicionar</Button><br/>                                                                       
        </>
    )
}

export default AtributosVariacoesForm