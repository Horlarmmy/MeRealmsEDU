// NavBar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, CircleUserRound } from "lucide-react";
import { toast } from "react-toastify";
import { useWeb3Auth } from "../web3AuthProvider"; // Update path as needed
import RPC from "../ethersRPC"; // Ensure this file exists or replace it with your own RPC implementation

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  // Access Web3Auth context
  const { provider, loggedIn, login, logout, getUserInfo } = useWeb3Auth();

  // UI Console for logging outputs
  const uiConsole = (...args) => {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
    console.log(...args);
  };

  // Copy wallet address to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast("Wallet address copied to clipboard");
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigate to user profile
  const navigateToUserProfile = () => {
    if (!loggedIn) {
      uiConsole("User not logged in.");
      return;
    }
    navigate(`/profile/${walletAddress}`, { state: { walletAddress } });
  };

  // Get Ethereum accounts

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("Provider not initialized yet.");
      return;
    }
    try {
      const accounts = await RPC.getAccounts(provider);
      setWalletAddress(accounts);
      uiConsole(accounts);
    } catch (error) {
      uiConsole("Error fetching accounts:", error.message);
    }
  };

  getAccounts();

  // Get wallet balance
  const getBalance = async () => {
    if (!provider) {
      uiConsole("Provider not initialized yet.");
      return;
    }
    try {
      const balance = await RPC.getBalance(provider);
      uiConsole(balance);
    } catch (error) {
      uiConsole("Error fetching balance:", error.message);
    }
  };

  // Sign a message
  const signMessage = async () => {
    if (!provider) {
      uiConsole("Provider not initialized yet.");
      return;
    }
    try {
      const signedMessage = await RPC.signMessage(provider);
      uiConsole(signedMessage);
    } catch (error) {
      uiConsole("Error signing message:", error.message);
    }
  };

  // Send a transaction
  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("Provider not initialized yet.");
      return;
    }
    try {
      uiConsole("Sending transaction...");
      const transactionReceipt = await RPC.sendTransaction(provider);
      uiConsole(transactionReceipt);
    } catch (error) {
      uiConsole("Error sending transaction:", error.message);
    }
  };

  return (
    <nav className="lg:relative bg-black/30 px-8 py-4">
      {/* Logo and Brand Name */}
      <div className="flex justify-between mx-auto items-center max-w-[1500px]">
        <Link to="/">
          <motion.div
            whileHover={{
              scale: 1.1,
            }}
            className="flex items-center space-x-2"
          >
            <p className="border-cyan-700 font-extrabold text-xl">
              Me<span className="text-[#4782E0]">Realms</span>
            </p>
          </motion.div>
        </Link>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-white hover:text-[#F5167E] focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-black/30 md:bg-transparent p-4 md:p-0 z-10`}
        >
          {/* Mobile Search */}
          <div className="block sm:hidden items-center space-x-2 bg-[#2d2d35] px-4 py-2 mb-3 w-[300px] hover:border-gray-500 focus-within:border-gray-500 transition-colors rounded-md">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#2d2d35] text-white px-4 py-1 rounded-l-md focus:outline-none w-full"
            />
          </div>

          {/* Chain Display - Optional to show which chain is connected */}
          {loggedIn && (
            <div className="bg-[#2d2d35] text-white px-4 py-2 rounded-md">
              Open Campus Codex
            </div>
          )}

          {/* Wallet Address Button */}
          {loggedIn ? (
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <button
                // onClick={() => copyToClipboard(walletAddress)}
                className="bg-[#4885e7] transition-colors duration-200 text-white px-4 py-3 text-md rounded-md hover:bg-[#4782E0]"
              >
                {/* {walletAddress?.slice(0, 8)}...{walletAddress?.slice(-5)} */}
                Welcome
              </button>
              <motion.div whileHover={{ scale: 1.1 }}>
                <LogOut
                  size={36}
                  onClick={logout}
                  style={{ marginLeft: 5, color: "red", cursor: "pointer" }}
                />
              </motion.div>
              <button
                className="p-2 ml-6 hover:bg-gray-800 rounded-full transition-colors"
                onClick={navigateToUserProfile}
              >
                <CircleUserRound
                  className="text-[#4885e7] cursor-pointer"
                  size={36}
                />
              </button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-[#4885e7] transition-colors duration-200 text-white px-4 py-3 text-md rounded-md hover:bg-[#4782E0]"
              onClick={login}
              disabled={loggedIn}
            >
              Connect Wallet
            </motion.button>
          )}

          {/* Additional Actions */}
          {loggedIn && (
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
              <button
                className="bg-[#4885e7] text-white px-4 py-2 rounded-md hover:bg-[#4782E0]"
                onClick={getAccounts}
              >
                Get Accounts
              </button>
              <button
                className="bg-[#4885e7] text-white px-4 py-2 rounded-md hover:bg-[#4782E0]"
                onClick={getBalance}
              >
                Get Balance
              </button>
              <button
                className="bg-[#4885e7] text-white px-4 py-2 rounded-md hover:bg-[#4782E0]"
                onClick={signMessage}
              >
                Sign Message
              </button>
              <button
                className="bg-[#4885e7] text-white px-4 py-2 rounded-md hover:bg-[#4782E0]"
                onClick={sendTransaction}
              >
                Send Transaction
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
