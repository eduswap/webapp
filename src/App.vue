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
  min-height: calc(100vh - 163px);
}
</style>
