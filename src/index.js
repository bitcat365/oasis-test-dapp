
// @ts-nocheck
import * as oasis from '@oasisprotocol/client';
import * as oasisExt from '@oasisprotocol/client-ext-utils';

const haveInterActive = false
const extPath = haveInterActive ? '/oasis-xu-frame.html?test_noninteractive=1' : undefined;

function toBase64(/** @type {Uint8Array} */ u8) {
  return btoa(String.fromCharCode.apply(null, u8));
}

function hex2uint(hex) {
  return new Uint8Array(Buffer.from(hex, 'hex'))
}
function uint2hex(uint) {
  return Buffer.from(uint).toString('hex')
}

async function publicKeyToAddress(keyObj){
  let address
  let public_key = keyObj && keyObj.metadata.public_key || ""
  if (public_key) {
    const data = await oasis.staking.addressFromPublicKey(public_key)
    address = oasis.staking.addressToBech32(data)
    account.public_key = public_key
    account.address = address
  }
  
  return address
}

/**
 * use grpc get nonce
 * @param {*} address 
 */
async function getNonce(address) {
  const oasisClient = getOasisClient()
  let publicKey = await oasis.staking.addressFromBech32(address)
  const nonce = await oasisClient.consensusGetSignerNonce({
    account_address: publicKey,
    height: oasis.consensus.HEIGHT_LATEST
  });
  return nonce
}
/**
 * use grpc get nonce
 * @param {*} address 
 */
async function getUseBalance(address) {
  const oasisClient = getOasisClient()
  let shortKey = await oasis.staking.addressFromBech32(address)
  let height = oasis.consensus.HEIGHT_LATEST
  let account = await oasisClient.stakingAccount({ height: height, owner: shortKey, }).catch((err) => err)
  let balance = account&&account.general&&account.general.balance || 0
  if(balance){
    balance = oasis.quantity.toBigInt(balance).toString()
  }
  let nonce = account&&account.general&&account.general.nonce || 0
  return { balance, nonce }
}
/**
 * get grpc client
 * @returns 
 */
function getOasisClient() {
  const oasisClient = new oasis.client.NodeInternal('https://grpc-testnet.oasisscan.com')
  // ("https://grpc-testnet.oasisscan.com")
  return oasisClient
}
// ========================================================================
/**
 * 获取html div
 */


/** top account detail */
const accountsDiv = document.getElementById('accounts')
const balanceDiv = document.getElementById('balance')
const nonceDiv = document.getElementById('nonce')


/** connect and get account */
 const onboardButton = document.getElementById('connectButton')
 const getAccountsButton = document.getElementById('getAccounts')
 const accountsResults = document.getElementById('getAccountsResult')


/** send  transaction*/
 const sendButton2 = document.getElementById('sendButton')
 const sendAmountInput = document.getElementById('sendAmountInput')
 const receiveAddressInput = document.getElementById('receiveAddressInput')

 const sendNonceInput = document.getElementById('sendNonceInput')
 const sendResultDisplay = document.getElementById('sendResultDisplay')



 /** add escrow about */
 const addEscrowButton = document.getElementById('addEscrowButton')
 const addEscrowAmountInput = document.getElementById('addEscrowAmountInput')
 const vaildatorAddressInput = document.getElementById('vaildatorAddressInput')
 const addEscrowResultDisplay = document.getElementById('addEscrowResultDisplay')

 const stakeNonceInput = document.getElementById('stakeNonceInput')
 const stakeFeeGasInput = document.getElementById('stakeFeeGasInput')
 const stakeFeeAmountInput = document.getElementById('stakeFeeAmountInput')


//==============================================================================



