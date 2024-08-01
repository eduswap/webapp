import { ethers } from "ethers";

import usdcImg from "@/assets/token/usdc.png";
import eduImg from "@/assets/token/edu.png";
import ethImg from "@/assets/token/eth.png";
import arbImg from "@/assets/token/arb.png";
import eduswapImg from "@/assets/token/eduswap.png";

import viewArtifacts from "@/abis/EduswapV2View.json"
import paths from "@/constants/paths.json"

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
        "address": "0x3FBA3ef10e452D1e8Cc6C0cf552A8A25b572Ec41",
        "img": arbImg,
        "decimals": 18,
        "balance": 0,
    },
    {
        "symbol": "EDUSWAP",
        "name": "eduswap token",
        "address": "0x104A0F99728D5a79dbEbB4a0a58eCcb456e82411",
        "img": eduswapImg,
        "decimals": 18,
        "balance": 0,
    },
]

let provider = null;
let account = null;

let viewContract = null;

const viewContractAddress = "0x128bdb0B45EB4Ea5F2bcD740f39C08E6368Cd4fe";

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

function getPaths() {
    return paths;
}

function getAccount() {
    return account;
}

function getImageSource(tokenAddress) {
    return tokens.filter((token) => token.address == tokenAddress)[0].img;
}

async function updateTokenBalance(userAddress) {
    const tokenAddrs = tokens.map(token => token.address);

    const balances = await viewContract.getTokenBalances(tokenAddrs, userAddress);
    for (let i = 0; i < tokens.length; i++) {
        tokens[i].balance = ethers.formatUnits(balances[i], tokens[i].decimals);
    }
}

async function updateAccount() {
    const signer = await provider.getSigner();
    account = await signer.getAddress();
}

async function getAmountsInfo(amountIn, tokenIn, tokenOut) {
    if (amountIn == 0) return { amountOut: null, spotPrice: null }
    const fromDecimals = tokens.filter((token) => token.address == tokenIn)[0].decimals;
    const toDecimals = tokens.filter((token) => token.address == tokenOut)[0].decimals;

    amountIn = ethers.parseUnits(amountIn.toString(), fromDecimals);

    const [amountsOut, spotPrices] = await viewContract.getAmountsOutInfo(amountIn, paths[tokenIn][tokenOut]);

    const maxIndex = amountsOut.reduce(
        (maxIdx, currentValue, currentIndex, array) => {
            return currentValue > array[maxIdx] ? currentIndex : maxIdx;
        },
        0
    );

    const amountOut = ethers.formatUnits(amountsOut[maxIndex], toDecimals);
    const spotPrice = ethers.formatUnits(spotPrices[maxIndex], 18);
    const path = paths[tokenIn][tokenOut][maxIndex];

    return { amountOut, spotPrice, path }
}

export {
    getTokens,
    attach,
    getAccount,
    getImageSource,
    updateTokenBalance,
    updateAccount,
    getAmountsInfo,
}