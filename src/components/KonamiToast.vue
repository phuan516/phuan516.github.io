<template>
  <div class="konami-toast" aria-live="polite">
    ✦ secret unlocked — taste in detail confirmed
  </div>
</template>

<style scoped>
.konami-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--ink);
  color: var(--bg);
  padding: 12px 22px;
  border-radius: 999px;
  font-size: 12px;
  z-index: 200;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  white-space: nowrap;
}
</style>
