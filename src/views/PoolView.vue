<template>
  <div class="pool-container" v-if="!loading">
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
      <div v-for="(item, index) in filteredPools" class="pool-list-wrapper">
        <div class="pool-list-id-text">{{ pageIndex * 4 - 4 + index + 1 }}</div>
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
            formattedValueKMB(
              ((item.reserve0 / 10 ** item.decimals0) * item.price0) /
                10 ** 18 +
                ((item.reserve1 / 10 ** item.decimals1) * item.price1) /
                  10 ** 18
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
        <!-- <div class="pool-title-text vol">Volume(24h)</div> -->
        <div class="pool-title-text btn"></div>
      </div>
      <div v-for="(item, index) in filteredMyPools" class="pool-list-wrapper">
        <div class="pool-list-id-text">
          {{ mypageIndex * 4 - 4 + index + 1 }}
        </div>
        <div class="pool-list-pool-wrapper">
          <div class="pool-list-pool-icon-wrapper">
            <img :src="imgSource[item.token0]" alt="token" />
            <img :src="imgSource[item.token1]" alt="token" />
          </div>
          <div class="pool-list-pool-text">
            {{ `${item.symbol0}/${item.symbol1}` }}
          </div>
        </div>
        <div class="pool-list-text share">
          {{ formattedValueKMB((item.mysupply / item.supply) * 100) }}%
        </div>
        <div class="pool-list-liquidity-wrapper">
          <div class="pool-list-text liqmy">
            {{ formattedValue(item.reserve0 / 10 ** item.decimals0) }}
            {{ item.symbol0 }} +
            {{ formattedValue(item.reserve1 / 10 ** item.decimals1) }}
            {{ item.symbol1 }}
          </div>
          <div class="pool-list-sub-text">
            $
            {{
              formattedValueKMB(
                ((item.reserve0 / 10 ** item.decimals0) * item.price0) /
                  10 ** 18 +
                  ((item.reserve1 / 10 ** item.decimals1) * item.price1) /
                    10 ** 18
              )
            }}
          </div>
        </div>
        <!-- <div class="pool-list-text flex">$1,000</div> -->
        <div class="pool-list-btn-wrapper">
          <div class="pool-list-btn">+</div>
          <div class="pool-list-btn">-</div>
        </div>
      </div>
    </div>
    <div class="pool-bottom-wrapper">
      <img
        src="@/assets/arrow-left.svg"
        alt="arrow"
        @click="decreasePageIndex"
      />
      <div class="pool-bottom-page-wrapper">
        <div class="pool-bottom-page-cur-wrapper">
          <div class="pool-bottom-page-cur-text">{{ currentPageIndex }}</div>
        </div>
        <div class="pool-bottom-page-text">/</div>
        <div class="pool-bottom-page-text">{{ endPageIndex }}</div>
      </div>
      <img
        src="@/assets/arrow-right.svg"
        alt="arrow"
        @click="increasePageIndex"
      />
    </div>
  </div>
  <Ing v-if="loading" />
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { ethers } from "ethers";

import Ing from "../components/common/Ing.vue";

import usdcImg from "@/assets/token/usdc.png";
import eduImg from "@/assets/token/edu.png";
import ethImg from "@/assets/token/eth.png";
import arbImg from "@/assets/token/arb.png";
import eduswapImg from "@/assets/token/eduswap.png";

export default {
  components: {
    Ing,
  },
  data() {
    return {
      poolIndex: 0,
      pageIndex: 1,
      mypageIndex: 1,
      imgSource: {
        "0x7aFB87aE9E37c365955012527f8a9039D6F2CA30": usdcImg,
        "0xbd51800607E7C743a0e9b0D89D837058F4f42756": eduImg,
        "0x90f2F4E97Eb6B62D9049D07C6f6877FD171a9a0F": ethImg,
        "0x3FBA3ef10e452D1e8Cc6C0cf552A8A25b572Ec41": arbImg,
        "0x104A0F99728D5a79dbEbB4a0a58eCcb456e82411": eduswapImg,
      },
    };
  },
  setup() {
    const time = 20;
    const poolIds = [0, 1, 2, 3, 4];
    let pools = ref([]);
    let mypools = ref([]);
    let loading = ref(false);
    let account = null;
    let intervalId = null;
    let countdownIntervalId = null;

    const checkMetaMaskConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          return accounts.length > 0;
        } catch (error) {
          console.error("Error checking MetaMask connection:", error);
          return false;
        }
      } else {
        return false;
      }
    };

    const getPoolData = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const chainId = (await provider.getNetwork()).chainId;

      if (chainId == 656476n) {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
        }, 1000);

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
          const newPools = [];
          const datas = await contract.getPoolDatas(poolIds);
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

            newPools.push({
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

            pools.value = newPools;
          }
        } catch (error) {
          console.error("Error fetching contract value:", error);
        }

        const isConnected = checkMetaMaskConnection();
        if (isConnected) {
          const signer = await provider.getSigner();
          account = await signer.getAddress();

          try {
            const newMyPools = [];
            const datas = await contract.getMyPoolDatas(poolIds, account);
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
                balance0,
                balance1,
                price0,
                price1,
                supply,
                mysupply,
              ] = datas[i];

              newMyPools.push({
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
                balance0: balance0.toString(),
                balance1: balance1.toString(),
                price0: price0.toString(),
                price1: price1.toString(),
                supply: supply.toString(),
                mysupply: mysupply.toString(),
              });

              mypools.value = newMyPools;
            }
          } catch (error) {
            console.error("Error fetching contract value:", error);
          }
        }
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
      loading,
      mypools,
      pools,
    };
  },
  methods: {
    updatePoolIndex(index) {
      this.poolIndex = index;

      //
    },
    decreasePageIndex() {
      if (this.poolIndex == 0) {
        if (this.pageIndex > 1) this.pageIndex--;
      } else {
        if (this.mypageIndex > 1) this.mypageIndex--;
      }
    },
    increasePageIndex() {
      if (this.poolIndex == 0) {
        if (Math.floor((this.pools.length - 1) / 4) + 1 > this.pageIndex) {
          this.pageIndex++;
        }
      } else {
        if (Math.floor((this.mypools.length - 1) / 4) + 1 > this.mypageIndex) {
          this.mypageIndex++;
        }
      }
    },
    formattedValueKMB(number) {
      if (number < 10 ** 3) {
        return number.toFixed(2);
      } else if (number < 10 ** 6) {
        return (number / 10 ** 3).toFixed(2).toString() + "K";
      } else if (number < 10 ** 9) {
        return (number / 10 ** 6).toFixed(2).toString() + "M";
      }
    },
    formattedValue(number) {
      return number.toFixed(2);
    },
  },

  computed: {
    endPageIndex() {
      if (this.poolIndex == 0) {
        if (this.pools.length == 0) return 1;
        return Math.floor((this.pools.length - 1) / 4) + 1;
      } else {
        if (this.mypools.length == 0) return 1;
        return Math.floor((this.mypools.length - 1) / 4) + 1;
      }
    },
    filteredPools() {
      return this.pools.filter(
        (item, index) =>
          index >= this.pageIndex * 4 - 4 && index < this.pageIndex * 4
      );
    },
    filteredMyPools() {
      return this.mypools.filter(
        (item, index) =>
          index >= this.mypageIndex * 4 - 4 && index < this.mypageIndex * 4
      );
    },
    currentPageIndex() {
      if (this.poolIndex == 0) {
        return this.pageIndex;
      } else {
        return this.mypageIndex;
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
  width: 240px;
}
.pool-title-text.apr,
.pool-title-text.liq,
.pool-title-text.vol {
  flex: 1 0 0;
}
.pool-title-text.share {
  width: 140px;
}
.pool-title-text.liqmy {
  width: 352px;
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
  width: 240px;
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
  width: 140px;
}
.pool-list-text.liqmy {
  width: 352px;
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
