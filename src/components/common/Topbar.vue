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

    <div class="wallet-wrapper" v-if="!account" @click="connectWallet">
      <div class="wallet-text">Connect Wallet</div>
    </div>

    <div class="wallet-wrapper-connected" v-if="account">
      <img src="@/assets/metamask.png" alt="metamask" />
      <div class="wallet-text-connected">
        {{
          `${account.substring(0, 6)}...${account.substring(
            account.length - 4
          )}`
        }}
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ethers } from "ethers";

export default {
  data() {
    return {
      account: null,
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
    async connectWallet() {
      if (window.ethereum) {
        try {
          // Initialize ethers provider
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          this.account = await signer.getAddress();

          // Get the network information
          this.network = await provider.getNetwork();
          console.log(this.network.chainId);

          // If not connected to the desired chain, request a network switch
          if (this.network.chainId !== 656476n) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0xa045c",
                    chainName: "EDU testnet",
                    rpcUrls: ["https://rpc.open-campus-codex.gelato.digital"],
                    nativeCurrency: {
                      name: "EDU",
                      symbol: "EDU",
                      decimals: 18,
                    },
                    blockExplorerUrls: [
                      "https://opencampus-codex.blockscout.com",
                    ],
                  },
                ],
              });
            } catch (error) {
              console.error("Failed to switch network:", error);
            }
          }
        } catch (error) {
          console.error("Error connecting to Metamask:", error);
        }
      } else {
        console.error("Metamask not detected. Please install Metamask.");
      }
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
