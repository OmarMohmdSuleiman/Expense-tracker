import React, { useState } from "react";
import Header from "./Header";
import Balance from "./Balance";
import IncomeExpenses from "./Income-expenses";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";



function App(){
    const [texts,setTexts]=useState([]);

    function AddItem(text,amount){
        setTexts(prevTexts => {
            
            return [...prevTexts, {text,amount}];
          });
        }
    
    
    return (
    <div>
        <Header />
        <div className="container">
          <Balance />
          <IncomeExpenses />
          <AddTransaction onAdd={AddItem}/>
          <h3>History</h3>
          <ul id="list" className="list">
             <TransactionList />
          </ul>
         
          </div>
          </div>
        
    
    );
}

export default App;