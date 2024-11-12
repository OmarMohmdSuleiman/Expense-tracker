import React from "react";
import Header from "./Header";
import Balance from "./Balance";
import IncomeExpenses from "./Income-expenses";



function App(){
    
    return (
    <div>
        <Header />
        <div className="container">
          <Balance />
          <IncomeExpenses />
          </div>
          </div>
        
    
    );
}

export default App;