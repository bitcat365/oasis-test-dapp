let account

const initializeOasis = async () => {
  const onboardButton = document.getElementById('connectButton')
  const getAccountsButton = document.getElementById('getAccounts')
  const getAccountsResults = document.getElementById('getAccountsResult')


  onboardButton.onclick = () => {
    console.log('onboardButton')
    if (!window.oasis) {
      alert("请先安装oasis-extension-wallet")
    } else {
      onboardButton.innerText = 'Onboarding in progress'
      window.oasis.requestAccounts().then((approveAccount) => {
        if (Array.isArray(approveAccount) && approveAccount.length > 0) {
          account = approveAccount
          document.getElementById('accounts').innerHTML = approveAccount;
          onboardButton.innerText = 'Connected'
          onboardButton.disabled = true
        } else {
          onboardButton.innerText = accounts.error
        }
      })
        ;
    }
  }
  /**
   * get account
   */
  getAccountsButton.onclick = async () => {
    if (window.oasis) {
      account = await window.oasis.getAccounts();
      if (Array.isArray(account) && account.length > 0) {
        getAccountsResults.innerHTML = account || 'Not able to get accounts'
      }
    }
  }


  const sendButton = document.getElementById('sendButton')
  const sendAmountInput = document.getElementById('sendAmountInput')
  const receiveAddressInput = document.getElementById('receiveAddressInput')
  const sendResultDisplay = document.getElementById('sendResultDisplay')

  /**
   * send transfer
   */
  sendButton.onclick = async () => {
    let from = account && account.length > 0 ? account[0] : ""
    let signResult = await window.oasis.signTransaction({
      amount: sendAmountInput.value,
      from: from,
      to: receiveAddressInput.value,
    })
    sendResultDisplay.innerHTML = signResult.error || signResult.hash
  }


  /**
   * add escrow
   */
  const addEscrowButton = document.getElementById('addEscrowButton')
  const addEscrowAmountInput = document.getElementById('addEscrowAmountInput')
  const vaildatorAddressInput = document.getElementById('vaildatorAddressInput')
  const addEscrowResultDisplay = document.getElementById('addEscrowResultDisplay')

  addEscrowButton.onclick = async () => {
    let from = account && account.length > 0 ? account[0] : ""
    let signResult = await window.oasis.signAddEscrow({
      amount: addEscrowAmountInput.value,
      from: from,
      to: vaildatorAddressInput.value,
    })
    addEscrowResultDisplay.innerHTML = signResult.error || signResult.hash
  }


  /**
   * get account from extension
   */
  async function getAccount() {
    if (window.oasis) {
      account = await window.oasis.getAccounts()
      if (Array.isArray(account) && account.length > 0) {
        onboardButton.innerText = 'Connected'
        onboardButton.disabled = true
        document.getElementById('accounts').innerHTML = account[0] || "";
      }
    }
  }
  setTimeout(() => {
    getAccount()
    if (window.oasis) {
      window.oasis.onAccountChange('accountsChanged', handleNewAccounts);
    }
  }, 200);

  function handleNewAccounts(newAccounts) {
    if (Array.isArray(newAccounts)) {
      document.getElementById('accounts').innerHTML = newAccounts;
      if(newAccounts.length===0){
        onboardButton.innerText = 'Connect'
        onboardButton.disabled = false
      }
    }
  }


  function handleNewChain(chainId) {
    // chainIdDiv.innerHTML = chainId;
  }
  function handleNewNetwork(networkId) {
    // networkDiv.innerHTML = networkId;
  }
  // window.oasis.on('chainChanged', handleNewChain);//处理 更改链
  // window.oasis.on('networkChanged', handleNewNetwork);//处理 网络更改
}
window.addEventListener('DOMContentLoaded', initializeOasis)