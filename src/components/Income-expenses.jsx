import React from "react";

function IncomeExpenses(props){
    return (<div className="inc-exp-container">
        <div>
          <h4>{props.Income}</h4>
  <p className="money plus">0 $</p>
        </div>
        <div>
          <h4>{props.Expense}</h4>
  <p className="money minus">0$</p>
        </div>
      </div>);
}
export default IncomeExpenses;