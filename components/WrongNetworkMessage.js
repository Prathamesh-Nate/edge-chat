const WrongNetworkMessage = () => (
  <div className="card">
    <div className="mockup-code">
      {/* Prompt to change network to Rinkeby */}
      <pre data-prefix="1"><code>Connecting to Edgeware Beresheet...</code></pre>
      <pre data-prefix="2"><code>Error! Retrying...</code></pre>
      <pre data-prefix="3" class="bg-warning text-warning-content"><code>Please connect to the Edgeware Beresheet</code></pre>
      <pre data-prefix="4" class="bg-warning text-warning-content"><code>and reload the page</code></pre>
    </div>
  </div>
);

export default WrongNetworkMessage;
