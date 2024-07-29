<template>
  <div class="pool-modal-wrapper">
    <div class="pool-modal-back-wrapper">
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
    <div class="pool-modal-body-wrapper">
      <div class="pool-modal-body-top-wrapper">
        <div class="pool-modal-input-box-wrapper">
          <div class="pool-modal-input-select-container">
            <div class="pool-modal-input-select-wrapper">
              <div class="pool-modal-input-select-text">half</div>
            </div>
            <div class="pool-modal-input-select-wrapper">
              <div class="pool-modal-input-select-text">max</div>
            </div>
          </div>
          <div class="pool-modal-input-token-wrapper">
            <div class="pool-modal-input-left-wrapper">
              <img src="@/assets/token/usdc.png" alt="token" />
              <div class="pool-modal-input-token-name-wrapper">
                <div class="pool-modal-input-token-symbol-text">USDC</div>
                <div class="pool-modal-input-token-name-text">test USDC</div>
              </div>
            </div>
            <div class="pool-modal-input-right-wrapper">
              <input class="pool-modal-value" type="number" v-model="amount0" />
              <div class="pool-modal-input-balance-text">12.1212</div>
            </div>
          </div>
        </div>
        <div class="pool-modal-divider-wrapper">
          <img src="@/assets/pool-modal/plus.svg" alt="plus" />
        </div>
        <div class="pool-modal-input-box-wrapper">
          <div class="pool-modal-input-select-container">
            <div class="pool-modal-input-select-wrapper">
              <div class="pool-modal-input-select-text">half</div>
            </div>
            <div class="pool-modal-input-select-wrapper">
              <div class="pool-modal-input-select-text">max</div>
            </div>
          </div>
          <div class="pool-modal-input-token-wrapper">
            <div class="pool-modal-input-left-wrapper">
              <img src="@/assets/token/usdc.png" alt="token" />
              <div class="pool-modal-input-token-name-wrapper">
                <div class="pool-modal-input-token-symbol-text">USDC</div>
                <div class="pool-modal-input-token-name-text">test USDC</div>
              </div>
            </div>
            <div class="pool-modal-input-right-wrapper">
              <input class="pool-modal-value" type="number" v-model="amount0" />
              <div class="pool-modal-input-balance-text">12.1212</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pool-modal-detials-wrapper">
      <div class="pool-modal-detials-list-wrapper">
        <div class="pool-modal-detials-list-text">Exchange Rate</div>
        <div class="pool-modal-detials-list-text2">1 WEMIX = 1.1234 WEMIX$</div>
      </div>
      <div class="pool-modal-detials-list-wrapper">
        <div class="pool-modal-detials-list-text">Expected APR</div>
        <div class="pool-modal-detials-list-text2">12.12%</div>
      </div>
      <div class="pool-modal-detials-list-wrapper">
        <div class="pool-modal-detials-list-text">Slipage</div>
        <div class="pool-modal-detials-list-slipage-text">0.5%</div>
      </div>
    </div>

    <div class="pool-modal-tx-btn-wrapper">
      <div class="pool-modal-tx-btn">Deposit</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnIndex: 0,
      amount0: 0,
      amount1: 0,
    };
  },
  methods: {
    updateBtnIndex(index) {
      this.btnIndex = index;
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
  width: 167px;

  color: #98cdc9;
  text-align: right;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.pool-modal-detials-list-slipage-text {
  color: #98cdc9;
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

.pool-modal-input-left-wrapper img {
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
}

.pool-modal-tx-btn-wrapper {
  color: #fff;
  text-align: right;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>
