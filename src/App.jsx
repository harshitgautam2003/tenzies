import React from "react"
import { useState } from 'react'
import './App.css'
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [endGame,setEndGame]=React.useState(false);
    React.useEffect(() => {
      let ch=1;
      let val=dice[0].value;
        for(let i=0;i<dice.length;i++){
            if(dice[i].isHeld&&dice[i].value===val)continue;
            else {
                ch=0;
                break;
            }
        }
        if(ch){
            setEndGame(true);
            console.log("You won");
        }
      }, [dice])
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({value:Math.ceil(Math.random() * 6),isHeld:false,id:nanoid()})
        }
        return newDice
    }
    function holdDie(id){
        setDice(oldDice=>oldDice.map(old=>{
          return old.id===id ? {...old,isHeld : !old.isHeld} : old
        }))
    }
    
    
    function roller(){
        if(!endGame){
          setDice(oldDie=>oldDie.map(die=>{
              return die.isHeld ? die :  {value:Math.ceil(Math.random() * 6),isHeld:false,id:nanoid()}
              }
          ));
        }
        else{
            setEndGame(false);
            setDice(allNewDice())
        }
    }
    let allDices=dice.map(a=>(<Die key={a.id} value={a.value} isHeld={a.isHeld} hold={()=>holdDie(a.id)}/>))
  return (
    
    <div className="App">
      {endGame && <Confetti width={"1000px"}
      height={"550px"}/>}
      <h1>TENZIES</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="allDice">
            {allDices}       
      </div>
      <button className="rollButton" onClick={roller}>{endGame ? "New Game" : "Roll"}</button>
    </div>
  )
}

export default App
