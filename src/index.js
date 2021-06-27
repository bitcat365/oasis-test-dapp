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
      window.oasis.requestAccounts().then((accounts) => {
        console.log('dapp=accounts', accounts)
        if (accounts && accounts.address) {
          account = accounts
          address = accounts.address;
          document.getElementById('accounts').innerHTML = address;
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
      if (account.address) {
        getAccountsResults.innerHTML = account.address || 'Not able to get accounts'
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
    let signResult = await window.oasis.signTransaction({
      amount: sendAmountInput.value,
      from: account && account.address || "",
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
    let signResult = await window.oasis.signAddEscrow({
      amount: addEscrowAmountInput.value,
      from: account.address,
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
      if (account && account.address) {
        onboardButton.innerText = 'Connected'
        onboardButton.disabled = true
        document.getElementById('accounts').innerHTML = account.address || "";
      }
    }
  }
  setTimeout(() => {
    getAccount()
  }, 200);

}
window.addEventListener('DOMContentLoaded', initializeOasis)