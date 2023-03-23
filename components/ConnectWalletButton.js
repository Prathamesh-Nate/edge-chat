const ConnectWalletButton = ({ connectWallet }) => (
  <div className="form-container">
    <button
      className="btn btn-wide btn-primary "
      // Add an onClick functionality
      onClick={connectWallet}
    >
      Connect Wallet
    </button>
  </div>
);

export default ConnectWalletButton;
