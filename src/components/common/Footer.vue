<template>
  <div class="footer-container">
    <div class="footer-wrapper">
      <div class="icon-wrapper">
        <img src="@/assets/icon/x.svg" alt="x" />
        <img src="@/assets/icon/medium.svg" alt="medium" />
        <img src="@/assets/icon/gitbook.svg" alt="gitbook" />
      </div>
      <div class="footer-text">ⓒ EDUSWAP. LTD. All Rights Reserved.</div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.footer-container {
  display: flex;
  padding: 20px 80px;
  justify-content: center;
  align-items: flex-start;

  background: #98cdc9;
}

.footer-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.icon-wrapper {
  display: flex;
  justify-content: space-between;
  width: 113px;
  height: 17px;
}

.icon-wrapper img {
  cursor: pointer;
}

.footer-text {
  color: #242a40;
  font-family: Inter;
  font-size: 13.125px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
}
</style>
