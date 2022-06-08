import React, { useEffect, useState } from "react";
import Kerdes from "./components/Kerdes";
import './App.css';
import { nanoid } from 'nanoid';




const Quiz = () =>{



  const[kerdesek,setKerdesek]=useState([])
  const[pontszam,setPontszam] = useState(0)
  const[jatekEllenorzes,setJatekEllenorzes] = useState(false)
  const[ujJatek,setUjatek] = useState(false)

    useEffect(()=>{
      fetch('https://opentdb.com/api.php?amount=10')
      .then(res => res.json())
      .then(data => setKerdesek(data.results.map(result=>{
        return({
          kerdes: result.question,
          jo_valasz: result.correct_answer,
          valaszok:keveres([
            ...result.incorrect_answers,
            result.correct_answer
          ]),
          id:nanoid()
        })
       
      })))
    },[ujJatek])


    function keveres(arr) {
      let array = arr.map((ans) => {
        return {
          id: nanoid(),
          valasz: ans,
          valasztott: false,
        }
      })
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array
    }


    const klikk = (id,valaszId,x) =>{
     
        setKerdesek(prevState => prevState.map(kerdes =>{
          /*if(x === kerdes.jo_valasz){
            setPontszam(pontszam + 1)
          }*/
            if(id === kerdes.id){
              return ({
                ...kerdes,
                valaszok: kerdes.valaszok.map(val =>{
            if(val.id === valaszId){
              return( {
                              ...val,
                              valasztott: true
                            }
            
                          )
                        }else{
                          return {
                            ...val,
                            valasztott:false
                          }
                        }
                  })
                })
              
              }else{
                return {
                  ...kerdes,
            
                }
              }
        }))
    }

    const ellenKlikk= (x) =>{
      setJatekEllenorzes(!jatekEllenorzes)
      kerdesek.map(kerdes =>{
         return( kerdes.valaszok.map(valasz =>{
             if(valasz.valasztott === true && valasz.valasz === kerdes.jo_valasz){
              setPontszam(prevState => prevState+1)
              console.log(pontszam)
            }
          })
      )})
    }
    const ujJatekBeallitas = () =>{
      setJatekEllenorzes(!jatekEllenorzes)
      setPontszam(0)
      setUjatek(!ujJatek)
    }
  return(
   <div className="quizKeret">
     <h1 id="title">Quiz Game</h1>
     {kerdesek.map((kerdes,index) => <Kerdes key={index} jatekEllenorzes={jatekEllenorzes} szoveg={kerdes.valaszok.valasz} id={kerdes.id} valaszId ={kerdes.valaszok.id} klikk={klikk} valaszok={kerdes.valaszok} kerdes={kerdes.kerdes} joValasz={kerdes.jo_valasz} />)}
     <div  className="masodikDiv">
       {!jatekEllenorzes && <button className="ellenButton" onClick={ellenKlikk}>Ellenőrzés</button>}
       {jatekEllenorzes && 
       <div className="masodikDiv">
                <h6 style={{marginRight: '10px', color:"white"}}>Az elért pontok szama {pontszam}</h6>
                <button className="ellenButton" onClick={ujJatekBeallitas}>Új játék</button>
       </div>

       }
        
     </div>
   </div>
  )
}

export default Quiz;