!function(n){var t={};function d(c){if(t[c])return t[c].exports;var u=t[c]={i:c,l:!1,exports:{}};return n[c].call(u.exports,u,u.exports,d),u.l=!0,u.exports}d.m=n,d.c=t,d.d=function(n,t,c){d.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:c})},d.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},d.t=function(n,t){if(1&t&&(n=d(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var c=Object.create(null);if(d.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var u in n)d.d(c,u,function(t){return n[t]}.bind(null,u));return c},d.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return d.d(t,"a",t),t},d.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},d.p="/Users/lsp-/lsp/workSpace/oasis/oasis-test-dapp/dist",d(d.s=0)}([function(module,exports){eval("let account\n\nconst initializeOasis = async () => {\n  const onboardButton = document.getElementById('connectButton')\n  const getAccountsButton = document.getElementById('getAccounts')\n  const getAccountsResults = document.getElementById('getAccountsResult')\n\n\n  onboardButton.onclick = () => {\n    console.log('onboardButton')\n    if (!window.oasis) {\n      alert(\"请先安装oasis-extension-wallet\")\n    } else {\n      onboardButton.innerText = 'Onboarding in progress'\n      window.oasis.requestAccounts().then((accounts) => {\n        console.log('dapp=accounts', accounts)\n        if (accounts && accounts.address) {\n          account = accounts\n          address = accounts.address;\n          document.getElementById('accounts').innerHTML = address;\n          onboardButton.innerText = 'Connected'\n          onboardButton.disabled = true\n        } else {\n          onboardButton.innerText = accounts.error\n        }\n      })\n        ;\n    }\n  }\n  /**\n   * get account\n   */\n  getAccountsButton.onclick = async () => {\n    if (window.oasis) {\n      account = await window.oasis.getAccounts();\n      if (account.address) {\n        getAccountsResults.innerHTML = account.address || 'Not able to get accounts'\n      }\n    }\n  }\n\n\n  const sendButton = document.getElementById('sendButton')\n  const sendAmountInput = document.getElementById('sendAmountInput')\n  const receiveAddressInput = document.getElementById('receiveAddressInput')\n  const sendResultDisplay = document.getElementById('sendResultDisplay')\n\n  /**\n   * send transfer\n   */\n  sendButton.onclick = async () => {\n    let signResult = await window.oasis.signTransaction({\n      amount: sendAmountInput.value,\n      from: account && account.address || \"\",\n      to: receiveAddressInput.value,\n    })\n    sendResultDisplay.innerHTML = signResult.error || signResult.hash\n  }\n\n\n  /**\n   * add escrow\n   */\n  const addEscrowButton = document.getElementById('addEscrowButton')\n  const addEscrowAmountInput = document.getElementById('addEscrowAmountInput')\n  const vaildatorAddressInput = document.getElementById('vaildatorAddressInput')\n  const addEscrowResultDisplay = document.getElementById('addEscrowResultDisplay')\n\n  addEscrowButton.onclick = async () => {\n    let signResult = await window.oasis.signAddEscrow({\n      amount: addEscrowAmountInput.value,\n      from: account.address,\n      to: vaildatorAddressInput.value,\n    })\n    addEscrowResultDisplay.innerHTML = signResult.error || signResult.hash\n  }\n\n\n  /**\n   * get account from extension\n   */\n  async function getAccount() {\n    if (window.oasis) {\n      account = await window.oasis.getAccounts()\n      if (account && account.address) {\n        onboardButton.innerText = 'Connected'\n        onboardButton.disabled = true\n        document.getElementById('accounts').innerHTML = account.address || \"\";\n      }\n    }\n  }\n  setTimeout(() => {\n    getAccount()\n  }, 200);\n\n}\nwindow.addEventListener('DOMContentLoaded', initializeOasis)//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGFjY291bnRcblxuY29uc3QgaW5pdGlhbGl6ZU9hc2lzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBvbmJvYXJkQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvbm5lY3RCdXR0b24nKVxuICBjb25zdCBnZXRBY2NvdW50c0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZXRBY2NvdW50cycpXG4gIGNvbnN0IGdldEFjY291bnRzUmVzdWx0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZXRBY2NvdW50c1Jlc3VsdCcpXG5cblxuICBvbmJvYXJkQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ29uYm9hcmRCdXR0b24nKVxuICAgIGlmICghd2luZG93Lm9hc2lzKSB7XG4gICAgICBhbGVydChcIuivt+WFiOWuieijhW9hc2lzLWV4dGVuc2lvbi13YWxsZXRcIilcbiAgICB9IGVsc2Uge1xuICAgICAgb25ib2FyZEJ1dHRvbi5pbm5lclRleHQgPSAnT25ib2FyZGluZyBpbiBwcm9ncmVzcydcbiAgICAgIHdpbmRvdy5vYXNpcy5yZXF1ZXN0QWNjb3VudHMoKS50aGVuKChhY2NvdW50cykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZGFwcD1hY2NvdW50cycsIGFjY291bnRzKVxuICAgICAgICBpZiAoYWNjb3VudHMgJiYgYWNjb3VudHMuYWRkcmVzcykge1xuICAgICAgICAgIGFjY291bnQgPSBhY2NvdW50c1xuICAgICAgICAgIGFkZHJlc3MgPSBhY2NvdW50cy5hZGRyZXNzO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhY2NvdW50cycpLmlubmVySFRNTCA9IGFkZHJlc3M7XG4gICAgICAgICAgb25ib2FyZEJ1dHRvbi5pbm5lclRleHQgPSAnQ29ubmVjdGVkJ1xuICAgICAgICAgIG9uYm9hcmRCdXR0b24uZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb25ib2FyZEJ1dHRvbi5pbm5lclRleHQgPSBhY2NvdW50cy5lcnJvclxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgICA7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBnZXQgYWNjb3VudFxuICAgKi9cbiAgZ2V0QWNjb3VudHNCdXR0b24ub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAod2luZG93Lm9hc2lzKSB7XG4gICAgICBhY2NvdW50ID0gYXdhaXQgd2luZG93Lm9hc2lzLmdldEFjY291bnRzKCk7XG4gICAgICBpZiAoYWNjb3VudC5hZGRyZXNzKSB7XG4gICAgICAgIGdldEFjY291bnRzUmVzdWx0cy5pbm5lckhUTUwgPSBhY2NvdW50LmFkZHJlc3MgfHwgJ05vdCBhYmxlIHRvIGdldCBhY2NvdW50cydcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIGNvbnN0IHNlbmRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VuZEJ1dHRvbicpXG4gIGNvbnN0IHNlbmRBbW91bnRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZW5kQW1vdW50SW5wdXQnKVxuICBjb25zdCByZWNlaXZlQWRkcmVzc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlY2VpdmVBZGRyZXNzSW5wdXQnKVxuICBjb25zdCBzZW5kUmVzdWx0RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZW5kUmVzdWx0RGlzcGxheScpXG5cbiAgLyoqXG4gICAqIHNlbmQgdHJhbnNmZXJcbiAgICovXG4gIHNlbmRCdXR0b24ub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgc2lnblJlc3VsdCA9IGF3YWl0IHdpbmRvdy5vYXNpcy5zaWduVHJhbnNhY3Rpb24oe1xuICAgICAgYW1vdW50OiBzZW5kQW1vdW50SW5wdXQudmFsdWUsXG4gICAgICBmcm9tOiBhY2NvdW50ICYmIGFjY291bnQuYWRkcmVzcyB8fCBcIlwiLFxuICAgICAgdG86IHJlY2VpdmVBZGRyZXNzSW5wdXQudmFsdWUsXG4gICAgfSlcbiAgICBzZW5kUmVzdWx0RGlzcGxheS5pbm5lckhUTUwgPSBzaWduUmVzdWx0LmVycm9yIHx8IHNpZ25SZXN1bHQuaGFzaFxuICB9XG5cblxuICAvKipcbiAgICogYWRkIGVzY3Jvd1xuICAgKi9cbiAgY29uc3QgYWRkRXNjcm93QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZEVzY3Jvd0J1dHRvbicpXG4gIGNvbnN0IGFkZEVzY3Jvd0Ftb3VudElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZEVzY3Jvd0Ftb3VudElucHV0JylcbiAgY29uc3QgdmFpbGRhdG9yQWRkcmVzc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZhaWxkYXRvckFkZHJlc3NJbnB1dCcpXG4gIGNvbnN0IGFkZEVzY3Jvd1Jlc3VsdERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkRXNjcm93UmVzdWx0RGlzcGxheScpXG5cbiAgYWRkRXNjcm93QnV0dG9uLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgbGV0IHNpZ25SZXN1bHQgPSBhd2FpdCB3aW5kb3cub2FzaXMuc2lnbkFkZEVzY3Jvdyh7XG4gICAgICBhbW91bnQ6IGFkZEVzY3Jvd0Ftb3VudElucHV0LnZhbHVlLFxuICAgICAgZnJvbTogYWNjb3VudC5hZGRyZXNzLFxuICAgICAgdG86IHZhaWxkYXRvckFkZHJlc3NJbnB1dC52YWx1ZSxcbiAgICB9KVxuICAgIGFkZEVzY3Jvd1Jlc3VsdERpc3BsYXkuaW5uZXJIVE1MID0gc2lnblJlc3VsdC5lcnJvciB8fCBzaWduUmVzdWx0Lmhhc2hcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGdldCBhY2NvdW50IGZyb20gZXh0ZW5zaW9uXG4gICAqL1xuICBhc3luYyBmdW5jdGlvbiBnZXRBY2NvdW50KCkge1xuICAgIGlmICh3aW5kb3cub2FzaXMpIHtcbiAgICAgIGFjY291bnQgPSBhd2FpdCB3aW5kb3cub2FzaXMuZ2V0QWNjb3VudHMoKVxuICAgICAgaWYgKGFjY291bnQgJiYgYWNjb3VudC5hZGRyZXNzKSB7XG4gICAgICAgIG9uYm9hcmRCdXR0b24uaW5uZXJUZXh0ID0gJ0Nvbm5lY3RlZCdcbiAgICAgICAgb25ib2FyZEJ1dHRvbi5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FjY291bnRzJykuaW5uZXJIVE1MID0gYWNjb3VudC5hZGRyZXNzIHx8IFwiXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGdldEFjY291bnQoKVxuICB9LCAyMDApO1xuXG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXRpYWxpemVPYXNpcykiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n")}]);