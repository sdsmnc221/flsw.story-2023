<template>
  <section
    class="text-block"
    :style="`background-color: var(--${background}); color: var(--${textColor});`"
  >
    <h2 class="text-block__title yeseva-one-regular">{{ title }}</h2>
    <slot />
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  background?: string;
  textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  background: "clear-day-white",
  textColor: "clear-day-black",
});
</script>

<style lang="scss">
.text-block {
  width: 100vw;
  min-height: 100vh;
  padding: 16%;
  display: flex;
  text-align: justify;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 32px;
}
</style>
