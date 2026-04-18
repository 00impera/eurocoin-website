import { useState, useEffect } from "react";
import {
  ConnectButton,
  useActiveAccount,
  useReadContract,
  useSendTransaction,
  ThirdwebProvider,
} from "thirdweb/react";
import {
  createThirdwebClient,
  defineChain,
  getContract,
  prepareContractCall,
  toWei,
} from "thirdweb";

const CLIENT_ID    = "821819db832d1a313ae3b1a62fbeafb7";
const NEAR_JWT     = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjIwMjUtMDEtMTItdjEifQ.eyJ2IjoxLCJrZXlfdHlwZSI6ImRpc3RyaWJ1dGlvbl9jaGFubmVsIiwicGFydG5lcl9pZCI6ImNyeXB0b2Nhc2gtbmZ0IiwiaWF0IjoxNzczMDc3MzExLCJleHAiOjE4MDQ2MTMzMTF9.Wi55S8cwVmAXPtOG0ymr7ldX-5CXVygzuanbjAAJHP-Am14_52C6i4cQG5FvjcAorw0KD8k8JD_YX5AM4QKhNqYtU5gsI4-KKe0KavO5_69NowzUKc_ubtjYn85eFjWskzZQvICMqSZkdGOSnMT_hNEePA8qYi_wSov4a4bQh4zIfNA0znEdDIV3rGI_bDM9dgOk0PnJRIpwi_aXOQ8Q4e50IO2UMrZEDtBVmUhK5-Mno3S_iS7tZl4QSui_4_bNCapQolFwUPB9Zqyxay_6rPVEr7j-8Ez5-htwkR5ZYvTb1mJaj3DVPpWPL9QTxhjvhbJ7nKrWpibcWX3AVoXZ6g";
const EURO_CONTRACT = "0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79";
const OWNER_ADDRESS = "0x592B35c8917eD36c39Ef73D0F5e92B0173560b2e";
const WMOON         = "0x2ce8c8f4961a54b2e87585f4178467006b76b418";

const MONAD_MAINNET = defineChain({
  id: 143,
  name: "Monad Mainnet",
  nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
  rpc: "https://rpc.monad.xyz",
  blockExplorers: [{ name: "Monad Explorer", url: "https://monad.socialscan.io" }],
});

const client = createThirdwebClient({ clientId: CLIENT_ID });

const ALL_PAIRS = [
  { symbol:"EURO",   name:"Meta EuroCoin",  color:"#00ff88", cat:"euro",   img:"/logo.png",          pair:"0x9E32FdD909a5BdcCfb874DEE72F24169AfE4eC02", contract:"0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79" },
  { symbol:"mBTC",   name:"Meta Bitcoin",   color:"#F7931A", cat:"meta",   img:"/META BTC.png",       pair:"0x47Dc73D3e1C520056AdF52349A6A282e5262D56d", contract:"0x5078A3531Dba3Dea11AB4aaF641DB6f0fE88579e" },
  { symbol:"mETH",   name:"Meta Ethereum",  color:"#627EEA", cat:"meta",   img:"/META ETH.png",       pair:"0xDE92BC23146222B86e638B6E88E23917eD378a6E", contract:"0x271028A77301bb705C293Bd1fFA79E239AB1Daec" },
  { symbol:"mSOL",   name:"Meta Solana",    color:"#9945FF", cat:"meta",   img:"/META SOL.png",       pair:"0xf8dbc8Cc478506fb0844C670B35b90A7AD6Ad912", contract:"0xEd59c5bA2180ce57a723Dbc04FF3A81e1ba84B3C" },
  { symbol:"mBNB",   name:"Meta BNB",       color:"#F3BA2F", cat:"meta",   img:"/META BNB.png",       pair:"0xd77B55A199EA0DC81EB4c7c36d45fBda4D6477B6", contract:"0xb1326c51F73814f071bb4d3db44c86dD03DC8C76" },
  { symbol:"mXRP",   name:"Meta XRP",       color:"#00AAE4", cat:"meta",   img:"/META XRP.png",       pair:"0x69884c6C8Fe6F833aEEDE2A4c0949e667C7F79fB", contract:"0x379563529988bD76DeD9bc4a175AD59df6191B75" },
  { symbol:"mUSDC",  name:"Meta USDC",      color:"#2775CA", cat:"stable", img:"/META USDC.png",      pair:"0x3BE5B19348d6Ccbc20e0DCF3Cab0aDF9e4643dCa", contract:"0xe0Ed08D1bC86b98434861ae0403be968bD95465E" },
  { symbol:"mUSDT",  name:"Meta Tether",    color:"#26A17B", cat:"stable", img:"/META USDT.png",      pair:"0xAB4CFB051E73db47f75c4A2c31dFaAFd3A82A8b8", contract:"0x085368cae9d4eCffe676806c3a8105433377164b" },
  { symbol:"mMATIC", name:"Meta Polygon",   color:"#8247E5", cat:"meta",   img:"/META MATIC.png",     pair:"0x5F5908aD27AFf28b0BDbAD8F93470e83310aE365", contract:"0x43C60d3cec23b0E85678602A4F5C1156a7398daC" },
  { symbol:"mDOGE",  name:"Meta Dogecoin",  color:"#C2A633", cat:"meta",   img:"/META DODGE.png",     pair:"0x8e71b96897c6D5EF3954b06636c24EdB4866b488", contract:"0x111b31d8474Aee70767337FD794a7fb0A08788A8" },
  { symbol:"mLTC",   name:"Meta Litecoin",  color:"#a8a8a8", cat:"meta",   img:"/META LTC.png",       pair:"0xd4faf6a3B43105395C1f3db6525eA0fBF5B3aF9a", contract:"0x8abAe4dbf7A2e286d688fa7101bea0fAE4C0Dd75" },
  { symbol:"mTRX",   name:"Meta TRON",      color:"#EF4444", cat:"meta",   img:"/META TRX.png",       pair:"0x77A4Ad2ac41775A543353C8255cd88C7bF58e404", contract:"0x1A3206c56993d4906ec26Fe85194399E0dBD8EBf" },
  { symbol:"mBASE",  name:"Meta Base",      color:"#2563eb", cat:"meta",   img:"/META BASE.png",      pair:"0x9f1b9A6D727DF983a74F11252EDa0Fa96132cc12", contract:"0xeA66DaF739823505817d4DAfEdBb43Dc0C2E5372" },
  { symbol:"mEURO",  name:"Meta Euro",      color:"#3b82f6", cat:"euro",   img:"/META EUROSPACE.png", pair:"0x2f3B240444F5b8Dc6f211373ff29CCE0Ba798114", contract:"0x4443892C796f7A519C9D099417EC8422f88F5867" },
  { symbol:"mMONAD", name:"Meta Monad",     color:"#836EF9", cat:"meta",   img:"/META MONAD.png",     pair:"0xc7a8f6A2452D1ec709006E36A3B89f4Df7188a9a", contract:"0xbF5E34B1EBE37F9a98BFcE48645dc67Dd84E5fD6" },
  { symbol:"mEURC",  name:"Meta EURC",      color:"#FFD700", cat:"euro",   img:"/META EURC.png",      pair:"0x669d78953a14a147DA6730dA255b4E7A7b15b111", contract:"0x7bD9bbFc0086B033ede5736e4Aa9C16a451D0904" },
  { symbol:"mCRO",   name:"Meta Cronos",    color:"#60a5fa", cat:"meta",   img:"/META CRONOS.png",    pair:"0x7D9e8050Ba0c0a6c8336A49a5Af6748AA6BD855C", contract:"0x0127B3c3C864cfC1BB519beB935477299b961d46" },
];

const NEAR_WALLETS = [
  { id:"mynear", name:"MyNearWallet", icon:"🌊", desc:"OAuth popup redirect"   },
  { id:"sender", name:"Sender",       icon:"📤", desc:"window.near.isSender"  },
  { id:"here",   name:"HERE Wallet",  icon:"📍", desc:"herewallet:// deeplink" },
  { id:"meteor", name:"Meteor",       icon:"☄️", desc:"window.meteorWallet"   },
];

const MONAD_RPCS = ["https://rpc.monad.xyz","https://monad.drpc.org"];

async function rpcFetch(method, params) {
  for (const rpc of MONAD_RPCS) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    try {
      const r = await fetch(rpc, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ jsonrpc:"2.0", id:1, method, params }),
        signal: ctrl.signal,
      });
      clearTimeout(t);
      const d = await r.json();
      if (d.result !== undefined) return d.result;
    } catch(e) { clearTimeout(t); }
  }
  return null;
}

