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

    <div class="wallet-wrapper" v-if="!isConnected" @click="modal.open()">
      <div class="wallet-text">Connect Wallet</div>
    </div>

    <div
      class="wallet-wrapper-connected"
      v-if="isConnected"
      @click="modal.open()"
    >
      <img :src="walletInfo.icon" alt="metamask" />
      <div class="wallet-text-connected">
        {{
          `${address.substring(0, 6)}...${address.substring(
            address.length - 4
          )}`
        }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ethers } from "ethers";
import {
  createWeb3Modal,
  defaultConfig,
  useWalletInfo,
  useWeb3ModalAccount,
} from "@web3modal/ethers/vue";

import { ref, onMounted } from "vue";

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = "ff3f8d2e88e862972b9d4c7c2b81acf0"; //TODO env

// 2. Set chains
const mainnet = {
  chainId: 656476,
  name: "Open Campus Codex Sepolia",
  currency: "ETH",
  explorerUrl: "https://opencampus-codex.blockscout.com",
  rpcUrl: "https://rpc.open-campus-codex.gelato.digital",
};

// 3. Create your application's metadata object
const metadata = {
  name: "EDUSWAP",
  description: "Whis is eduswap website",
  url: "", //TODO 
  icons: [""], //TODO 
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "https://rpc.open-campus-codex.gelato.digital", // used for the Coinbase SDK
  defaultChainId: 656476, // used for the Coinbase SDK
});

// 5. Create a AppKit instance
const modal = createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const { walletInfo } = useWalletInfo();
const { address, chainId, isConnected } = useWeb3ModalAccount();

// router function
const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};

// onMounted(async () => {});

// export default {
//   data() {
//     return {
//       account: null,
//     };
//   },
//   setup() {
//     const router = useRouter();

//     const navigateTo = (path) => {
//       router.push(path);
//     };

//     return { navigateTo };
//   },
//   methods: {
//     isActiveRoute(routes) {
//       return routes.includes(this.$route.path);
//     },
//     async connectWallet() {
//       if (window.ethereum) {
//         try {
//           const provider = new ethers.BrowserProvider(window.ethereum);
//           const signer = await provider.getSigner();

//           this.account = await signer.getAddress();

//           const network = await provider.getNetwork();

//           if (network.chainId !== 656476n) {
//             try {
//               await window.ethereum.request({
//                 method: "wallet_addEthereumChain",
//                 params: [
//                   {
//                     chainId: "0xa045c",
//                     chainName: "EDU testnet",
//                     rpcUrls: ["https://rpc.open-campus-codex.gelato.digital"],
//                     nativeCurrency: {
//                       name: "EDU",
//                       symbol: "EDU",
//                       decimals: 18,
//                     },
//                     blockExplorerUrls: [
//                       "https://opencampus-codex.blockscout.com",
//                     ],
//                   },
//                 ],
//               });
//             } catch (error) {
//               console.error("Failed to switch network:", error);
//             }
//           }
//         } catch (error) {
//           console.error("Error connecting to Metamask:", error);
//         }
//       } else {
//         console.error("Metamask not detected. Please install Metamask.");
//       }
//     },
//   },
// };
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
.menu-text:hover {
  transform: scale(1.1);
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
.wallet-wrapper:hover {
  transform: scale(1.1);
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

.wallet-wrapper-connected img {
  width: 22px;
  height: 22px;
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
