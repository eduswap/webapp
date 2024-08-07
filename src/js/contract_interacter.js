import { ethers } from "ethers";

import usdcImg from "@/assets/token/usdc.png";
import eduImg from "@/assets/token/edu.png";
import ethImg from "@/assets/token/eth.png";
import arbImg from "@/assets/token/arb.png";
import eduswapImg from "@/assets/token/eduswap.png";

import viewArtifacts from "@/abis/EduswapV2View.json"
import routerArtifacts from "@/abis/EduswapV2Router.json"
import tokenArtifacts from "@/abis/ERC20.json"
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
let signer = null;
let account = null;

let viewContract = null;
let routerContract = null;
let tokenContract = {};

const viewContractAddress = "0x8233B16904ceb6f34E3107464564a444daF4d3f2";
const routerContractAddress = "0xe745f43775B760958cd34ee83B3ab0c088F74630";

function attach() {
    if (provider == null) {
        provider = new ethers.BrowserProvider(window.ethereum);
    }

    if (viewContract == null) {
        viewContract = new ethers.Contract(viewContractAddress, viewArtifacts.abi, provider);
    }

    if (routerContract == null) {
        routerContract = new ethers.Contract(routerContractAddress, routerArtifacts.abi, provider);
    }

    if (Object.keys(tokenContract).length == 0) {
        for (let i = 0; i < tokens.length; i++) {
            tokenContract[tokens[i].address] = new ethers.Contract(tokens[i].address, tokenArtifacts.abi, provider);
        }
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
    signer = await provider.getSigner();
    account = await signer.getAddress();
}

async function getAmountsOutInfo(amountIn, tokenIn, tokenOut) {
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

async function getAmountsInInfo(amountOut, tokenIn, tokenOut) {
    if (amountOut == 0) return { amountIn: null, spotPrice: null }
    const fromDecimals = tokens.filter((token) => token.address == tokenIn)[0].decimals;
    const toDecimals = tokens.filter((token) => token.address == tokenOut)[0].decimals;

    amountOut = ethers.parseUnits(amountOut.toString(), toDecimals);

    const [amountsIn, spotPrices] = await viewContract.getAmountsInInfo(amountOut, paths[tokenIn][tokenOut]);

    const minIndex = amountsIn.reduce(
        (minIdx, currentValue, currentIndex, array) => {
            return currentValue < array[minIdx] ? currentIndex : minIdx;
        },
        0
    );

    const amountIn = ethers.formatUnits(amountsIn[minIndex], fromDecimals);
    const spotPrice = ethers.formatUnits(spotPrices[minIndex], 18);
    const path = paths[tokenIn][tokenOut][minIndex];

    return { amountIn, spotPrice, path }
}

async function checkAllowance(tokenAddress) {
    if (account == null) {
        return true
    }

    if (tokenAddress == "0xbd51800607E7C743a0e9b0D89D837058F4f42756") {
        return true
    } else {
        const allowance = await tokenContract[tokenAddress].allowance(account, routerContractAddress);
        return allowance == ethers.MaxUint256
    }
}

async function approveToken(tokenAddress) {
    const tx = await tokenContract[tokenAddress]
        .connect(signer)
        .approve(
            routerContractAddress,
            ethers.MaxUint256
        );
    await tx.wait();
    console.log("approveToken:", tx.hash);
}

async function swapExactTokensForTokens(amountIn, amountOutMin, path) {
    const fromDecimals = tokens.filter((token) => token.address == path[0])[0].decimals;
    const toDecimals = tokens.filter((token) => token.address == path[path.length - 1])[0].decimals;

    amountIn = ethers.parseUnits(amountIn.toString(), fromDecimals);
    amountOutMin = ethers.parseUnits(amountOutMin.toString(), toDecimals);

    // 1 ftoken: eth
    if (path[0] == "0xbd51800607E7C743a0e9b0D89D837058F4f42756") {
        const tx = await routerContract
            .connect(signer)
            .swapExactETHForTokens(
                amountOutMin,
                path,
                account,
                ethers.MaxUint256
                , { value: amountIn }
            );
        await tx.wait();
        console.log("swapExactETHForTokens:", tx.hash);
    }

    // 2 ttoken: eth
    else if (path[1] == "0xbd51800607E7C743a0e9b0D89D837058F4f42756") {
        const tx = await routerContract
            .connect(signer)
            .swapExactTokensForETH(
                amountIn,
                amountOutMin,
                path,
                account,
                ethers.MaxUint256
            );
        await tx.wait();
        console.log("swapExactTokensForETH:", tx.hash);
    }

    // 3 ftoken & ttoken: x eth
    else {
        const tx = await routerContract
            .connect(signer)
            .swapExactTokensForTokens(
                amountIn,
                amountOutMin,
                path,
                account,
                ethers.MaxUint256
            );
        await tx.wait();
        console.log("swapExactTokensForTokens:", tx.hash);
    }
}

export {
    getTokens,
    attach,
    getAccount,
    getImageSource,
    updateTokenBalance,
    updateAccount,
    getAmountsOutInfo,
    getAmountsInInfo,
    checkAllowance,
    approveToken,
    swapExactTokensForTokens,
}