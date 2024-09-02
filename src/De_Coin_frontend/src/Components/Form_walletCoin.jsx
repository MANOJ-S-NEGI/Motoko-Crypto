import React, { useState } from "react";
import { De_Coin_backend } from 'declarations/De_Coin_backend';
import { Principal } from '@dfinity/principal';

function FormFunction() {
    const [input, setInput] = useState("");
    const [balance, setBalance] = useState(null);
    const [isHidden, setHidden] = useState(true);

    async function handleInputChange(event) {
        setInput(event.target.value);
    }

    async function handleClick() {
        if (input) {
            try {
                let pid = Principal.fromText(input);
                const wallBalance = await De_Coin_backend.balanceIn(pid);
                let wallBal = wallBalance.toString();
                setBalance("Your Wallet Balance: " + wallBal + " DCN");
                setInput("");
                setHidden(false);
                setTimeout(() => {
                    setHidden(true); // Hide the span after 4 seconds
                }, 4000);

            } catch (error) {
                console.error("Error fetching balance:", error);
                setBalance("Enter Valid Wallet Address");
                setHidden(false); // Ensure the error message is visible
                setTimeout(() => {
                    setHidden(true); // Hide the span after 4 seconds
                }, 4000);
            }
        } else {
            setBalance("Provide Wallet ID");
            setHidden(false); // Ensure the error message is visible
            setTimeout(() => {
                setHidden(true); // Hide the span after 4 seconds
            }, 4000);
        }
    }

    return (
        <div>
            <span>Check Account DCN Coins<br/><br/></span>
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text" id="basic-addon3">Wallet ID</span>
                    <input 
                        type="text" 
                        name="pidInput" 
                        className="form-control InputText" 
                        id="basic-url" 
                        aria-describedby="basic-addon3 basic-addon4" 
                        onChange={handleInputChange}
                        value={input}
                    />
                </div>
            </div>
            <button onClick={handleClick} type="button" className="btn btn-primary wallet_button">Check Wallet</button>
            {!isHidden && <span><br/><br/><center>{balance}</center></span>}
        </div>
    );
}

export default FormFunction;
