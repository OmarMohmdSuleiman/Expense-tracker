import React from "react";

function TransactionList({ text, money, onDelete, id }) {
  console.log("Transaction props:", { text, money, id });  // Log the props

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <li>
      <span>{text}</span> {/* Display transaction text */}
      <span>{formatAmount(money)}</span>
      <button onClick={() => onDelete(id)} className="delete-btn">x</button>
    </li>
  );
}

export default TransactionList;