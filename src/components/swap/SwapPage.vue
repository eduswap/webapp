<template>
  <div
    class="swap-container"
    v-if="!showFromModal && !showToModal && !showConfirmModal"
  >
    <div class="swap-top-wrapper">
      <div class="swap-top-text">Swap</div>
    </div>
    <div class="swap-body-top-wrapper">
      <div class="swap-input-box-wrapper">
        <div class="swap-btn-wrapper">
          <div class="swap-input-text">You pay</div>
          <div class="swap-input-select-container">
            <div class="swap-input-select-wrapper">
              <div class="swap-input-select-text" @click="updateAmount0(50)">
                half
              </div>
            </div>
            <div class="swap-input-select-wrapper">
              <div class="swap-input-select-text" @click="updateAmount0(100)">
                max
              </div>
            </div>
          </div>
        </div>
        <div class="swap-input-token-wrapper">
          <div class="swap-input-left-wrapper">
            <img :src="fromTokenInfo.img" alt="token" />
            <div class="swap-input-token-name-wrapper">
              <div class="swap-input-token-symbol-btn" @click="clickFromModal">
                <div class="swap-input-token-symbol-text">
                  {{ fromTokenInfo.symbol }}
                </div>
                <img src="@/assets/select.svg" alt="select" />
              </div>
              <div class="swap-input-token-name-text">
                {{ fromTokenInfo.name }}
              </div>
            </div>
          </div>
          <div class="swap-input-right-wrapper">
            <input
              class="swap-value"
              type="number"
              v-model="amount0"
              @input="updateSwapOut"
            />
            <div class="swap-input-balance-text">
              Balance: {{ (fromTokenInfo.balance * 1).toFixed(4) }}
            </div>
          </div>
        </div>
      </div>
      <div class="swap-input-box-wrapper">
        <div class="swap-btn-wrapper">
          <div class="swap-input-text">You receive</div>
          <div class="swap-input-select-container">
            <!-- <div class="swap-input-select-wrapper">
              <div class="swap-input-select-text">half</div>
            </div>
            <div class="swap-input-select-wrapper">
              <div class="swap-input-select-text">max</div>
            </div> -->
          </div>
        </div>
        <div class="swap-input-token-wrapper">
          <div class="swap-input-left-wrapper">
            <img :src="toTokenInfo.img" alt="token" />
            <div class="swap-input-token-name-wrapper">
              <div class="swap-input-token-symbol-btn" @click="clickToModal">
                <div class="swap-input-token-symbol-text">
                  {{ toTokenInfo.symbol }}
                </div>
                <img src="@/assets/select.svg" alt="select" />
              </div>
              <div class="swap-input-token-name-text">
                {{ toTokenInfo.name }}
              </div>
            </div>
          </div>
          <div class="swap-input-right-wrapper">
            <input
              class="swap-value"
              type="number"
              v-model="amount1"
              @input="updateSwapIn"
            />
            <div class="swap-input-balance-text">
              Balance: {{ (toTokenInfo.balance * 1).toFixed(4) }}
            </div>
          </div>
        </div>
      </div>
      <div class="swap-arrow-down" @click="reverseTokenInfo">
        <img src="@/assets/arrow-down.svg" alt="arrow-down" />
      </div>
    </div>
    <div class="swap-detials-wrapper">
      <div class="swap-detials-list-wrapper">
        <div class="swap-detials-list-text">Exchange Rate</div>
        <div class="swap-detials-list-text2">
          1 {{ fromTokenInfo.symbol }} = {{ exchangeRate }}
          {{ toTokenInfo.symbol }}
        </div>
      </div>
      <div class="swap-detials-list-wrapper">
        <div class="swap-detials-list-text">Price Impact</div>
        <div class="swap-detials-list-text3">{{ priceImpact }}%</div>
      </div>
      <div class="swap-detials-list-wrapper">
        <div class="swap-detials-list-text">Minimum Received</div>
        <div class="swap-detials-list-text2">{{ minimumAmount }} {{ toTokenInfo.symbol }}</div>
      </div>
      <div class="swap-detials-list-wrapper">
        <div class="swap-detials-list-text">Slipage</div>
        <div class="swap-detials-list-slipage-text">0.5%</div>
      </div>
      <div class="swap-detials-list-wrapper">
        <div class="swap-detials-list-text">Fee</div>
        <div class="swap-detials-list-text2">
          {{ feeAmount }} {{ fromTokenInfo.symbol }}
        </div>
      </div>
      <div class="swap-detials-list-wrapper" v-if="routeInfo.length != 0">
        <div class="swap-detials-list-text">Route</div>
        <div
          v-for="(item, index) in routeInfo"
          class="swap-detials-route-wrapper"
        >
          <div class="swap-token-route-wrapper">
            <div class="swap-token-route-img-wrapper">
              <img :src="getImageSource(item[0])" alt="token" />
              <img :src="getImageSource(item[1])" alt="token" />
            </div>
            <div class="swap-token-route-fee-text">0.25%</div>
          </div>

          <img
            src="../../assets/arrow-route.svg"
            alt="arrow-route"
            v-if="routeInfo.length - 1 != index"
          />
        </div>
      </div>
    </div>

    <div class="swap-tx-btn-wrapper" @click="swap">
      <div class="swap-tx-btn-text">{{ btnName }}</div>
    </div>
  </div>

  <SwapModal
    v-if="showFromModal"
    :tokenInfo="tokenInfos"
    @closeModal="closeFromModal"
    @tokenClicked="updateFromToken"
  />
  <SwapModal
    v-if="showToModal"
    :tokenInfo="tokenInfos"
    @closeModal="closeToModal"
    @tokenClicked="updateToToken"
  />

  <ConfirmTransaction
    v-if="showConfirmModal"
    :txStatus="txStatus"
    @closeModal="closeConfirmModal"
  />
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import {
  attach,
  getTokens,
  getImageSource,
  updateTokenBalance,
  getAmountsOutInfo,
  getAmountsInInfo,
  checkAllowance,
  approveToken,
  swapExactTokensForTokens,
  useWeb3ModalAccount,
} from "@/js/contract_interacter.js";

