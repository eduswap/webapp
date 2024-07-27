<template>
  <div class="topbar-container">
    <div class="logo-wrapper">
      <img src="@/assets/logo.svg" alt="logo" />
      <div class="logo-text">EDUSWAP</div>
    </div>

    <div class="menu-wrapper">
      <div class="menu-text" @click="navigateTo('/')">Swap</div>
      <div class="menu-text" @click="navigateTo('/pool')">Pool</div>
    </div>

    <div class="wallet-wrapper" v-if="!isConnected" @click="connectWallet">
      <div class="wallet-text">Connect Wallet</div>
    </div>

    <div
      class="wallet-wrapper-connected"
      v-if="isConnected"
      @click="connectWallet"
    >
      <img src="@/assets/metamask.png" alt="metamask" />
      <div class="wallet-text-connected">0x1234...1234</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      isConnected: false,
    };
  },
  setup() {
    const router = useRouter();

    const navigateTo = (path) => {
      router.push(path);
    };

    return { navigateTo };
  },
  methods: {
    isActiveRoute(routes) {
      return routes.includes(this.$route.path);
    },
    connectWallet() {
      this.isConnected = !this.isConnected;
    },
  },
};
</script>

<style scoped>
.topbar-container {
  display: flex;
  width: 100%;
  padding: 20px 36px;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #d3d3d3;
  background: #98cdc9;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-text {
  color: #242a40;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
}

.menu-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 40px;
}

.menu-text {
  color: #242a40;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;

  cursor: pointer;
}

.wallet-wrapper {
  display: flex;
  width: 160px;
  height: 40px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  border-radius: 20px;
  background: #e5fafb;

  cursor: pointer;
}

.wallet-text {
  color: #242a40;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.wallet-wrapper-connected {
  display: flex;
  width: 160px;
  height: 40px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  border-radius: 20px;
  background: #356f6a;

  cursor: pointer;
}

.wallet-text-connected {
  color: #fff;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
