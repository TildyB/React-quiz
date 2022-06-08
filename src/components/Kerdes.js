import React from "react";
import './Kerdes.css'

const Kerdes = ({valaszok,kerdes,id,klikk,joValasz,jatekEllenorzes}) =>{
       
    return(
        <div className="kerdesFoDiv">
            <h1 className="kerdes">{kerdes}</h1>
            <div className="kerdesekDiv">
               {valaszok.map((valasz ,index) => <button 
               disabled={jatekEllenorzes}
               onClick={()=>klikk(id,valasz.id,valasz.valasz)} 
               className={valasz.valasztott ? "valaszGombValasztott" : "valaszGomb"}
               style={{backgroundColor : valasz.valasz === joValasz && jatekEllenorzes && valasz.valasztott  ? "green" : jatekEllenorzes && valasz.valasztott ? "red" : ""}}
               key={index}
               >{valasz.valasz}</button>)}
            </div>
            <hr className="horizontalLine" />     
        </div>
    )
}
export default Kerdes;