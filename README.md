<p align="center">
  <img src="https://raw.githubusercontent.com/00impera/eurocoin-website/main/logo.png" alt="EUROSPACE" width="120" />
</p>

<h1 align="center">EUROSPACE</h1>
<p align="center">
  <b>Meta EuroCoin Presale & DEX on Monad Mainnet</b><br>
  <a href="https://d41e7edc.eurocoin-website.pages.dev/">🌐 Live dApp</a>
</p>

---

## 🌟 About

**EUROSPACE** is a next-generation DeFi dApp on Monad Mainnet, featuring:
- Meta EuroCoin presale (on-chain, instant delivery)
- EVM swaps (MON → 17 Meta Tokens)
- DEX price tracking
- NEAR Intents cross-chain swaps
- WalletConnect, MetaMask, Trust, Coinbase, Phantom, and NEAR wallet support

---

## 🚀 Live dApp

👉 [https://d41e7edc.eurocoin-website.pages.dev/](https://d41e7edc.eurocoin-website.pages.dev/)

---

## 📊 Token Information

- **Token Name:** Meta EuroCoin
- **Symbol:** EURO
- **Total Supply:** 1,000,000 EURO
- **Network:** Monad Mainnet (Chain ID: 143)
- **Token Contract:** [`0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79`](https://monad.socialscan.io/address/0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79)
- **Presale Owner:** [`0x592B35c8917eD36c39Ef73D0F5e92B0173560b2e`](https://monad.socialscan.io/address/0x592B35c8917eD36c39Ef73D0F5e92B0173560b2e)

---

## 🎯 Features

- 🟢 **Presale:** Buy EURO directly with MON (no router, no slippage)
- ⚡ **EVM Swap:** Swap MON for 17 Meta Tokens in one click
- 💱 **DEX Live:** Real-time price tracking for all pairs
- 🌉 **NEAR Intents:** Cross-chain swaps (ETH, BTC, SOL, USDC → EURO)
- 🦊 **Wallet Support:** MetaMask, WalletConnect, Trust, Coinbase, Phantom, NEAR
- 📈 **Live Stats:** Total supply, tokens per MON, presale status
- 🧾 **Transaction History:** See your session's swaps and buys
- 🖼️ **Gallery:** Tap any token to buy/sell instantly

---

## 🛡️ Smart Contracts

- **EURO Token:**  
  `0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79`  
  [View on Monad Explorer](https://monad.socialscan.io/address/0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79)

- **All Meta Tokens:**  
  See the [ALL_PAIRS](#) list in the code for all contract addresses.

---

## 📝 How to Use

1. **Connect your wallet** (MetaMask, WalletConnect, Trust, Coinbase, Phantom, NEAR)
2. **Switch to Monad Mainnet** (Chain ID 143)
3. **Buy EURO** in the presale tab (enter MON amount, click Buy)
4. **Swap MON for Meta Tokens** in the EVM Swap tab
5. **Track prices** in the DEX Live tab
6. **Swap cross-chain** via NEAR Intents in the Swap tab
7. **View your transaction history** in the History tab

---

## 💻 Developer Info

- **Frontend:** React, [thirdweb React SDK](https://portal.thirdweb.com/react), custom CSS
- **Contracts:** Solidity, OpenZeppelin, custom presale logic
- **Cross-chain:** NEAR Intents API
- **Live price:** On-chain reserves via `eth_call`

### Main dApp Entrypoint

```jsx
import { ThirdwebProvider } from "thirdweb/react";
import EurospaceApp from "./EurospaceApp";

export default function EurospacePage() {
  return <ThirdwebProvider><EurospaceApp/></ThirdwebProvider>;
}
