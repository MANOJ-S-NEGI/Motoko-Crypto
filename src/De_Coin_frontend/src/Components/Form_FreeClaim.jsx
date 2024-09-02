import React, { useState } from "react";
import { De_Coin_backend,createActor } from 'declarations/De_Coin_backend';
//import {AuthClient} from '@dfinity/auth-client';

function Claim(props) {
    let [isDisable,setDisable] = useState(false);
    let [isButtonText, setButtonText] = useState("Claim DCN");

    async function handleClaim(){
        setDisable(true);
        /*
        const authClient = await AuthClient.create();        
        // At this point we're authenticated, and we can get the identity from the auth client:
        const identity = authClient.getIdentity();
        
        // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
        const agent = new HttpAgent({ identity });

        // Using the interface description of our webapp, we create an actor that we use to call the service methods.
        //const webapp = Actor.createActor(webapp_idl, { identity, canisterId, });
        const authenticatedCanister = createActor(canisterId,{
            agentOptions: {
             identity,
            },});        
        let result = await authenticatedCanister.bonusCoin();  */

        let result = await De_Coin_backend.bonusCoin();
        console.log(result);
        setButtonText(result);
    }
    return (
    <div>
        <fieldset className="free-claim-fieldset">
            <h3>Bonus Coins</h3>
            <p>Get 2 DCN bonus coins in your wallet Account: {props.userPrincipal}! Click on Claim DCN button. </p>
        </fieldset>
        <button disabled={isDisable} 
                type = "submit"
                onClick={handleClaim}
                className="btn btn-primary wallet_button">{isButtonText}
        </button>   
    </div>
    );
};
export default  Claim;
