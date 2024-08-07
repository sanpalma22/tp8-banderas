'use client';
import { useEffect, useState } from "react";

export default function Juego(){
    const [banderas, setBanderas]=useState([]);
    const [bandera, setBandera]=useState({});
    const [respuesta, setRespuesta] = useState("")

    useEffect(()=>{
        fetch("https://countriesnow.space/api/v0.1/countries/flag/images")
          .then(res => res.json())
          .then(data => setBanderas(data.data))
    },[])
    
    useEffect(() => {
        if (banderas.length > 0) {
            generarBandera();
        }
    }, [banderas]);
    
    const handleChange=(e)=>{
        const value=e.target.value
        setRespuesta(value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        verificarRespuesta()
        generarBandera();
        setRespuesta("")
    }

    function generarBandera(){
        const rdm = Math.floor(Math.random() * banderas.length);
        setBandera(banderas[rdm])
    }

    function verificarRespuesta(){
        if(respuesta.toLowerCase()==bandera.name.toLowerCase()){
            return true
        }else return false
    }
 
    return(
        <div>
            
            <img src={bandera.flag}></img>

            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={respuesta}></input>
                <button type="submit">Adivinar</button>
            </form>
            
        </div>
    )

    
}