import usdcImg from "@/assets/token/usdc.png";
import eduImg from "@/assets/token/edu.png";

import SwapModal from "@/components/swap/SwapModal.vue";
import ConfirmTransaction from "@/components/common/ConfirmTransaction.vue";

const showFromModal = ref(false);
const showToModal = ref(false);

const amount0 = ref(0);
const amount1 = ref(0);

const exchangeRate = ref("?");
const priceImpact = ref("?");
const minimumAmount = ref("?");
const feeAmount = ref("?");
const routeInfo = ref([]);
const swappath = ref([]);

const tokenInfos = ref([]);
const fromTokenInfo = ref({
  symbol: "WEDU",
  name: "wrapped EDU",
  address: "0xbd51800607E7C743a0e9b0D89D837058F4f42756",
  img: eduImg,
  decimals: 18,
  balance: 0,
});
const toTokenInfo = ref({
  symbol: "USDC",
  name: "test USDC",
  address: "0x7aFB87aE9E37c365955012527f8a9039D6F2CA30",
  img: usdcImg,
  decimals: 6,
  balance: 0,
});
const fromTokenAllowance = ref(true);

const showConfirmModal = ref(false);
const txStatus = ref("ing");

const { address, chainId, isConnected } = useWeb3ModalAccount();

const closeConfirmModal = () => {
  showConfirmModal.value = false;

  txStatus.value = "ing";
};

const closeFromModal = () => {
  showFromModal.value = false;
};
const closeToModal = () => {
  showToModal.value = false;
};

const clickFromModal = () => {
  showFromModal.value = true;
};
const clickToModal = () => {
  showToModal.value = true;
};

const updateFromToken = async (tokenInfo) => {
  if (toTokenInfo.value.address == tokenInfo.address) {
    toTokenInfo.value = fromTokenInfo.value;
  }
  fromTokenInfo.value = tokenInfo;

  showFromModal.value = false;

  exchangeRate.value = "?";
  priceImpact.value = "?";
  minimumAmount.value = "?";
  feeAmount.value = "?";
  routeInfo.value = [];
  amount0.value = 0;
  amount1.value = 0;

  fromTokenAllowance.value = await checkAllowance(fromTokenInfo.value.address);
};
const updateToToken = async (tokenInfo) => {
  if (fromTokenInfo.value.address == tokenInfo.address) {
    fromTokenInfo.value = toTokenInfo.value;
  }
  toTokenInfo.value = tokenInfo;
  showToModal.value = false;

  exchangeRate.value = "?";
  priceImpact.value = "?";
  minimumAmount.value = "?";
  feeAmount.value = "?";
  routeInfo.value = [];
  amount0.value = 0;
  amount1.value = 0;
};

