<template>
  <div class="pool-modal-wrapper">
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
                  {{ pooldata.name0 }}
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
                  {{ pooldata.name1 }}
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
                  class="pool-modal-value"
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

    <div class="pool-modal-tx-btn-wrapper">
      <div class="pool-modal-tx-btn-text">Deposit</div>
    </div>
  </div>
</template>

<script>
import usdcImg from "@/assets/token/usdc.png";
import eduImg from "@/assets/token/edu.png";
import ethImg from "@/assets/token/eth.png";
import arbImg from "@/assets/token/arb.png";
import eduswapImg from "@/assets/token/eduswap.png";

export default {
  props: {
    pooldata: {
      type: Object,
    },
  },
  data() {
    return {
      btnIndex: 0,
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
  font-size: 14px;
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
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.pool-modal-btn-text.is-active {
  color: #98cdc9;
  font-family: Inter;
  font-size: 12px;
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
  font-size: 10px;
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
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.pool-modal-detials-list-slipage-text {
  color: #e5fafb;
  text-align: right;
  font-family: Inter;
  font-size: 10px;
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
  height: 15px;
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
  font-size: 10px;
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
  gap: 4px;
}
.pool-modal-input-left-wrapper2 {
  display: flex;
  width: 240px;
  align-items: center;
  gap: 4px;
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
  font-size: 8px;
  font-style: normal;
  font-weight: 600;
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
  font-size: 9px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.pool-modal-value {
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

.pool-modal-value::-webkit-inner-spin-button,
.pool-modal-value::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.pool-modal-value:focus {
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
