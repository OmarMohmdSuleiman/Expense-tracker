import React, { useState, useEffect } from "react";
import Header from "./Header";
import Balance from "./Balance";
import IncomeExpenses from "./Income-expenses"
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";

function App() {
  const [texts, setTexts] = useState([]);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [balance, setBalance] = useState(0);

  // Fetch transactions when the component mounts
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("http://localhost:4000/transactions");
        if (response.ok) {
          const data = await response.json();
          setTexts(data); // Update the state with the fetched transactions
          
          // Update balance, income, and expense
          let tempIncome = 0;
          let tempExpense = 0;
          let tempBalance = 0;

          data.forEach((transaction) => {
            const amount = transaction.amount;
            if (amount > 0) {
              tempIncome += amount;
            } else {
              tempExpense += amount;
            }
            tempBalance += amount;
          });

          setIncome(tempIncome);
          setExpense(tempExpense);
          setBalance(tempBalance);
        } else {
          console.error("Failed to fetch transactions:", response.statusText);
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    }

    fetchTransactions(); // Call the function to fetch transactions
  }, []); // Empty dependency array means this effect will run once when the component mounts

  // Function to add a new transaction item
  async function AddItem(text, amount) {
    amount = parseFloat(amount);
  
    if (isNaN(amount)) {
      console.error("Amount must be a valid number");
      return;
    }
  
    // Add the item to the list for UI update
    setTexts((prevTexts) => {
      const newTransaction = { text, amount };
      console.log("Adding transaction to state:", newTransaction);  // Log the new transaction being added
      return [...prevTexts, newTransaction];  // Add the transaction to the state
    });
  
    // Update income and expense based on the amount
    if (amount > 0) {
      setIncome((prevIncome) => prevIncome + amount);
    } else {
      setExpense((prevExpense) => prevExpense + amount);
    }
  
    setBalance((prevBalance) => prevBalance + amount);  // Update balance after adding the transaction
  
    try {
      const response = await fetch("http://localhost:4000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          amount,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Transaction added to database:", data); // Log response data from backend
  
        // Update the state with the ID from the backend (if the backend returns it)
        setTexts((prevTexts) => {
          return prevTexts.map((item, index) =>
            index === prevTexts.length - 1 ? { ...item, id: data.id } : item
          );
        });
      } else {
        console.error("Failed to add transaction:", response.statusText);
      }
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  }
  // Function to delete a transaction item by id
  const deleteItem = async (id) => {
    try {
      // Send DELETE request to the backend to delete the transaction from the database
      const response = await fetch(`http://localhost:4000/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Transaction with id ${id} deleted`);
        // After deleting from the backend, remove from the state as well
        setTexts((prevItems) => prevItems.filter((item) => item.id !== id));
        // Adjust balance, income, and expense after deletion if necessary
      } else {
        console.error("Failed to delete transaction.");
      }
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };
  return (
    <div>
      <Header />
      <div className="container">
        <Balance balance={balance} />
        <IncomeExpenses expense={expense} income={income} />
        <h3>History</h3>
        <ul id="list" className="list">
          {texts.map((Item) => (
            <TransactionList
              key={Item.id}  // Use the id for the key to ensure unique keys for each transaction
              id={Item.id}   // Pass the id for deletion
              text={Item.text}    // Pass the transaction name (text)
              money={Item.amount} // Pass the transaction amount (money)
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