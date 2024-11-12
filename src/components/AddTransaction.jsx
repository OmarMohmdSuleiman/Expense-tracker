import React, { useState } from "react";

function AddTransaction(props) {
  const [text, setText] = useState(''); // State for transaction text
  const [amount, setAmount] = useState(0); // State for transaction amount

  // Handle text input change
  function handleTransaction(e) {
    setText(e.target.value);
  }

  // Handle amount input change
  function handleAmount(e) {
    setAmount(e.target.value);
  }

  // Submit the transaction and call the passed `onAdd` prop
  function submitTransaction(event) {
    event.preventDefault(); // Prevent default form submission behavior
    props.onAdd(text, parseFloat(amount)); // Pass text and parsed amount as arguments
    setText(''); // Reset text input
    setAmount(0); // Reset amount input
  }

  return (
    <div>
      <h3>Add new transaction</h3>
      <form onSubmit={submitTransaction}> {/* Use onSubmit instead of onClick */}
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={handleTransaction}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            <span>make sure to add "-" if it is an expense...</span>
          </label>
          <input
            type="number"
            value={amount}
            onChange={handleAmount}
            placeholder="Enter amount..."
          />
        </div>
        <button type="submit" className="btn">Add transaction</button> 
      </form>
    </div>
  );
}

export default AddTransaction;