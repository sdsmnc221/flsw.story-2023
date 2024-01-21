<template>
  <section
    class="text-block"
    :style="`background-color: var(--${background}); color: var(--${textColor});`"
  >
    <p
      v-if="subtitle"
      class="text-block__subtitle josefin-sans-300 fx2"
      data-splitting
    >
      {{ subtitle }}
    </p>
    <h2
      v-if="title"
      class="text-block__title yeseva-one-regular fx2"
      data-splitting
    >
      {{ title }}
    </h2>
    <div
      class="text-block__content"
      :class="`${fx} ${fx === 'fx3' ? 'josefin-sans-600' : ''}`"
      data-splitting
    >
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  subtitle?: string;
  title?: string;
  background?: string;
  textColor?: string;
  fx?: string;
}

withDefaults(defineProps<Props>(), {
  background: "clear-day-white",
  textColor: "tangora-dark-blue",
  fx: "fx1",
});
</script>

<style lang="scss">
.text-block {
  width: 100vw;
  min-height: 100vh;
  padding: 16%;
  display: flex;
  text-align: left;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__title {
    font-size: 1.6rem;
    text-transform: lowercase;
    padding: 0 32%;
    text-align: center;
  }

  &__subtitle {
    font-size: 1rem;
    text-transform: lowercase;
  }

  &__content {
    padding: 0 24%;
    margin-top: 32px;

    &.fx3 {
      text-transform: uppercase;
      font-size: 3.2rem;
      padding: 0 16%;
      text-align: center;
      line-height: 3.2rem;
    }
  }

  @media (max-width: 768px) {
    /* Styles for mobile devices */
    padding: 8%;
    &__title {
      padding: 0 12%;
      font-size: 1.2rem;
    }
    &__content {
      padding: 0 12%;
    }
  }
}
</style>
