import { getGrid } from "./getGrid";
import isMobile from "./isMobile";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/dist/Flip";
import randomIntegerInRange from "./randomIntegerInRange";
import dynamicStyles from "./dynamicStyles";

import { changeAppBackground } from "./changeAppBackground";
import onTutoActivated from "./customEvents/tutoActivated";

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
      // scrollTrigger: {
      //   trigger: gridWrap,
      //   start: "top bottom+=5%",
      //   end: "bottom top-=5%",
      //   scrub: true,
      //   onEnter: changeAppBackground,
      //   onEnterBack: changeAppBackground,
      // },
    });
  }
  // Apply different animations based on type
  switch (animationType) {
    case "cllg-fx1":
      // Set some CSS related style values
      grid.style.setProperty("--grid-width", isMobile() ? "320%" : "100%");
      grid.style.setProperty("--grid-height", "auto");
      grid.style.setProperty("--grid-columns", isMobile() ? "3" : "6");
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
              yPercent: () => gsap.utils.random(10, 320),
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

      if (animationType === "cllg-fx2" && !isMobile()) {
        const gridPos: string[] = [];
        galleryItems.forEach((_item: any, index: number) => {
          let row: number = randomIntegerInRange(1, 4);
          let col: number = randomIntegerInRange(1, 6);

          while (gridPos.includes(`${row}/${col}`)) {
            row = randomIntegerInRange(1, 4);
            col = randomIntegerInRange(1, 6);
          }

          gridPos.push(`${row}/${col}`);

          dynamicStyles([
            {
              class: `.collage-block.grid.--cllg-fx2 .grid-wrap .grid-wrap__gallery--grid10:not(.gallery--switch) .pos-${
                index + 1
              }`,
              css: `grid-area: ${row}/${col};`,
            },
          ]);
        });
      }

      // Temporarily add the final class to capture the final state
      grid.classList.add("gallery--switch");
      const flipstate = Flip.getState([galleryItems], {
        props: "filter, opacity",
      });

      // Remove the final class to revert to the initial state
      grid.classList.remove("gallery--switch");

      // Animate video block if exists
      const videoBlock: any = document.querySelector(
        `.text-block.section--${sectionIndex.replace(
          "section--",
          ""
        )} .video-block`
      );

      let doAnimateVideo = false;
      let tlVideoBlock: any = gsap.timeline();

      if (videoBlock) {
        videoBlock.style.opacity = "0";

        const videoBlockMask: any = videoBlock.querySelector(".mask");
        const videoBlockImage: any = videoBlock
          .querySelector(".content__img")
          .querySelector("video");
        const videoBlockContent = [...videoBlock.querySelectorAll(".content")];

        const isCircle = videoBlockMask.tagName.toLowerCase() === "circle";

        tlVideoBlock
          .fromTo(
            videoBlock,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 3.2,
            },
            0
          )
          .fromTo(
            videoBlockMask,
            {
              attr: isCircle
                ? { r: videoBlockMask.getAttribute("r") }
                : { d: videoBlockMask.getAttribute("d") },
            },
            {
              duration: 3.2,
              ease: "none",
              attr: isCircle
                ? { r: videoBlockMask.dataset.valueFinal }
                : { d: videoBlockMask.dataset.valueFinal },
            },
            0
          )
          .fromTo(
            videoBlockImage,
            {
              transformOrigin: "50% 50%",
            },
            {
              duration: 3.2,
              ease: "none",
              scale: isCircle ? 1.2 : 1,
            },
            0
          )
          .fromTo(
            videoBlockContent,
            {
              opacity: 0,
              scale: 0,
            },
            { duration: 3.2, opacity: 1, scale: 1 },
            0
          )
          .pause();
      }

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
          onEnter: (self: any) => {
            if (animationType === "cllg-fx4" && isMobile()) {
              document.dispatchEvent(
                onTutoActivated({ active: true, section: "4" })
              );
            }
            changeAppBackground(self);
          },
          onEnterBack: changeAppBackground,
          ...(animationType === "cllg-fx2"
            ? {
                onUpdate: (self) => {
                  const { progress } = self;

                  if (parseFloat(progress.toFixed(2)) === 0.84) {
                    if (!doAnimateVideo) {
                      doAnimateVideo = true;
                    }

                    if (doAnimateVideo) {
                      tlVideoBlock.play();
                    }
                  } else if (progress < 0.84) {
                    if (doAnimateVideo) {
                      tlVideoBlock.reverse();
                      doAnimateVideo = false;
                    }
                  }
                },
              }
            : {}),
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
      grid.style.setProperty("--grid-width", "100%");
      grid.style.setProperty("--grid-columns", isMobile() ? "3" : "6");
      grid.style.setProperty("--perspective", "1500px");
      grid.style.setProperty("--grid-inner-scale", "1");

      // if (timeline && gridItemsInner) {
      gsap
        // .to(
        //   gridItems,
        //   {
        //     xPercent: () => gsap.utils.random(-150, 150),
        //     yPercent: () => gsap.utils.random(-300, 300),
        //     rotationX: 0,
        //     opacity: () => gsap.utils.random(0.64, 1),
        //   },
        //   0
        // )
        .set(gridItems, {
          transformOrigin: "50% 0%",
          z: () => gsap.utils.random(-320, 320),
          rotationX: () => gsap.utils.random(-20, 20),
          xPercent: () => gsap.utils.random(-32, 32),
          yPercent: () => gsap.utils.random(-10, 480),
          opacity: () => gsap.utils.random(0.64, 1),
        });
      // .to(
      //   gridWrap,
      //   {
      //     z: 6500,
      //   },
      //   0
      // );
      // }

      break;
    default:
      console.error("Unknown animation type.");
      break;
  }
};

export { applyCollageAnimation };
