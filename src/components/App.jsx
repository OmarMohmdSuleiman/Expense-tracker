import React from "react";
import Header from "./Header";
import Balance from "./Balance";
import IncomeExpenses from "./Income-expenses";
import TransactionList from "./TransactionList";



function App(){
    
    return (
    <div>
        <Header />
        <div className="container">
          <Balance />
          <IncomeExpenses />
          <TransactionList />
          </div>
          </div>
        
    
    );
}

export default App;