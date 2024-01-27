<template>
  <div class="share-button" @click="onShare">
    <div class="toggle">
      <input type="checkbox" />
      <span class="button"></span>
      <span class="label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-share-2"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
          <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const shareData = {
  title:
    "[Web] FeliSweet 2023 Entre Défis et Résilience, l'Aventure Féline Inoubliable",
  text: "[Web] FeliSweet 2023 Entre Défis et Résilience, l'Aventure Féline Inoubliable",
  url: window.location.href,
};

const onShare = async () => {
  try {
    if (!window.navigator.canShare) {
      return;
    }

    await window.navigator.share(shareData);
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss">
.share-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 6;
  cursor: pointer;

  .toggle {
    display: inline-block;
    position: relative;
    height: 100px;
    width: 100px;
    transform: scale(0.84);

    &:before {
      box-shadow: 0;
      border-radius: 84.5px;
      background: var(--clear-day-white);
      position: absolute;
      margin-left: -36px;
      margin-top: -36px;
      opacity: 0.2;
      height: 72px;
      width: 72px;
      left: 50%;
      top: 50%;
    }

    .button {
      transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
      box-shadow: 0 15px 25px -4px rgba(0, 0, 0, 0.5),
        inset 0 -3px 4px -1px rgba(0, 0, 0, 0.2),
        0 -10px 15px -1px rgba(255, 255, 255, 0.6),
        inset 0 3px 4px -1px rgba(255, 255, 255, 0.2),
        inset 0 0 5px 1px rgba(255, 255, 255, 0.8),
        inset 0 20px 30px 0 rgba(255, 255, 255, 0.2);
      border-radius: 68.8px;
      position: absolute;
      background: #eaeaea;
      margin-left: -34.4px;
      margin-top: -34.4px;
      display: block;
      height: 68.8px;
      width: 68.8px;
      left: 50%;
      top: 50%;
    }

    .label {
      transition: color 300ms ease-out;
      line-height: 101px;
      text-align: center;
      position: absolute;
      font-weight: 700;
      font-size: 28px;
      display: block;
      opacity: 0.9;
      height: 100%;
      width: 100%;
      color: rgba(0, 0, 0, 0.9);

      display: inline-flex;
      justify-content: center;
      align-items: center;

      svg {
        * {
          stroke: var(--tuscany-blue);
        }
      }
    }
    input {
      opacity: 0;
      position: absolute;
      cursor: pointer;
      z-index: 1;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;

      &:active {
        & ~ .button {
          filter: blur(0.5px);
          box-shadow: 0 12px 25px -4px rgba(0, 0, 0, 0.4),
            inset 0 -8px 30px 1px rgba(255, 255, 255, 0.9),
            0 -10px 15px -1px rgba(255, 255, 255, 0.6),
            inset 0 8px 25px 0 rgba(0, 0, 0, 0.4),
            inset 0 0 10px 1px rgba(255, 255, 255, 0.6);
        }
        & ~ .label {
          font-size: 26px;
          color: rgba(0, 0, 0, 0.45);
        }
      }

      &:hover {
        & ~ .button {
          filter: blur(0.5px);
          box-shadow: 0 10px 25px -4px rgba(0, 0, 0, 0.4),
            inset 0 -8px 25px -1px rgba(255, 255, 255, 0.9),
            0 -10px 15px -1px rgba(255, 255, 255, 0.6),
            inset 0 8px 20px 0 rgba(0, 0, 0, 0.2),
            inset 0 0 5px 1px rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
}
</style>