const ethCall = (addr, data) => rpcFetch("eth_call",[{to:addr,data},"latest"]);
const encodeBalanceOf = addr =>
  "0x70a08231" + "000000000000000000000000" + addr.toLowerCase().replace("0x","");

function encodeERC20Transfer(to, amountBigInt) {
  return "0xa9059cbb"
    + to.toLowerCase().replace("0x","").padStart(64,"0")
    + amountBigInt.toString(16).padStart(64,"0");
}

async function getNearIntentsTokens() {
  const res = await fetch("https://1click.chaindefuser.com/v0/tokens",{
    headers:{ Authorization:"Bearer "+NEAR_JWT },
  });
  return res.json();
}

async function getNearIntentsQuote({ originAsset, destinationAsset, amount, recipient }) {
  const deadline = new Date(Date.now()+10*60*1000).toISOString();
  const res = await fetch("https://1click.chaindefuser.com/v0/quote",{
    method:"POST",
    headers:{"Content-Type":"application/json", Authorization:"Bearer "+NEAR_JWT},
    body: JSON.stringify({
      dry:false, swapType:"EXACT_INPUT", slippageTolerance:100,
      originAsset, depositType:"ORIGIN_CHAIN", destinationAsset, amount,
      recipient, recipientType:"DESTINATION_CHAIN",
      refundTo:recipient, refundType:"ORIGIN_CHAIN", deadline,
    }),
  });
  return res.json();
}

async function fetchPairReserves(pairAddr) {
  try {
    const res = await ethCall(pairAddr,"0x0902f1ac");
    if (!res||res==="0x"||res.length<130) return null;
    const r0 = BigInt("0x"+res.slice(2,66));
    const r1 = BigInt("0x"+res.slice(66,130));
    if (r0===0n||r1===0n) return null;
    return {r0,r1};
  } catch(_){ return null; }
}

function shortAddr(addr) { return addr ? addr.slice(0,6)+"…"+addr.slice(-4) : ""; }
function fmt(val,dec=18,digits=4) {
  if (!val) return "0";
  try {
    const n = Number((BigInt(val.toString())*10000n)/BigInt(Math.pow(10,dec)))/10000;
    return n.toLocaleString(undefined,{maximumFractionDigits:digits});
  } catch(e){ return "0"; }
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

:root{
  --bg:        #0d1117;
  --bg2:       #161b22;
  --card:      #1c2333;
  --card2:     #21262d;
  --primary:   #2563eb;
  --primary-h: #1d4ed8;
  --accent:    #00ff88;
  --gold:      #FFD700;
  --cyan:      #00e5ff;
  --text:      #e6edf3;
  --muted:     #8b949e;
  --border:    #30363d;
  --border-h:  #58a6ff;
  --success:   #3fb950;
  --error:     #f85149;
  --warning:   #d29922;
  --near:      #00c1de;
}

body{
  background:var(--bg);
  color:var(--text);
  font-family:'Inter',system-ui,sans-serif;
  min-height:100vh;
  overflow-x:hidden;
  font-size:14px;
  line-height:1.6;
}
body::before{
  content:'';position:fixed;inset:0;
  background-image:
    linear-gradient(rgba(37,99,235,0.025) 1px,transparent 1px),
    linear-gradient(90deg,rgba(37,99,235,0.025) 1px,transparent 1px);
  background-size:48px 48px;
  pointer-events:none;z-index:0;
}

.scan-line{
  position:fixed;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--primary),var(--accent),transparent);
  opacity:0.12;animation:scan 7s linear infinite;pointer-events:none;z-index:2;
}
@keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}

.wrap{max-width:100%;width:100%;margin:0 auto;padding:24px 16px 100px;position:relative;z-index:2;}

/* Header */
.header{text-align:center;padding:32px 0 20px;}
.logo-img{
  width:100px;height:100px;border-radius:50%;margin:0 auto 16px;display:block;object-fit:cover;
  border:2px solid var(--primary);
  box-shadow:0 0 0 4px rgba(37,99,235,0.15),0 0 30px rgba(37,99,235,0.3);
  animation:float 4s ease-in-out infinite;
}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
h1{
  font-family:'Orbitron',monospace;font-size:28px;font-weight:900;
  background:linear-gradient(90deg,var(--accent),var(--cyan),var(--primary));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  letter-spacing:5px;margin-bottom:6px;
}
.subtitle{font-size:11px;letter-spacing:3px;color:var(--muted);text-transform:uppercase;}
.net-badge{
  display:inline-flex;align-items:center;gap:6px;
  background:var(--card2);border:1px solid var(--border);
  border-radius:20px;padding:5px 14px;font-size:10px;color:var(--cyan);
  margin-top:12px;letter-spacing:1px;font-family:'Orbitron',monospace;
}
.net-dot{width:6px;height:6px;background:var(--accent);border-radius:50%;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(0,255,136,0.4)}50%{opacity:.6;box-shadow:0 0 0 4px rgba(0,255,136,0)}}

/* Connect bar */
.connect-bar{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px;margin:16px 0 8px;}
.near-badge{
  display:inline-flex;align-items:center;gap:6px;
  background:rgba(0,193,222,0.1);border:1px solid rgba(0,193,222,0.3);
  border-radius:20px;padding:7px 16px;font-size:11px;color:var(--near);
  cursor:pointer;transition:all .2s;font-weight:500;
}
.near-badge:hover{background:rgba(0,193,222,0.18);border-color:var(--near);}
.near-dot{width:6px;height:6px;background:var(--near);border-radius:50%;animation:pulse 2s infinite;}

/* Tabs */
.tabs{display:flex;justify-content:center;gap:4px;margin:16px 0 20px;flex-wrap:wrap;}
.tab{
  padding:8px 18px;border-radius:8px;border:1px solid var(--border);
  background:transparent;color:var(--muted);font-family:'Orbitron',monospace;
  font-size:8px;letter-spacing:2px;cursor:pointer;transition:all .2s;text-transform:uppercase;
}
.tab.active{
  background:rgba(37,99,235,0.15);color:#60a5fa;
  border-color:rgba(37,99,235,0.5);
  box-shadow:0 0 20px rgba(37,99,235,0.2);
}
.tab:not(.active):hover{border-color:var(--border-h);color:var(--text);}

/* Card */
.card{
  background:var(--card);border:1px solid var(--border);
  border-radius:16px;padding:20px;margin:14px 0;position:relative;overflow:hidden;
}
.card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--primary),var(--cyan),transparent);opacity:.5;
}
.card-title{
  font-family:'Orbitron',monospace;font-size:10px;letter-spacing:3px;
  color:#60a5fa;text-transform:uppercase;margin-bottom:16px;
}

/* Countdown */
.cd-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px;}
.cd-box{background:var(--card2);border:1px solid var(--border);border-radius:12px;padding:12px 6px;text-align:center;}
.cd-num{
  font-family:'Orbitron',monospace;font-size:28px;font-weight:900;color:var(--text);
  text-shadow:0 0 20px rgba(37,99,235,0.4);
}
.cd-lbl{font-size:9px;letter-spacing:2px;color:var(--muted);text-transform:uppercase;margin-top:4px;}
.presale-bar{height:6px;background:var(--bg);border-radius:4px;overflow:hidden;border:1px solid var(--border);margin:12px 0;}
.presale-fill{
  height:100%;background:linear-gradient(90deg,var(--primary),var(--accent));
  border-radius:4px;box-shadow:0 0 12px rgba(37,99,235,0.4);transition:width 1s;
}

/* Stats */
.stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.stat-box{background:var(--card2);border:1px solid var(--border);border-radius:12px;padding:14px 8px;text-align:center;}
.stat-val{font-family:'Orbitron',monospace;font-size:14px;font-weight:700;color:var(--text);margin-bottom:5px;}
.stat-lbl{font-size:9px;letter-spacing:1px;color:var(--muted);text-transform:uppercase;}

/* Price grid */
.price-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;}
.price-box{background:var(--card2);border:1px solid var(--border);border-radius:12px;padding:14px;text-align:center;}
.price-lbl{font-size:9px;letter-spacing:2px;color:var(--muted);text-transform:uppercase;margin-bottom:6px;}
.price-val{font-family:'Orbitron',monospace;font-size:17px;font-weight:700;color:var(--text);}

