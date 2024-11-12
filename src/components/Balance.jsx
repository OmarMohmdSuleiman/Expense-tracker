import React from "react";

function Balance(props){
    return (<div>
    <h4>Your Balance:</h4>
    <h1 id="balance">{props.balance} $</h1>
    </div>
    );
}
export default Balance;