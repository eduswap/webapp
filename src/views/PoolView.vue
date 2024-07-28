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
      <div class="pool-list-wrapper">
        <div class="pool-list-id-text">1</div>
        <div class="pool-list-pool-wrapper">
          <div class="pool-list-pool-icon-wrapper">
            <img src="@/assets/token/usdc.png" alt="token" />
            <img src="@/assets/token/dai.png" alt="token" />
          </div>
          <div class="pool-list-pool-text">USDC/DAI</div>
        </div>
        <div class="pool-list-apr-text">12.12%</div>
        <div class="pool-list-text flex">$12,000</div>
        <div class="pool-list-text flex">$1,000</div>
        <div class="pool-list-btn-wrapper">
          <img src="@/assets/pool-btn.svg" alt="pool-btn" />
        </div>
      </div>
      <div class="pool-list-wrapper">
        <div class="pool-list-id-text">2</div>
        <div class="pool-list-pool-wrapper">
          <div class="pool-list-pool-icon-wrapper">
            <img src="@/assets/token/usdc.png" alt="token" />
            <img src="@/assets/token/dai.png" alt="token" />
          </div>
          <div class="pool-list-pool-text">USDC/DAI</div>
        </div>
        <div class="pool-list-apr-text">12.12%</div>
        <div class="pool-list-text flex">$12,000</div>
        <div class="pool-list-text flex">$1,000</div>
        <div class="pool-list-btn-wrapper">
          <img src="@/assets/pool-btn.svg" alt="pool-btn" />
        </div>
      </div>
      <div class="pool-list-wrapper">
        <div class="pool-list-id-text">3</div>
        <div class="pool-list-pool-wrapper">
          <div class="pool-list-pool-icon-wrapper">
            <img src="@/assets/token/usdc.png" alt="token" />
            <img src="@/assets/token/dai.png" alt="token" />
          </div>
          <div class="pool-list-pool-text">USDC/DAI</div>
        </div>
        <div class="pool-list-apr-text">12.12%</div>
        <div class="pool-list-text flex">$12,000</div>
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
            <img src="@/assets/token/dai.png" alt="token" />
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
            <img src="@/assets/token/dai.png" alt="token" />
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
            <img src="@/assets/token/dai.png" alt="token" />
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
export default {
  data() {
    return {
      poolIndex: 0,
    };
  },
  methods: {
    updatePoolIndex(index) {
      this.poolIndex = index;
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
  transform:scale(1.1); 
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
  transform:scale(1.5); 
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
  transform:scale(1.5); 
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
  transform:scale(1.5); 
}
</style>