/* Fields */
.field{margin-bottom:14px;}
.field label{display:block;font-size:11px;letter-spacing:1px;color:var(--muted);font-weight:500;text-transform:uppercase;margin-bottom:6px;}
.field input,.field select{
  width:100%;background:var(--bg2);border:1px solid var(--border);border-radius:10px;
  padding:12px 50px 12px 14px;color:var(--text);font-family:'Inter',sans-serif;
  font-size:15px;outline:none;transition:border-color .2s,box-shadow .2s;
}
.field input:focus,.field select:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(37,99,235,0.15);}
.field input::-webkit-inner-spin-button{display:none;}
.field select option{background:var(--card2);color:var(--text);}
.field-wrap{position:relative;}
.field-unit{position:absolute;right:14px;top:50%;transform:translateY(-50%);font-size:11px;color:var(--muted);font-weight:600;}

/* Receive box */
.receive-box{
  background:var(--card2);border:1px solid var(--border);border-radius:12px;
  padding:14px 18px;display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;
}
.receive-amt{font-family:'Orbitron',monospace;font-size:22px;font-weight:700;color:var(--accent);}
.receive-lbl{font-size:10px;color:var(--muted);margin-top:2px;}

/* Wallet bar */
.wallet-bar{
  display:none;background:rgba(37,99,235,0.07);border:1px solid rgba(37,99,235,0.2);
  border-radius:10px;padding:10px 16px;margin-bottom:12px;font-size:11px;color:var(--text);
}
.wallet-bar.show{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;}
.w-badge{
  font-size:9px;background:rgba(37,99,235,0.15);border:1px solid rgba(37,99,235,0.3);
  border-radius:4px;padding:2px 8px;color:#60a5fa;letter-spacing:1px;font-weight:600;
}

/* Buttons */
.btn-buy{
  width:100%;padding:14px;background:linear-gradient(135deg,var(--primary),var(--primary-h));
  border:none;border-radius:12px;color:#fff;font-family:'Orbitron',monospace;
  font-size:13px;font-weight:700;letter-spacing:3px;cursor:pointer;
  transition:all .25s;text-transform:uppercase;
  box-shadow:0 4px 15px rgba(37,99,235,0.3);
}
.btn-buy:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 25px rgba(37,99,235,0.45);}
.btn-buy:disabled{opacity:0.4;cursor:not-allowed;transform:none;box-shadow:none;}
.btn-send{
  width:100%;padding:13px;background:linear-gradient(135deg,var(--near),#0077cc);
  border:none;border-radius:12px;color:#fff;font-family:'Orbitron',monospace;
  font-size:12px;font-weight:700;letter-spacing:2px;cursor:pointer;
  transition:all .25s;text-transform:uppercase;margin-top:10px;
  box-shadow:0 4px 15px rgba(0,193,222,0.25);
}
.btn-send:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,193,222,0.4);}
.btn-send:disabled{opacity:0.4;cursor:not-allowed;}
.btn-outline{
  width:100%;padding:11px;border:1px solid var(--border);border-radius:10px;
  background:transparent;color:var(--muted);font-family:'Orbitron',monospace;
  font-size:10px;cursor:pointer;transition:all .2s;letter-spacing:2px;margin-top:8px;
}
.btn-outline:hover{border-color:var(--primary);color:#60a5fa;background:rgba(37,99,235,0.08);}
.btn-sm{
  padding:6px 14px;border:1px solid var(--border);border-radius:6px;background:transparent;
  color:var(--text);font-family:'Orbitron',monospace;font-size:8px;cursor:pointer;
  transition:all .2s;letter-spacing:1px;
}
.btn-sm:hover{border-color:var(--accent);color:var(--accent);}
.btn-sm.danger{border-color:rgba(248,81,73,0.35);color:var(--error);}
.btn-sm.danger:hover{border-color:var(--error);background:rgba(248,81,73,0.1);}

/* Status */
.status-msg{text-align:center;padding:10px 14px;border-radius:8px;font-size:11px;letter-spacing:.5px;margin-top:12px;font-weight:500;}
.status-msg.success{background:rgba(63,185,80,.1);border:1px solid rgba(63,185,80,.3);color:var(--success);}
.status-msg.error{background:rgba(248,81,73,.1);border:1px solid rgba(248,81,73,.3);color:var(--error);}
.status-msg.info{background:rgba(0,229,255,.07);border:1px solid rgba(0,229,255,.2);color:var(--cyan);}
.status-msg.pending{background:rgba(37,99,235,.1);border:1px solid rgba(37,99,235,.3);color:#60a5fa;}

/* TX list */
.tx-list{background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:10px;max-height:200px;overflow-y:auto;}
.tx-row{display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border);font-size:11px;gap:8px;}
.tx-row:last-child{border-bottom:none;}
.tx-desc{color:var(--text);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.tx-time{color:var(--muted);font-size:10px;}
.tx-link{color:#60a5fa;text-decoration:none;font-size:10px;white-space:nowrap;font-weight:500;}
.tx-link:hover{color:var(--cyan);}
.tx-empty{font-size:11px;color:var(--muted);text-align:center;padding:16px;}

/* DEX */
.dex-filter{display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap;}
.dex-flt{
  padding:5px 14px;border-radius:6px;border:1px solid var(--border);background:transparent;
  color:var(--muted);font-family:'Orbitron',monospace;font-size:8px;letter-spacing:1px;cursor:pointer;transition:all .2s;
}
.dex-flt.active{border-color:var(--primary);color:#60a5fa;background:rgba(37,99,235,.12);}
.dex-grid-list{display:flex;flex-direction:column;gap:8px;}
.dex-row{
  background:var(--card2);border:1px solid var(--border);border-left:3px solid transparent;
  border-radius:12px;padding:10px 14px;display:flex;align-items:center;gap:10px;
  cursor:pointer;transition:all .2s;
}
.dex-row:hover{border-color:rgba(37,99,235,.4)!important;transform:translateX(3px);background:rgba(37,99,235,.04);}
.dex-logo{width:36px;height:36px;border-radius:50%;object-fit:cover;flex-shrink:0;background:var(--bg);border:1px solid var(--border);}
.dex-sym{font-family:'Orbitron',monospace;font-size:11px;font-weight:700;letter-spacing:1px;}
.dex-name{font-size:10px;color:var(--muted);margin-top:2px;}
.dex-price{font-family:'Orbitron',monospace;font-size:10px;color:var(--cyan);text-align:right;}
.dex-dot{width:6px;height:6px;border-radius:50%;background:var(--success);animation:pulse 2s infinite;flex-shrink:0;}

/* Gallery */
.gallery{display:flex;gap:10px;overflow-x:auto;padding-bottom:10px;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:var(--border) transparent;}
.tok-card{
  flex:0 0 108px;background:var(--card2);border:1px solid var(--border);border-radius:14px;
  padding:14px 8px;display:flex;flex-direction:column;align-items:center;gap:8px;
  cursor:pointer;transition:all .22s;position:relative;overflow:hidden;
}
.tok-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--tok-color,var(--primary));opacity:.8;}
.tok-card:hover{border-color:var(--tok-color,var(--primary));transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,.3);}
.tok-logo{width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid var(--tok-color,var(--primary));background:var(--bg);}
.tok-sym{font-family:'Orbitron',monospace;font-size:9px;font-weight:700;color:var(--tok-color,var(--text));letter-spacing:1px;}
.tok-name{font-size:8px;color:var(--muted);text-align:center;}
.tok-btn{
  width:100%;padding:5px;border:1px solid var(--tok-color,var(--primary));border-radius:6px;
  background:transparent;color:var(--tok-color,var(--text));font-family:'Orbitron',monospace;
  font-size:7px;font-weight:700;cursor:pointer;transition:all .2s;
}

/* Modals */
.modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:300;align-items:center;justify-content:center;backdrop-filter:blur(6px);}
.modal-overlay.show{display:flex;}
.modal-box{
  background:var(--card);border:1px solid var(--border);border-radius:20px;padding:26px;
  width:92%;max-width:400px;position:relative;max-height:90vh;overflow-y:auto;
  box-shadow:0 24px 60px rgba(0,0,0,.6);
}
.modal-box::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--primary),var(--cyan),transparent);border-radius:20px 20px 0 0;}
.modal-close{
  position:absolute;top:16px;right:16px;background:var(--card2);border:1px solid var(--border);
  border-radius:6px;color:var(--muted);cursor:pointer;font-size:14px;padding:4px 8px;transition:all .2s;
}
.modal-close:hover{color:var(--text);border-color:var(--border-h);}
.modal-header{display:flex;align-items:center;gap:14px;margin-bottom:20px;}
.modal-logo{width:52px;height:52px;border-radius:50%;object-fit:cover;}
.modal-name{font-family:'Orbitron',monospace;font-size:16px;font-weight:700;}
.modal-sym{font-size:11px;color:var(--muted);letter-spacing:2px;margin-top:2px;}
.sell-section{margin-top:16px;padding-top:16px;border-top:1px solid var(--border);}

