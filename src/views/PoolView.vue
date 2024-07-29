<template>
  <div class="pool-container">
    <div class="pool-top-wrapper">
      <div
        class="pool-top-text"
        :class="{ 'is-active': poolIndex == 0 }"
        @click="updatePoolIndex(0)"
      >
        Pool
      </div>
      <div
        class="pool-top-text"
        :class="{ 'is-active': poolIndex == 1 }"
        @click="updatePoolIndex(1)"
      >
        My Pool
      </div>
    </div>
    <div class="pool-middle-wrapper" v-if="poolIndex == 0">
      <div class="pool-title-wrapper">
        <div class="pool-title-text id">Id</div>
        <div class="pool-title-text pool">Pool</div>
        <div class="pool-title-text apr">APR(7d)</div>
        <div class="pool-title-text liq">Liquidity</div>
        <div class="pool-title-text vol">Volume(24h)</div>
        <div class="pool-title-text btn"></div>
      </div>
      <div v-for="(item, index) in pools" class="pool-list-wrapper">
        <div class="pool-list-id-text">{{ index + 1 }}</div>
        <div class="pool-list-pool-wrapper">
          <div class="pool-list-pool-icon-wrapper">
            <img :src="imgSource[item.token0]" alt="token" />
            <img :src="imgSource[item.token1]" alt="token" />
          </div>
          <div class="pool-list-pool-text">
            {{ `${item.symbol0}/${item.symbol1}` }}
          </div>
        </div>
        <div class="pool-list-apr-text">12.12%</div>
        <div class="pool-list-text flex">
          ${{
            formattedLiquidity(
              item.reserve0 / 10 ** item.decimals0 +
                item.reserve1 / 10 ** item.decimals1
            )
          }}
        </div>
        <div class="pool-list-text flex">$1,000</div>
        <div class="pool-list-btn-wrapper">
          <img src="@/assets/pool-btn.svg" alt="pool-btn" />
        </div>
      </div>
    </div>

    <div class="pool-middle-wrapper" v-if="poolIndex == 1">
      <div class="pool-title-wrapper">
        <div class="pool-title-text id">Id</div>
        <div class="pool-title-text pool">Pool</div>
        <div class="pool-title-text share">Share</div>
        <div class="pool-title-text liqmy">Liquidity</div>
        <div class="pool-title-text vol">Volume(24h)</div>
        <div class="pool-title-text btn"></div>
      </div>
      <div class="pool-list-wrapper">
        <div class="pool-list-id-text">1</div>
        <div class="pool-list-pool-wrapper">
          <div class="pool-list-pool-icon-wrapper">
            <img src="@/assets/token/usdc.png" alt="token" />
            <img src="@/assets/token/edu.png" alt="token" />
          </div>
          <div class="pool-list-pool-text">USDC/DAI</div>
        </div>
        <div class="pool-list-text share">0.01%</div>
        <div class="pool-list-liquidity-wrapper">
          <div class="pool-list-text liqmy">100 USDC + 101 DAI</div>
          <div class="pool-list-sub-text">$201</div>
        </div>
        <div class="pool-list-text flex">$1,000</div>
        <div class="pool-list-btn-wrapper">
          <div class="pool-list-btn">+</div>
          <div class="pool-list-btn">-</div>
        </div>
      </div>
      <div class="pool-list-wrapper">
        <div class="pool-list-id-text">1</div>
        <div class="pool-list-pool-wrapper">
          <div class="pool-list-pool-icon-wrapper">
            <img src="@/assets/token/usdc.png" alt="token" />
            <img src="@/assets/token/edu.png" alt="token" />
          </div>
          <div class="pool-list-pool-text">USDC/DAI</div>
        </div>
        <div class="pool-list-text share">0.01%</div>
        <div class="pool-list-liquidity-wrapper">
          <div class="pool-list-text liqmy">100 USDC + 101 DAI</div>
          <div class="pool-list-sub-text">$201</div>
        </div>
        <div class="pool-list-text flex">$1,000</div>
        <div class="pool-list-btn-wrapper">
          <div class="pool-list-btn">+</div>
          <div class="pool-list-btn">-</div>
        </div>
      </div>
      <div class="pool-list-wrapper">
        <div class="pool-list-id-text">1</div>
        <div class="pool-list-pool-wrapper">
          <div class="pool-list-pool-icon-wrapper">
            <img src="@/assets/token/usdc.png" alt="token" />
            <img src="@/assets/token/edu.png" alt="token" />
          </div>
          <div class="pool-list-pool-text">USDC/DAI</div>
        </div>
        <div class="pool-list-text share">0.01%</div>
        <div class="pool-list-liquidity-wrapper">
          <div class="pool-list-text liqmy">100 USDC + 101 DAI</div>
          <div class="pool-list-sub-text">$201</div>
        </div>
        <div class="pool-list-text flex">$1,000</div>
        <div class="pool-list-btn-wrapper">
          <div class="pool-list-btn">+</div>
          <div class="pool-list-btn">-</div>
        </div>
      </div>
    </div>
    <div class="pool-bottom-wrapper">
      <img src="@/assets/arrow-left.svg" alt="arrow" />
      <div class="pool-bottom-page-wrapper">
        <div class="pool-bottom-page-cur-wrapper">
          <div class="pool-bottom-page-cur-text">1</div>
        </div>
        <div class="pool-bottom-page-text">/</div>
        <div class="pool-bottom-page-text">3</div>
      </div>
      <img src="@/assets/arrow-right.svg" alt="arrow" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { ethers } from "ethers";

