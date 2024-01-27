import { getGrid } from "./getGrid";
import isMobile from "./isMobile";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/dist/Flip";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

const applyCollageAnimation = (
  grid: any,
  animationType: string,
  sectionIndex: string
) => {
  // Apply different animations based on type
  switch (animationType) {
    case "cllg-fx1":
      // Child elements of grid
      const gridWrap = grid.querySelector(".grid-wrap");
      const gridItems = grid.querySelectorAll(".grid__item");
      const gridItemsInner = [...gridItems].map((item) =>
        item.querySelector(".grid__item-inner")
      );

      if (gridItemsInner.length) {
        //
      }

      // Define GSAP timeline with ScrollTrigger
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: gridWrap,
          start: "top bottom+=5%",
          end: "bottom top-=5%",
          scrub: true,
        },
      });

      // Set some CSS related style values
      grid.style.setProperty("--grid-width", isMobile() ? "320%" : "100%");
      grid.style.setProperty("--grid-height", "auto");
      grid.style.setProperty("--grid-columns", "4");
      grid.style.setProperty("--grid-gap", "10%");

      const gridObj = getGrid(gridItems);

      timeline
        .set(gridWrap, {
          rotationX: 50,
        })
        .to(gridWrap, {
          rotationX: 30,
        })
        .fromTo(
          gridItems,
          {
            filter: "brightness(72%) contrast(0.7)",
          },
          {
            filter: "brightness(100%) contrast(1)",
          },
          0
        )
        .to(
          gridObj.rows("even"),
          {
            xPercent: -100,
            ease: "power1",
          },
          0
        )
        .to(
          gridObj.rows("odd"),
          {
            xPercent: 100,
            ease: "power1",
          },
          0
        )
        .addLabel("rowsEnd", ">-=0.15")
        .to(
          gridItems,
          {
            ease: "power1",
            yPercent: () => gsap.utils.random(-100, 200),
            ...(isMobile() && { scale: 2 }),
          },
          "rowsEnd"
        );

      break;

    case "cllg-fx2":
    case "cllg-fx3":
    case "cllg-fx4":
      // Default settings for Flip and ScrollTrigger
      const DEFAULT_CLLG_SETTINGS = {
        flip: {
          absoluteOnLeave: false,
          absolute: false,
          scale: true,
          simple: true,
          //...
        },
        scrollTrigger: {
          start: "center center",
          end: "+=240%",
        },
        stagger: 0,
      };

      let settings, specialSettings;

      switch (animationType) {
        case "cllg-fx2":
          specialSettings = {
            flip: { absolute: true, scale: false },
            scrollTrigger: { start: "center center", end: "+=320%" },
            stagger: 0.05,
          };
          break;
        case "cllg-fx4":
          specialSettings = {
            scrollTrigger: { start: "center center", end: "+=180%" },
          };
          break;
        default:
          specialSettings = {};
          break;
      }

      // Merge default settings with options provided when calling the function
      settings = Object.assign({}, DEFAULT_CLLG_SETTINGS, specialSettings);

      // Select elements within the gallery that will be animated

      const galleryItems = grid.querySelectorAll(".grid__item");

      const galleryItemsInner = [...galleryItems]
        .map((item) => (item.children.length > 0 ? [...item.children] : []))
        .flat();

      // Temporarily add the final class to capture the final state
      grid.classList.add("gallery--switch");
      const flipstate = Flip.getState([galleryItems], {
        props: "filter, opacity",
      });

      // Remove the final class to revert to the initial state
      grid.classList.remove("gallery--switch");

      // Create the Flip animation timeline
      const tl = Flip.to(flipstate, {
        ease: "none",
        absoluteOnLeave: settings.flip.absoluteOnLeave,
        absolute: settings.flip.absolute,
        scale: settings.flip.scale,
        simple: settings.flip.simple,
        scrollTrigger: {
          trigger: grid,
          start: settings.scrollTrigger.start,
          end: settings.scrollTrigger.end,
          pin: document.querySelector(
            `.text-block.section--${sectionIndex.replace("section--", "")}`
          ),
          scrub: true,
        },
        stagger: settings.stagger,
      });

      // If there are inner elements in the gallery items, animate them too
      if (galleryItemsInner.length) {
        tl.fromTo(
          galleryItemsInner,
          {
            scale: 2,
          },
          {
            scale: 1,
            scrollTrigger: {
              trigger: grid,
              start: settings.scrollTrigger.start,
              end: settings.scrollTrigger.end,
              scrub: true,
            },
          },
          0
        );
      }
      break;

      let DOM: any = {};
      // flipstate saves the current state of title elements
      let flipstate_ = null;
      DOM.el = grid;

      if (DOM.el !== null) {
        DOM.content = [...DOM.el.querySelectorAll(".content")];
        DOM.svg = DOM.el.querySelector(".content__img");
        DOM.mask = DOM.svg.querySelector(".mask");
        DOM.image = DOM.svg.querySelector("video");

        // Save current state
        flipstate_ = Flip.getState(
          document.querySelector(
            `.text-block.section--${animationType.replace("cllg-fx", "")}`
          )
        );

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
              filter: "brightness(100%)",
            },
            {
              ease: "none",
              scale: isCircle ? 1.2 : 1,
              filter: "brightness(150%)",
            },
            0
          );

        ScrollTrigger.create({
          trigger: grid.querySelector(".content--layout-2"),
          start: "top center",
          end: "+=64%",
          scrub: true,
          animation: flip,
        });
      }

      break;
    default:
      console.error("Unknown animation type.");
      break;
  }
};

export { applyCollageAnimation };
