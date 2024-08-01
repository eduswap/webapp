<template>
  <div class="swap-modal-container">
    <div class="swap-modal-top-wrapper">
      <div class="swap-modal-text">Select a token</div>
      <img
        src="@/assets/confirm/close-btn.svg"
        alt="close-btn"
        @click="closeModal"
      />
    </div>

    <div class="swap-modal-list-container">
      <div
        v-for="(item, index) in tokenInfo"
        class="swap-modal-list-wrapper"
        @click="clickToken(item)"
      >
        <div class="swap-modal-token-wrapper">
          <img :src="item.img" alt="token" />
          <div class="swap-modal-token-text-wrapper">
            <div class="swap-modal-token-text">{{ item.symbol }}</div>
            <div class="swap-modal-token-name-text">{{ item.name }}</div>
          </div>
        </div>
        <div class="swap-modal-list-balance-text">
          {{ Number(item.balance).toFixed(4) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { onMounted, ref } from "vue";

const props = defineProps({ tokenInfo: Object });
const emits = defineEmits(["closeModal", "tokenClicked"]);

const closeModal = () => {
  emits("closeModal");
};

const clickToken = (token) => {
  emits("tokenClicked", token);
};
</script>

<style>
.swap-modal-container {
  display: flex;
  width: 438px;
  height: 0%;
  padding: 30px 30px 42px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;

  border-radius: 24px;
  border: 2px solid #98cdc9;
  background: #242a40;
}

.swap-modal-top-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}

.swap-modal-top-wrapper img {
  cursor: pointer;
}

.swap-modal-text {
  color: #98cdc9;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.swap-modal-list-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
}

.swap-modal-list-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  cursor: pointer;
}

.swap-modal-list-wrapper:hover {
  transform: scale(1.03);
}

.swap-modal-token-wrapper {
  display: flex;
  width: 150px;
  align-items: center;
  gap: 8px;
}
.swap-modal-token-wrapper img {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
}

.swap-modal-token-text-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
}

.swap-modal-token-text {
  color: #fff;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.swap-modal-token-name-text {
  color: #98cdc9;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.swap-modal-list-balance-text {
  color: #fff;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
</style>
