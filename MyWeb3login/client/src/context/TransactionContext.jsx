import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transaction, setTransaction] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const transactionContract = getEthereumContract();
      const availbaleTransaction =
        await transactionContract.getAllTransaction();
      const strucherdTransaction = availbaleTransaction.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(
          transaction.timestamp.toNumber() * 1000
        ).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / 10 ** 18,
      }));

      console.log("hiitranas", strucherdTransaction);
      setTransaction(strucherdTransaction);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransaction();
      } else {
        console.log("no accounts found");
      }
    } catch (error) {
      console.log(error);
      
      throw new Error("No ehtereum object.");
    }
  };
  const checkIfTransactionExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      throw new Error("No ethereum object.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      refreshPage();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  const disconnectWallet = async () => {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[null]);
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", //21000GWEI
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setIsLoading(true);
      console.log(`Loading -${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success -${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
      refreshPage();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionExist();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
