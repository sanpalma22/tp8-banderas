'use client';

import { useEffect, useState } from "react";

export default function Juego(){
    const [banderas, setBanderas]=useState([]);
    useEffect(()=>{
        fetch("https://countriesnow.space/api/v0.1/countries/flag/images")
          .then(res => res.json())
          .then(data => setBanderas(data.data))
    },[])
    
    return(
        <div>
            <ul>
                {banderas.map(bandera=> <li>{bandera.name}</li>)}
            </ul>
        </div>
    )
}
