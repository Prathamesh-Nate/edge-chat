import { createContext, useState, useEffect } from "react";
import Router from "next/router";
import { ChatContractAddress } from "../config";
import ChatAbi from "../backend/build/contracts/ChatContract.json";
import { ethers } from "ethers";
import { toast } from 'react-toastify'; //Use this in place of alert()

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const INFO = 'info';
  const WARNING = 'warning';
  const ERROR = 'error';
  const SUCCESS = 'success';
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showSendButton, setShowSendButton] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [selectedAddr, setSelectedAddr] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [searchAccount, setSearchAccount] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to " + chainId);
      const beresheetChainId = "0x7e6" || "0x7e5";
      if (chainId !== beresheetChainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x7e6',
                chainName: 'BereEVM',
                rpcUrls: ['https://beresheet-evm.jelliedowl.net'],
                nativeCurrency: {
                  name: 'Testnet EDG',
                  symbol: 'tEDG',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://testnet.edgscan.live/'],
              },
            ],
          }); 
          connectWallet();
        } catch (err) {
          console.log("Please connect to Beresheet Test Network");
          setCorrectNetwork(false);
          setNetworkError(true);
        }
        return;
      } else {
        setCorrectNetwork(true);
        setNetworkError(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found accounts: ", accounts);
      setIsUserLoggedIn(true);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Register User from front-end onto the blockchain
  const registerUser = async (event) => {
    event.preventDefault();
    try {
      console.log("Registering user");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chatContract = new ethers.Contract(
          ChatContractAddress,
          ChatAbi.abi,
          signer
        );
        await chatContract
          .registerUser(currentAccount, username, password)
          .then((res) => {
            alert("User Registered successfully");
          });
      } else {
        alert("Please connect to MetaMask");
      }
    } catch (error) {
      alert("Error: User Already Exist!", error);
    }
  };

  // User LogIn from front-end onto the blockchain
  const loginUser = async (event) => {
     setShowMessage(true);
    event.preventDefault();
    try {
      console.log("User LogIn");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chatContract = new ethers.Contract(
          ChatContractAddress,
          ChatAbi.abi,
          signer
        );

        const tx = await chatContract.loginUser(
          currentAccount,
          username,
          password
        ); // 100ms
        const rc = await tx.wait(); // 0ms, as tx is already confirmed
        const event = rc.events.find((event) => event.event === "LoginUser");
        const [isUserLoggedIn] = await event.args;
        console.log(isUserLoggedIn);
        if (isUserLoggedIn) {
          setShowMessage(false);
          console.log("User LoggedIn successfully");
          Router.push("/ChatHome");
        } else {
          setShowMessage(false);
          alert("User LoggedIn failed");
        }
      } else {
        setShowMessage(false);
        alert("Please connect to MetaMask");
      }
    } catch (error) {
      setShowMessage(false);
      console.log("Error: ", error);
    }
  };

  // User LogOut from front-end onto the blockchain
  const logoutUser = async (event) => {
    event.preventDefault();
    try {
      console.log("User LogOut");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chatContract = new ethers.Contract(
          ChatContractAddress,
          ChatAbi.abi,
          signer
        );
        const tx = await chatContract.logoutUser(currentAccount);
        const rc = await tx.wait(); // 0ms, as tx is already confirmed
        const event = rc.events.find((event) => event.event === "LogoutUser");
        const [isUserLoggedIn] = await event.args;
        if (!isUserLoggedIn) {
          console.log("User LoggedOut successfully");
          Router.push("/");
        } else {
          alert("User LoggedOut failed");
        }
      } else {
        alert("Please connect to MetaMask");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // User Search and add friend from front-end onto the blockchain
  const searchAndAddFriend = async (event) => {
    event.preventDefault();
    try {
      console.log("User Search and Add Friend");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chatContract = new ethers.Contract(
          ChatContractAddress,
          ChatAbi.abi,
          signer
        );
        //Check if user exists.
        let boolcheckUser = await chatContract.checkUserExists(searchAccount);
        //If user exists and not adding self as friend.
        if (
          boolcheckUser &&
          searchAccount.toLowerCase() != currentAccount.toLowerCase()
        ) {
          //get the username of the searched account to add as friend.
          let friendUsername = await chatContract.getUsername(searchAccount);
          //check if already friends.
          console.log("friendUsername: ", searchAccount, currentAccount);

          // Add friend to the current user.
          await chatContract
            .addFriend(searchAccount, friendUsername)
            .then((res) => {
              createToastMessage(`Friend Added successfully`, SUCCESS);
            });
        }
        //If user does not exist and not adding self as friend then throw error.
        else {
          if (!boolcheckUser) {
            createToastMessage(`User doesn't exist`, WARNING);
          } else {
            createToastMessage(`Can't add yourself as friend`, WARNING);
          }
        }
      } else {
        createToastMessage(`Please connect to MetaMask.`, INFO);
      }
    } catch (error) {
      createToastMessage(`Error occurred while processing your request.`, ERROR);
    }
  };

  // Show User friends to front-end from the blockchain
  const getMyFriendList = async (event) => {
    try {
      console.log("Show User friends");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chatContract = new ethers.Contract(
          ChatContractAddress,
          ChatAbi.abi,
          signer
        );

        // Add friend to the current user.
        setFriendsList(await chatContract.getMyFriendList());
      } else {
        alert("Please connect to MetaMask");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Show friends Messages to front-end from the blockchain
  const sendMessage = async (friendAddr) => {
    try {
      let input = document.querySelector('#input-field');
      const { ethereum } = window;
      if(input.value) { 
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const chatContract = new ethers.Contract(
            ChatContractAddress,
            ChatAbi.abi,
            signer
          );
  
          // Add friend to the current user.
          await chatContract.sendMessage(selectedAddr, messageInput);
          //clear input text area
          input.value ='';
        } else {
          //don't clear input text area
          alert("Please connect to MetaMask");
        }
      }
    } catch (error) {
      //don't clear input text area
      console.log("Error: ", error);
    }
  };

  // Show friends Messages to front-end from the blockchain
  const showMessages = async (friendAddr) => {
    try {
      console.log("Show User friends");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chatContract = new ethers.Contract(
          ChatContractAddress,
          ChatAbi.abi,
          signer
        );

        // Add friend to the current user.
        setMessagesList(await chatContract.readMessage(friendAddr));
        setSelectedAddr(friendAddr);
      } else {
        alert("Please connect to MetaMask");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // User LogIn from front-end onto the blockchain
  const checkIsUserLogged = async (event) => {
    try {
      console.log("Check User is LoggedIn");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chatContract = new ethers.Contract(
          ChatContractAddress,
          ChatAbi.abi,
          signer
        );
        chatContract.checkIsUserLogged(currentAccount);
      } else {
        alert("Please connect to MetaMask");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleMessageInput = (e) => {
    const messageValue = e.target.value;
    if(messageValue) {
      setMessageInput(messageValue);
      setShowSendButton(true);
    } else{
      setShowSendButton(false);
    }
  }

  const handleSearchInput = (e) => {
    const searchRegex = /^0x[a-zA-Z0-9]{40}$/;
    let searchValue = e.target.value;
    const isValidAddress = searchRegex.test(searchValue);
    console.log('isValidAddress: '+isValidAddress);
    if(isValidAddress){
      setSearchAccount(searchValue)
    }
    else
    setSearchAccount('');
  }

  function createToastMessage(message, type) {
    switch (type) {
      case INFO:
        toast.info(message);
        break;

      case SUCCESS:
        toast.success(message);
        break;

      case WARNING:
        toast.warning(message);
        break;

      case ERROR:
        toast.error(message);
        break;

      default:
        toast(message);
    }
  }

  return (
    <ChatContext.Provider
      value={{
        correctNetwork,
        setCorrectNetwork,
        networkError,
        setNetworkError,
        isUserLoggedIn,
        setIsUserLoggedIn,
        currentAccount,
        setCurrentAccount,
        connectWallet,
        setUsername,
        setPassword,
        registerUser,
        loginUser,
        logoutUser,
        searchAndAddFriend,
        setSearchAccount,
        friendsList,
        getMyFriendList,
        messagesList,
        showMessages,
        setMessageInput,
        sendMessage,
        setSelectedUserName,
        selectedUserName,
        showMessage,
        setShowMessage,
        showSendButton,
        setShowSendButton,
        handleMessageInput,
        handleSearchInput,
        createToastMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
