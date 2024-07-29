<template>
    <div class="ing">
      <img src="@/assets/ing.png" alt="" />
    </div>
  </template>
  
  <style>
  .ing {
    display: flex;
    align-items: center;
  }
  
  .ing img {
    width: 70px;
    height: 70px;
    animation: spin 3s linear infinite;
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
  