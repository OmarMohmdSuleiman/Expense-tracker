import React, { useState } from "react";
import Header from "./Header";
import Balance from "./Balance";
import IncomeExpenses from "./Income-expenses";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";

function App() {
  const [texts, setTexts] = useState([
    
  ]);
  const [expense,setExpense]=useState(0);
  const [income,setIncome]=useState(0);
  const [balance,setBalance]=useState(0);

  // Function to add a new transaction item
  function AddItem(text, amount) {
    setTexts(prevTexts => {
      return [...prevTexts, { text, amount }];
    });
    if (amount > 0) {
        setIncome(prevIncome => prevIncome + amount);
      } else {
        setExpense(prevExpense => prevExpense + amount);
      }
      setBalance(income + amount - expense);
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
        <Balance balance={balance}/>
        <IncomeExpenses expense= {expense} income={income} />
        <h3>History</h3>
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
        
        
      </div>
    </div>
  );
}

export default App;