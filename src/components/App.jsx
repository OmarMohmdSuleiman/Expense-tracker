import React, { useState } from "react";
import Header from "./Header";
import Balance from "./Balance";
import IncomeExpenses from "./Income-expenses";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";



function App(){
    const [texts,setTexts]=useState([
        { text: "Groceries", amount: -20.5 },
        { text: "Salary", amount: 1000 }
      ]);

      function AddItem(text, amount) {
        setTexts(prevTexts => {
          return [...prevTexts, { text, amount }];
        });
      }

      function deleteItem(id) {
        setTexts(prevItems => {
          return prevItems.filter((Item, index) => index !== id);  // Remove item at the given id
        });
      }
    
    
    return (
    <div>
        <Header />
        <div className="container">
          <Balance />
          <IncomeExpenses />
          <h3>History</h3>
          <ul id="list" className="list">
          {texts.map((Item, index) => (
  <TransactionList
    key={index}
    id={index}
    text={Item.text}    /* Pass the text property */
    money={Item.amount} /* Pass the amount property */
    onDelete={deleteItem}  // Pass deleteItem function to TransactionList
  />
))}
          </ul>
          <AddTransaction onAdd={AddItem}/>
          
         
          </div>
          </div>
        
    
    );
}

export default App;