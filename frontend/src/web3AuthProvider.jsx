// Web3AuthProvider.js
import { createContext, useContext, useState, useEffect } from "react";
import {  WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
// import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";


// Get your clientId from Web3Auth dashboard
const clientId = "BBAfS-R4JfRNNRnh6OyIKrntJ2lI8WyyTUoSL65gfiICus8UFlML3B_IMErJME0jQFrX0exheP1F13WbqO-KqRY";

const chainConfig = {
  chainNamespace: "eip155",
  chainId: "0xA045C", // Chain Id 656476 in hex (Open Campus Codex)
  rpcTarget: "https://rpc.open-campus-codex.gelato.digital",
  displayName: "Open Campus Codex",
  blockExplorer: "https://opencampus-codex.blockscout.com/",
  ticker: "EDU",
  tickerName: "EDU",
}

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {chainConfig}
});

const web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
};

// Create Web3Auth instance
const web3auth = new Web3Auth(web3AuthOptions);

// Configure adapters
// const adapters = getDefaultExternalAdapters({ options: web3AuthOptions });
// adapters.forEach((adapter) => {
//   web3auth.configureAdapter(adapter);
// });

// Create context
const Web3AuthContext = createContext();

export const Web3AuthProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Failed to initialize Web3Auth:", error);
      }
    };

    init();
  }, []);

  const login = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      if (web3auth.connected) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = async () => {
    try {
      await web3auth.logout();
      setProvider(null);
      setLoggedIn(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getUserInfo = async () => {
    try {
      return await web3auth.getUserInfo();
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  };

  return (
    <Web3AuthContext.Provider
      value={{
        provider,
        loggedIn,
        login,
        logout,
        getUserInfo,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  return useContext(Web3AuthContext);
};