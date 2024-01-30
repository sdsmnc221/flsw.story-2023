import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/dist/Flip";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

const applyVideoAnimation = (
  element: any,
  animationType: string,
  sectionIndex: number
) => {
  // Apply different animations based on type
  switch (animationType) {
    case "video-fx1":
      let DOM: any = {};
      // flipstate saves the current state of title elements
      let flipstate_ = null;
      DOM.el = element;

      const hasCollage = element.classList.contains("--has-collage");

      if (DOM.el !== null) {
        DOM.content = [...DOM.el.querySelectorAll(".content")];
        DOM.svg = DOM.el.querySelector(".content__img");
        DOM.mask = DOM.svg.querySelector(".mask");
        DOM.image = DOM.svg.querySelector("video");

        // Save current state
        flipstate_ = Flip.getState(`.text-block.section--${sectionIndex}`);

        // Check if the mask element is a circle or a path
        const isCircle = DOM.mask.tagName.toLowerCase() === "circle";

        // Create the Flip.from that we'll pass into the ScrollTrigger animation property
        const flip = Flip.from(flipstate_, {
          ease: "none",
          simple: true,
        })
          .fromTo(
            DOM.mask,
            {
              attr: isCircle
                ? { r: DOM.mask.getAttribute("r") }
                : { d: DOM.mask.getAttribute("d") },
            },
            {
              ease: "none",
              attr: isCircle
                ? { r: DOM.mask.dataset.valueFinal }
                : { d: DOM.mask.dataset.valueFinal },
            },
            0
          )
          // Also scale up the image element
          .fromTo(
            DOM.image,
            {
              transformOrigin: "50% 50%",
            },
            {
              ease: "none",
              scale: isCircle ? 1.2 : 1,
            },
            0
          )
          .fromTo(
            DOM.content,
            {
              opacity: 0,
              rotate: -16,
            },
            { opacity: 1, rotate: 0 },
            0
          );

        if (!hasCollage) {
          ScrollTrigger.create({
            trigger: element,
            start: "top center+=12vh",
            end: "+=120%",
            scrub: true,
            animation: flip,
          });
        }
      }

      break;
    default:
      console.error("Unknown animation type.");
      break;
  }
};

export { applyVideoAnimation };
