import { defineCustomElement } from "vue";
import LoaderBlock from "./LoaderBlock.ce.vue";

console.log(LoaderBlock); // ["/* inlined css */"]

// convert into custom element constructor
const LoaderBlockCE = defineCustomElement(LoaderBlock);

// register
customElements.define("loader-block-ce", LoaderBlockCE);

console.log(document.body.querySelector("#app"));

window.addEventListener("load", () => {
  document.body.querySelector("#app")?.appendChild(
    new LoaderBlockCE({
      firstLoading: true,
    })
  );
});
