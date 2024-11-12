import React,{useState} from "react";

function AddTransaction(){

  const [text,setText]=useState('');// set hook for the transaction
  const [amount,setAmount]=useState(0);// set hook to track the amount
  
  //make function to handle current typed input (value)
  function handleTransaction(e){
    setText(e.target.value);
  }
  //make function to handle current typed amount (value)
  function handleAmount(e){
    setAmount(e.target.value);
  }
    return ( 
    <div><h3>Add new transaction</h3>
    <form >
      <div className="form-control">
        <label htmlFor="text">Text</label>
        <input type="text" value={text} onChange={handleTransaction} placeholder="Enter text..." />
      </div>
      <div className="form-control">
        <label htmlFor="amount">Amount <br />
          (negative - expense, positive - income)</label>
        <input type="number" value={amount} onChange={handleAmount} placeholder="Enter amount..." />
      </div>
      <button className="btn">Add transaction</button>
    </form></div>
        );
}
export default AddTransaction;