let connection
let account = {}
const playground = (async function () {


  function watchKeys(conn) {
    oasisExt.keys.setKeysChangeHandler(conn, async (event) => {
      setAccountDetailClear()
      // 拿到新的key后更新 当前账户及别的
  
      let keys = event.keys
      if(keys.length>0){
        let address = await publicKeyToAddress(keys[0])
        accountsResults.innerHTML = address || 'Not able to get accounts'
        await setAccountDetail(address)
      }
  });
  }
  

  // 1,点击connect 去连接账户
  // 2，如果有connect ，则可以点击获取账户


  // 3，输入转账金额和收款地址 
  // 获取签名者
  // 打包交易
  // 4，签名
  let extensionId = "ppdadbejkmjnefldpcdjhnkpbjkikoip"
  // "aeiciliacehpifhikhkgkmohihocgain"//"fdkfkdobkkgngljecckfaeiabkinnnij"

  const extension_url = "chrome-extension://" + extensionId

  // blgopabeahlgefobchbgbkekajmbnfmh   ext
  // fdkfkdobkkgngljecckfaeiabkinnnij     my ext


  onboardButton.onclick = async () => {
    // todo 1 如何判断已经安装插件
    if (!connection) {
      // alert("请先安装oasis-extension-wallet")
      onboardButton.innerText = 'Onboarding in progress'
      connection = await oasisExt.connection.connect(extension_url, extPath);
      if (connection) {
        watchKeys(connection);

        onboardButton.innerText = 'Connected'
        onboardButton.disabled = true
      } else {
        onboardButton.innerText = 'Connect'
        onboardButton.disabled = false
      }
    } else {
      onboardButton.innerText = 'Connected'
      onboardButton.disabled = true
    }
  }

  function setAccountDetailClear() {
    accountsDiv.innerHTML = ""
    accountsResults.innerHTML = "" 

    balanceDiv.innerHTML = "0"
    nonceDiv.innerHTML = "null"
  }
  async function setAccountDetail(address) {

    accountsDiv.innerHTML = address
    let accountDetail = await getUseBalance(address)

    balanceDiv.innerHTML = accountDetail.balance / 1e9
    nonceDiv.innerHTML = accountDetail.nonce
  }
  /**
   * get account
   */
  getAccountsButton.onclick = async () => {
    if (connection) {
      const keys = await oasisExt.keys.list(connection)
        .catch(err => err);
      let result
      if (keys.length > 0) {
        result = keys[0]
        result = await publicKeyToAddress(result)
        setAccountDetail(result)
        // 授权完账后就开始渲染账户情况
        // 获取账户余额 和nonce  然后显示在页面上
        // nonce 显示在输入框里 和html外面
        accountsResults.innerHTML = result || 'Not able to get accounts'
      } else {
        result = keys.error
        accountsResults.innerHTML = result || 'Not able to get accounts'
      }
    }
  }



  /**
   * send transfer
   */
  sendButton2.onclick = async () => {
    try {
      // 设置转账金额
      // 设置收款金额
      // 设置nonce
      // 设置feeGas
      // 设置feeAmount
      let from = account && account.address ? account.address : ""
      const signer = await oasisExt.signature.ExtContextSigner.request(connection, from).catch(err => err);
      if (signer.error) {
        alert(signer.error)
        return
      }
      //第四步 公钥
      const publicKey = signer.public();

      const oasisClient = getOasisClient()
      let accountDetail = await getUseBalance(from)
      //第五步 获取收款地址

      let sendAmount = sendAmountInput.value || 3*1e9
      sendAmount = oasis.quantity.fromBigInt(sendAmount)

      let receiveAddress = receiveAddressInput.value || "oasis1qzaa7s3df8ztgdryn8u8zdsc8zx0drqsa5eynmam"
      receiveAddress = await oasis.staking.addressFromBech32(receiveAddress)

      let sendNonce = sendNonceInput.value || accountDetail.nonce


      let sendFeeAmount = 0n

      const tw = oasis.staking.transferWrapper()
      tw.setNonce(sendNonce)

      let lastFeeAmount = sendFeeAmount
      tw.setFeeAmount(oasis.quantity.fromBigInt(BigInt(lastFeeAmount)))

      tw.setBody({
        to: receiveAddress,
        amount: sendAmount,
      })
      let feeGas = await tw.estimateGas(oasisClient, publicKey)
      let sendFeeGas = feeGas
      tw.setFeeGas(sendFeeGas)

      let chainContext = await oasisClient.consensusGetChainContext()
      await tw.sign(signer, chainContext)

      try {
        await tw.submit(oasisClient);
      } catch (e) {
        console.error('submit failed', e);
        throw e;
      }

      let hash = await tw.hash()

      sendResultDisplay.innerHTML = hash || ''
    } catch (error) {
      sendResultDisplay.innerHTML = error || ''
    }
  }


  /**
   * add escrow
   */

  addEscrowButton.onclick = async () => {

    let from = account && account.address ? account.address : ""
    const signer = await oasisExt.signature.ExtContextSigner.request(connection, from).catch(err => err);
    if (signer.error) {
      alert(signer.error)
      return
    }
    //第四步 公钥
    const publicKey = signer.public();

    const oasisClient = getOasisClient()
    let accountDetail = await getUseBalance(from)
    //第五步 获取收款地址

    let addEscrowAmount = addEscrowAmountInput.value || 100*1e9
    addEscrowAmount = oasis.quantity.fromBigInt(addEscrowAmount)

    let vaildatorAddress = vaildatorAddressInput.value || "oasis1qqv25adrld8jjquzxzg769689lgf9jxvwgjs8tha"
    vaildatorAddress = await oasis.staking.addressFromBech32(vaildatorAddress)

    let sendNonce = stakeNonceInput.value || accountDetail.nonce


    let sendFeeAmount = 0n

    const tw = oasis.staking.addEscrowWrapper()
    tw.setNonce(sendNonce)

    let lastFeeAmount = sendFeeAmount
    tw.setFeeAmount(oasis.quantity.fromBigInt(BigInt(lastFeeAmount)))

    tw.setBody({
      account: vaildatorAddress,
      amount: addEscrowAmount,
    })
    let feeGas = await tw.estimateGas(oasisClient, publicKey)
    let sendFeeGas = feeGas
    tw.setFeeGas(sendFeeGas)

    let chainContext = await oasisClient.consensusGetChainContext()
    await tw.sign(signer, chainContext)

    try {
      await tw.submit(oasisClient);
    } catch (e) {
      console.error('submit failed', e);
      throw e;
    }

    let hash = await tw.hash()

    addEscrowResultDisplay.innerHTML = hash || ''
  }
})();

playground.catch((e) => {
  console.error(e);
});