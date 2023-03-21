const ConnectWalletButton = ({ connectWallet }) => (
  <div className="form-container">
    <button
      className="bg-[#102770] text-white p-6 rounded-xl font-bold text-2xl cursor-pointer outline outline-1 outline-red-300"
      // Add an onClick functionality
      onClick={connectWallet}
    >
      Connect Wallet
    </button>
  </div>
);

export default ConnectWalletButton;
