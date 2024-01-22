<template>
  <section class="title-block">
    <p class="title-block__subtitle josefin-sans-600" data-splitting>
      {{ subtitle }}
    </p>
    <h1 class="title-block__title yeseva-one-regular" data-splitting>
      {{ title }}
    </h1>
  </section>
</template>

<script setup lang="ts">
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import { gsap } from "gsap";
import { onMounted } from "vue";

interface Props {
  title: string;
  subtitle: string;
}

defineProps<Props>();

onMounted(() => {
  Splitting({});

  [
    document.querySelector(".title-block__subtitle"),
    document.querySelector(".title-block__title"),
  ].forEach((title, index) => {
    if (title) {
      const chars = title.querySelectorAll(".char");

      chars.forEach((char) => gsap.set(char.parentNode, { perspective: 2400 }));

      gsap.fromTo(
        chars,
        {
          "will-change": "opacity, transform",
          transformOrigin: "50% 0%",
          opacity: 0,
          rotationX: -90,
          z: () => gsap.utils.random(-200, 200),
          y: () => gsap.utils.random(-200, 200),
        },
        {
          ease: "power1",
          opacity: 1,
          stagger: 0.05,
          rotationX: 0,
          z: 0,
          y: 0,
          duration: 0.64,
          delay: 1.2 * (index + 1),
          scrollTrigger: {
            trigger: title,
            start: "0 84%",
            end: "0 20%",
            scrub: true,
          },
        }
      );
    }
  });
});
</script>

<style lang="scss">
.title-block {
  width: 100vw;
  height: 120vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  background-color: var(--shakespear-blue);
  color: var(--tuscany-blue);
  background: linear-gradient(
    to bottom,
    var(--shakespear-blue) 0%,
    var(--clear-day-white) 100%
  );

  gap: 3.2rem;

  &__subtitle {
    width: 100%;
    font-size: 12rem;
    text-transform: lowercase;
    color: var(--shakespear-blue);
  }

  &__title {
    width: 100%;
    font-size: 6.4rem;
    line-height: 6rem;
  }

  span.char {
    display: inline-block;
    margin-left: -1.2px;
  }

  @media (max-width: 1024px) {
    gap: 0;
    padding: 0 2%;
    text-align: left;

    &__subtitle {
      font-size: 6.4rem;
      line-height: 4.8rem;
      text-transform: uppercase;
    }

    &__title {
      font-size: 4rem;
      line-height: 4rem;
      text-transform: lowercase;
    }
  }

  // Media query for mobile devices
  @media (max-width: 767px) {
    gap: 0;
    padding: 0 3.2%;
    padding-top: 6.4%;
    text-align: left;

    &__subtitle {
      font-size: 2.8rem;
      line-height: 2rem;
      text-transform: uppercase;
    }

    &__title {
      font-size: 4rem;
      line-height: 3.6rem;
      text-transform: lowercase;
    }
  }
}
</style>
