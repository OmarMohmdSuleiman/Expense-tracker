import React from "react";

function TransactionList(props){

  function handleClick(){
    props.onDelete(props.id);
  }

    return (<>
        
      
        <li className="minus">
          {props.text} <span>- {props.money}</span><button onClick={handleClick} className="delete-btn">x</button>
        </li>
      
      </>);
}

export default TransactionList;