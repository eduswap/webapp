<template>
  <Topbar />
  
  <div class="router-container">
    <router-view />
  </div>
  
  <Footer />
</template>

<script setup>
import Topbar from "./components/common/Topbar.vue";
import Footer from "./components/common/Footer.vue";
</script>

<style scoped>
.router-container {
  display: flex;
  justify-content: center;

  margin: 88px 0px;
  min-height: calc(100vh - 339px);
}
</style>
