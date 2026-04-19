<p align="center">
  <img src="https://raw.githubusercontent.com/00impera/eurocoin-website/c33247d444a202a1a3205acc7b3f059d4a884c15/logo.png" alt="EUROSPACE" width="140" />
</p>

<h1 align="center">⬡ EUROSPACE</h1>

<p align="center">
  <b>Meta EuroCoin Presale · EVM Swap · DEX · NEAR Intents</b><br/>
  <sub>Powered by Monad Mainnet · Chain ID 143</sub>
</p>

<p align="center">
  <a href="https://d41e7edc.eurocoin-website.pages.dev/">
    <img src="https://img.shields.io/badge/🌐%20Live%20dApp-Visit%20Now-2563eb?style=for-the-badge&logoColor=white" alt="Live dApp"/>
  </a>
  &nbsp;
  <a href="https://monad.socialscan.io/address/0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79">
    <img src="https://img.shields.io/badge/🔍%20Contract-Monad%20Explorer-00ff88?style=for-the-badge" alt="Contract"/>
  </a>
</p>

<p align="center">
  <a href="https://x.com/bnbgold277983">
    <img src="https://img.shields.io/badge/𝕏%20Twitter-Follow-000000?style=flat-square&logo=x&logoColor=white" alt="Twitter"/>
  </a>
  &nbsp;
  <a href="https://discord.com/channels/1316093079090106472">
    <img src="https://img.shields.io/badge/Discord-Join-7289da?style=flat-square&logo=discord&logoColor=white" alt="Discord"/>
  </a>
  &nbsp;
  <a href="https://t.me/eurocoin_monad_bot">
    <img src="https://img.shields.io/badge/Telegram-Bot-29aae1?style=flat-square&logo=telegram&logoColor=white" alt="Telegram"/>
  </a>
</p>

---

## 🌟 About

**EUROSPACE** is a next-generation DeFi platform on **Monad Mainnet**, combining a live presale, an EVM multi-token swap, real-time DEX price tracking, and cross-chain swaps via NEAR Intents — all in a single cyberpunk dApp.

> Presale ends **April 18, 2027** · Instant on-chain token delivery · No middlemen

---

## 🚀 Live dApp

👉 **[https://d41e7edc.eurocoin-website.pages.dev/](https://d41e7edc.eurocoin-website.pages.dev/)**

---

## 📊 Token Information

| Field | Value |
|---|---|
| **Token Name** | Meta EuroCoin |
| **Symbol** | `EURO` |
| **Network** | Monad Mainnet |
| **Chain ID** | `143` |
| **Token Contract** | [`0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79`](https://monad.socialscan.io/address/0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79) |
| **Presale Owner** | [`0x592B35c8917eD36c39Ef73D0F5e92B0173560b2e`](https://monad.socialscan.io/address/0x592B35c8917eD36c39Ef73D0F5e92B0173560b2e) |
| **RPC** | `https://rpc.monad.xyz` |

---

## 🎯 Features

| Feature | Description |
|---|---|
| 🟢 **Presale** | Buy EURO directly with MON — no router, no slippage, instant delivery |
| ⚡ **EVM Swap** | Swap MON → any of 17 Meta Tokens in one click |
| 💱 **DEX Live** | Real-time on-chain price tracking for all 17 pairs |
| 🌉 **NEAR Intents** | Cross-chain swaps: ETH, BTC, SOL, USDC → EURO |
| 🦊 **Wallet Support** | MetaMask, WalletConnect, Trust, Coinbase, Phantom, NEAR |
| 📈 **Live Stats** | Total supply, tokens per MON, presale open/closed status |
| 🧾 **Tx History** | Session-based buy/sell transaction log with explorer links |
| 🖼️ **Token Gallery** | Tap any of 17 tokens to buy or sell instantly |
| ⏳ **Countdown** | Live presale countdown timer with progress bar |

---

## 🏦 17 Meta Tokens

| Symbol | Name | Category |
|---|---|---|
| EURO | Meta EuroCoin | Euro |
| mBTC | Meta Bitcoin | Crypto |
| mETH | Meta Ethereum | Crypto |
| mSOL | Meta Solana | Crypto |
| mBNB | Meta BNB | Crypto |
| mXRP | Meta XRP | Crypto |
| mUSDC | Meta USDC | Stable |
| mUSDT | Meta Tether | Stable |
| mMATIC | Meta Polygon | Crypto |
| mDOGE | Meta Dogecoin | Crypto |
| mLTC | Meta Litecoin | Crypto |
| mTRX | Meta TRON | Crypto |
| mBASE | Meta Base | Crypto |
| mEURO | Meta Euro | Euro |
| mMONAD | Meta Monad | Crypto |
| mEURC | Meta EURC | Euro |
| mCRO | Meta Cronos | Crypto |

---

## 🛡️ Smart Contracts

**EURO Presale Contract**
```
0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79
```
🔗 [View on Monad Explorer](https://monad.socialscan.io/address/0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79)

**WMON**
```
0x2cE8C8F4961a54B2e87585f4178467006B76B418
```

> All 17 Meta Token contracts and LP pair addresses are listed in the `ALL_PAIRS` array in [`src/EurospaceApp.jsx`](./src/EurospaceApp.jsx).

---

## 📝 How to Use

1. **Connect your wallet** — MetaMask, WalletConnect, Trust, Coinbase, Phantom, or NEAR
2. **Switch to Monad Mainnet** — Chain ID `143` is added automatically
3. **Presale tab** — Enter a MON amount and click ◈ Buy Euro Coin
4. **EVM Swap tab** — Pick any Meta Token, enter MON amount, swap in one click
5. **DEX Live tab** — Browse live on-chain prices, open charts, trade directly
6. **NEAR Swap tab** — Cross-chain swap from ETH/BTC/SOL/USDC into EURO
7. **History tab** — View your session buys and sells with explorer links

---

## 💻 Developer Info

- **Frontend:** React + [Thirdweb React SDK](https://portal.thirdweb.com/react) + Vite
- **Contracts:** Solidity · custom presale + buyTokens/sellTokens logic
- **Cross-chain:** [NEAR Intents API](https://1click.chaindefuser.com)
- **Live prices:** On-chain reserves via `eth_call` → `getReserves()`
- **Hosting:** Cloudflare Pages

### Main Entrypoint

```jsx
import { ThirdwebProvider } from "thirdweb/react";
import EurospaceApp from "./EurospaceApp";

export default function EurospacePage() {
  return <ThirdwebProvider><EurospaceApp /></ThirdwebProvider>;
}
```

### Key Constants

```js
const CLIENT_ID     = "821819db832d1a313ae3b1a62fbeafb7";  // Thirdweb
const EURO_CONTRACT = "0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79";
const OWNER_ADDRESS = "0x592B35c8917eD36c39Ef73D0F5e92B0173560b2e";
const CHAIN_ID      = 143; // Monad Mainnet
```

---

## 🌐 Social & Community

| Platform | Link |
|---|---|
| 𝕏 Twitter | [@bnbgold277983](https://x.com/bnbgold277983) |
| 💬 Discord | [Join Server](https://discord.com/channels/1316093079090106472) |
| ✈️ Telegram Bot | [@eurocoin_monad_bot](https://t.me/eurocoin_monad_bot) |
| 🔍 Explorer | [Monad SocialScan](https://monad.socialscan.io/address/0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79) |

---

<p align="center">
  <sub>© 2026 EUROSPACE · All Rights Reserved · Built on Monad Mainnet</sub>
</p>
