<template>
  <div class="modal-background">
    <div class="confirm-tx-wrapper">
      <div class="confirm-tx-top-wrapper">
        <div class="confirm-tx-top-text">{{ confirmText[txStatus].title }}</div>
        <img
          src="@/assets/confirm/close-btn.svg"
          alt="close-btn"
          @click="closeModal"
        />
      </div>

      <div class="ing" v-if="txStatus == 'ing'">
        <img :src="confirmText[txStatus].img" alt="ing" />
      </div>
      <div class="not-ing" v-if="txStatus != 'ing'">
        <img :src="confirmText[txStatus].img" alt="ing" />
      </div>

      <div class="confirm-tx-content-text">
        {{ confirmText[txStatus].content }}
      </div>
    </div>
  </div>
</template>

<script>
import ingImg from "@/assets/confirm/ing.png";
import failImg from "@/assets/confirm/fail.png";
import successImg from "@/assets/confirm/success.svg";

export default {
  props: {
    txStatus: {
      type: String,
      default: () => "success",
    },
  },
  data() {
    return {
      confirmText: {
        ing: {
          title: "Confirm Transaction",
          img: ingImg,
          content: "Please sign on your wallet to confirm.",
        },
        fail: {
          title: "Fail Transaction",
          img: failImg,
          content: "Your tx has failed. Please try again.",
        },
        success: {
          title: "Success Transaction",
          img: successImg,
          content: "Your tx has been successfully completed.",
        },
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style>
.modal-background {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(36, 42, 64, 0.5);

  z-index: 1001;
}

.confirm-tx-wrapper {
  display: flex;
  width: 382px;
  padding: 30px;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  border-radius: 24px;
  background: rgba(229, 250, 251, 0.5);
  backdrop-filter: blur(10px);
}

.confirm-tx-top-wrapper {
  display: flex;
  padding-bottom: 12px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}

.confirm-tx-top-text {
  color: #242a40;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
}

.confirm-tx-top-wrapper img {
  cursor: pointer;
}

.ing,
.not-ing {
  display: flex;
  align-items: center;
}

.ing img {
  width: 70px;
  height: 70px;
  animation: spin 3s linear infinite;
}

.confirm-tx-content-text {
  color: #242a40;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
