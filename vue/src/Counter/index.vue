<template>
  <div class="box">
    <h1 class="title">Vue Child</h1>
    <span class="counter">{{ this.count }}</span>
  </div>
</template>

<style scoped>
.box {
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #14b8a6;
}

.title {
  font-size: 1.5rem;
  color: #f0f9ff;
}

.counter {
  color: #f0f9ff;
  font-size: 2rem;
  font-weight: bold;
}
</style>

<script lang="ts">
import { counter } from "host/counterStore";

export default {
  data() {
    return {
      count: 0
    };
  },
  mounted() {
    counter.subscribe(({ count }) => {
      this.count = count;
    });
  }
};
</script>