const reverseTokenInfo = async () => {
  const tempFromTokenInfo = fromTokenInfo.value;
  const tempToTokenInfo = toTokenInfo.value;

  fromTokenInfo.value = tempToTokenInfo;
  toTokenInfo.value = tempFromTokenInfo;

  exchangeRate.value = "?";
  priceImpact.value = "?";
  minimumAmount.value = "?";
  feeAmount.value = "?";
  routeInfo.value = [];
  amount0.value = 0;
  amount1.value = 0;

  fromTokenAllowance.value = await checkAllowance(fromTokenInfo.value.address);
};

const updateSwapOut = async () => {
  const { amountOut, spotPrice, path } = await getAmountsOutInfo(
    amount0.value,
    fromTokenInfo.value.address,
    toTokenInfo.value.address
  );

  if (amountOut != null) {
    amount1.value = amountOut;

    exchangeRate.value = (amount1.value / amount0.value).toFixed(4);
    priceImpact.value = (
      ((spotPrice - exchangeRate.value) / spotPrice) *
      100
    ).toFixed(2);

    minimumAmount.value = (amount1.value * 0.995).toFixed(6);
    feeAmount.value = (amount1.value * 0.0025 * (path.length - 1)).toFixed(6);

    swappath.value = path;
    routeInfo.value = path.slice(0, -1).map((_, i) => [path[i], path[i + 1]]);
  }
};

const updateSwapIn = async () => {
  const { amountIn, spotPrice, path } = await getAmountsInInfo(
    amount1.value,
    fromTokenInfo.value.address,
    toTokenInfo.value.address
  );

  if (amountIn != null) {
    amount0.value = amountIn;

    exchangeRate.value = (amount1.value / amount0.value).toFixed(4);
    priceImpact.value = (
      ((spotPrice - exchangeRate.value) / spotPrice) *
      100
    ).toFixed(2);

    minimumAmount.value = (amount1.value * 0.995).toFixed(6);
    feeAmount.value = (amount1.value * 0.0025 * (path.length - 1)).toFixed(6);

    swappath.value = path;
    routeInfo.value = path.slice(0, -1).map((_, i) => [path[i], path[i + 1]]);
  }
};

const updateAmount0 = async (percentage) => {
  amount0.value = fromTokenInfo.value.balance / (100 / percentage);

  if (percentage == 100 && fromTokenInfo.value.symbol == "WEDU") {
    amount0.value = fromTokenInfo.value.balance - 0.0002;
    if (amount0.value < 0) amount0.value = 0;
  }

  await updateSwapOut();
};

const swap = async () => {
  if (!fromTokenAllowance.value) {
    await approveToken(tokenAddress);
  }

  showConfirmModal.value = true;
  try {
    await swapExactTokensForTokens(
      amount0.value,
      minimumAmount.value,
      swappath.value,
      address.value
    );
    txStatus.value = "success";
  } catch (error) {
    txStatus.value = "fail";
  }

  exchangeRate.value = "?";
  priceImpact.value = "?";
  minimumAmount.value = "?";
  feeAmount.value = "?";
  routeInfo.value = [];
  amount0.value = 0;
  amount1.value = 0;

  if (isConnected.value) {
    fromTokenAllowance.value = await checkAllowance(
      fromTokenInfo.value.address,
      address.value
    );

    await updateTokenBalance(address.value);
    tokenInfos.value = getTokens();
    const fromBalance = tokenInfos.value[1].balance;
    const toBalance = tokenInfos.value[0].balance;
    fromTokenInfo.value.balance = fromBalance;
    toTokenInfo.value.balance = toBalance;
  }
};

const btnName = computed(() => {
  if (fromTokenAllowance.value) {
    return "Swap";
  } else {
    return "Approve";
  }
});

onMounted(async () => {
  console.log("onMounted")
  attach();

  if (isConnected.value) {
    await updateTokenBalance(address.value);
  }
  
  tokenInfos.value = getTokens();
  const fromBalance = tokenInfos.value[1].balance;
  const toBalance = tokenInfos.value[0].balance;
  fromTokenInfo.value.balance = fromBalance;
  toTokenInfo.value.balance = toBalance;
});