/* NEAR options */
.near-opt{display:flex;align-items:center;gap:14px;background:var(--card2);border:1px solid var(--border);border-radius:12px;padding:14px 16px;margin-bottom:8px;cursor:pointer;transition:all .2s;}
.near-opt:hover{border-color:var(--near);background:rgba(0,193,222,.07);}
.near-icon{font-size:22px;width:36px;text-align:center;}
.near-opt-name{font-family:'Orbitron',monospace;font-size:12px;color:var(--text);font-weight:600;}
.near-opt-desc{font-size:10px;color:var(--muted);margin-top:2px;}

/* Quote */
.quote-box{margin-top:14px;padding:14px;border-radius:10px;background:var(--card2);border:1px solid var(--border);}
.quote-row{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border);font-size:12px;}
.quote-row:last-child{border-bottom:none;}
.quote-row span:first-child{color:var(--muted);}
.quote-row span:last-child{color:var(--accent);font-weight:600;font-family:'Orbitron',monospace;font-size:11px;}
.deposit-box{margin-top:14px;padding:14px;border-radius:10px;background:rgba(0,255,136,.04);border:1px solid rgba(0,255,136,.2);word-break:break-all;font-size:11px;color:var(--accent);font-family:'Inter',monospace;line-height:1.8;}

.tw-connect-wrap{display:flex;justify-content:center;margin:16px 0;}
.contract-box{background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:14px;display:flex;align-items:center;justify-content:space-between;gap:10px;cursor:pointer;transition:border-color .2s;}
.contract-box:hover{border-color:var(--primary);}
.contract-addr{font-size:11px;color:var(--muted);word-break:break-all;flex:1;font-family:'Inter',monospace;}
.copy-btn{background:rgba(37,99,235,.1);border:1px solid rgba(37,99,235,.3);border-radius:6px;color:#60a5fa;font-size:10px;padding:5px 10px;cursor:pointer;white-space:nowrap;font-weight:600;transition:all .2s;}
.copy-btn:hover{background:rgba(37,99,235,.2);}
.explorer-link{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:10px;color:#60a5fa;font-size:11px;text-decoration:none;padding:10px;border:1px solid var(--border);border-radius:8px;transition:all .2s;font-weight:500;}
.explorer-link:hover{border-color:var(--primary);background:rgba(37,99,235,.07);}

.steps{display:flex;flex-direction:column;gap:14px;}
.step{display:flex;gap:14px;align-items:flex-start;}
.step-num{width:28px;height:28px;min-width:28px;background:rgba(37,99,235,.15);border:1px solid rgba(37,99,235,.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Orbitron',monospace;font-size:11px;color:#60a5fa;font-weight:700;}
.step-text{font-size:12px;color:var(--text);line-height:1.7;padding-top:4px;}
.step-text strong{color:var(--cyan);display:block;margin-bottom:2px;font-size:11px;letter-spacing:1px;text-transform:uppercase;}

.swap-row{display:grid;grid-template-columns:1fr 32px 1fr;gap:8px;align-items:end;margin-bottom:14px;}
.swap-arrow{font-size:18px;color:var(--primary);text-align:center;padding-bottom:14px;}
.info-pill{background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:9px 14px;font-size:11px;color:var(--muted);display:flex;justify-content:space-between;margin-bottom:8px;}
.info-pill span:last-child{color:var(--cyan);font-family:'Orbitron',monospace;font-size:10px;font-weight:600;}

.footer{text-align:center;padding:24px 0 50px;font-size:11px;color:var(--muted);letter-spacing:1px;}
.footer-title{font-family:'Orbitron',monospace;font-size:14px;font-weight:700;background:linear-gradient(90deg,var(--accent),var(--cyan),var(--primary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:6px;}
.social-links{display:flex;justify-content:center;gap:10px;margin-top:18px;flex-wrap:wrap;}
.social-link{display:inline-flex;align-items:center;gap:6px;background:var(--card2);border:1px solid var(--border);border-radius:20px;padding:9px 18px;text-decoration:none;font-family:'Inter',sans-serif;font-size:12px;font-weight:500;transition:all .2s;}
.social-link:hover{border-color:var(--border-h);transform:translateY(-1px);}

@media(min-width:600px){.wrap{max-width:560px;margin:0 auto;}}
@media(min-width:900px){.wrap{max-width:840px;margin:0 auto;}.dex-grid-list{display:grid;grid-template-columns:1fr 1fr;}}
`;

// ── MAIN APP ──────────────────────────────────────────────────────────────────
function EurospaceApp() {
  const account = useActiveAccount();

  const [tokensPerMON,  setTokensPerMON]  = useState(0n);
  const [totalSupply,   setTotalSupply]   = useState("—");
  const [buyStatus,     setBuyStatus]     = useState("—");
  const [monAmount,     setMonAmount]     = useState("");
  const [receiveAmount, setReceiveAmount] = useState("0.00");
  const [txStatus,      setTxStatus]      = useState(null);
  const [txHash,        setTxHash]        = useState("");
  const [isOwner,       setIsOwner]       = useState(false);

  const [nearAccount,   setNearAccount]   = useState(localStorage.getItem("near_account_id")||"");
  const [nearModal,     setNearModal]     = useState(false);
  const [nearManual,    setNearManual]    = useState("");
  const [swapTokens,    setSwapTokens]    = useState([]);
  const [swapOrigin,    setSwapOrigin]    = useState("");
  const [swapAmount,    setSwapAmount]    = useState("");
  const [swapQuote,     setSwapQuote]     = useState(null);
  const [swapLoading,   setSwapLoading]   = useState(false);
  const [swapError,     setSwapError]     = useState(null);
  const [sendStatus,    setSendStatus]    = useState(null);

  const [dexPrices,     setDexPrices]     = useState({});
  const [dexFilter,     setDexFilter]     = useState("all");
  const [selectedPair,  setSelectedPair]  = useState(null);

  const [evmFromAmt,    setEvmFromAmt]    = useState("");
  const [evmToToken,    setEvmToToken]    = useState(ALL_PAIRS[0]);
  const [evmEstimate,   setEvmEstimate]   = useState("—");
  const [evmStatus,     setEvmStatus]     = useState(null);

  const [tokenModal,    setTokenModal]    = useState(null);
  const [modalBuyAmt,   setModalBuyAmt]   = useState("");
  const [modalSellAmt,  setModalSellAmt]  = useState("");
  const [modalStatus,   setModalStatus]   = useState(null);
  const [tokenBalance,  setTokenBalance]  = useState("—");

  const [tab,           setTab]           = useState("presale");
  const [txHistory,     setTxHistory]     = useState([]);

  const euroTWContract = getContract({
    client, chain:MONAD_MAINNET, address:EURO_CONTRACT,
    abi:[
      {name:"totalSupply", type:"function",inputs:[],outputs:[{type:"uint256"}],stateMutability:"view"},
      {name:"tokensPerMON",type:"function",inputs:[],outputs:[{type:"uint256"}],stateMutability:"view"},
      {name:"buyEnabled",  type:"function",inputs:[],outputs:[{type:"bool"}],   stateMutability:"view"},
      {name:"balanceOf",   type:"function",inputs:[{name:"account",type:"address"}],outputs:[{type:"uint256"}],stateMutability:"view"},
      {name:"buyTokens",   type:"function",inputs:[],outputs:[],stateMutability:"payable"},
    ],
  });

  const {data:twTotalSupply } = useReadContract({contract:euroTWContract,method:"totalSupply", params:[]});
  const {data:twTokensPerMON} = useReadContract({contract:euroTWContract,method:"tokensPerMON",params:[]});
  const {data:twBuyEnabled  } = useReadContract({contract:euroTWContract,method:"buyEnabled",  params:[]});
  const {data:twEuroBalance } = useReadContract({contract:euroTWContract,method:"balanceOf",   params:[account?.address||"0x0000000000000000000000000000000000000000"]});
  const {mutate:sendTx} = useSendTransaction();

  useEffect(()=>{
    if(twTotalSupply !=null) setTotalSupply(fmt(twTotalSupply));
    if(twTokensPerMON!=null) setTokensPerMON(BigInt(twTokensPerMON.toString()));
    if(twBuyEnabled  !=null) setBuyStatus(twBuyEnabled?"OPEN":"CLOSED");
  },[twTotalSupply,twTokensPerMON,twBuyEnabled]);

  useEffect(()=>{
    if(account?.address) setIsOwner(account.address.toLowerCase()===OWNER_ADDRESS.toLowerCase());
  },[account]);

  useEffect(()=>{
    getNearIntentsTokens()
      .then(tokens=>setSwapTokens(tokens.filter(t=>
        ["eth","btc","sol","usdc","usdt","near","bnb","matic"].some(s=>t.symbol?.toLowerCase().includes(s))
      ))).catch(()=>{});
  },[]);

  useEffect(()=>{
    loadAllDexPrices();
    const id=setInterval(loadAllDexPrices,30000);
    return ()=>clearInterval(id);
  },[]);

  async function loadAllDexPrices(){
    const results={};
    await Promise.all(ALL_PAIRS.map(async p=>{
      const data=await fetchPairReserves(p.pair);
      if(!data) return;
      const tc=p.contract.toLowerCase();
      results[p.pair]={
        price: tc<WMOON ? Number((data.r1*1000000n)/data.r0)/1000000 : Number((data.r0*1000000n)/data.r1)/1000000,
        updatedAt:Date.now(),
      };
    }));
    setDexPrices(results);
  }

  // Presale countdown — ends April 18 2027
  const [countdown,setCountdown]=useState({d:"00",h:"00",m:"00",s:"00",pct:0});
  useEffect(()=>{
    const END  = new Date("2027-04-18T23:59:59Z").getTime();
    const START = new Date("2026-04-18T00:00:00Z").getTime();
    function tick(){
      const now=Date.now(),diff=END-now;
      if(diff<=0){setCountdown({d:"00",h:"00",m:"00",s:"00",pct:100});return;}
      setCountdown({
        d:String(Math.floor(diff/86400000)).padStart(2,"0"),
        h:String(Math.floor((diff%86400000)/3600000)).padStart(2,"0"),
        m:String(Math.floor((diff%3600000)/60000)).padStart(2,"0"),
        s:String(Math.floor((diff%60000)/1000)).padStart(2,"0"),
        pct:Math.min(100,((now-START)/(END-START))*100),
      });
    }
    tick(); const id=setInterval(tick,1000); return ()=>clearInterval(id);
  },[]);

  useEffect(()=>{
    const mon=parseFloat(monAmount)||0, rate=Number(tokensPerMON);
    setReceiveAmount(rate>0?(mon*rate).toFixed(2):"0.00");
  },[monAmount,tokensPerMON]);

  useEffect(()=>{
    if(!evmFromAmt||!evmToToken){setEvmEstimate("—");return;}
    const pd=dexPrices[evmToToken.pair];
    if(!pd){setEvmEstimate("loading…");return;}
    const est=(parseFloat(evmFromAmt)||0)/pd.price;
    setEvmEstimate(est>0?est.toFixed(4)+" "+evmToToken.symbol:"—");
  },[evmFromAmt,evmToToken,dexPrices]);

  function handleBuyEuro(){
    if(!account||!monAmount) return;
    setTxStatus("pending");
    const tx=prepareContractCall({contract:euroTWContract,method:"buyTokens",params:[],value:toWei(monAmount)});
    sendTx(tx,{
      onSuccess:r=>{
        setTxStatus("success"); setTxHash(r.transactionHash||"");
        setTxHistory(prev=>[{type:"buy",symbol:"EURO",amount:receiveAmount,hash:r.transactionHash||"",time:new Date()},...prev.slice(0,19)]);
        setMonAmount("");
      },
      onError:()=>setTxStatus("error"),
    });
  }

  async function openTokenModal(token){
    setTokenModal(token); setModalBuyAmt(""); setModalSellAmt(""); setModalStatus(null); setTokenBalance("—");
    if(!account?.address) return;
    const hex=await ethCall(token.contract,encodeBalanceOf(account.address));
    if(hex&&hex!=="0x") setTokenBalance((Number(BigInt(hex))/1e18).toFixed(4));
  }

  function handleTokenBuy(){
    if(!account||!modalBuyAmt||!tokenModal) return;
    const tc=getContract({client,chain:MONAD_MAINNET,address:tokenModal.contract,
      abi:[{name:"buyTokens",type:"function",inputs:[],outputs:[],stateMutability:"payable"}]});
    setModalStatus({type:"info",msg:"Sending transaction…"});
    sendTx(prepareContractCall({contract:tc,method:"buyTokens",params:[],value:toWei(modalBuyAmt)}),{
      onSuccess:r=>{
        setModalStatus({type:"success",msg:"✓ Bought! TX: "+(r.transactionHash||"").slice(0,18)+"…"});
        setTxHistory(prev=>[{type:"buy",symbol:tokenModal.symbol,amount:modalBuyAmt+" MON → "+tokenModal.symbol,hash:r.transactionHash||"",time:new Date()},...prev.slice(0,19)]);
      },
      onError:e=>setModalStatus({type:"error",msg:"Error: "+(e?.message||"failed").slice(0,80)}),
    });
  }

  function handleEvmSwap(){
    if(!account||!evmFromAmt||!evmToToken) return;
    setEvmStatus({type:"pending",msg:"Sending to wallet…"});
    const tc=getContract({client,chain:MONAD_MAINNET,address:evmToToken.contract,
      abi:[{name:"buyTokens",type:"function",inputs:[],outputs:[],stateMutability:"payable"}]});
    sendTx(prepareContractCall({contract:tc,method:"buyTokens",params:[],value:toWei(evmFromAmt)}),{
      onSuccess:r=>{
        setEvmStatus({type:"success",msg:`✓ Swapped ${evmFromAmt} MON → ${evmToToken.symbol}! TX: `+(r.transactionHash||"").slice(0,16)+"…"});
        setTxHistory(prev=>[{type:"buy",symbol:evmToToken.symbol,amount:evmFromAmt+" MON → "+evmToToken.symbol,hash:r.transactionHash||"",time:new Date()},...prev.slice(0,19)]);
        setEvmFromAmt("");
      },
      onError:e=>setEvmStatus({type:"error",msg:"Failed: "+(e?.message||"").slice(0,80)}),
    });
  }

  async function handleNearQuote(){
    if(!swapOrigin||!swapAmount||!account) return;
    setSwapLoading(true); setSwapError(null); setSwapQuote(null); setSendStatus(null);
    try {
      const destAsset  ="nep141:monad-"+EURO_CONTRACT.toLowerCase()+".omft.near";
      const originToken=swapTokens.find(t=>t.assetId===swapOrigin);
      const decimals   =originToken?.decimals||18;
      const amountRaw  =(BigInt(Math.round(parseFloat(swapAmount)*Math.pow(10,decimals)))).toString();
      setSwapQuote(await getNearIntentsQuote({originAsset:swapOrigin,destinationAsset:destAsset,amount:amountRaw,recipient:account.address}));
    } catch(e){ setSwapError("Could not fetch quote. Try a different token or amount."); }
    setSwapLoading(false);
  }

  async function handleNearSend(){
    if(!swapQuote?.depositAddress||!account) return;
    setSendStatus({type:"pending",msg:"Waiting for wallet confirmation…"});
    try {
      const originToken=swapTokens.find(t=>t.assetId===swapOrigin);
      const decimals   =originToken?.decimals||18;
      const amountBig  =BigInt(Math.round(parseFloat(swapAmount)*Math.pow(10,decimals)));
      const depositAddr=swapQuote.depositAddress;
      let txHash;
      if(originToken?.contractAddress){
        txHash = await window.ethereum.request({
          method:"eth_sendTransaction",
          params:[{ from:account.address, to:originToken.contractAddress, data:encodeERC20Transfer(depositAddr,amountBig), value:"0x0" }],
        });
      } else {
        txHash = await window.ethereum.request({
          method:"eth_sendTransaction",
          params:[{ from:account.address, to:depositAddr, value:"0x"+amountBig.toString(16) }],
        });
      }
      setSendStatus({type:"success",msg:"✓ Sent! TX: "+txHash.slice(0,18)+"… NEAR Intents will deliver EURO shortly."});
    } catch(e){
      setSendStatus({type:"error",msg:"Cancelled or failed: "+(e?.message||"").slice(0,80)});
    }
  }

  function connectNearWallet(walletId){
    if(walletId==="mynear"){const r=encodeURIComponent(window.location.href);window.location.href=`https://app.mynearwallet.com/login?success_url=${r}&failure_url=${r}`;return;}
    if(walletId==="sender"){window.near?.isSender?window.near.requestSignIn({contractId:""}).then(a=>{const id=a?.accountId||"";if(id){setNearAccount(id);localStorage.setItem("near_account_id",id);setNearModal(false);}}).catch(console.error):window.open("https://sender.org","_blank");return;}
    if(walletId==="here"){window.location.href=`herewallet://dapp?url=${encodeURIComponent(window.location.href)}`;setTimeout(()=>window.open("https://herewallet.app","_blank"),1500);return;}
    if(walletId==="meteor"){window.meteorWallet?window.meteorWallet.requestSignIn({contractId:""}).then(a=>{const id=a?.accountId||"";if(id){setNearAccount(id);localStorage.setItem("near_account_id",id);setNearModal(false);}}).catch(console.error):window.open("https://meteorwallet.app","_blank");}
  }
  function disconnectNear(){setNearAccount("");localStorage.removeItem("near_account_id");}
  useEffect(()=>{
    const p=new URLSearchParams(window.location.search),id=p.get("account_id");
    if(id){setNearAccount(id);localStorage.setItem("near_account_id",id);window.history.replaceState({},"",window.location.pathname);}
  },[]);

  const filteredPairs=dexFilter==="all"?ALL_PAIRS:ALL_PAIRS.filter(p=>p.cat===dexFilter);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:STYLES}}/>
      <div className="scan-line"/>

      {/* NEAR wallet modal */}
      {nearModal&&(
        <div className="modal-overlay show" onClick={e=>{if(e.target.className.includes("modal-overlay"))setNearModal(false);}}>
          <div className="modal-box">
            <button className="modal-close" onClick={()=>setNearModal(false)}>✕</button>
            <div className="card-title" style={{marginBottom:16}}>◈ Connect NEAR Wallet</div>
            {NEAR_WALLETS.map(w=>(
              <div key={w.id} className="near-opt" onClick={()=>connectNearWallet(w.id)}>
                <span className="near-icon">{w.icon}</span>
                <div><div className="near-opt-name">{w.name}</div><div className="near-opt-desc">{w.desc}</div></div>
              </div>
            ))}
            <div style={{marginTop:14,borderTop:"1px solid var(--border)",paddingTop:14}}>
              <div className="field"><label>Manual NEAR Account</label><input placeholder="yourname.near" value={nearManual} onChange={e=>setNearManual(e.target.value)} style={{paddingRight:14}}/></div>
              <button className="btn-buy" onClick={()=>{if(nearManual){setNearAccount(nearManual);localStorage.setItem("near_account_id",nearManual);setNearModal(false);}}}>Connect Manual</button>
            </div>
          </div>
        </div>
      )}

      {/* Token trade modal */}
      {tokenModal&&(
        <div className="modal-overlay show" onClick={e=>{if(e.target.className.includes("modal-overlay"))setTokenModal(null);}}>
          <div className="modal-box">
            <button className="modal-close" onClick={()=>setTokenModal(null)}>✕</button>
            <div className="modal-header">
              <img className="modal-logo" src={tokenModal.img} alt={tokenModal.symbol} style={{border:`2px solid ${tokenModal.color}`}} onError={e=>(e.target.style.display="none")}/>
              <div>
                <div className="modal-name" style={{color:tokenModal.color}}>{tokenModal.name}</div>
                <div className="modal-sym">{tokenModal.symbol}</div>
                <div style={{fontSize:11,color:"var(--muted)",marginTop:5}}>Balance: <span style={{color:"var(--text)",fontWeight:600}}>{tokenBalance} {tokenModal.symbol}</span></div>
              </div>
            </div>
            <div className="card-title">Buy {tokenModal.symbol}</div>
            <div className="field"><label>You Pay (MON)</label><div className="field-wrap"><input type="number" placeholder="0.0" value={modalBuyAmt} onChange={e=>setModalBuyAmt(e.target.value)}/><span className="field-unit">MON</span></div></div>
            <button className="btn-buy" style={{background:`linear-gradient(135deg,${tokenModal.color}aa,${tokenModal.color})`}} onClick={handleTokenBuy} disabled={!account||!modalBuyAmt}>{account?`◈ Buy ${tokenModal.symbol}`:"Connect Wallet First"}</button>
            <div className="sell-section">
              <div className="card-title" style={{color:"#fb923c"}}>Sell {tokenModal.symbol}</div>
              <div className="field"><label style={{color:"#fb923c"}}>Token Amount</label><div className="field-wrap"><input type="number" placeholder="0.0" value={modalSellAmt} onChange={e=>setModalSellAmt(e.target.value)}/><span className="field-unit">{tokenModal.symbol}</span></div></div>
              <button className="btn-buy" style={{background:"linear-gradient(135deg,#dc2626,#ea580c)"}}
                onClick={()=>{
                  if(!account||!modalSellAmt||!tokenModal)return;
                  const tc=getContract({client,chain:MONAD_MAINNET,address:tokenModal.contract,abi:[{name:"sellTokens",type:"function",inputs:[{name:"tokenAmount",type:"uint256"}],outputs:[],stateMutability:"nonpayable"}]});
                  setModalStatus({type:"info",msg:"Selling…"});
                  sendTx(prepareContractCall({contract:tc,method:"sellTokens",params:[BigInt(Math.floor(parseFloat(modalSellAmt)*1e18))]}),{
                    onSuccess:r=>setModalStatus({type:"success",msg:"✓ Sold! TX: "+(r.transactionHash||"").slice(0,16)+"…"}),
                    onError:e=>setModalStatus({type:"error",msg:"Error: "+(e?.message||"").slice(0,80)}),
                  });
                }}
                disabled={!account||!modalSellAmt}>{account?`◈ Sell ${tokenModal.symbol}`:"Connect Wallet First"}</button>
            </div>
            {modalStatus&&<div className={`status-msg ${modalStatus.type}`}>{modalStatus.msg}</div>}
          </div>
        </div>
      )}

      <div className="wrap">
        {/* Header */}
        <div className="header">
          <img src="/logo.png" alt="EUROSPACE" className="logo-img" onError={e=>(e.target.src="https://files.catbox.moe/9o0wad.png")}/>
          <h1>EUROSPACE</h1>
          <div className="subtitle">Presale · Monad Network</div>
          <div className="net-badge"><div className="net-dot"/>MONAD MAINNET · CHAIN ID 143</div>
        </div>

        {/* Connect bar */}
        <div className="connect-bar">
          <ConnectButton
            client={client}
            chain={MONAD_MAINNET}
            theme="dark"
            btnTitle="◈ Connect Wallet"
            connectModal={{
              title:"Connect to EUROSPACE",
              size:"compact",
              welcomeScreen:{title:"EUROSPACE",subtitle:"Connect your wallet to buy EURO on Monad"},
            }}
            wallets={undefined}
          />
          {nearAccount
            ? <div className="near-badge" onClick={disconnectNear}><span className="near-dot"/>{nearAccount.slice(0,14)}… ✕</div>
            : <div className="near-badge" onClick={()=>setNearModal(true)}>🌊 Connect NEAR</div>
          }
        </div>

        {account&&(
          <div className="wallet-bar show">
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontFamily:"monospace",fontSize:12}}>{shortAddr(account.address)}</span>
              <span className="w-badge">EVM</span>
              {isOwner&&<span className="w-badge" style={{background:"rgba(255,215,0,.12)",borderColor:"rgba(255,215,0,.3)",color:"#FFD700"}}>OWNER</span>}
            </div>
            <div style={{fontSize:11,color:"var(--success)",fontWeight:600}}>EURO: {fmt(twEuroBalance)}</div>
          </div>
        )}

        {/* Tabs */}
        <div className="tabs">
          {[
            {id:"presale", label:"Presale"},
            {id:"evmswap", label:"⚡ EVM Swap"},
            {id:"tokens",  label:"17 Tokens"},
            {id:"dex",     label:"DEX Live"},
            {id:"swap",    label:"NEAR Swap"},
            {id:"history", label:"History"},
          ].map(t=>(
            <button key={t.id} className={`tab ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>{t.label}</button>
          ))}
        </div>

        {/* ══ PRESALE ══ */}
        {tab==="presale"&&<>
          <div className="card">
            <div className="card-title">⬡ Presale Ends In</div>
            <div className="cd-grid">
              {[{v:countdown.d,l:"Days"},{v:countdown.h,l:"Hours"},{v:countdown.m,l:"Mins"},{v:countdown.s,l:"Secs"}].map(x=>(
                <div key={x.l} className="cd-box"><div className="cd-num">{x.v}</div><div className="cd-lbl">{x.l}</div></div>
              ))}
            </div>
            <div className="presale-bar"><div className="presale-fill" style={{width:countdown.pct+"%"}}/></div>
            <div style={{textAlign:"center",fontSize:11,color:"var(--muted)"}}>Ends April 18, 2027</div>
          </div>

          <div className="card">
            <div className="card-title">⬡ Live Stats</div>
            <div className="stats-grid">
              <div className="stat-box"><div className="stat-val" style={{color:"var(--cyan)"}}>{totalSupply}</div><div className="stat-lbl">Total Supply</div></div>
              <div className="stat-box"><div className="stat-val" style={{color:"var(--gold)"}}>{Number(tokensPerMON).toLocaleString()}</div><div className="stat-lbl">Tokens / MON</div></div>
              <div className="stat-box"><div className="stat-val" style={{color:buyStatus==="OPEN"?"var(--success)":"var(--error)"}}>{buyStatus}</div><div className="stat-lbl">Presale Status</div></div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">⬡ Buy Euro Coin</div>
            <div className="price-grid">
              <div className="price-box">
                <div className="price-lbl">Rate</div>
                <div className="price-val" style={{color:"var(--gold)"}}>{Number(tokensPerMON).toLocaleString()}</div>
                <div style={{fontSize:10,color:"var(--muted)",marginTop:4}}>EURO per MON</div>
              </div>
              <div className="price-box">
                <div className="price-lbl">Network</div>
                <div className="price-val" style={{fontSize:14,color:"var(--cyan)"}}>MONAD</div>
                <div style={{fontSize:10,color:"var(--muted)",marginTop:4}}>Chain ID 143</div>
              </div>
            </div>
            <div className="field">
              <label>You Pay</label>
              <div className="field-wrap">
                <input type="number" placeholder="0.0" min="0" step="0.01" value={monAmount} onChange={e=>setMonAmount(e.target.value)}/>
                <span className="field-unit">MON</span>
              </div>
            </div>
            <div className="receive-box">
              <div><div className="receive-amt">{receiveAmount}</div><div className="receive-lbl">EURO COIN</div></div>
              <img src="/logo.png" style={{width:36,height:36,borderRadius:"50%",objectFit:"cover",border:"2px solid var(--primary)"}} alt="EURO"/>
            </div>
            {!account
              ? <div className="tw-connect-wrap"><ConnectButton client={client} chain={MONAD_MAINNET} theme="dark" btnTitle="◈ Connect Wallet to Buy" connectModal={{title:"Connect to EUROSPACE",size:"compact"}} wallets={undefined}/></div>
              : <button className="btn-buy" onClick={handleBuyEuro} disabled={!monAmount||txStatus==="pending"}>{txStatus==="pending"?"◈ Processing…":"◈ Buy Euro Coin"}</button>
            }
            {txStatus==="success"&&(
              <div className="status-msg success">
                ✓ Bought {receiveAmount} EURO!
                {txHash&&<><br/><a href={`https://monad.socialscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer" style={{color:"var(--success)"}}>View Transaction ↗</a></>}
              </div>
            )}
            {txStatus==="error"&&<div className="status-msg error">Transaction failed. Check your wallet and try again.</div>}
            {isOwner&&(
              <div style={{marginTop:18,padding:16,background:"rgba(37,99,235,.06)",border:"1px solid rgba(37,99,235,.2)",borderRadius:12}}>
                <div className="card-title">⚙ Owner Panel</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <button className="btn-sm" onClick={()=>{sendTx(prepareContractCall({contract:euroTWContract,method:"toggleBuy",params:[true],abi:[{name:"toggleBuy",type:"function",inputs:[{type:"bool"}],outputs:[],stateMutability:"nonpayable"}]}),{onSuccess:()=>alert("Enabled!"),onError:e=>alert(e?.message)});}}>✓ Enable Presale</button>
                  <button className="btn-sm danger" onClick={()=>{sendTx(prepareContractCall({contract:euroTWContract,method:"toggleBuy",params:[false],abi:[{name:"toggleBuy",type:"function",inputs:[{type:"bool"}],outputs:[],stateMutability:"nonpayable"}]}),{onSuccess:()=>alert("Disabled!"),onError:e=>alert(e?.message)});}}>✕ Disable Presale</button>
                </div>
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-title">⬡ Contract Address</div>
            <div className="contract-box" onClick={()=>navigator.clipboard.writeText(EURO_CONTRACT)}>
              <div className="contract-addr">{EURO_CONTRACT}</div>
              <button className="copy-btn">COPY</button>
            </div>
            <a href={`https://monad.socialscan.io/address/${EURO_CONTRACT}`} target="_blank" rel="noopener noreferrer" className="explorer-link">🔍 View on Monad Explorer</a>
          </div>

          <div className="card">
            <div className="card-title">⬡ How To Buy</div>
            <div className="steps">
              {[
                {n:1,title:"Connect Wallet",desc:"Click ◈ Connect Wallet — MetaMask, WalletConnect, Trust, Coinbase and 300+ wallets supported"},
                {n:2,title:"Switch to Monad",desc:"Chain ID 143 is added automatically when you connect"},
                {n:3,title:"Enter MON Amount",desc:"Type how much MON to spend in the field above"},
                {n:4,title:"Buy EURO Coin",desc:"Tokens are sent instantly to your wallet on-chain"},
              ].map(s=>(
                <div key={s.n} className="step">
                  <div className="step-num">{s.n}</div>
                  <div className="step-text"><strong>{s.title}</strong>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </>}

        {/* ══ EVM SWAP ══ */}
        {tab==="evmswap"&&(
          <div className="card">
            <div className="card-title">⚡ EVM Swap — MON → Any Token</div>
            <div style={{fontSize:12,color:"var(--muted)",marginBottom:18,lineHeight:1.8,padding:"12px 14px",background:"var(--card2)",borderRadius:10,border:"1px solid var(--border)"}}>
              Swap <strong style={{color:"var(--accent)"}}>MON</strong> into any of the <strong style={{color:"var(--cyan)"}}>17 Meta Tokens</strong> with one click.
              Uses each token's on-chain <code style={{color:"#60a5fa",background:"rgba(37,99,235,.1)",padding:"1px 6px",borderRadius:4}}>buyTokens()</code> — no router, no slippage config needed.
            </div>
            {!account
              ? <div className="tw-connect-wrap"><ConnectButton client={client} chain={MONAD_MAINNET} theme="dark" btnTitle="Connect Wallet to Swap" wallets={undefined}/></div>
              : <>
                  <div className="swap-row">
                    <div className="field" style={{marginBottom:0}}>
                      <label>You Pay</label>
                      <div className="field-wrap"><input type="number" placeholder="0.0" value={evmFromAmt} onChange={e=>setEvmFromAmt(e.target.value)}/><span className="field-unit">MON</span></div>
                    </div>
                    <div className="swap-arrow">→</div>
                    <div className="field" style={{marginBottom:0}}>
                      <label>You Get</label>
                      <select value={evmToToken.symbol} onChange={e=>setEvmToToken(ALL_PAIRS.find(p=>p.symbol===e.target.value))}>
                        {ALL_PAIRS.map(p=><option key={p.symbol} value={p.symbol}>{p.symbol} — {p.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="info-pill"><span>Estimated output</span><span>{evmEstimate}</span></div>
                  {dexPrices[evmToToken.pair]&&<div className="info-pill"><span>DEX price</span><span>{dexPrices[evmToToken.pair].price.toFixed(6)} WMON/{evmToToken.symbol}</span></div>}
                  <button className="btn-buy" onClick={handleEvmSwap} disabled={!evmFromAmt||evmStatus?.type==="pending"} style={{background:`linear-gradient(135deg,${evmToToken.color}99,${evmToToken.color})`}}>
                    {evmStatus?.type==="pending"?"◈ Swapping…":`⚡ Swap MON → ${evmToToken.symbol}`}
                  </button>
                  {evmStatus&&<div className={`status-msg ${evmStatus.type}`}>{evmStatus.msg}</div>}
                  <div style={{marginTop:14,padding:12,background:"var(--card2)",border:"1px solid var(--border)",borderRadius:8,fontSize:11,color:"var(--muted)",lineHeight:1.8}}>
                    ℹ️ MON is sent directly to the token contract which calculates the rate and delivers tokens to your wallet. No approval step required.
                  </div>
                </>
            }
          </div>
        )}

        {/* ══ TOKENS ══ */}
        {tab==="tokens"&&(
          <div className="card">
            <div className="card-title">⬡ 17 Meta Tokens — Tap to Trade</div>
            <div className="gallery">
              {ALL_PAIRS.map(token=>(
                <div key={token.symbol} className="tok-card" style={{"--tok-color":token.color}} onClick={()=>openTokenModal(token)}>
                  <img className="tok-logo" src={token.img} alt={token.symbol} style={{borderColor:token.color}} onError={e=>(e.target.style.display="none")}/>
                  <div className="tok-sym">{token.symbol}</div>
                  <div className="tok-name">{token.name}</div>
                  <button className="tok-btn" style={{borderColor:token.color,color:token.color}}>◈ BUY/SELL</button>
                </div>
              ))}
            </div>
            <div style={{marginTop:14,fontSize:11,color:"var(--muted)",textAlign:"center"}}>Tap any token to open the trade modal · Connect wallet first</div>
          </div>
        )}

        {/* ══ DEX ══ */}
        {tab==="dex"&&(
          <div className="card">
            <div className="card-title">⬡ DEX Live · {ALL_PAIRS.length} Pairs</div>
            <div className="dex-filter">
              {["all","meta","stable","euro"].map(f=>(
                <button key={f} className={`dex-flt ${dexFilter===f?"active":""}`} onClick={()=>setDexFilter(f)}>{f.toUpperCase()}</button>
              ))}
            </div>
            <div className="dex-grid-list">
              {filteredPairs.map(p=>{
                const pd=dexPrices[p.pair];
                return (
                  <div key={p.pair} className="dex-row" style={{borderLeftColor:p.color}} onClick={()=>setSelectedPair(selectedPair===p.pair?null:p.pair)}>
                    <div className="dex-dot"/>
                    <img className="dex-logo" src={p.img} alt={p.symbol} onError={e=>(e.target.style.display="none")}/>
                    <div style={{flex:1}}>
                      <div className="dex-sym" style={{color:p.color}}>{p.symbol}</div>
                      <div className="dex-name">{p.name}</div>
                      <div style={{display:"flex",gap:6,marginTop:5}}>
                        <a href={`https://dexscreener.com/monad/${p.pair}`} target="_blank" rel="noopener noreferrer" style={{fontSize:9,padding:"2px 8px",border:"1px solid rgba(63,185,80,.3)",borderRadius:4,color:"var(--success)",textDecoration:"none",fontWeight:500}} onClick={e=>e.stopPropagation()}>📊 Chart</a>
                        <button style={{fontSize:9,padding:"2px 8px",border:"1px solid rgba(37,99,235,.3)",borderRadius:4,color:"#60a5fa",background:"transparent",cursor:"pointer",fontWeight:500}} onClick={e=>{e.stopPropagation();openTokenModal(p);}}>⚡ Trade</button>
                      </div>
                    </div>
                    <div className="dex-price">{pd?pd.price.toFixed(6)+" WMON":"—"}</div>
                  </div>
                );
              })}
            </div>
            {selectedPair&&(
              <div style={{marginTop:14,borderRadius:12,overflow:"hidden",border:"1px solid var(--border)"}}>
                <iframe src={`https://dexscreener.com/monad/${selectedPair}?embed=1&theme=dark&trades=0&info=0`} style={{width:"100%",height:360,border:"none",display:"block"}} title="DEX Chart"/>
              </div>
            )}
          </div>
        )}

        {/* ══ NEAR SWAP ══ */}
        {tab==="swap"&&(
          <div className="card">
            <div className="card-title">⬡ Swap → EURO via NEAR Intents</div>
            <div style={{fontSize:12,color:"var(--muted)",marginBottom:18,lineHeight:1.8,padding:"12px 14px",background:"var(--card2)",borderRadius:10,border:"1px solid var(--border)"}}>
              Powered by <strong style={{color:"var(--near)"}}>NEAR Intents</strong> — swap ETH, BTC, SOL, USDC → EURO.
              Get a quote, then click <strong style={{color:"var(--accent)"}}>⚡ SEND NOW</strong> to complete in one click.
            </div>
            {!account
              ? <div style={{textAlign:"center",padding:"20px 0"}}><ConnectButton client={client} chain={MONAD_MAINNET} theme="dark" btnTitle="Connect Wallet to Swap" wallets={undefined}/></div>
              : <>
                  <div className="field"><label>From Token</label>
                    <select value={swapOrigin} onChange={e=>setSwapOrigin(e.target.value)}>
                      <option value="">Select token…</option>
                      {swapTokens.map(t=><option key={t.assetId} value={t.assetId}>{t.symbol} — {t.blockchain?.toUpperCase()||""}{t.price?" ($"+Number(t.price).toFixed(2)+")":""}</option>)}
                    </select>
                  </div>
                  <div className="field"><label>Amount to Swap</label><div className="field-wrap"><input type="number" placeholder="0.00" value={swapAmount} onChange={e=>setSwapAmount(e.target.value)}/></div></div>
                  <div className="field"><label>Receive To (EVM Address)</label><input value={account.address} readOnly style={{color:"var(--muted)",paddingRight:14}}/></div>
                  <button className="btn-buy" onClick={handleNearQuote} disabled={!swapOrigin||!swapAmount||swapLoading}>{swapLoading?"⬡ Fetching Quote…":"◈ Get Best Quote"}</button>
                  {swapError&&<div className="status-msg error">{swapError}</div>}
                  {swapQuote&&!swapError&&(
                    <>
                      <div className="quote-box">
                        {[
                          ["You Send",`${swapAmount} ${swapTokens.find(t=>t.assetId===swapOrigin)?.symbol||""}`],
                          ["You Receive",swapQuote.amountOutFormatted?`${swapQuote.amountOutFormatted} EURO`:"—"],
                          ["Slippage","1%"],
                          ["Deadline",swapQuote.deadline?new Date(swapQuote.deadline).toLocaleTimeString():"10 min"],
                        ].map(([k,v])=><div key={k} className="quote-row"><span>{k}</span><span>{v}</span></div>)}
                      </div>
                      {swapQuote.depositAddress&&(
                        <div className="deposit-box">
                          <div style={{color:"var(--accent)",marginBottom:6,fontWeight:700,fontSize:10,letterSpacing:1}}>DEPOSIT ADDRESS</div>
                          {swapQuote.depositAddress}
                          <div style={{marginTop:8,color:"var(--muted)",fontSize:11}}>Send tokens here → NEAR Intents delivers EURO to your wallet automatically.</div>
                          <button className="btn-send" onClick={handleNearSend} disabled={sendStatus?.type==="pending"}>{sendStatus?.type==="pending"?"⏳ Sending…":"⚡ SEND NOW (One-Click)"}</button>
                          <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(swapQuote.depositAddress)}>📋 Copy Deposit Address</button>
                        </div>
                      )}
                      {sendStatus&&<div className={`status-msg ${sendStatus.type}`}>{sendStatus.msg}</div>}
                    </>
                  )}
                  {nearAccount&&(
                    <div style={{marginTop:14,padding:12,background:"rgba(0,193,222,.07)",border:"1px solid rgba(0,193,222,.25)",borderRadius:10}}>
                      <div style={{fontSize:10,color:"var(--near)",letterSpacing:2,marginBottom:5,fontWeight:600,textTransform:"uppercase"}}>NEAR Account Linked</div>
                      <div style={{fontSize:12,color:"var(--muted)",fontFamily:"monospace"}}>{nearAccount}</div>
                    </div>
                  )}
                </>
            }
          </div>
        )}

        {/* ══ HISTORY ══ */}
        {tab==="history"&&(
          <div className="card">
            <div className="card-title">⬡ Transaction History (this session)</div>
            <div className="tx-list">
              {txHistory.length===0
                ? <div className="tx-empty">No transactions yet this session</div>
                : txHistory.map((tx,i)=>(
                    <div key={i} className="tx-row">
                      <span>{tx.type==="buy"?"🟢":"🔴"}</span>
                      <span className="tx-desc">{tx.type==="buy"?"Bought":"Sold"} {tx.amount} {tx.symbol}</span>
                      <span className="tx-time">{tx.time.toLocaleTimeString()}</span>
                      {tx.hash&&<a className="tx-link" href={`https://monad.socialscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">VIEW ↗</a>}
                    </div>
                  ))
              }
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="footer">
          <div className="footer-title">EUROSPACE</div>
          <div style={{marginTop:4,fontSize:11,color:"var(--muted)"}}>MONAD MAINNET · 2026</div>
          <div className="social-links">
            <a href="https://x.com/bnbgold277983" target="_blank" rel="noopener noreferrer" className="social-link" style={{color:"#e7e9ea"}}>𝕏 Twitter</a>
            <a href="https://discord.com/channels/1316093079090106472" target="_blank" rel="noopener noreferrer" className="social-link" style={{color:"#7289da"}}>Discord</a>
            <a href="https://t.me/eurocoin_monad_bot" target="_blank" rel="noopener noreferrer" className="social-link" style={{color:"#29aae1"}}>Telegram</a>
          </div>
          <div style={{marginTop:18,fontSize:10,color:"var(--border)",letterSpacing:2}}>© 2026 EUROSPACE · ALL RIGHTS RESERVED</div>
        </div>
      </div>
    </>
  );
}

export default function EurospacePage() {
  return <ThirdwebProvider><EurospaceApp/></ThirdwebProvider>;
}