import usdcImg from "@/assets/token/usdc.png"
import eduImg from "@/assets/token/edu.png"
import ethImg from "@/assets/token/eth.png"
import arbImg from "@/assets/token/arb.png"
import eduswapImg from "@/assets/token/eduswap.png"

export default {
  data() {
    return {
      poolIndex: 0,
      imgSource: {
        "0x7aFB87aE9E37c365955012527f8a9039D6F2CA30": usdcImg,
        "0xbd51800607E7C743a0e9b0D89D837058F4f42756": eduImg,
        "0x90f2F4E97Eb6B62D9049D07C6f6877FD171a9a0F": ethImg,
        "0x3FBA3ef10e452D1e8Cc6C0cf552A8A25b572Ec41": arbImg,
        "0x104A0F99728D5a79dbEbB4a0a58eCcb456e82411": eduswapImg,
      }
    };
  },
  setup() {
    const time = 10;
    let pools = ref([]);
    let intervalId = null;
    let countdownIntervalId = null;

    const getPoolData = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contractAddress = "0x1a15e70a5a9319cc0508F84aCaD09976d9938e29";
      const contractABI = [
        {
          inputs: [
            {
              internalType: "uint256[]",
              name: "poolIds",
              type: "uint256[]",
            },
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
          ],
          name: "getMyPoolDatas",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "pair",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "token0",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "token1",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "name0",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "name1",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "symbol0",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "symbol1",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "decimals0",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "decimals1",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserve0",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserve1",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "balance0",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "balance1",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "price0",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "price1",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "supply",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "mysupply",
                  type: "uint256",
                },
              ],
              internalType: "struct EduswapV2View.MyPoolData[]",
              name: "datas",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256[]",
              name: "poolIds",
              type: "uint256[]",
            },
          ],
          name: "getPoolDatas",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "pair",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "token0",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "token1",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "name0",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "name1",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "symbol0",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "symbol1",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "decimals0",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "decimals1",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserve0",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserve1",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "price0",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "price1",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "supply",
                  type: "uint256",
                },
              ],
              internalType: "struct EduswapV2View.PoolData[]",
              name: "datas",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );

      try {
        const datas = await contract.getPoolDatas([0, 1, 2]);
        pools.value = [];
        for (let i = 0; i < datas.length; i++) {
          const [
            pair,
            token0,
            token1,
            name0,
            name1,
            symbol0,
            symbol1,
            decimals0,
            decimals1,
            reserve0,
            reserve1,
            price0,
            price1,
            supply,
          ] = datas[i];

          pools.value.push({
            pair: pair.toString(),
            token0: token0.toString(),
            token1: token1.toString(),
            name0: name0.toString(),
            name1: name1.toString(),
            symbol0: symbol0.toString(),
            symbol1: symbol1.toString(),
            decimals0: decimals0.toString(),
            decimals1: decimals1.toString(),
            reserve0: reserve0.toString(),
            reserve1: reserve1.toString(),
            price0: price0.toString(),
            price1: price1.toString(),
            supply: supply.toString(),
          });
        }
      } catch (error) {
        console.error("Error fetching contract value:", error);
      }
    };

    onMounted(() => {
      getPoolData();
      intervalId = setInterval(() => {
        getPoolData();
      }, time * 1000);
    });

    // 컴포넌트가 언마운트될 때 인터벌 정리
    onUnmounted(() => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (countdownIntervalId) {
        clearInterval(countdownIntervalId);
      }
    });

    return {
      pools,
    };
  },
  methods: {
    updatePoolIndex(index) {
      this.poolIndex = index;

      //
    },
    formattedLiquidity(number) {
      if (number < 10 ** 3) {
        return number.toFixed(2);
      } else if (number < 10 ** 6) {
        return (number / 10 ** 3).toFixed(2).toString() + "K";
      } else if (number < 10 ** 9) {
        return (number / 10 ** 6).toFixed(2).toString() + "M";
      }
    },
  },
};
</script>

