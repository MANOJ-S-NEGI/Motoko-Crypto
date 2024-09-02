import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import './index.scss';
import {AuthClient} from '@dfinity/auth-client';

const init = async () => {
  const authClient = await AuthClient.create();


  if (await authClient.isAuthenticated()) {
    console.log("logged In");
    handleAuthenticated();
  } 
  else {
    console.log("logIn progess..");
    await authClient.login({      
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handleAuthenticated();
      }
    });
  }
};

//for local network
async function handleAuthenticated() {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />,
    </React.StrictMode>,
  );
}

/* //for icn
async function handleAuthenticated(authClient) {
  const identity = await authClient.getIdentity();
  const userPrincipal = identity._principal.toString();
  console.log(userPrincipal);
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App loggedInPrincipal={userPrincipal} />,
    </React.StrictMode>,
  );
}
*/

init();