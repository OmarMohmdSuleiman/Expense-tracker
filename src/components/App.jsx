import React, { useState } from "react";
import Header from "./Header";
import Balance from "./Balance";
import IncomeExpenses from "./Income-expenses";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";

function App() {
  const [texts, setTexts] = useState([
    { text: "Groceries", amount: -20.5 },
    { text: "Salary", amount: 1000 }
  ]);

  // Function to add a new transaction item
  function AddItem(text, amount) {
    setTexts(prevTexts => {
      return [...prevTexts, { text, amount }];
    });
  }

  // Function to delete a transaction item by id
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
        <ul id="list" className="list">
          {texts.map((Item, index) => (
            <TransactionList
              key={index}
              id={index}
              text={Item.text}    
              money={Item.amount} 
              onDelete={deleteItem}  // Pass deleteItem function to TransactionList
            />
          ))}
        </ul>
        <AddTransaction onAdd={AddItem} />
        <h3>History</h3>
        
      </div>
    </div>
  );
}

export default App;