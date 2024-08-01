<template>
  <div class="swap-container" v-if="!showFromModal && !showToModal">
    <div class="swap-top-wrapper">
      <div class="swap-top-text">Swap</div>
    </div>
    <div class="swap-body-top-wrapper">
      <div class="swap-input-box-wrapper">
        <div class="swap-btn-wrapper">
          <div class="swap-input-text">You pay</div>
          <div class="swap-input-select-container">
            <div class="swap-input-select-wrapper">
              <div class="swap-input-select-text">half</div>
            </div>
            <div class="swap-input-select-wrapper">
              <div class="swap-input-select-text">max</div>
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
              Balance: {{ fromTokenInfo.balance }}
            </div>
          </div>
        </div>
      </div>
      <div class="swap-input-box-wrapper">
        <div class="swap-btn-wrapper">
          <div class="swap-input-text">You receive</div>
          <div class="swap-input-select-container">
            <div class="swap-input-select-wrapper">
              <div class="swap-input-select-text">half</div>
            </div>
            <div class="swap-input-select-wrapper">
              <div class="swap-input-select-text">max</div>
            </div>
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
            <input class="swap-value" type="number" v-model="amount1" />
            <div class="swap-input-balance-text">
              Balance: {{ toTokenInfo.balance }}
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
        <div class="swap-detials-list-text2">{{ minimumAmount }} WEMIX</div>
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

    <div class="swap-tx-btn-wrapper">
      <div class="swap-tx-btn-text">Swap</div>
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
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import {
  attach,
  getAccount,
  getTokens,
  getImageSource,
  updateTokenBalance,
  updateAccount,
  getAmountsInfo,
} from "@/js/contract_interacter.js";
import SwapModal from "@/components/swap/SwapModal.vue";

let showFromModal = ref(false);
let showToModal = ref(false);

let amount0 = ref(0);
let amount1 = ref(0);

let exchangeRate = ref("?");
let priceImpact = ref("?");
let minimumAmount = ref("?");
let feeAmount = ref("?");
let routeInfo = ref([]);

let tokenInfos = ref([]);
let fromTokenInfo = ref({});
let toTokenInfo = ref({});

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

const updateFromToken = (tokenInfo) => {
  if (toTokenInfo.value.address == tokenInfo.address) {
    toTokenInfo.value = fromTokenInfo.value;
  }
  fromTokenInfo.value = tokenInfo;

  showFromModal.value = false;
};
const updateToToken = (tokenInfo) => {
  if (fromTokenInfo.value.address == tokenInfo.address) {
    fromTokenInfo.value = toTokenInfo.value;
  }
  toTokenInfo.value = tokenInfo;
  showToModal.value = false;
};

const reverseTokenInfo = () => {
  const tempFromTokenInfo = fromTokenInfo.value;
  const tempToTokenInfo = toTokenInfo.value;

  fromTokenInfo.value = tempToTokenInfo;
  toTokenInfo.value = tempFromTokenInfo;
};

onMounted(async () => {
  tokenInfos.value = getTokens();

  attach();

  await updateAccount();

  const account = getAccount();

  if (account != null) {
    await updateTokenBalance(account);
  }

  tokenInfos.value = getTokens();
  fromTokenInfo.value = tokenInfos.value[1];
  toTokenInfo.value = tokenInfos.value[0];
});

const updateSwapOut = async () => {
  const { amountOut, spotPrice, path } = await getAmountsInfo(
    amount0.value,
    fromTokenInfo.value.address,
    toTokenInfo.value.address
  );

  if (amountOut != null) {
    amount1.value = amountOut;

    exchangeRate = (amount1.value / amount0.value).toFixed(4);
    priceImpact = (((spotPrice - exchangeRate) / spotPrice) * 100).toFixed(2);

    minimumAmount = (amount1.value * 0.995).toFixed(6);
    feeAmount = (amount1.value * 0.0025 * (path.length - 1)).toFixed(6);

    routeInfo = path.slice(0, -1).map((_, i) => [path[i], path[i + 1]]);
  }
};
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
