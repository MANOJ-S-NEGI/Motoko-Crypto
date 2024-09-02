import React from  "react";
import { useState } from "react";
import { De_Coin_backend } from 'declarations/De_Coin_backend';
import { Principal } from '@dfinity/principal';

function Transfer(){
    const [isDisable,setDisable] = useState(false);
    const [receiverId,setReceiverId] = useState("");
    const [amount,setAmount] = useState('');
    const [isTransferResult,setTransferResult] = useState("");
    const [isHidden, setHidden] = useState(true);


    async function handleOnClick(){
        if(receiverId && amount){
            try{
            setDisable(true);
            let sendingAdress = Principal.fromText(receiverId);
            let transferOps = await De_Coin_backend.transfer(sendingAdress,Number(amount));
            setTransferResult(transferOps);
            setDisable(false);
            setHidden(false);
                setTimeout(() => {
                    setHidden(true); // Hide the span after 4 seconds
                }, 4000);
            }catch (error) {
                console.error("Error fetching balance:", error);
                setTransferResult("Enter Vaild Input ");
                setHidden(false); // Ensure the error message is visible
                setTimeout(() => {
                    setHidden(true); // Hide the span after 4 seconds
                }, 4000);
            }
        }else{
            setTransferResult("Provide Wallet Id And Amount To Transfer");
            setHidden(false); // Ensure the error message is visible
                setTimeout(() => {
                    setHidden(true); // Hide the span after 4 seconds
                }, 4000);
        }
    }

    return ( 
    <div className=" mb-3 grid-container">
        <p className="trasfer-para">Tranfer DCN! Enter sender wallet Id to whom you want to send DCN and number of DCN to transfer </p>
        <div className=" mb-3 item1">
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text" id="basic-addon3">Sender Id   </span>
                    <input 
                        type="text" 
                        name="reciverIdInput" 
                        className="form-control InputText" 
                        id="basic-url" 
                        aria-describedby="basic-addon3 basic-addon4" 
                        onChange={(event)=>setReceiverId(event.target.value)}
                        value = {receiverId}
                    />
                </div>
            </div>
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text" id="basic-addon3">DCN Amount  </span>
                    <input 
                        type="number" 
                        name="amountInput" 
                        className="form-control InputText" 
                        id="basic-url" 
                        aria-describedby="basic-addon3 basic-addon4"
                        onChange={(event)=>setAmount(event.target.value)}
                        value = {amount}  
                        />        
                    
                </div>          
            </div>
        </div>     
        <div className="item2">
            <button type="button"  onClick={handleOnClick} disabled={isDisable}
            className="btn btn-primary wallet_button">Transfer </button>           
        </div>            
        {!isHidden && <span><br/><br/><center>{isTransferResult}</center></span>}
    </div>
    );}

export default Transfer;