watch(isConnected, async (newVal) => {
  console.log("watch", isConnected.value)
  attach();

  if (isConnected.value) {
    await updateTokenBalance(address.value);
    tokenInfos.value = getTokens();
    const fromBalance = tokenInfos.value[1].balance;
    const toBalance = tokenInfos.value[0].balance;
    fromTokenInfo.value.balance = fromBalance;
    toTokenInfo.value.balance = toBalance;
  }
});
</script>

<style>
.swap-container {
  display: flex;
  width: 438px;
  height: 0%;
  padding: 30px 30px 42px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 21px;

  border-radius: 24px;
  border: 2px solid #98cdc9;
  background: #242a40;
}

.swap-top-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}

.swap-top-text {
  color: #98cdc9;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.swap-body-top-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  align-self: stretch;

  position: relative;
}

.swap-detials-wrapper {
  display: flex;
  padding: 0px 30px 12px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
}

.swap-detials-list-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
}

.swap-detials-list-text {
  color: #98cdc9;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  flex: 1 0 0;
}

.swap-detials-list-text2 {
  /* width: 167px; */

  color: #98cdc9;
  text-align: right;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.swap-detials-list-slipage-text {
  color: #e5fafb;
  text-align: right;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-decoration-line: underline;
}

.swap-input-box-wrapper {
  display: flex;
  padding: 18px 30px;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  align-self: stretch;

  border-radius: 20px;
  background: #181d2f;
}

.swap-input-select-container {
  display: flex;
  height: 14px;
  align-items: center;
  gap: 6px;
}

.swap-input-select-wrapper {
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
.swap-input-select-text {
  color: #98cdc9;
  text-align: right;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.swap-input-token-wrapper {
  display: flex;
  padding: 8px 0px;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  align-self: stretch;

  border-radius: 24px;
}

.swap-input-left-wrapper {
  display: flex;
  width: 150px;
  align-items: center;
  gap: 8px;
}

.swap-input-left-wrapper img {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
}

.swap-input-token-name-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
}

.swap-input-token-symbol-text {
  color: #fff;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.swap-input-token-name-text {
  color: #98cdc9;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.swap-input-right-wrapper {
  display: flex;
  width: 160px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
}
.swap-input-right-wrapper2 {
  display: flex;
  width: 88px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
}

.swap-input-balance-text {
  align-self: stretch;

  color: #98cdc9;
  text-align: right;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.swap-value {
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

.swap-value::-webkit-inner-spin-button,
.swap-value::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.swap-value:focus {
  outline: none;
  border: none;
}

.swap-arrow-down {
  display: flex;
  width: 24px;
  height: 24px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  position: absolute;
  bottom: 96px;

  border-radius: 6px;
  background: #98cdc9;

  cursor: pointer;
}

.swap-arrow-down:hover {
  animation: halfSpin 0.7s forwards;
}

@keyframes halfSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-180deg);
  }
}

.swap-detials-wrapper {
  display: flex;
  padding: 0px 30px 12px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
}

.swap-detials-list-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
}

.swap-detials-list-text {
  color: #98cdc9;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  flex: 1 0 0;
}

.swap-detials-list-text2 {
  /* width: 167px; */

  color: #98cdc9;
  text-align: right;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.swap-detials-list-slipage-text {
  color: #e5fafb;
  text-align: right;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-decoration-line: underline;
}

.swap-input-box-wrapper {
  display: flex;
  padding: 18px 30px;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  align-self: stretch;

  border-radius: 20px;
  background: #181d2f;
}

.swap-tx-btn-wrapper {
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

.swap-tx-btn-wrapper:hover {
  transform: scale(1.05);
}

.swap-tx-btn-text {
  color: #fff;
  text-align: right;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.swap-detials-list-text3 {
  color: #1dc7ae;
  text-align: right;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.swap-detials-route-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
}

.swap-token-route-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.swap-token-route-img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  height: 16px;
}

.swap-token-route-img-wrapper img {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.swap-token-route-fee-text {
  color: #98cdc9;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.swap-btn-wrapper {
  display: flex;
  height: 14px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}

.swap-input-text {
  color: #98cdc9;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.swap-input-token-symbol-btn {
  display: flex;
  align-items: center;
  gap: 7px;

  cursor: pointer;
}
.swap-input-token-symbol-btn img {
  width: 11px;
  height: 22px;
}
</style>
