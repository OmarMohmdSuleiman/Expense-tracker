import React from "react";

function IncomeExpenses({ income, expense }) {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">{formatAmount(income)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">{formatAmount(expense)}</p>
      </div>
    </div>
  );
}

export default IncomeExpenses;