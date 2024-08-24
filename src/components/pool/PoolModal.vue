<template>
  <div class="pool-modal-wrapper" v-if="!showConfirmModal">
    <div class="pool-modal-back-wrapper" @click="closeModal">
      <img src="@/assets/pool-modal/back.svg" alt="back" />
      <div class="pool-modal-back-text">Back</div>
    </div>
    <!--  -->
    <div class="pool-modal-btn-wrapper">
      <div
        class="pool-modal-btn-text-wrapper"
        @click="updateBtnIndex(0)"
        :class="{ 'is-active': btnIndex == 0 }"
      >
        <div
          class="pool-modal-btn-text"
          :class="{ 'is-active': btnIndex == 0 }"
        >
          Deposit
        </div>
      </div>
      <div
        class="pool-modal-btn-text-wrapper"
        @click="updateBtnIndex(1)"
        :class="{ 'is-active': btnIndex == 1 }"
      >
        <div
          class="pool-modal-btn-text"
          :class="{ 'is-active': btnIndex == 1 }"
        >
          Withdraw
        </div>
      </div>
    </div>
    <div class="pool-modal-body-wrapper" v-if="btnIndex == 0">
      <div class="pool-modal-body-top-wrapper">
        <div class="pool-modal-input-box-wrapper">
          <div class="pool-modal-input-select-container">
            <div class="pool-modal-input-select-wrapper">
              <div class="pool-modal-input-select-text" @click="halfAmount0">
                half
              </div>
            </div>
            <div class="pool-modal-input-select-wrapper">
              <div class="pool-modal-input-select-text" @click="maxAmount0">
                max
              </div>
            </div>
          </div>
          <div class="pool-modal-input-token-wrapper">
            <div class="pool-modal-input-left-wrapper">
              <img :src="imgSource[pooldata.token0]" alt="token" />
              <div class="pool-modal-input-token-name-wrapper">
                <div class="pool-modal-input-token-symbol-text">
                  {{ pooldata.symbol0 }}
                </div>
                <div class="pool-modal-input-token-name-text">
                  {{
                    getTokens().find((item) => item.address == pooldata.token0)
                      .name
                  }}
                </div>
              </div>
            </div>
            <div class="pool-modal-input-right-wrapper">
              <input class="pool-modal-value" type="number" v-model="amount0" />
              <div class="pool-modal-input-balance-text">
                Balance:
                {{ (pooldata.balance0 / 10 ** pooldata.decimals0).toFixed(4) }}
              </div>
            </div>
          </div>
        </div>
        <div class="pool-modal-divider-wrapper">
          <img src="@/assets/pool-modal/plus.svg" alt="plus" />
        </div>
        <div class="pool-modal-input-box-wrapper">
          <div class="pool-modal-input-select-container">
            <div class="pool-modal-input-select-wrapper">
              <div class="pool-modal-input-select-text" @click="halfAmount1">
                half
              </div>
            </div>
            <div class="pool-modal-input-select-wrapper">
              <div class="pool-modal-input-select-text" @click="maxAmount1">
                max
              </div>
            </div>
          </div>
          <div class="pool-modal-input-token-wrapper">
            <div class="pool-modal-input-left-wrapper">
              <img :src="imgSource[pooldata.token1]" alt="token" />
              <div class="pool-modal-input-token-name-wrapper">
                <div class="pool-modal-input-token-symbol-text">
                  {{ pooldata.symbol1 }}
                </div>
                <div class="pool-modal-input-token-name-text">
                  {{
                    getTokens().find((item) => item.address == pooldata.token1)
                      .name
                  }}
                </div>
              </div>
            </div>
            <div class="pool-modal-input-right-wrapper">
              <input class="pool-modal-value" type="number" v-model="amount1" />
              <div class="pool-modal-input-balance-text">
                Balance:
                {{ (pooldata.balance1 / 10 ** pooldata.decimals1).toFixed(4) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pool-modal-body-wrapper" v-if="btnIndex == 1">
      <div class="pool-modal-body-top-wrapper">
        <div class="pool-modal-input-box-wrapper">
          <div class="pool-modal-input-select-container">
            <div class="pool-modal-input-select-wrapper">
              <div class="pool-modal-input-select-text" @click="halfAmountLp">
                half
              </div>
            </div>
            <div class="pool-modal-input-select-wrapper">
              <div class="pool-modal-input-select-text" @click="maxAmountLp">
                max
              </div>
            </div>
          </div>
          <div class="pool-modal-input-token-wrapper">
            <div class="pool-modal-input-left-wrapper2">
              <img :src="imgSource[pooldata.token0]" alt="token" />
              <img :src="imgSource[pooldata.token1]" alt="token" />
              <div class="pool-modal-input-token-name-wrapper">
                <div class="pool-modal-input-token-symbol-text">
                  {{ pooldata.symbol0 }} / {{ pooldata.symbol1 }}
                </div>
                <div class="pool-modal-input-token-name-text">
                  {{ `${pooldata.symbol0}-${pooldata.symbol1} LP` }}
                </div>
              </div>
            </div>
            <div class="pool-modal-input-right-wrapper2">
              <div class="pool-modal-value-percentage-wrapper">
                <input
                  class="pool-modal-value2"
                  type="number"
                  max="100"
                  v-model="amountlp"
                />
                <div class="pool-modal-value-percentage-text">%</div>
              </div>
              <div class="pool-modal-input-balance-text">
                Balance: {{ (pooldata.mysupply / 10 ** 18).toFixed(4) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pool-modal-detials-wrapper">
      <div class="pool-modal-detials-list-wrapper">
        <div class="pool-modal-detials-list-text">Exchange Rate</div>
        <div class="pool-modal-detials-list-text2">
          1 {{ pooldata.symbol0 }} =
          {{
            (
              pooldata.reserve1 /
              10 ** pooldata.decimals1 /
              (pooldata.reserve0 / 10 ** pooldata.decimals0)
            ).toFixed(4)
          }}
          {{ pooldata.symbol1 }}
        </div>
      </div>
      <div class="pool-modal-detials-list-wrapper" v-if="btnIndex == 0">
        <div class="pool-modal-detials-list-text">Expected APR</div>
        <div class="pool-modal-detials-list-text2">12.12%</div>
      </div>
      <div class="pool-modal-detials-list-wrapper">
        <div class="pool-modal-detials-list-text">Slipage</div>
        <div class="pool-modal-detials-list-slipage-text">0.5%</div>
      </div>
    </div>

    <div class="pool-modal-tx-btn-wrapper" @click="tx">
      <div class="pool-modal-tx-btn-text">{{ btnName }}</div>
    </div>
  </div>

  <ConfirmTransaction
    v-if="showConfirmModal"
    :txStatus="txStatus"
    @closeModal="closeConfirmModal"
  />
</template>

<script>
import usdcImg from "@/assets/token/usdc.png";
import eduImg from "@/assets/token/edu.png";
import ethImg from "@/assets/token/eth.png";
import arbImg from "@/assets/token/arb.png";
import eduswapImg from "@/assets/token/eduswap.png";
import { ethers } from "ethers";

import {
  getTokens,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@/js/contract_interacter.js";

import ConfirmTransaction from "@/components/common/ConfirmTransaction.vue";

export default {
  components: {
    ConfirmTransaction,
  },
  props: {
    pooldata: {
      type: Object,
    },
  },
  data() {
    return {
      btnIndex: 0,
      showConfirmModal: false,
      txStatus: "ing",
      // buttonLabel: "...",
      isApproved: {
        token0: null,
        token1: null,
        tokenLp: null,
      },
      amount0: 0,
      amount1: 0,
      amountlp: 0,
      imgSource: {
        "0x7aFB87aE9E37c365955012527f8a9039D6F2CA30": usdcImg,
        "0xbd51800607E7C743a0e9b0D89D837058F4f42756": eduImg,
        "0x90f2F4E97Eb6B62D9049D07C6f6877FD171a9a0F": ethImg,
        "0x3FBA3ef10e452D1e8Cc6C0cf552A8A25b572Ec41": arbImg,
        "0x104A0F99728D5a79dbEbB4a0a58eCcb456e82411": eduswapImg,
      },
    };
  },
  async created() {
    await this.checkAllowance();
  },
  methods: {
    updateBtnIndex(index) {
      this.btnIndex = index;

      this.amount0 = 0;
      this.amount1 = 0;
      this.amountlp = 0;
    },
    closeModal() {
      this.$emit("closeModal");
    },
    closeConfirmModal() {
      this.showConfirmModal = false;
    },
    halfAmount0() {
      this.amount0 = this.pooldata.balance0 / 10 ** this.pooldata.decimals0 / 2;
    },
    halfAmount1() {
      this.amount1 = this.pooldata.balance1 / 10 ** this.pooldata.decimals1 / 2;
    },
    halfAmountLp() {
      this.amountlp = 50;
    },
    maxAmount0() {
      this.amount0 = this.pooldata.balance0 / 10 ** this.pooldata.decimals0;
    },
    maxAmount1() {
      this.amount1 = this.pooldata.balance1 / 10 ** this.pooldata.decimals1;
    },
    maxAmountLp() {
      this.amountlp = 100;
    },
    getTokens() {
      return getTokens();
    },
    async checkAllowance() {
      this.isApproved = await this.getAllowance();
    },
    async getAllowance() {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();
      const contractAddress0 = this.pooldata.token0;
      const contractAddress1 = this.pooldata.token0;
      const contractAddressLp = this.pooldata.pair;
      const contractABI = [
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];

      const contract0 = new ethers.Contract(
        contractAddress0,
        contractABI,
        provider
      );
      const contract1 = new ethers.Contract(
        contractAddress1,
        contractABI,
        provider
      );
      const contractLp = new ethers.Contract(
        contractAddressLp,
        contractABI,
        provider
      );

      const allowance0 = await contract0.allowance(
        account,
        "0xe745f43775B760958cd34ee83B3ab0c088F74630"
      );
      const allowance1 = await contract1.allowance(
        account,
        "0xe745f43775B760958cd34ee83B3ab0c088F74630"
      );
      const allowanceLp = await contractLp.allowance(
        account,
        "0xe745f43775B760958cd34ee83B3ab0c088F74630"
      );

      return {
        token0: allowance0 == ethers.MaxUint256,
        token1: allowance1 == ethers.MaxUint256,
        tokenLp: allowanceLp == ethers.MaxUint256,
      };
    },
    async tx() {
      this.showConfirmModal = true;
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const account = await signer.getAddress();
        const contractAddress0 = this.pooldata.token0;
        const contractAddress1 = this.pooldata.token0;
        const contractAddressLp = this.pooldata.pair;
        const contractAddressRouter =
          "0xe745f43775B760958cd34ee83B3ab0c088F74630";
        const contractABI = [
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "approve",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
        ];

        const routerContractABI = [
          {
            inputs: [],
            name: "WETH",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "tokenA",
                type: "address",
              },
              {
                internalType: "address",
                name: "tokenB",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amountADesired",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountBDesired",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountAMin",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountBMin",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            name: "addLiquidity",
            outputs: [
              {
                internalType: "uint256",
                name: "amountA",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountB",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "liquidity",
                type: "uint256",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amountTokenDesired",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountTokenMin",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountETHMin",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            name: "addLiquidityETH",
            outputs: [
              {
                internalType: "uint256",
                name: "amountToken",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountETH",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "liquidity",
                type: "uint256",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [],
            name: "factory",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "reserveIn",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "reserveOut",
                type: "uint256",
              },
            ],
            name: "getAmountIn",
            outputs: [
              {
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "reserveIn",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "reserveOut",
                type: "uint256",
              },
            ],
            name: "getAmountOut",
            outputs: [
              {
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
              },
              {
                internalType: "address[]",
                name: "path",
                type: "address[]",
              },
            ],
            name: "getAmountsIn",
            outputs: [
              {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
              },
              {
                internalType: "address[]",
                name: "path",
                type: "address[]",
              },
            ],
            name: "getAmountsOut",
            outputs: [
              {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "amountA",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "reserveA",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "reserveB",
                type: "uint256",
              },
            ],
            name: "quote",
            outputs: [
              {
                internalType: "uint256",
                name: "amountB",
                type: "uint256",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "tokenA",
                type: "address",
              },
              {
                internalType: "address",
                name: "tokenB",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "liquidity",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountAMin",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountBMin",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            name: "removeLiquidity",
            outputs: [
              {
                internalType: "uint256",
                name: "amountA",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountB",
                type: "uint256",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "liquidity",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountTokenMin",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountETHMin",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            name: "removeLiquidityETH",
            outputs: [
              {
                internalType: "uint256",
                name: "amountToken",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountETH",
                type: "uint256",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "liquidity",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountTokenMin",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountETHMin",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "approveMax",
                type: "bool",
              },
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
            ],
            name: "removeLiquidityETHWithPermit",
            outputs: [
              {
                internalType: "uint256",
                name: "amountToken",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountETH",
                type: "uint256",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "tokenA",
                type: "address",
              },
              {
                internalType: "address",
                name: "tokenB",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "liquidity",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountAMin",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountBMin",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "approveMax",
                type: "bool",
              },
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
            ],
            name: "removeLiquidityWithPermit",
            outputs: [
              {
                internalType: "uint256",
                name: "amountA",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountB",
                type: "uint256",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
              },
              {
                internalType: "address[]",
                name: "path",
                type: "address[]",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            name: "swapETHForExactTokens",
            outputs: [
              {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "amountOutMin",
                type: "uint256",
              },
              {
                internalType: "address[]",
                name: "path",
                type: "address[]",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            name: "swapExactETHForTokens",
            outputs: [
              {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountOutMin",
                type: "uint256",
              },
              {
                internalType: "address[]",
                name: "path",
                type: "address[]",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            name: "swapExactTokensForETH",
            outputs: [
              {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountOutMin",
                type: "uint256",
              },
              {
                internalType: "address[]",
                name: "path",
                type: "address[]",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            name: "swapExactTokensForTokens",
            outputs: [
              {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountInMax",
                type: "uint256",
              },
              {
                internalType: "address[]",
                name: "path",
                type: "address[]",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            name: "swapTokensForExactETH",
            outputs: [
              {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountInMax",
                type: "uint256",
              },
              {
                internalType: "address[]",
                name: "path",
                type: "address[]",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            name: "swapTokensForExactTokens",
            outputs: [
              {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
        ];

        if (this.btnIndex == 0) {
          if (!this.isApproved.token0) {
            const contract0 = new ethers.Contract(
              contractAddress0,
              contractABI,
              provider
            );

            const tx = await contract0
              .connect(signer)
              .approve(
                "0xe745f43775B760958cd34ee83B3ab0c088F74630",
                ethers.MaxUint256
              );
            await tx.wait();
            console.log("deposit::approve:", tx.hash);

            this.isApproved.token0 = true;
          }

          if (!this.isApproved.token1) {
            const contract1 = new ethers.Contract(
              contractAddress1,
              contractABI,
              provider
            );

            const tx = await contract1
              .connect(signer)
              .approve(
                "0xe745f43775B760958cd34ee83B3ab0c088F74630",
                ethers.MaxUint256
              );
            await tx.wait();
            console.log("deposit::approve:", tx.hash);

            this.isApproved.token1 = true;
          }

          const router = new ethers.Contract(
            contractAddressRouter,
            routerContractABI,
            provider
          );

          // 1. token0 eth
          if (
            this.pooldata.token0 == "0xbd51800607E7C743a0e9b0D89D837058F4f42756"
          ) {
            console.log("1 token0 == eth");
            const tx = await router
              .connect(signer)
              .addLiquidityETH(
                this.pooldata.token1,
                BigInt(this.amount1 * 10 ** 18) /
                  BigInt(10 ** (18 - this.pooldata.decimals1)),
                0,
                0,
                account,
                ethers.MaxUint256,
                {
                  value:
                    BigInt(this.amount0 * 10 ** 18) /
                    BigInt(10 ** (18 - this.pooldata.decimals0)),
                }
              );
            await tx.wait();
            console.log("deposit::removeLiquidity:", tx.hash);
          }
          // 2. token1 eth
          else if (
            this.pooldata.token1 == "0xbd51800607E7C743a0e9b0D89D837058F4f42756"
          ) {
            console.log("2 token1 == eth");
            const tx = await router
              .connect(signer)
              .addLiquidityETH(
                this.pooldata.token0,
                BigInt(this.amount0 * 10 ** 18) /
                  BigInt(10 ** (18 - this.pooldata.decimals0)),
                0,
                0,
                account,
                ethers.MaxUint256,
                {
                  value:
                    BigInt(this.amount1 * 10 ** 18) /
                    BigInt(10 ** (18 - this.pooldata.decimals1)),
                }
              );
            await tx.wait();
            console.log("deposit::removeLiquidity:", tx.hash);
          }
          // 3. eth x
          else {
            console.log("3 token0 token1 != eth");
            const tx = await router
              .connect(signer)
              .addLiquidity(
                this.pooldata.token0,
                this.pooldata.token1,
                BigInt(this.amount0 * 10 ** 18) /
                  BigInt(10 ** (18 - this.pooldata.decimals0)),
                BigInt(this.amount1 * 10 ** 18) /
                  BigInt(10 ** (18 - this.pooldata.decimals1)),
                0,
                0,
                account,
                ethers.MaxUint256
              );
            await tx.wait();
            console.log("deposit::removeLiquidity:", tx.hash);
          }
          this.amount0 = 0;
          this.amount1 = 0;
          this.txStatus = "success";
        } else if (this.btnIndex == 1 && this.amountlp > 0) {
          if (!this.isApproved.tokenLp) {
            const contractLp = new ethers.Contract(
              contractAddressLp,
              contractABI,
              provider
            );

            const tx = await contractLp
              .connect(signer)
              .approve(
                "0xe745f43775B760958cd34ee83B3ab0c088F74630",
                ethers.MaxUint256
              );
            await tx.wait();
            console.log("withdraw::approve:", tx.hash);

            this.isApproved.tokenLp = true;
          }

          const router = new ethers.Contract(
            contractAddressRouter,
            routerContractABI,
            provider
          );

          // 1. token0 eth
          if (
            this.pooldata.token0 == "0xbd51800607E7C743a0e9b0D89D837058F4f42756"
          ) {
            console.log("1 token0 == eth");
            const tx = await router
              .connect(signer)
              .removeLiquidityETH(
                this.pooldata.token1,
                (BigInt(this.pooldata.mysupply) *
                  BigInt(Math.floor(this.amountlp * 10000))) /
                  1000000n,
                0,
                0,
                account,
                ethers.MaxUint256
              );
            await tx.wait();
            console.log("withdraw::removeLiquidity:", tx.hash);
          }
          // 2. token1 eth
          else if (
            this.pooldata.token1 == "0xbd51800607E7C743a0e9b0D89D837058F4f42756"
          ) {
            console.log("2 token1 == eth");

            const tx = await router
              .connect(signer)
              .removeLiquidityETH(
                this.pooldata.token0,
                (BigInt(this.pooldata.mysupply) *
                  BigInt(Math.floor(this.amountlp * 10000))) /
                  1000000n,
                0,
                0,
                account,
                ethers.MaxUint256
              );
            await tx.wait();
            console.log("withdraw::removeLiquidityETH:", tx.hash);
          }
          // 3. eth x
          else {
            console.log("3 token0 token1 != eth");
            const tx = await router
              .connect(signer)
              .removeLiquidity(
                this.pooldata.token0,
                this.pooldata.token1,
                (BigInt(this.pooldata.mysupply) *
                  BigInt(Math.floor(this.amountlp * 10000))) /
                  1000000n,
                0,
                0,
                account,
                ethers.MaxUint256
              );
            await tx.wait();
            console.log("withdraw::removeLiquidity:", tx.hash);
          }

          this.amountlp = 0;
          this.txStatus = "success";
        }
      } catch (error) {
        this.amount0 = 0;
        this.amount1 = 0;
        this.amountlp = 0;
        this.txStatus = "fail";
      }
    },
  },
  computed: {
    btnName() {
      if (this.isApproved.token0 == null) {
        return "...";
      }
      if (this.btnIndex == 0) {
        if (!this.isApproved.token0) {
          return `Approve ${this.pooldata.symbol0}`;
        } else if (!this.isApproved.token1) {
          return `Approve ${this.pooldata.symbol1}`;
        } else {
          return "Deposit";
        }
      } else {
        if (this.isApproved.tokenLp) {
          return "Withdraw";
        } else {
          return "Approve LP";
        }
      }
    },
  },
  watch: {
    amount0(newAmount0) {
      this.amount1 =
        (newAmount0 *
          (this.pooldata.reserve1 / 10 ** this.pooldata.decimals1)) /
        (this.pooldata.reserve0 / 10 ** this.pooldata.decimals0);
    },
    amount1(newAmount1) {
      this.amount0 =
        (newAmount1 *
          (this.pooldata.reserve0 / 10 ** this.pooldata.decimals0)) /
        (this.pooldata.reserve1 / 10 ** this.pooldata.decimals1);
    },
  },
};
</script>

<style>
.pool-modal-wrapper {
  display: flex;
  width: 438px;
  height: 0%;
  padding: 30px 30px 42px 30px;
  flex-direction: column;
  gap: 21px;

  border-radius: 24px;
  border: 2px solid #98cdc9;
  background: #242a40;
}

.pool-modal-back-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;
}

.pool-modal-back-text {
  color: #98cdc9;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.pool-modal-btn-wrapper {
  display: flex;
  padding: 2px;
  align-items: center;
  gap: 6px;
  align-self: stretch;

  border-radius: 40px;
  background: #98cdc9;
}

.pool-modal-btn-text-wrapper {
  display: flex;
  height: 24px;
  padding: 0px 42px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;

  border-radius: 50px;
  background: #98cdc9;

  cursor: pointer;
}
.pool-modal-btn-text-wrapper.is-active {
  background: #181d2f;
}

.pool-modal-btn-text {
  color: #181d2f;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.pool-modal-btn-text.is-active {
  color: #98cdc9;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.pool-modal-body-top-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  align-self: stretch;
}

.pool-modal-detials-wrapper {
  display: flex;
  padding: 0px 30px 12px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
}

.pool-modal-detials-list-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
}

.pool-modal-detials-list-text {
  color: #98cdc9;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  flex: 1 0 0;
}

.pool-modal-detials-list-text2 {
  /* width: 167px; */

  color: #98cdc9;
  text-align: right;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.pool-modal-detials-list-slipage-text {
  color: #e5fafb;
  text-align: right;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-decoration-line: underline;
}

.pool-modal-input-box-wrapper {
  display: flex;
  padding: 18px 30px;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  align-self: stretch;

  border-radius: 20px;
  background: #181d2f;
}

.pool-modal-input-select-container {
  display: flex;
  height: 14px;
  align-items: center;
  gap: 6px;
}

.pool-modal-input-select-wrapper {
  display: flex;
  width: 40px;
  height: 16px;
  padding: 2px 6px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 6px;
  border: 1px solid #98cdc9;

  cursor: pointer;
}
.pool-modal-input-select-text {
  color: #98cdc9;
  text-align: right;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.pool-modal-input-token-wrapper {
  display: flex;
  padding: 8px 0px;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  align-self: stretch;

  border-radius: 24px;
}

.pool-modal-input-left-wrapper {
  display: flex;
  width: 150px;
  align-items: center;
  gap: 8px;
}
.pool-modal-input-left-wrapper2 {
  display: flex;
  width: 240px;
  align-items: center;
  gap: 6px;
}

.pool-modal-input-left-wrapper img,
.pool-modal-input-left-wrapper2 img {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
}

.pool-modal-input-token-name-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
}

.pool-modal-input-token-symbol-text {
  color: #fff;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.pool-modal-input-token-name-text {
  color: #98cdc9;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.pool-modal-input-right-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
}
.pool-modal-input-right-wrapper2 {
  display: flex;
  width: 88px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
}

.pool-modal-input-balance-text {
  align-self: stretch;

  color: #98cdc9;
  text-align: right;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.pool-modal-value,
.pool-modal-value2 {
  height: 19px;
  align-self: stretch;

  overflow: hidden;
  color: #e5fafb;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  background-color: #181d2f;
  border: none;
}
.pool-modal-value2 {
  width: 68px;
}

.pool-modal-value::-webkit-inner-spin-button,
.pool-modal-value::-webkit-outer-spin-button,
.pool-modal-value2::-webkit-inner-spin-button,
.pool-modal-value2::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.pool-modal-value:focus,
.pool-modal-value2:focus {
  outline: none;
  border: none;
}

.pool-modal-divider-wrapper {
  display: flex;
  width: 24px;
  height: 24px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 6px;
  background: #98cdc9;
}

.pool-modal-tx-btn-wrapper {
  display: flex;
  height: 47px;
  padding: 3px 102px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  border-radius: 40px;
  background: #356f6a;

  cursor: pointer;
}

.pool-modal-tx-btn-wrapper:hover {
  transform: scale(1.05);
}

.pool-modal-tx-btn-text {
  color: #fff;
  text-align: right;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.pool-modal-value-percentage-wrapper {
  display: flex;
  align-items: center;
  gap: 2px;
  align-self: stretch;
}

.pool-modal-value-percentage-text {
  color: #e5fafb;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
</style>
