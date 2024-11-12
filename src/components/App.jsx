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
          <TransactionList />
          <AddTransaction onAdd={AddItem}/>
          </div>
          </div>
        
    
    );
}

export default App;