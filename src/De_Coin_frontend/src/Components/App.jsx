import React from "react";
import Formfunction from './Form_walletCoin';
import Claim from "./Form_FreeClaim";
import Transfer from "./Form_Transfer";

function App(props){
  return <div className = "rootContainer">    
    <img src="/logo2.svg" alt="DFINITY logo" />
    <div className="d-flex justify-content-center flex-div">
      <div className = "Div-3">
        <div className="walletForm-Div"><Formfunction /></div>
        <br/><br/>
        <div className="claimForm-Div"><Claim userPrincipal={props.loggedInPrincipal}/></div>
        <br/><br/>   
        <div className="transfer-form-div"><Transfer/></div>
        <br/><br/>   
      </div>
    </div>
  </div>
}

export default App;