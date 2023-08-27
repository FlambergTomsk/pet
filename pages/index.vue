<template>
  <div class="page">
    <Weather />
  </div>
</template>

<script setup></script>

<style lang="less">
.page {
  max-width: 1600px;
  padding: 0 20px;
  margin: 0 auto;
  @media @bw450 {
    padding: 0 8px;
    }
}
</style>
