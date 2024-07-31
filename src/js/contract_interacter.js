import { ethers } from "ethers";

import usdcImg from "@/assets/token/usdc.png";
import eduImg from "@/assets/token/edu.png";
import ethImg from "@/assets/token/eth.png";
import arbImg from "@/assets/token/arb.png";
import eduswapImg from "@/assets/token/eduswap.png";

const tokens = [
    {
        "symbol": "USDC",
        "name": "eduswap test USDC",
        "address": "0x7aFB87aE9E37c365955012527f8a9039D6F2CA30",
        "img": usdcImg,
        "decimals": 6,
    },
    {
        "symbol": "WEDU",
        "name": "wrapped EDU",
        "address": "0xbd51800607E7C743a0e9b0D89D837058F4f42756",
        "img": eduImg,
        "decimals": 18,
    },
    {
        "symbol": "ETH",
        "name": "eduswap test ETH",
        "address": "0x90f2F4E97Eb6B62D9049D07C6f6877FD171a9a0F",
        "img": ethImg,
        "decimals": 18,
    },
    {
        "symbol": "ARB",
        "name": "eduswap test ARB",
        "address": "0x90f2F4E97Eb6B62D9049D07C6f6877FD171a9a0F",
        "img": arbImg,
        "decimals": 18,
    },
    {
        "symbol": "EDUSWAP",
        "name": "eduswap token",
        "address": "0x90f2F4E97Eb6B62D9049D07C6f6877FD171a9a0F",
        "img": eduswapImg,
        "decimals": 18,
    },
]

let provider = undefined;
let account = "mg";
// let account = "mg";

function getTokens() {
    return tokens;
}

async function attach() {
    provider = new ethers.BrowserProvider(window.ethereum);

    
}

function getAccount() {
    return new Date();
}


function getProvider() {
    return account;
}

export {
    getTokens,
    attach,
    getAccount,
}