<style>
.pool-container {
  display: inline-flex;
  width: 880px;
  height: 0%;
  padding: 40px 42px;
  flex-direction: column;
  gap: 26px;

  border-radius: 24px;
  border: 2px solid #98cdc9;
  background: rgba(255, 255, 255, 0.2);
}

.pool-top-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pool-top-text {
  color: #98cdc9;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  cursor: pointer;
}
.pool-top-text.is-active {
  color: #e5fafb;
  font-weight: 800;
  text-decoration-line: underline;
}

.pool-top-text:hover {
  transform: scale(1.1);
}

.pool-middle-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
}

.pool-title-wrapper {
  display: flex;
  padding: 4px 0px;
  align-items: center;
  align-self: stretch;

  border-bottom: 1px solid #98cdc9;
}

.pool-title-text {
  color: #98cdc9;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.pool-title-text.id {
  width: 30px;
}
.pool-title-text.pool {
  width: 234px;
}
.pool-title-text.apr,
.pool-title-text.liq,
.pool-title-text.vol {
  flex: 1 0 0;
}
.pool-title-text.share {
  width: 100px;
}
.pool-title-text.liqmy {
  width: 240px;
}
.pool-title-text.btn {
  width: 30px;
}

.pool-list-wrapper {
  display: flex;
  height: 62px;
  padding: 14px 0px;
  align-items: center;
  align-self: stretch;
}

.pool-list-id-text {
  color: #98cdc9;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  width: 30px;
  flex-shrink: 0;
}

.pool-list-pool-wrapper {
  display: flex;
  width: 234px;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.pool-list-pool-wrapper img {
  width: 23.564px;
  height: 23.564px;
}

.pool-list-pool-icon-wrapper {
  display: flex;
  align-items: center;
  gap: 2px;
}

.pool-list-pool-text {
  color: #e5fafb;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.pool-list-apr-text {
  color: #1dc7ae;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  flex: 1 0 0;
}

.pool-list-text {
  color: #e5fafb;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.pool-list-text.flex {
  flex: 1 0 0;
}
.pool-list-text.share {
  width: 100px;
}
.pool-list-text.liqmy {
  width: 240px;
}

.pool-list-btn-wrapper {
  display: flex;
  width: 30px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  gap: 8px;
}

.pool-list-btn-wrapper img {
  cursor: pointer;
}
.pool-list-btn-wrapper img:hover {
  transform: scale(1.5);
}

.pool-bottom-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.pool-bottom-wrapper img {
  cursor: pointer;
}

.pool-bottom-wrapper img:hover {
  transform: scale(1.5);
}

.pool-bottom-page-wrapper {
  display: flex;
  padding: 0px 7px;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.pool-bottom-page-text {
  color: #98cdc9;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.pool-bottom-page-cur-wrapper {
  display: flex;
  width: 18px;
  height: 18px;
  padding: 3px 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 28px;
  background: #98cdc9;
}

.pool-bottom-page-cur-text {
  color: #242a40;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.pool-list-liquidity-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
}

.pool-list-sub-text {
  color: #98cdc9;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.pool-list-btn {
  color: #98cdc9;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  cursor: pointer;
}

.pool-list-btn:hover {
  transform: scale(1.5);
}
</style>
