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
  let gridWrap, gridItems, gridItemsInner, timeline;

  if (["1", "5"].some((type) => animationType.includes(type))) {
    // Child elements of grid
    gridWrap = grid.querySelector(".grid-wrap");
    gridItems = grid.querySelectorAll(".grid__item");
    gridItemsInner = [...gridItems].map((item) =>
      item.querySelector(".grid__item-inner")
    );

    // Define GSAP timeline with ScrollTrigger
    timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: gridWrap,
        start: "top bottom+=5%",
        end: "bottom top-=5%",
        scrub: true,
      },
    });
  }
  // Apply different animations based on type
  switch (animationType) {
    case "cllg-fx1":
      // Set some CSS related style values
      grid.style.setProperty("--grid-width", isMobile() ? "320%" : "100%");
      grid.style.setProperty("--grid-height", "auto");
      grid.style.setProperty("--grid-columns", isMobile() ? "4" : "6");
      grid.style.setProperty("--grid-gap", isMobile() ? "10%" : "2vw");

      const gridObj = getGrid(gridItems);

      if (timeline) {
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
              yPercent: () => gsap.utils.random(-100, isMobile() ? 640 : 200),
            },
            "rowsEnd"
          );
      }
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
    case "cllg-fx5":
      // Set some CSS related style values
      grid.style.setProperty("--grid-width", "105%");
      grid.style.setProperty("--grid-columns", isMobile() ? "4" : "8");
      grid.style.setProperty("--perspective", "1500px");
      grid.style.setProperty("--grid-inner-scale", "0.5");

      if (timeline && gridItemsInner) {
        timeline
          .set(gridItems, {
            transformOrigin: "50% 0%",
            z: () => gsap.utils.random(-5000, -2000),
            rotationX: () => gsap.utils.random(-65, -25),
            opacity: 0,
          })
          .to(
            gridItems,
            {
              xPercent: () => gsap.utils.random(-150, 150),
              yPercent: () => gsap.utils.random(-300, 300),
              rotationX: 0,
              opacity: () => gsap.utils.random(0.64, 1),
            },
            0
          )
          .to(
            gridWrap,
            {
              z: 6500,
            },
            0
          )
          .fromTo(
            gridItemsInner,
            {
              scale: isMobile() ? 4 : 2,
            },
            {
              scale: isMobile() ? 1 : 0.5,
            },
            0
          );
      }
      break;
    default:
      console.error("Unknown animation type.");
      break;
  }
};

export { applyCollageAnimation };
