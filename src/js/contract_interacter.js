import { ethers } from "ethers";

import usdcImg from "@/assets/token/usdc.png";
import eduImg from "@/assets/token/edu.png";
import ethImg from "@/assets/token/eth.png";
import arbImg from "@/assets/token/arb.png";
import eduswapImg from "@/assets/token/eduswap.png";

import viewArtifacts from "@/abis/EduswapV2View.json"

let tokens = [
    {
        "symbol": "USDC",
        "name": "eduswap test USDC",
        "address": "0x7aFB87aE9E37c365955012527f8a9039D6F2CA30",
        "img": usdcImg,
        "decimals": 6,
        "balance": 0,
    },
    {
        "symbol": "WEDU",
        "name": "wrapped EDU",
        "address": "0xbd51800607E7C743a0e9b0D89D837058F4f42756",
        "img": eduImg,
        "decimals": 18,
        "balance": 0,
    },
    {
        "symbol": "ETH",
        "name": "eduswap test ETH",
        "address": "0x90f2F4E97Eb6B62D9049D07C6f6877FD171a9a0F",
        "img": ethImg,
        "decimals": 18,
        "balance": 0,
    },
    {
        "symbol": "ARB",
        "name": "eduswap test ARB",
        "address": "0x90f2F4E97Eb6B62D9049D07C6f6877FD171a9a0F",
        "img": arbImg,
        "decimals": 18,
        "balance": 0,
    },
    {
        "symbol": "EDUSWAP",
        "name": "eduswap token",
        "address": "0x90f2F4E97Eb6B62D9049D07C6f6877FD171a9a0F",
        "img": eduswapImg,
        "decimals": 18,
        "balance": 0,
    },
]

let provider = null;
let account = null;

let viewContract = null;

const viewContractAddress = "0xaA4263660F1c4A6F84b242c77F3a250824a0F935";

function attach() {
    if (provider == null) {
        provider = new ethers.BrowserProvider(window.ethereum);
    }

    if (viewContract == null) {
        viewContract = new ethers.Contract(viewContractAddress, viewArtifacts.abi, provider);
    }
}

function getTokens() {
    return tokens;
}

function getAccount() {
    return account;
}

async function updateTokenBalance(userAddress) {
    const tokenAddrs = tokens.map(token => token.address);

    const balances = await viewContract.getTokenBalances(tokenAddrs, userAddress);
    for (let i = 0; i < tokens.length; i++) {
        tokens[i].balance = formatNumber(balances[i], tokens[i].decimals);
    }
}

async function updateAccount() {
    const signer = await provider.getSigner();
    account = await signer.getAddress();
}

function formatNumber(num, decimalPlaces) {
    let numStr = num.toString();

    if (numStr.length <= decimalPlaces) {
        const zerosToAdd = decimalPlaces - numStr.length + 1;
        numStr = '0'.repeat(zerosToAdd) + numStr;
    }

    return numStr.slice(0, -decimalPlaces) + '.' + numStr.slice(-decimalPlaces);
}

export {
    getTokens,
    attach,
    getAccount,
    updateTokenBalance,
    updateAccount,
}